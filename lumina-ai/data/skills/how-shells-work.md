---
name: how-shells-work
description: How a Unix shell works — the read-parse-expand-execute loop, fork/exec to run programs, how pipes and redirection wire file descriptors, environment variables, job control, and built-ins vs external commands. Use to understand what really happens when you run a command, pipeline, or script.
category: engineering
keywords_vi: shell hoạt động thế nào, cơ chế bash bên trong, fork exec, pipe redirect file descriptor, biến môi trường, built-in command, hiểu shell sâu
---

# How a Shell Works

A shell is a program whose job is to run other programs. Its core is a loop.

## The Loop

For each command line: **read** input → **parse** into words and operators → **expand** (variables `$x`, globs `*.txt`, command substitution `$(...)`, quotes) → **execute**. Understanding the expansion phase explains most "why did my command do that?" surprises — the shell rewrites the line *before* the program ever sees it (which is why unquoted `$var` with spaces splits into multiple arguments).

## Running a Program: fork + exec

To run an external command the shell:
1. **`fork()`** — clones itself into a child process.
2. In the child, **`exec()`** — replaces the process image with the target program (`/usr/bin/ls`), found by searching `$PATH`.
3. The parent **`wait()`s** for the child to finish and collects its **exit code** (0 = success; non-zero = failure — what `&&`, `||`, and `set -e` test).

**Built-ins** (`cd`, `export`, `alias`) run *inside* the shell process, not via fork/exec — because `cd` must change the shell's own directory (a child couldn't affect the parent). That's why `cd` can't be an external program.

## Pipes & Redirection = File Descriptors

Every process starts with three file descriptors: **0 stdin, 1 stdout, 2 stderr**.
- **Redirection** (`> file`, `2>`, `< file`) points an fd at a file before exec.
- **A pipe** (`a | b`) creates a kernel buffer and wires `a`'s stdout (fd 1) to `b`'s stdin (fd 0); the two run **concurrently**, `b` consuming as `a` produces. This is why pipelines stream and why a long pipeline is many processes at once.

## Environment & Jobs

- **Environment variables** are inherited by children (`export` marks them for inheritance) — the mechanism by which config flows into programs.
- **Job control** — `&` runs in the background, `Ctrl-Z`/`bg`/`fg` and signals (`SIGINT` from Ctrl-C, `SIGTERM`) manage running jobs; the shell tracks them and can forward signals.

Seeing fork/exec + fds explains subshells, why a script's `cd` doesn't affect your terminal, and how `command1 | command2` truly runs.
