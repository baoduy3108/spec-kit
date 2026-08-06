---
name: motion-capture-and-pose-estimation
description: How motion capture and pose estimation work — extracting skeletal/body motion from video or sensors, keypoint detection, 2D vs 3D pose, retargeting motion onto a character, and using captured motion to drive animation. Use to understand pose estimation, motion capture, extracting motion from video, driving avatars, or motion retargeting.
category: engineering
keywords_vi: motion capture pose estimation, bắt chuyển động ước lượng tư thế, trích xuất skeleton từ video, keypoint detection, 2d vs 3d pose, retargeting lên nhân vật, dùng motion điều khiển animation
---

# Motion Capture & Pose Estimation

Motion capture ("mocap") records the movement of a person/object; **pose estimation** infers body pose from images/video (markerless mocap via AI). Together they turn real movement into data that can **drive animation** — animating a character, avatar, or generated image with captured motion (the "pixel-to-motion" pipeline — see image-to-video-and-animation).

## Pose Estimation: Motion From Pixels

Modern pose estimation uses computer vision (see computer-vision-basics, how-convolutional-networks-work) to detect **keypoints** — the positions of joints/landmarks (shoulders, elbows, wrists, hips, face landmarks, hands) — in each video frame. Connecting keypoints gives a **skeleton**. Tracking it across frames yields the **motion** — no special markers or suits needed (**markerless** mocap). This is what lets you extract someone's movement from an ordinary video.
- **2D pose** — keypoints in the image plane (x, y). Simpler; ambiguous about depth.
- **3D pose** — keypoints in 3D space (x, y, z) — needed to drive 3D characters realistically; harder (inferring depth from 2D is ambiguous, aided by multiple cameras or learned priors).

## Traditional Mocap

Marker-based systems (reflective markers + multiple cameras) or inertial suits (IMU sensors) capture motion very accurately for film/games — precise but expensive and studio-bound. AI pose estimation trades some accuracy for working from **any video**, democratizing mocap.

## Retargeting (applying motion to a character)

Captured motion belongs to the **source** body; to animate a **different** character (an avatar, a stylized figure, a generated image) you must **retarget** — map the source skeleton's motion onto the target's rig, accounting for different proportions (a tall actor's motion on a short character). Done poorly, retargeting produces distortions (feet sliding, limbs stretching, self-intersection). It's the bridge between "captured a person moving" and "my character moves like that."

## Driving Animation & Generative Media

The payoff: use extracted motion to **drive** animation or generation:
- **Character/avatar animation** — puppet a 3D character or 2D avatar with a person's movements (real-time avatars, VTubers — see ai-avatar-and-character-animation).
- **Motion transfer in generative video** — apply a reference video's motion to a target image/character (see image-to-video-and-animation) — the essence of "give this still figure that dance."
- **Facial/hand tracking** — drive expressions and gestures (see lip-sync-and-talking-heads).
- **Analysis** — sports, health, gesture recognition.

## Pitfalls (in understanding/using)

- Confusing **2D** and **3D** pose — 2D lacks depth; driving 3D characters convincingly needs 3D pose (or careful inference).
- **Occlusion/ambiguity** — hidden or overlapping limbs confuse estimation; expect noise/jitter (smooth/filter the motion).
- **Retargeting artifacts** — foot sliding, limb stretching, self-intersection when proportions differ; retarget carefully.
- Expecting **marker-based accuracy** from a single ordinary video (markerless is impressive but noisier).
- Jittery raw keypoints → jittery animation; **temporal smoothing** is usually needed.
- Depth ambiguity in monocular (single-camera) 3D pose — poses that look right in 2D but wrong in 3D.
- Privacy/consent when capturing people's motion/likeness from video (handle responsibly).
