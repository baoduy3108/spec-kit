---
name: docker-containers
description: Build and run containers well — small deterministic images (multi-stage builds, slim base, layer-cache ordering, .dockerignore), non-root users, one process per container, correct config/secret handling, healthchecks, and image security. Use when writing a Dockerfile, docker-compose, or debugging container builds/runtime.
category: engineering
keywords_vi: docker, dockerfile, container, đóng gói docker, multi-stage build, image nặng, docker compose, tối ưu image docker
---

# Docker & Containers

A container should be small, reproducible, and run one thing as a non-root user.

## Dockerfile Essentials

- **Order layers by change frequency** — copy dependency manifests and install deps *before* copying source, so the dependency layer stays cached when only code changes:
  ```dockerfile
  COPY package.json package-lock.json ./
  RUN npm ci
  COPY . .
  ```
- **Multi-stage builds** — compile/build in a fat stage, copy only the artifact into a slim runtime stage. Keeps toolchains out of the final image.
- **Slim base images** — `-slim`/`alpine`/distroless cut size and attack surface (watch alpine's musl libc for some native deps).
- **`.dockerignore`** — exclude `.git`, `node_modules`, secrets, build output; smaller context = faster builds and no accidental secret leaks.
- **Pin versions** — base image tag and dependencies; `latest` breaks reproducibility.
- **Combine related `RUN`s** and clean caches in the same layer (`apt-get update && apt-get install … && rm -rf /var/lib/apt/lists/*`) — a separate cleanup layer doesn't shrink the image.

## Runtime

- **Non-root** — create and `USER` a non-root account; a container escape as root is far worse.
- **One process per container** — a container is a process, not a VM. Use compose/orchestrator for multiple services.
- **Config via environment, secrets via secret mounts** — never bake secrets into the image (they persist in layers). `ENV SECRET=…` leaks in `docker history`.
- **`EXPOSE` + explicit port mapping**; bind to `0.0.0.0` inside the container.
- **Handle signals** — ensure the app receives `SIGTERM` for graceful shutdown (use exec-form `CMD ["app"]`, or `tini`/`--init` so PID 1 reaps children).
- **Healthcheck** — add `HEALTHCHECK` so orchestrators know when the container is actually ready.

## Debugging & Security

- Build failing at a step? It's usually a caching or missing-file issue — check `.dockerignore` and layer order.
- Image huge? Check for dev dependencies, missing multi-stage, or uncleaned caches; inspect with `docker history`.
- Scan images (`docker scout`, `trivy`) for CVEs; rebuild on base-image updates; run read-only filesystem + dropped capabilities where possible.
