---
name: cocos-creator-game-development
description: Cocos Creator game development — the node/component entity model, the component lifecycle (onLoad/start/update), scenes and prefabs, TypeScript scripting with @property, the node tree and transforms, UI/widgets, and cross-platform export to web/iOS/Android/mini-games. Use when building a game in Cocos Creator/Cocos2d, writing TypeScript components, structuring nodes/prefabs, or exporting to mobile/web/WeChat mini-games.
category: game-dev
keywords_vi: cocos, cocos creator, cocos2d, game cocos, node component cocos, prefab cocos, onload start update cocos, property inspector cocos, mini game wechat, typescript game cocos
---

# Cocos Creator Game Development

Cocos Creator is a popular engine (strong in Asia, big for mobile and mini-games) for 2D/3D games. Its model mirrors Unity's: a **Node** is a container in a scene tree, **Components** attached to nodes give behavior, and you script in **TypeScript** (see how-game-engines-work, unity-engine-gameplay-scripting for the very similar node/component idea).

## Nodes, Components & Scenes

- **Node** — an entity in the scene tree with a `Transform` (position/rotation/scale). It does nothing alone.
- **Component** — a capability attached to a node: `Sprite`, `Label`, `RigidBody2D`, `Collider2D`, `Animation`, and your **script components**.
- **Scene** — a tree of nodes, loaded/switched with `director.loadScene('game')`.
- Build behavior by **composing components** on nodes (composition over inheritance), same spirit as Unity/Godot.

## Component Lifecycle (TypeScript)

A script component extends `Component` and hooks callbacks:
```ts
@ccclass('Player')
export class Player extends Component {
  @property speed = 200;                 // shows in the Inspector
  @property(Node) target: Node = null;   // typed reference, drag in editor

  onLoad() {}      // once, when loaded — set up
  start()  {}      // once, before first update
  update(dt: number) {}   // every frame; dt = delta seconds
}
```
- **`onLoad`** → init/cache refs; **`start`** → after all onLoads; **`update(dt)`** → per-frame logic (multiply by `dt` for frame-rate independence); **`onEnable`/`onDisable`/`onDestroy`** for activation/cleanup.
- **`@property`** exposes a field to the **Inspector** so designers tweak values and drag node/asset references — the idiomatic way to wire things.

## Prefabs, Nodes & UI

- **Prefab** — a reusable node template (enemy, bullet, UI item); **`instantiate(prefab)`** spawns copies at runtime, edit once to update all.
- **Node access** — `this.node`, `find('Canvas/Player')`, `getComponent(Sprite)`, `node.addChild(...)`, `node.destroy()`.
- **UI** — a `Canvas` with `Widget` (anchoring/alignment), `Label`, `Button`, `Layout` for responsive HUDs across screen sizes.
- **Physics** — 2D (`RigidBody2D` + `Collider2D`, contact callbacks `onBeginContact`) and 3D modules; enable the physics system you need.

## Cross-Platform Export (the big draw)

- One project **builds to Web, iOS, Android, Windows, and — crucially — mini-games** (WeChat, Douyin, etc.), which is why Cocos is huge for the hyper-casual/mini-game market.
- Mind **bundle size and asset compression** for mini-games (tight size limits); use **asset bundles** to load on demand.
- Optimize like any engine: batch draw calls (atlas your sprites, see sprite-atlas-and-texture-packing), pool objects, avoid per-frame allocations.

Build Cocos Creator games with the **node/component** model — nodes in a scene tree, behavior in **TypeScript components** using the **`onLoad`/`start`/`update`** lifecycle — exposing tunables and references via **`@property`**, reusing **prefabs**, and building UI with `Canvas`/`Widget`. Its standout is **one project exporting to web, mobile, and mini-games**, so mind bundle size and batch/pool for performance.
