---
name: container-image-optimization
description: How to build small, fast, secure container images — layer caching and ordering, multi-stage builds, minimal/distroless base images, reducing layers and build context, and not baking in secrets. Use to understand Docker image optimization, multi-stage builds, reducing image size, faster builds, or Dockerfile best practices.
category: engineering
keywords_vi: container image optimization, tối ưu image docker, multi-stage build, layer caching, distroless, base image nhỏ, giảm kích thước image, dockerfile best practice
---

# Container Image Optimization

A well-built container image is **small, builds fast, and is secure**; a badly-built one is bloated, slow to build/pull, and a security liability. The techniques center on how Docker's **layers** work (see how-docker-containers-work) and separating build from runtime.

## Understand Layers & Caching

A Docker image is a stack of **layers**, one per instruction in the Dockerfile. Docker **caches** layers and reuses them if the instruction and its inputs haven't changed. Two consequences drive optimization:
- **Order instructions from least- to most-frequently-changing.** Put stable steps (install dependencies) **before** volatile steps (copy your source code). Then editing your code only invalidates the last layers, and the expensive dependency-install layer stays cached — **fast rebuilds**. The classic pattern: copy the dependency manifest (`package.json`/`requirements.txt`) and install **before** copying the rest of the source.
- **Each layer adds size** — even if a later layer deletes files, earlier layers still contain them (removing a file in a new layer doesn't shrink the image). Clean up **within the same** `RUN` (e.g. `apt-get install ... && rm -rf /var/lib/apt/lists/*`).

## Multi-Stage Builds (the big win)

The biggest size reducer. Use one stage to **build** (with compilers, build tools, dev dependencies — all heavy) and a **final** stage that copies **only the built artifact** into a clean minimal image. The bulky build toolchain never ships to production.
```dockerfile
FROM golang AS build
... compile ...
FROM scratch          # tiny final image
COPY --from=build /app /app
```
Result: a runtime image containing only what's needed to *run*, not to *build* — often 10–100× smaller and with far less attack surface.

## Minimal Base Images

Start from a **small base**: `alpine`, `slim`, or **distroless** (no shell/package manager — just your app and runtime). Smaller base = smaller image, faster pulls, and **fewer packages = smaller attack surface and fewer CVEs** (see security-and-hardening). Only include what you need. (Trade-off: alpine's musl libc occasionally causes compatibility issues; distroless lacks a shell for debugging.)

## Other Wins

- **`.dockerignore`** — exclude `node_modules`, `.git`, build artifacts, secrets from the **build context** (faster builds, smaller images, avoids leaking files).
- **Combine related `RUN`s** to reduce layer count and clean up in the same layer.
- **Pin base image versions** (not `:latest`) for reproducibility.
- **Run as a non-root user** and scan images for vulnerabilities (see owasp-top-10 vulnerable components).

## Pitfalls (in understanding/using)

- **Copying source before installing dependencies** → cache busts on every code change → slow rebuilds. Copy the manifest and install first.
- **Deleting files in a later layer** expecting smaller images — earlier layers keep them; clean up **in the same** RUN or use multi-stage.
- **Shipping the build toolchain** to production (no multi-stage) → huge, insecure images.
- **Baking secrets** into layers (an `ENV`/`COPY` of a key) — they persist in the image history even if "removed" later. Use build secrets/runtime injection (see secrets-management).
- Using a **fat base** (`ubuntu` full) when `slim`/`distroless` would do → bloat and CVEs.
- No **`.dockerignore`** → huge build context, leaked files.
- Running as **root** in the container → unnecessary risk.
- `:latest` base tags → non-reproducible builds.
