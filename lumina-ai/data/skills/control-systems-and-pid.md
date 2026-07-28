---
name: control-systems-and-pid
description: Control systems and PID controllers — feedback loops, setpoint/error/process variable, proportional-integral-derivative terms and tuning, stability, overshoot and steady-state error, integral windup, and open vs closed loop. Use when building a controller (thermostat, motor, drone, game steering), tuning a PID, or asking how feedback control works.
category: engineering
keywords_vi: hệ điều khiển và bộ pid, vòng phản hồi feedback loop, điểm đặt sai số biến quá trình setpoint error, tỉ lệ tích phân vi phân p i d, chỉnh tham số tuning pid, ổn định vọt lố overshoot sai số xác lập, tích phân bão hòa windup, vòng hở vòng kín open closed loop
---

# Control Systems & PID

A control system drives a real quantity (temperature, speed, position, altitude) toward a desired value and holds it there despite disturbances. The **PID controller** is the workhorse — simple, model-free, and everywhere from thermostats and cruise control to drones and 3D-printer heaters, and even game AI steering.

## Feedback: The Core Idea

- **Setpoint** — the target value you want.
- **Process variable (PV)** — the actual measured value.
- **Error** = setpoint − PV.
- A **closed loop** measures the error and continuously adjusts the actuator to shrink it. (An **open loop** just applies a fixed command with no measurement — fine only if the system is perfectly predictable, which nothing real is.)

The controller's job: turn "how far off am I?" into "how hard should I push?"

## The Three Terms

PID sums three responses to the error:

- **P (Proportional)** — output ∝ current error. Bigger error → bigger push. Alone, it reacts but leaves a persistent **steady-state error** (it eases off as it nears target and never fully arrives), and high P causes **oscillation/overshoot**.
- **I (Integral)** — accumulates error over time. This **eliminates steady-state error** by building up correction for any lingering offset. But it's slow and can cause overshoot and **windup**.
- **D (Derivative)** — responds to the *rate of change* of error. It **damps** the response, anticipating and reducing overshoot and oscillation — a braking force as you approach the target. Sensitive to noise (differentiating noisy signals amplifies it), so often filtered.

Output = `Kp·e + Ki·∫e dt + Kd·de/dt`. The gains **Kp, Ki, Kd** are what you tune.

## Behavior You're Balancing

- **Rise time** — how fast it reaches the target.
- **Overshoot** — how far it blows past before settling.
- **Settling time** — how long to stabilize.
- **Steady-state error** — residual offset at rest.
- **Stability** — does it converge, or oscillate/diverge?

These trade off: more P is faster but overshoots; more D damps but slows and amplifies noise; more I removes offset but risks windup. Tuning is finding the balance for *your* system.

## Tuning

- **Manual** — raise Kp until it oscillates, back off; add D to damp overshoot; add just enough I to remove residual error.
- **Ziegler–Nichols** — a classic recipe from the oscillation point.
- Modern: auto-tuners, model-based, or software-in-the-loop tuning.

Every real plant is different (inertia, lag, actuator limits), so there's no universal gain set.

## Practical Gotchas

- **Integral windup** — if the actuator saturates (fully open) while error persists, the integral keeps accumulating huge; when the error finally flips, it takes ages to unwind → massive overshoot. Fix with **clamping / anti-windup** (stop integrating when saturated).
- **Derivative kick** — a sudden setpoint change spikes the derivative; compute D on the PV, not the error, to avoid it.
- **Sampling & delay** — discrete control needs a consistent loop rate; latency destroys stability.
- **Actuator limits** — real outputs clamp; account for it.

## Beyond PID

For hard problems (coupled variables, tight constraints, known dynamics) there's **state-space**, **LQR**, and **Model Predictive Control** (optimize over a predicted future). But PID handles a stunning fraction of real control needs with three numbers and no model — which is why it has endured for a century.
