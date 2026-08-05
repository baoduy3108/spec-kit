const { chromium } = require('playwright');

async function comboChainingBot() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/opt/pw-browsers/chromium'
  });

  const page = await browser.newPage();
  page.setViewportSize({ width: 1024, height: 768 });

  try {
    console.log('⚡ COMBO CHAINING BOT - Explosive Points Strategy\n');
    console.log('Strategy: Setup 3-4 line combos + maintain chains\n');

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

    console.log('Move   | Score   | Combo | Empty% | Status');
    console.log('───────┼─────────┼───────┼────────┼──────────────');

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

        // COMBO CHAINING STRATEGY
        let bestPlacement = null;
        let bestScore = -Infinity;
        let bestComboCount = 0;

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

                // Count clears (COMBO IS KING)
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

                // ========== EXPONENTIAL COMBO SCORING ==========
                // Key: More clears = exponentially higher points
                if (totalClears === 0) {
                  score += 5; // Very low for no clear
                } else if (totalClears === 1) {
                  score += 100; // Single clear
                } else if (totalClears === 2) {
                  score += 2000; // Dual combo
                } else if (totalClears === 3) {
                  score += 10000; // Triple combo (EXPLOSIVE!)
                } else if (totalClears >= 4) {
                  score += 50000 + (totalClears * 10000); // 4+ = MASSIVE
                }

                // ========== PREDICT NEXT MOVE FOR CHAINING ==========
                // Analyze if this move enables more clears with next piece
                let chainPotential = 0;
                if (pieces.length > 1) {
                  // Count how many pieces could create additional clears
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

                          if (nextClears >= 2) {
                            chainPotential += nextClears * 500;
                          }
                        }
                      }
                    }
                  }
                }
                score += chainPotential; // Bonus for chain setup

                // ========== PROTECT CORNERS (Fallback zones) ==========
                // Keep corners empty for emergency placements
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
                if (emptyCorners < 2) {
                  score -= 5000; // SEVERE penalty if not protecting corners
                } else if (emptyCorners >= 2) {
                  score += emptyCorners * 1000; // Bonus for protecting corners
                }

                // ========== BOARD SPACE MANAGEMENT ==========
                const emptyCount = testGrid.flat().filter(cell => !cell).length;
                const emptyPercent = emptyCount / 64;

                if (emptyPercent > 0.5) {
                  score += emptyCount * 5; // Maintain flexibility
                } else if (emptyPercent < 0.15) {
                  score -= 10000; // Critical - about to lose
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
                score -= gapCount * 50;

                // ========== PREFER LARGER PIECES ==========
                score += (piece.w * piece.h) * 100;

                if (score > bestScore) {
                  bestScore = score;
                  bestPlacement = { piece: p.idx, r, c };
                  bestComboCount = totalClears;
                }
              }
            }
          }
        }

        // Fallback - prefer corners as emergency
        if (!bestPlacement) {
          const cornerPositions = [
            { r: 7, c: 7 }, { r: 7, c: 0 },
            { r: 0, c: 7 }, { r: 0, c: 0 }
          ];

          for (const corner of cornerPositions) {
            for (const p of pieces) {
              const piece = p.piece;
              if (corner.r + piece.h <= 8 && corner.c + piece.w <= 8) {
                if (window.__gameAPI.canPlace(piece, corner.r, corner.c)) {
                  bestPlacement = { piece: p.idx, r: corner.r, c: corner.c };
                  break;
                }
              }
            }
            if (bestPlacement) break;
          }
        }

        // Last resort fallback
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
          combo: bestComboCount,
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
        if (moveCount % 100 === 0 || moveCount <= 5 || result.combo >= 3) {
          console.log(`${String(moveCount).padStart(6)} | ${String(result.score).padStart(7)} | ${String(result.combo).padStart(5)} | ${String(result.emptyPercent).padStart(5)}%  | ✓`);
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
    console.log(`⚡ COMBO CHAINING BOT FINAL SCORE: ${final.score} points`);
    console.log(`📊 Total moves: ${moveCount}`);
    console.log(`💡 Strategy: Combo explosion (3-4 clears) + chain planning`);
    console.log(`${'═'.repeat(70)}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
}

comboChainingBot().catch(console.error);
