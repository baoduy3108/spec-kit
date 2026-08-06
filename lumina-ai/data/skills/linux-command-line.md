---
name: linux-command-line
description: Work effectively in the Linux/Unix shell — navigation, file ops, pipes and redirection, text processing (grep/sed/awk/sort/uniq), finding files and processes, permissions, and safe scripting habits. Use when writing shell commands or a bash script, or debugging why a command doesn't do what's expected.
category: engineering
keywords_vi: linux command line, dòng lệnh linux, bash, terminal linux, lệnh shell, grep sed awk, script bash, xử lý text terminal
---

# Linux Command Line

The shell composes small tools with pipes. Master a handful and most tasks become one line.

## Pipes & Redirection

- `|` sends stdout of one command to stdin of the next — the core composition mechanism.
- `>` overwrite file, `>>` append, `<` read from file, `2>` stderr, `2>&1` merge stderr into stdout, `command &> file` both.
- `xargs` turns stdin into arguments (`find … | xargs rm`); use `-0` with `find -print0` for filenames with spaces.

## Text Processing (the workhorses)

- **grep** — search lines: `grep -r "pattern" .`, `-i` ignore case, `-n` line numbers, `-v` invert, `-E` extended regex, `-l` filenames only.
- **sed** — stream edit: `sed 's/old/new/g'` substitute, `-i` in place (make a backup first).
- **awk** — column/field processing: `awk '{print $2}'`, `awk -F, '$3>100'` filter by a field.
- **sort | uniq -c | sort -rn** — the classic "count and rank occurrences" pipeline.
- **cut / tr / head / tail / wc** — slice columns, translate chars, take ends, count.

## Finding Things

- **find** — `find . -name "*.log" -mtime +7 -delete` (files by name/age/size); `-type f/d`.
- **Processes** — `ps aux | grep name`, `top`/`htop`, `kill -TERM pid` (graceful) then `-KILL` (force), `lsof -i :8080` (what's on a port).
- **Disk** — `df -h` (free space), `du -sh *` (what's big here).

## Permissions

`rwx` for user/group/other. `chmod 644` (files: rw-r--r--), `chmod 755` (dirs/executables: rwxr-xr-x), `chmod +x script.sh`. `chown user:group file`. Prefer least privilege; avoid `chmod 777`.

## Safe Scripting Habits

- Start scripts with `set -euo pipefail` — exit on error, on unset variable, and on any failure in a pipeline. This turns silent failures into loud ones.
- **Quote every variable**: `"$var"`, `"$@"` — unquoted variables word-split and glob-expand, the #1 shell bug (and a security hole).
- Prefer `"$(cmd)"` over backticks; use `[[ … ]]` over `[ … ]` in bash.
- Test destructive commands with `echo` first; never `rm -rf "$VAR/"` when `$VAR` could be empty.
