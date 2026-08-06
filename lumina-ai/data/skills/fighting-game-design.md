---
name: fighting-game-design
description: Fighting game design — neutral game and footsies, the mixup/mind-game layer, spacing and movement, special moves and inputs, combo systems and cancels, meter and resources, matchups and tier balance, and netcode expectations (rollback). Use when designing a fighting game, versus combat, or the neutral/mixup/combo loop distinct from raw hit detection.
category: design
keywords_vi: thiết kế game đối kháng fighting, thế giằng co neutral và footsies, lớp đoán ý mixup mind game, khoảng cách di chuyển spacing, chiêu đặc biệt và lệnh nhập input, hệ combo và hủy đòn cancel, thanh nộ tài nguyên meter, cân bằng matchup bậc tier rollback netcode
---

# Fighting Game Design

Fighting games are 1-v-1 contests of **spacing, reads, and execution**. While the moment of a hit is collision (see combat-systems-and-hitboxes), the *game* is the layered mind-battle *around* landing that hit: controlling space, baiting mistakes, and converting openings. This is the design of that duel.

## The Neutral Game & Footsies

**Neutral** is the phase where neither player has advantage — the spacing battle to *earn* the first hit.
- **Footsies** — poking with pokes/normals at the edge of range, whiff-punishing (hitting the opponent's recovery when they miss), and controlling the space so the opponent can't move freely. It's a subtle game of "who commits first".
- **Spacing & movement** — the ability to be *just* outside danger and dash in to punish is core skill. Movement options (dash, backdash, jump, walk) define the neutral toolkit.
- Good neutral design gives meaningful ranges and risks so positioning is a real contest, not just mashing.

## The Mixup Layer (Mind Games)

Once close, the game becomes a **guessing game** built on rock-paper-scissors:
- **Strike / throw / block** — an attacker can strike (beaten by blocking), throw (beaten by teching/jumping), or the defender can attack back. Classic RPS.
- **High/low/overhead** — must block in the right direction; ambiguous setups force a guess.
- **Frame advantage** — after a blocked move you may be plus (safe, can pressure) or minus (punishable). Frame data (see combat-systems-and-hitboxes) governs whose turn it is. Designing sensible plus/minus is core balance.
- **Conditioning** — players train opponents into habits, then break them. The *mind game* is the soul of high-level fighting.

## Execution: Inputs, Specials, Combos

- **Special moves** with motion inputs (quarter-circles, charges) add an execution layer — a skill/expression barrier (with debate over accessibility vs depth; many modern games simplify inputs).
- **Combos** — chains of cancels that convert one opening into big damage. **Cancels** (interrupting a move's recovery into another) define the combo system's ceiling. Combos should reward the neutral win — the payoff for landing a hit.
- **Execution vs decision balance** — how much the game is *doing* the combo vs *deciding* the read. Modern design often lowers execution to spotlight decisions.

## Resources & Meter

**Meter** (super gauge, and systems like Drive/Roman-cancel/Focus) adds resource management: spend for EX moves, supers, combo extensions, defensive escapes. This creates comeback potential and risk-reward decisions layered over neutral and mixup. Balancing meter gain/spend shapes aggression and pacing.

## Balance: Matchups & Tiers

- **Matchups** — each character vs each other; some inherently favor one (a zoner vs a grappler). Perfect symmetry is impossible with diverse casts; the goal is *no unwinnable matchups* and a viable-many roster.
- **Tiers** — the community ranks characters; designers patch to compress the gap, keeping the roster diverse and expressive without one dominant pick.
- **Archetypes** — rushdown, zoner, grappler, all-rounder — should each be viable, countering each other, so the metagame stays rich.

## Netcode: Non-Negotiable

Fighting games are latency-critical; **rollback netcode** (predict inputs, roll back and correct on mismatch) is now the expected standard — delay-based netcode feels unplayable online. This is a design/tech requirement, not a nice-to-have: a great fighting game with bad netcode is a dead game.

Design fighting games as **a spacing battle (neutral/footsies) leading into a mind-game (mixups on RPS + frame data), converted via an execution/combo layer, moderated by meter, balanced across matchups** — delivered over rock-solid rollback. The depth players chase for decades comes from that stacked mental duel, not the hits themselves.
