---
name: fps-and-shooter-design
description: FPS and shooter design — gunplay feel and weapon feedback, TTK (time-to-kill) and its consequences, weapon roles and balance, movement and aiming, map design and sightlines, recoil/spread, and hitscan vs projectile. Use when designing a first-person/third-person shooter, tuning gunplay, or balancing weapons and maps.
category: design
keywords_vi: thiết kế game bắn súng fps shooter, cảm giác bắn súng và phản hồi vũ khí gunplay, thời gian hạ gục ttk time to kill, vai trò và cân bằng vũ khí weapon balance, di chuyển và ngắm bắn movement aiming, thiết kế bản đồ và tầm nhìn map sightline, giật và tản đạn recoil spread, hitscan so với projectile
---

# FPS & Shooter Design

Shooters live or die on **gunplay** — how it *feels* to aim and fire. A shooter with mediocre everything but perfect gunplay succeeds; the reverse fails. Beyond feel, the genre balances weapons, movement, and maps into a fair contest. This is the design of pointing and shooting well.

## Gunplay & Weapon Feel

The core sensation, built from layered feedback (see game-feel-and-juice):
- **Impact feedback** — muzzle flash, punchy sound, recoil kick, hit markers, enemy reactions/damage numbers, screen shake. Each confirms the shot *landed* and gives it weight.
- **Recoil & spread** — the gun's kick and accuracy spread; a learnable recoil *pattern* rewards mastery, random spread adds chaos. This defines a weapon's skill curve and feel.
- **Weight & responsiveness** — reload animations, weapon swap speed, ADS (aim-down-sights) transitions. A gun should feel *mechanical and satisfying* to operate.

Great guns feel powerful and distinct; players should *want* to fire them.

## Time-to-Kill (TTK)

**TTK** — how fast you can kill an opponent — is the single most consequential shooter tuning knob:
- **Low TTK** (fast kills, e.g. tactical shooters) — positioning, first-shot accuracy, and awareness dominate; reflexes and mistakes are punished instantly; less room for outplay once shot.
- **High TTK** (slow kills, e.g. arena/hero shooters) — sustained aim, movement, ability use, and mid-fight recovery matter; more forgiving, more mechanically expressive fights.

TTK shapes the *entire* game's pace, skill expression, and audience. It's the first decision, and everything (maps, movement, health) flows from it.

## Weapons: Roles & Balance

- **Weapon roles / archetypes** — each gun fills a niche (close-range shotgun, versatile rifle, long-range sniper, spray SMG) with strengths/weaknesses, so no weapon is universally best. Rock-paper-scissors of ranges.
- **Balance** via range effectiveness, damage falloff, fire rate, magazine, reload, mobility trade-offs. Sidegrades over strict upgrades keep variety viable.
- **Progression tension** — unlockable/upgradeable guns must avoid pay-to-win or power-creep that invalidates the roster.

## Movement & Aiming

- **Movement** ranges from grounded/tactical to fast/acrobatic (bunny-hop, wall-run, slide, dash). It defines the game's tempo and is a skill axis of its own; movement *is* defense in fast shooters.
- **Aiming feel** — sensitivity, aim assist (on controllers), acceleration curves. Aiming must feel precise and fair across input devices.
- The interplay of movement and aim (can you shoot accurately while moving?) is a key design lever.

## Map & Level Design

Shooter maps are the arena and heavily shape play:
- **Sightlines** — long lanes favor snipers/ranged; tight corridors favor close weapons. Map geometry balances weapon roles.
- **Cover, chokepoints, flanks, verticality** — create tactical decisions and counterplay; every strong position should have an approach/counter.
- **Flow & spawns** — good routing, sensible spawn logic (no spawn-camping/spawn-killing), and objective placement drive engagements.
- **Readability** — enemies must be visible/identifiable; clarity over visual clutter.

Competitive maps are tuned obsessively for balance (are both sides fair? is any angle oppressive?).

## Hitscan vs Projectile & Netcode

- **Hitscan** — the shot registers instantly along a ray (most bullets); simple, no travel time.
- **Projectile** — the shot travels (rockets, arrows, some bullets); requires *leading* targets, adding a skill dimension.
- **Netcode** is critical: lag compensation, hit registration, and low latency decide whether "I clearly hit that" feels true. Bad hit-reg ruins even great gunplay.

Design shooters by **perfecting gunplay feel first**, choosing a **TTK** that sets the whole game's character, balancing a **weapon roster of distinct roles** across ranges, tuning **movement/aim** as skill axes, and building **maps whose sightlines balance the arsenal** — all delivered over netcode that makes hits feel honest.
