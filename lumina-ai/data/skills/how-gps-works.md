---
name: how-gps-works
description: How GPS works — satellites broadcasting precise time signals, trilateration from distances to 4+ satellites to compute position and correct clock error, why 4 satellites are needed, and sources of error (atmosphere, buildings, multipath) plus assisted-GPS. Use to understand location/positioning, GPS accuracy, and why it struggles indoors/in cities.
category: engineering
keywords_vi: gps hoạt động thế nào, định vị vệ tinh, trilateration, tín hiệu thời gian, cần 4 vệ tinh, sai số gps, gps trong nhà đô thị kém, hiểu gps
---

# How GPS Works

GPS (and other GNSS like Galileo/GLONASS/BeiDou) lets a receiver compute its position anywhere on Earth using signals from a constellation of satellites. The core trick is **measuring distance by timing**.

## Satellites Broadcast Time

Each GPS satellite carries an extremely precise **atomic clock** and continuously broadcasts a signal saying "I am satellite X, here's my exact position, and the current time is T." The signals travel at the speed of light.

## Distance = Time × Speed

Your receiver notes when each signal **arrives** and compares it to the time it was **sent**. The tiny delay × the speed of light = your **distance** to that satellite. So each satellite tells you "you are somewhere on a sphere of radius D around me."

## Trilateration (and why you need 4 satellites)

- Distance to **one** satellite → you're on a sphere.
- **Two** → the intersection is a circle.
- **Three** → narrows to two points (one is absurd, discarded) → a position.
- **Four** → the crucial one: your receiver's cheap clock isn't atomic-precise, and even a nanosecond of clock error becomes meters of position error. The **fourth** satellite provides the extra equation needed to solve for the **clock error too**, correcting your position. So you need **at least 4** satellites in view for an accurate 3D fix (position + time).
This is **trilateration** (distances), not triangulation (angles).

## Errors & Assisted GPS

Accuracy is typically a few meters, degraded by:
- **Atmospheric delay** — signals slow slightly through the ionosphere/troposphere.
- **Multipath** — signals bouncing off buildings arrive late (why dense cities — "urban canyons" — degrade GPS).
- **Blocked sky view** — indoors, tunnels, dense forest: not enough satellites visible, so GPS fails or drifts.
- **Satellite geometry** — satellites clustered together give a weaker fix than spread-out ones.
Phones use **Assisted-GPS** (download satellite data over the network for a fast first fix) and blend in **Wi-Fi/cell-tower positioning** to work indoors and lock on quickly. Corrections like **DGPS/RTK** push accuracy to centimeters for surveying.

## Why It Matters

Explains: why GPS is bad **indoors and in cities** (blocked/reflected signals), why the first fix can be slow (needs satellite almanac — A-GPS speeds it), why accuracy varies, and that GPS gives you time as well as position (used to sync networks). GPS is **receive-only** — your device doesn't transmit to satellites, so "GPS" alone doesn't track you; the app sending your location does.

## Pitfalls / Notes

- **Indoor/urban** use → poor or no fix; expect Wi-Fi/cell fallback.
- **Cold start** slow without A-GPS.
- Multipath in cities causing position "jumps."
- Confusing GPS (positioning) with the network that *reports* your location.
