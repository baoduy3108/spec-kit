---
name: robotics-kinematics-and-control
description: Robotics fundamentals — coordinate frames and transforms, forward/inverse kinematics of arms, degrees of freedom, the sense-plan-act loop, actuators and encoders, motion planning and obstacle avoidance, and localization basics. Use when working on robot arms, mobile robots, motion planning, or asking how robots move and are controlled.
category: engineering
keywords_vi: robot học động học và điều khiển, hệ trục tọa độ và phép biến đổi frame transform, động học thuận ngược cánh tay robot, bậc tự do degrees of freedom, vòng cảm nhận lập kế hoạch hành động sense plan act, cơ cấu chấp hành encoder, lập kế hoạch chuyển động tránh vật cản, định vị localization
---

# Robotics: Kinematics & Control

Robotics is the engineering of machines that sense, decide, and physically act in the world. Under the hardware, it's a stack of geometry (where are things?), control (how to move precisely — see control-systems-and-pid), and planning (what motion to make). The recurring loop is **sense → plan → act**, repeated fast.

## Coordinate Frames & Transforms

Everything in robotics lives in a **frame** — the robot base, each joint, the gripper, the camera, the world. A **transform** (rotation + translation, often a 4×4 homogeneous matrix) converts a point from one frame to another. Chaining transforms down a robot's links tells you where its hand is in world space. Getting frames right — and their tree of relationships — is half of robotics; most "the robot reached the wrong place" bugs are frame errors.

## Kinematics

- **Degrees of freedom (DOF)** — the number of independent joints. A human arm has ~7; a typical industrial arm has 6 (enough to reach any position *and* orientation in its workspace).
- **Forward kinematics** — given joint angles, compute where the end effector is (chain the link transforms). Always has one answer.
- **Inverse kinematics** — given a desired hand pose, find joint angles to achieve it (see inverse-kinematics-for-animation). May have many solutions, or none (out of reach), plus **singularities** where control degrades. This is the harder, essential direction for "go to this pose".

## Actuation & Sensing

- **Actuators** — motors (servo, stepper, BLDC), hydraulics, pneumatics move joints. Each has torque/speed limits and dynamics.
- **Encoders** — measure actual joint position/velocity for closed-loop control; without feedback you're guessing.
- **Sensors** — cameras, LIDAR, IMUs, force/torque, proximity — build the robot's picture of itself and the world. Real sensors are noisy; **sensor fusion** (e.g. Kalman filters) combines them into a better estimate.

## Control

Low level, each joint runs a controller (often **PID**) tracking a target angle/velocity/torque. Above that, **trajectory generation** produces smooth, feasible paths (respecting velocity/acceleration/jerk limits) so motion is precise and doesn't slam. Compliance/force control lets a robot push with a set force (assembly, contact tasks) rather than blindly position.

## Motion Planning

Getting from A to B without collisions, respecting joint limits:
- **Configuration space** — think in joint-angle space, where the robot is a point and obstacles are forbidden regions.
- **Sampling planners** — RRT / PRM randomly sample and connect feasible configurations to find a path in high-DOF spaces.
- **Optimization planners** — smooth/shorten paths under constraints.
- **Reactive avoidance** — local methods dodge dynamic obstacles in real time.

## Mobile Robots & Localization

For robots that drive/fly, add:
- **Localization** — "where am I?" from odometry + sensors; **SLAM** builds a map *and* localizes simultaneously.
- **Path planning** — global route (A*, Dijkstra on a map) plus local obstacle avoidance.
- **Kinematic models** — differential drive, Ackermann steering, etc., constrain how the base can move.

## The Reality

The hard part of robotics isn't the ideal math — it's **uncertainty**: sensors lie, motors aren't exact, the world shifts, and contact is messy. Robust systems estimate state probabilistically, close loops tightly, plan with margins, and fail safe. Simulation helps, but the gap between sim and reality ("sim-to-real") is where robotics earns its difficulty.
