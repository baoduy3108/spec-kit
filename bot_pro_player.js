const { chromium } = require('playwright');

async function proPlayerBot() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/opt/pw-browsers/chromium'
  });

  const page = await browser.newPage();
  page.setViewportSize({ width: 1024, height: 768 });

  try {
    console.log('👑 PRO PLAYER BOT - Human-level strategy\n');
    console.log('Strategy: Deep lookahead + combo setup + board optimization\n');

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

    console.log('Move   | Score   | Combo | Empty% | Potential | Status');
    console.log('───────┼─────────┼───────┼────────┼───────────┼──────────────');

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

        // PRO PLAYER STRATEGY - DEEP ANALYSIS
        let bestPlacement = null;
        let bestScore = -Infinity;
        let bestCombo = 0;
        let bestPotential = 0;

        for (const p of pieces) {
          const piece = p.piece;

          for (let r = 0; r <= 8 - piece.h; r++) {
            for (let c = 0; c <= 8 - piece.w; c++) {
              if (window.__gameAPI.canPlace(piece, r, c)) {
                let score = 0;

                const testGrid = state.grid.map(row => [...row]);

                // Place piece
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

                // Count immediate clears
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

                // ========== IMMEDIATE COMBO SCORE ==========
                if (totalClears === 0) {
                  score += 2;
                } else if (totalClears === 1) {
                  score += 150;
                } else if (totalClears === 2) {
                  score += 3000;
                } else if (totalClears === 3) {
                  score += 15000; // TRIPLE COMBO
                } else if (totalClears >= 4) {
                  score += 75000 + (totalClears * 15000);
                }

                // ========== DEEP LOOKAHEAD (2-3 moves) ==========
                let futureComboScore = 0;
                if (pieces.length >= 2) {
                  // Analyze ALL remaining pieces for future combos
                  for (const nextP of pieces) {
                    if (nextP.idx === p.idx) continue;
                    const nextPiece = nextP.piece;

                    for (let nr = 0; nr <= 8 - nextPiece.h; nr++) {
                      for (let nc = 0; nc <= 8 - nextPiece.w; nc++) {
                        if (window.__gameAPI.canPlace(nextPiece, nr, nc)) {
                          const testGrid2 = testGrid.map(row => [...row]);
                          if (nextPiece.cells) {
                            for (let dy = 0; dy < nextPiece.h; dy++) {
                              for (let dx = 0; dx < nextPiece.w; dx++) {
                                if (nextPiece.cells[dy * nextPiece.w + dx]) {
                                  testGrid2[nr + dy][nc + dx] = true;
                                }
                              }
                            }
                          } else {
                            for (let dy = 0; dy < nextPiece.h; dy++) {
                              for (let dx = 0; dx < nextPiece.w; dx++) {
                                testGrid2[nr + dy][nc + dx] = true;
                              }
                            }
                          }

                          let nextClears = 0;
                          for (let i = 0; i < 8; i++) {
                            if (testGrid2[i].every(cell => cell)) nextClears++;
                          }
                          for (let j = 0; j < 8; j++) {
                            if (testGrid2.every(row => row[j])) nextClears++;
                          }

                          // Weight future combos
                          if (nextClears >= 2) {
                            futureComboScore += nextClears * 2000;
                          }
                        }
                      }
                    }
                  }
                }
                score += futureComboScore * 0.5; // 50% weight on future

                // ========== BOARD CLEANLINESS (USER'S KEY!) ==========
                const emptyCount = testGrid.flat().filter(cell => !cell).length;
                const emptyPercent = emptyCount / 64;

                // Pro players keep board VERY clean
                if (emptyPercent > 0.6) {
                  score += emptyCount * 20;
                } else if (emptyPercent > 0.5) {
                  score += emptyCount * 15;
                } else if (emptyPercent > 0.4) {
                  score += emptyCount * 10;
                } else if (emptyPercent < 0.1) {
                  score -= 20000; // CRITICAL
                }

                // ========== CORNER PROTECTION (Insurance) ==========
                const corners = [
                  { r: 0, c: 0 }, { r: 0, c: 7 },
                  { r: 7, c: 0 }, { r: 7, c: 7 }
                ];
                let emptyCorners = 0;
                for (const corner of corners) {
                  if (!testGrid[corner.r][corner.c]) {
                    emptyCorners++;
                  }
                }
                if (emptyCorners >= 3) {
                  score += 5000;
                } else if (emptyCorners < 1) {
                  score -= 8000;
                }

                // ========== AVOID DEAD ZONES ==========
                let gapCount = 0;
                for (let i = 1; i < 8; i++) {
                  for (let j = 0; j < 8; j++) {
                    if (!testGrid[i][j] && testGrid[i-1][j]) {
                      gapCount++;
                    }
                  }
                }
                score -= gapCount * 100;

                // ========== FAVOR BIG PIECES ==========
                score += (piece.w * piece.h) * 150;

                // ========== CENTER FLEXIBILITY ==========
                let centerEmpty = 0;
                for (let i = 2; i < 6; i++) {
                  for (let j = 2; j < 6; j++) {
                    if (!testGrid[i][j]) centerEmpty++;
                  }
                }
                score += centerEmpty * 50;

                if (score > bestScore) {
                  bestScore = score;
                  bestPlacement = { piece: p.idx, r, c };
                  bestCombo = totalClears;
                  bestPotential = futureComboScore;
                }
              }
            }
          }
        }

        // Corners fallback
        if (!bestPlacement) {
          const fallbackPositions = [
            { r: 7, c: 7 }, { r: 0, c: 0 },
            { r: 7, c: 0 }, { r: 0, c: 7 }
          ];

          for (const pos of fallbackPositions) {
            for (const p of pieces) {
              const piece = p.piece;
              if (pos.r + piece.h <= 8 && pos.c + piece.w <= 8) {
                if (window.__gameAPI.canPlace(piece, pos.r, pos.c)) {
                  bestPlacement = { piece: p.idx, r: pos.r, c: pos.c };
                  break;
                }
              }
            }
            if (bestPlacement) break;
          }
        }

        // Last resort
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
          combo: bestCombo,
          emptyPercent,
          potential: bestPotential
        };
      });

      if (result.error) {
        console.log(`\n❌ Error: ${result.error}`);
        break;
      }

      if (result.ended) {
        console.log(`\n✅ Game ended`);
        console.log(`   Final Score: ${result.score} points`);
        break;
      }

      if (result.success) {
        moveCount++;
        if (moveCount % 50 === 0 || moveCount <= 5 || result.combo >= 2) {
          console.log(`${String(moveCount).padStart(6)} | ${String(result.score).padStart(7)} | ${String(result.combo).padStart(5)} | ${String(result.emptyPercent).padStart(5)}%  | ${String(Math.round(result.potential)).padStart(9)} | ✓`);
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

    console.log(`\n${'═'.repeat(80)}`);
    console.log(`👑 PRO PLAYER BOT FINAL SCORE: ${final.score} points`);
    console.log(`📊 Total moves: ${moveCount}`);
    console.log(`💡 Strategy: Deep lookahead (2-3 moves) + board cleanliness + combo hunting`);
    console.log(`${'═'.repeat(80)}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
}

proPlayerBot().catch(console.error);
