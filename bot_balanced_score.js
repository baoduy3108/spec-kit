const { chromium } = require('playwright');

async function balancedScoreBot() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/opt/pw-browsers/chromium'
  });

  const page = await browser.newPage();
  page.setViewportSize({ width: 1024, height: 768 });

  try {
    console.log('⚖️ BALANCED SCORE BOT\n');
    console.log('Strategy: 2 lines = 500 | 3 lines = 1500 | 4+ = 5000+\n');

    await page.goto('http://localhost:8001/hacdong_working.html', {
      waitUntil: 'networkidle',
      timeout: 15000
    });

    await page.waitForSelector('canvas', { timeout: 10000 });
    await page.waitForTimeout(2000);

    await page.evaluate(() => {
      try {
        localStorage.setItem('hd_ftue', '1');
      } catch (e) {}
      const ftue = document.querySelector('#ftue');
      if (ftue && ftue.classList.contains('show')) {
        ftue.classList.remove('show');
      }
    });

    await page.waitForTimeout(500);

    await page.evaluate(() => {
      if (typeof window.__gameAPI !== 'undefined') {
        window.__gameAPI.newGame();
      }
    });

    await page.waitForTimeout(300);

    console.log('Move    | Score   | Clears | Empty% | Status');
    console.log('────────┼─────────┼────────┼────────┼──────────────');

    let moveCount = 0;
    const maxMoves = 3000;

    while (moveCount < maxMoves) {
      const result = await page.evaluate(async () => {
        if (typeof window.__gameAPI === 'undefined') {
          return { error: 'No API' };
        }

        const state = window.__gameAPI.getState();

        if (state.gameOver === true || state.lvWon === true) {
          return { ended: true, score: state.score };
        }

        const pieces = [];
        for (let j = 0; j < 3; j++) {
          if (state.tray[j]) {
            pieces.push({
              idx: j,
              piece: state.tray[j]
            });
          }
        }

        if (pieces.length === 0) {
          return { ended: true, score: state.score };
        }

        // BALANCED SCORE STRATEGY
        let bestPlacement = null;
        let bestScore = -Infinity;
        let bestClearCount = 0;

        for (const p of pieces) {
          const piece = p.piece;

          for (let r = 0; r <= 8 - piece.h; r++) {
            for (let c = 0; c <= 8 - piece.w; c++) {
              if (window.__gameAPI.canPlace(piece, r, c)) {
                let score = 0;

                const testGrid = state.grid.map(row => [...row]);

                if (piece.cells) {
                  for (let dy = 0; dy < piece.h; dy++) {
                    for (let dx = 0; dx < piece.w; dx++) {
                      if (piece.cells[dy * piece.w + dx]) {
                        testGrid[r + dy][c + dx] = true;
                      }
                    }
                  }
                } else {
                  for (let dy = 0; dy < piece.h; dy++) {
                    for (let dx = 0; dx < piece.w; dx++) {
                      testGrid[r + dy][c + dx] = true;
                    }
                  }
                }

                // Find clears
                const clearedRows = [];
                const clearedCols = [];

                for (let i = 0; i < 8; i++) {
                  if (testGrid[i].every(cell => cell)) {
                    clearedRows.push(i);
                  }
                }
                for (let j = 0; j < 8; j++) {
                  if (testGrid.every(row => row[j])) {
                    clearedCols.push(j);
                  }
                }

                const totalClears = clearedRows.length + clearedCols.length;

                // ========== BALANCED MULTIPLIERS ==========
                if (totalClears === 0) {
                  score += 10;
                } else if (totalClears === 1) {
                  score += 100;  // Single clear
                } else if (totalClears === 2) {
                  // DUAL-LINE = 500 điểm
                  score += 500;
                } else if (totalClears === 3) {
                  // TRIPLE CLEAR = 1,500 điểm
                  score += 1500;
                } else if (totalClears >= 4) {
                  // 4+ CLEARS = 5,000+
                  score += 5000 + (totalClears * 1000);
                }

                // ========== CORNER STACKING ==========
                const distFromBottomRight = (7 - r) + (7 - c);
                const cornerBonus = Math.max(0, 12 - distFromBottomRight);
                score += cornerBonus * 100;

                // ========== BOARD SPACE MANAGEMENT ==========
                const emptyCount = testGrid.flat().filter(cell => !cell).length;
                const emptyPercent = emptyCount / 64;

                if (emptyPercent > 0.5) {
                  score += emptyCount * 10;
                } else if (emptyPercent < 0.2) {
                  score -= 2000;
                } else if (emptyPercent < 0.3) {
                  score -= 500;
                }

                // ========== GAP AVOIDANCE ==========
                let gapCount = 0;
                for (let i = 1; i < 8; i++) {
                  for (let j = 0; j < 8; j++) {
                    if (!testGrid[i][j] && testGrid[i-1][j]) {
                      gapCount++;
                    }
                  }
                }
                score -= gapCount * 150;

                // ========== SANDWICH PATTERN DETECTION ==========
                let stackedRows = 0;
                for (let i = 0; i < 7; i++) {
                  const row1Fill = testGrid[i].filter(c => c).length;
                  const row2Fill = testGrid[i+1].filter(c => c).length;
                  if (row1Fill >= 6 && row2Fill >= 6) {
                    stackedRows++;
                  }
                }
                score += stackedRows * 300;

                // ========== LARGER PIECES ==========
                score += (piece.w * piece.h) * 80;

                // ========== LOOKAHEAD ==========
                if (pieces.length <= 2) {
                  score -= 100;
                }

                if (score > bestScore) {
                  bestScore = score;
                  bestPlacement = { piece: p.idx, r, c };
                  bestClearCount = totalClears;
                }
              }
            }
          }
        }

        // Fallback
        if (!bestPlacement) {
          for (const p of pieces) {
            const piece = p.piece;
            for (let r = 0; r <= 8 - piece.h; r++) {
              for (let c = 0; c <= 8 - piece.w; c++) {
                if (window.__gameAPI.canPlace(piece, r, c)) {
                  bestPlacement = { piece: p.idx, r, c };
                  break;
                }
              }
              if (bestPlacement) break;
            }
            if (bestPlacement) break;
          }
        }

        if (!bestPlacement) {
          return { ended: true, score: state.score };
        }

        window.__gameAPI.placePiece(bestPlacement.piece, bestPlacement.r, bestPlacement.c);
        await new Promise(r => setTimeout(r, 10));

        const newState = window.__gameAPI.getState();
        const newEmpty = 64 - newState.grid.flat().filter(cell => cell).length;
        const emptyPercent = Math.round(newEmpty * 100 / 64);

        return {
          success: true,
          score: newState.score,
          clears: bestClearCount,
          emptyPercent
        };
      });

      if (result.error) {
        console.log(`\n❌ Error: ${result.error}`);
        break;
      }

      if (result.ended) {
        console.log(`\n✅ Game ended - stuck`);
        console.log(`   Final Score: ${result.score} points`);
        break;
      }

      if (result.success) {
        moveCount++;
        if (moveCount % 100 === 0 || moveCount <= 5) {
          console.log(`${String(moveCount).padStart(7)} | ${String(result.score).padStart(7)} | ${String(result.clears).padStart(6)} | ${String(result.emptyPercent).padStart(5)}%  | ✓`);
        }
      }
    }

    const final = await page.evaluate(() => {
      if (typeof window.__gameAPI !== 'undefined') {
        const state = window.__gameAPI.getState();
        return { score: state.score };
      }
      return { score: 0 };
    });

    console.log(`\n${'═'.repeat(70)}`);
    console.log(`⚖️ BALANCED SCORE BOT FINAL SCORE: ${final.score} points`);
    console.log(`📊 Total moves: ${moveCount}`);
    console.log(`💡 Strategy: 2 lines = 500 | 3 lines = 1500 | 4+ = 5000+`);
    console.log(`${'═'.repeat(70)}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
}

balancedScoreBot().catch(console.error);
