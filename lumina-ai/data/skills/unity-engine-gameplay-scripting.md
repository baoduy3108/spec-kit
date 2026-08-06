---
name: unity-engine-gameplay-scripting
description: Unity engine gameplay scripting — GameObjects and components, MonoBehaviour lifecycle (Awake/Start/Update/FixedUpdate), prefabs, the inspector and serialized fields, coroutines, physics (Rigidbody), and scene management. Use when building a game in Unity, writing MonoBehaviour scripts, structuring GameObjects/prefabs, or using Unity physics/coroutines.
category: game-dev
keywords_vi: unity engine, viết game unity, game unity, monobehaviour, fixedupdate vật lý, prefab unity, serializefield inspector, coroutine unity, rigidbody unity, gameobject component unity, object pooling game
---

# Unity Engine Gameplay Scripting

Unity is the most widely used commercial engine (2D/3D, mobile/PC/console). Its model: a **GameObject** is a container; **Components** attached to it give it data and behavior; your gameplay logic lives in **MonoBehaviour** scripts (C#). This is composition, not deep inheritance (see how-game-engines-work, dotnet-csharp-patterns for the C# language itself).

## GameObjects & Components

- **GameObject** — an empty container with a `Transform` (position/rotation/scale). It *does* nothing until you add components.
- **Component** — a capability: `Rigidbody` (physics), `Collider`, `SpriteRenderer`/`MeshRenderer`, `Animator`, `AudioSource`, and **your MonoBehaviour scripts**.
- A "Player" GameObject = `Transform + Rigidbody2D + Collider2D + SpriteRenderer + PlayerController(script)`. Compose behavior by adding components.

## MonoBehaviour Lifecycle (know the order)

Unity calls these on your script automatically:
- **`Awake()`** — once, on load, before anything else. Cache references, set up self (don't depend on other objects yet).
- **`OnEnable()`** — each time the object becomes active.
- **`Start()`** — once, before the first frame, after all `Awake`s. Safe to reference other objects.
- **`Update()`** — every frame. Input, non-physics logic, timers. Multiply by **`Time.deltaTime`** for frame-rate independence.
- **`FixedUpdate()`** — fixed timestep. **Do physics here** (forces, `Rigidbody.velocity`), not in Update (see game-loop-and-fixed-timestep).
- **`LateUpdate()`** — after all Updates. Camera follow, anything that must react to this frame's movement.
- **`OnCollisionEnter`/`OnTriggerEnter`** — physics callbacks.

Mixing physics into `Update` or reading input in `FixedUpdate` are classic bugs.

## Prefabs & the Inspector

- **Prefab** — a saved, reusable GameObject template (enemy, bullet, UI panel). **Instantiate** copies at runtime (`Instantiate(prefab, pos, rot)`); edit the prefab once to update all instances. The core reuse unit.
- **`[SerializeField] private float speed = 5f;`** — exposes a private field to the **Inspector** so designers tune values without code changes (prefer this over `public`). `[SerializeField]` keeps encapsulation while staying editable.
- **ScriptableObjects** — data assets (item stats, config, event channels) shared across objects; the data-driven, memory-efficient way to hold shared data.

## Coroutines, Physics & Scenes

- **Coroutines** — run logic across frames without blocking: `StartCoroutine(SpawnWave())` with `yield return new WaitForSeconds(1f)`. Great for timed sequences, tweens, spawning. (Not threads — they resume on the main thread.)
- **Physics** — move dynamic bodies via `Rigidbody`/`Rigidbody2D` (forces/velocity in `FixedUpdate`); moving a `Transform` directly bypasses physics and breaks collisions.
- **Scene management** — `SceneManager.LoadScene`; keep cross-scene state on a **`DontDestroyOnLoad`** manager or in ScriptableObjects.
- **Object pooling** — reuse bullets/enemies instead of Instantiate/Destroy churn (GC spikes) — essential for bullet-heavy games (see vampire-survivors-and-bullet-heaven).

## Pitfalls

- `GetComponent` in `Update` (cache it in `Awake` instead), moving Transforms of physics bodies, forgetting `Time.deltaTime`, and Instantiate/Destroy garbage causing frame hitches.

Script Unity gameplay by composing **GameObjects from components**, putting logic in **MonoBehaviour** scripts with the right lifecycle method (**`Update` for input, `FixedUpdate` for physics**), reusing **prefabs**, exposing tunables with **`[SerializeField]`**, and using **coroutines** for timed sequences plus **object pooling** for spawn-heavy games. Cache references in `Awake`, respect `Time.deltaTime`, and keep shared data in ScriptableObjects.
