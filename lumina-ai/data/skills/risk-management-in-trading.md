---
name: risk-management-in-trading
description: How risk management keeps traders alive — position sizing, stop-losses, risk-per-trade limits, the Kelly criterion, drawdown and risk of ruin, diversification, and why capital preservation matters more than picking winners. Educational, not financial advice. Use to understand trading risk management, position sizing, stop-losses, drawdown, or why risk control beats prediction.
category: engineering
keywords_vi: risk management trading, quản lý rủi ro giao dịch, position sizing cỡ lệnh, stop-loss cắt lỗ, rủi ro mỗi lệnh, kelly criterion, drawdown risk of ruin, bảo toàn vốn
---

# Risk Management in Trading

Risk management is what separates traders who survive from those who blow up. The counterintuitive truth: **how you manage risk matters more than how good your predictions are.** You can be right often and still go broke with bad risk control; you can be right barely more than half the time and profit with good risk control. *(Educational — not financial advice.)*

## Capital Preservation First

The primary goal isn't maximizing gains — it's **not going broke**. A **100% loss is permanent** (you can't trade with zero), and losses hurt asymmetrically: a 50% loss requires a **100% gain** to recover. So the math of survival dominates: protect capital, and the compounding takes care of returns. A blown account has no future edge, however good.

## Position Sizing (the core lever)

How much to risk on each trade is the most important decision — more than entry/exit signals:
- **Risk a small % per trade** — a common rule is risking **1–2% of capital** on any single trade, so no one loss (or losing streak) is catastrophic. This bounds the damage.
- **Size from your stop** — position size = (capital × risk %) ÷ (distance to stop-loss). Wider stop → smaller position; tighter stop → larger. This keeps **dollar risk constant** regardless of the trade's volatility (use ATR — see technical-analysis-indicators).
- Constant fractional sizing means losses shrink your bets (protecting you in drawdowns) and wins grow them.

## Stop-Losses

A **stop-loss** predefines your exit if the trade goes against you, capping the loss. Set it **before** entering (at a level that invalidates your thesis), and **honor it** — the fatal mistake is moving/removing stops and letting a small loss become a huge one ("hope" is not a strategy). Stops turn unbounded risk into bounded risk.

## Kelly & Bet Sizing

The **Kelly criterion** gives the mathematically growth-optimal fraction to bet given your edge and odds. In practice, traders use **fractional Kelly** (a fraction of the Kelly bet) because full Kelly is very volatile and assumes you know your edge precisely (you don't). The lesson: bet size should scale with your **edge** and **confidence** — bigger edge, bigger (but still bounded) bet; and overbetting a small/uncertain edge courts ruin.

## Drawdown & Risk of Ruin

- **Drawdown** — the peak-to-trough decline. Large drawdowns are psychologically brutal (see trading-psychology) and mathematically hard to recover from. Manage strategies by their drawdown, not just returns.
- **Risk of ruin** — the probability of losing enough to be done. Even a positive-edge strategy has a nonzero ruin probability if bets are too large or losing streaks too long. Proper sizing pushes ruin probability toward zero.

## Diversification & Correlation

Spread risk across uncorrelated positions/strategies (see portfolio-theory-and-diversification) so one bad bet or one market event doesn't sink you. But beware: correlations **rise toward 1 in crises** — "diversified" positions can all fall together exactly when it matters. Account for the tail.

## Pitfalls (in understanding/using)

- **Risking too much per trade** — one loss or streak wipes you out; cap risk (~1–2%).
- **Moving/removing stops** and letting small losses balloon — the classic account-killer.
- Focusing on **being right** over **managing risk** — survival math dominates prediction.
- **Overbetting** a small/uncertain edge (ignoring Kelly's humility) → ruin despite a real edge.
- Ignoring the **asymmetry of losses** (a 50% loss needs a 100% gain back).
- Assuming **diversification** protects in crashes — correlations spike to 1 in crises.
- No plan for **drawdowns/risk of ruin** — trading position sizes that can't survive a bad streak.
- Revenge-trading / sizing up to recover losses (see trading-psychology).
