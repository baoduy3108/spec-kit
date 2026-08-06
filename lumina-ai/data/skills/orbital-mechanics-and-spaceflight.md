---
name: orbital-mechanics-and-spaceflight
description: Orbital mechanics and spaceflight basics — orbits and why things stay up, Kepler's laws, orbital velocity and energy, the rocket equation and delta-v, Hohmann transfers, gravity assists, escape velocity, and counterintuitive orbital maneuvering. Use when reasoning about orbits, satellites, space missions, rocketry, or how spaceflight works.
category: engineering
keywords_vi: cơ học quỹ đạo và bay vũ trụ orbital mechanics spaceflight, quỹ đạo vì sao vật không rơi, định luật kepler, vận tốc và năng lượng quỹ đạo orbital velocity, phương trình tên lửa và delta-v rocket equation, chuyển quỹ đạo hohmann transfer, hỗ trợ hấp dẫn gravity assist, vận tốc thoát escape velocity
---

# Orbital Mechanics & Spaceflight

Orbital mechanics governs how objects move under gravity in space — satellites, spacecraft, planets. It's beautifully counterintuitive: much of it contradicts everyday physical intuition, which is why "rocket science" is a byword for difficulty. But the core ideas are graspable.

## What Is an Orbit?

An orbit is **continuous free-fall that keeps missing the ground.** Newton's insight: fire a cannonball fast enough horizontally, and as it falls, the Earth curves away beneath it just as fast — so it falls *around* the planet forever. An orbiting object isn't "beyond gravity"; it's *constantly falling*, but moving sideways fast enough to never hit. Astronauts are weightless because they (and their station) are in perpetual free-fall together.

## Kepler's Laws

Three empirical laws describing orbital motion:
1. **Orbits are ellipses** with the central body at one focus (circles are a special case). The closest point is **periapsis**, the farthest **apoapsis**.
2. **Equal areas in equal times** — an object moves **faster near the body, slower far away** (it trades speed for altitude and back).
3. **Period² ∝ semi-major axis³** — bigger orbits take disproportionately longer; this relates orbital size to period.

## Orbital Velocity & Energy

- To orbit, you need enough **sideways speed** — for low Earth orbit, ~7.8 km/s. Getting to space is easy; going *fast enough sideways to stay* is the hard, expensive part.
- An orbit has a fixed total **energy** (kinetic + potential). Raising your orbit requires adding energy; lowering it sheds energy. Speed and altitude trade off along the ellipse.

## The Rocket Equation & Delta-v

Every maneuver costs **delta-v** (Δv) — a change in velocity, the true "currency" of spaceflight. The **Tsiolkovsky rocket equation** relates achievable Δv to exhaust velocity and the ratio of fueled-to-dry mass (Δv = vₑ·ln(m₀/m_f)):
- Δv grows only with the **logarithm** of the mass ratio → reaching high Δv demands *exponentially* more fuel. This is the **tyranny of the rocket equation**, and why rockets are mostly fuel, staged, and why every kilogram of payload is precious.
- A mission's total Δv budget (launch + transfers + landing) determines whether it's feasible with available propulsion.

## Maneuvers

- **Hohmann transfer** — the fuel-efficient way to move between two circular orbits: one burn to enter an elliptical transfer orbit, a second burn at the far side to circularize. Slow but cheap in Δv.
- **Gravity assist (slingshot)** — stealing a tiny bit of a planet's orbital momentum during a flyby to gain speed for free — how probes reach the outer solar system without enormous fuel.
- **Plane changes** are expensive; **inclination** matters for launch and rendezvous.

## The Counterintuitive Part

Orbital motion defies intuition, which trips up newcomers (and makes docking hard):
- **To speed up your orbit's period you slow down** (drop to a lower, faster orbit). To catch something *ahead* of you, you counterintuitively **lower** your orbit (go faster around) then rise back.
- **Thrusting forward raises the opposite side of your orbit**, not your current position.
- Rendezvous is a dance of relative orbits, not "point and go."

## Escape & Beyond

- **Escape velocity** — the speed to break free of a body's gravity entirely (~11.2 km/s from Earth's surface); beyond it, the trajectory is no longer a closed orbit but a hyperbola.
- **Orbit types** — LEO (satellites, ISS), **geostationary** (matches Earth's rotation, appears fixed — for comms), polar, Molniya, etc., each chosen for a purpose.

Orbital mechanics is the physics of **falling sideways fast enough to miss the ground**, budgeted in delta-v against the exponential tyranny of the rocket equation, and executed with efficient transfers and counterintuitive maneuvers — the elegant, unforgiving math that makes spaceflight both possible and hard.
