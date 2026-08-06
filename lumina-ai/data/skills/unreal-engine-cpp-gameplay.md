---
name: unreal-engine-cpp-gameplay
description: Unreal Engine C++ gameplay programming — the Actor/Component model, the Gameplay Framework (GameMode, Pawn, Controller, PlayerState), Blueprint vs C++ and exposing to Blueprint with UPROPERTY/UFUNCTION, the UObject reflection/GC system, Tick, and spawning. Use when building a game in Unreal, writing C++ gameplay code, structuring actors/components, or bridging C++ and Blueprints.
category: game-dev
keywords_vi: unreal, unreal engine, unreal c++, actor component unreal, gamemode pawn controller, uproperty ufunction, blueprint unreal, gameplay framework unreal, game unreal, uobject garbage collection
---

# Unreal Engine C++ Gameplay Programming

Unreal is the AAA-grade engine (3D-first, C++ + Blueprints) behind many big titles. Gameplay is built on **Actors and Components**, organized by the **Gameplay Framework**, with a reflection system (UObject) that powers Blueprint integration and garbage collection (see how-game-engines-work, and unity-engine-gameplay-scripting for the similar actor/component idea).

## Actors & Components

- **`AActor`** — anything placeable in a level (a character, a door, a light). Actors have a `Tick()` and are spawned/destroyed at runtime.
- **`UActorComponent` / `USceneComponent`** — reusable behavior/data attached to actors. `UStaticMeshComponent` renders, `UCameraComponent` sees, `UCharacterMovementComponent` moves. Compose actors from components.
- **Spawning** — `GetWorld()->SpawnActor<AMyActor>(location, rotation)`; destroy with `Destroy()`.

## The Gameplay Framework (know these roles)

Unreal gives you a standard structure — use it instead of inventing your own:
- **`AGameModeBase`** — the rules of the match (only on the server): what pawn to spawn, win conditions, scoring.
- **`APawn` / `ACharacter`** — the physical body a player/AI possesses. `ACharacter` adds a capsule + movement component for humanoids.
- **`AController` (`APlayerController` / `AAIController`)** — the "brain" that possesses a pawn. Input and decisions live here; the pawn is the body.
- **`APlayerState` / `AGameState`** — replicated player/match data (score, name) for multiplayer (see game-networking-and-netcode).

## C++ ↔ Blueprint (the reflection system)

- Classes use macros: `UCLASS()`, `UPROPERTY()`, `UFUNCTION()`, `GENERATED_BODY()`. These feed Unreal's **reflection** system.
- **`UPROPERTY(EditAnywhere, BlueprintReadWrite)`** exposes a variable to the editor **and** Blueprints — designers tune it without C++.
- **`UFUNCTION(BlueprintCallable)`** lets Blueprints call your C++ function. This C++/Blueprint split is Unreal's superpower: performance-critical or core systems in C++, rapid iteration/wiring in Blueprints.
- **Garbage collection** — `UObject`s are GC-managed; keep them alive with `UPROPERTY()` pointers (a raw pointer not marked UPROPERTY can be collected out from under you). Use `TObjectPtr`/`TWeakObjectPtr` appropriately.

## Ticks, Timers & Delegates

- **`Tick(DeltaTime)`** — per-frame; multiply by `DeltaTime`. Disable tick on actors that don't need it (perf).
- **Timers** (`GetWorldTimerManager().SetTimer`) for delayed/repeating logic instead of counting in Tick.
- **Delegates / events** (`DECLARE_DYNAMIC_MULTICAST_DELEGATE`) decouple systems, and are Blueprint-assignable.

## Practical Notes

- **Blueprints for wiring, C++ for systems** — most teams do both; don't force everything into C++.
- **Replication** — `UPROPERTY(Replicated)` + `GetLifetimeReplicatedProps` and server RPCs for multiplayer; the framework is built for authoritative servers (see server-authoritative-multiplayer).
- Pitfalls: unmarked UObject pointers getting GC'd, heavy per-Tick work, and doing gameplay rules on the client instead of the GameMode/server.

Program Unreal gameplay with **Actors composed of Components**, organized by the **Gameplay Framework** (GameMode rules, Pawn body, Controller brain, PlayerState data), and bridge **C++ and Blueprints** via `UPROPERTY`/`UFUNCTION` reflection — core systems in C++, wiring in Blueprints. Respect **UObject garbage collection** (keep refs in `UPROPERTY`), use `Tick`/timers/delegates deliberately, and lean on the built-in replication for authoritative multiplayer.
