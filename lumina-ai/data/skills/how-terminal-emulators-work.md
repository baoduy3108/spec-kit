---
name: how-terminal-emulators-work
description: How terminal emulators work — emulating a hardware terminal in software, the pseudo-terminal (PTY), escape/ANSI sequences for colors and cursor control, the shell vs terminal distinction, and the input/output flow. Use to understand terminal emulators, PTYs, ANSI escape codes, how the terminal talks to the shell, or building a terminal.
category: engineering
keywords_vi: how terminal emulators work, terminal emulator hoạt động thế nào, giả lập terminal phần cứng, pseudo-terminal pty, escape ansi sequence màu con trỏ, shell vs terminal, luồng input output
---

# How Terminal Emulators Work

A terminal emulator is the app (iTerm, Windows Terminal, GNOME Terminal) that gives you a text console. It **emulates a physical hardware terminal** from the mainframe era in software — and the quirks of terminals (escape codes, PTYs) all descend from that history. Understanding it clarifies the shell-vs-terminal distinction and how text UIs, colors, and cursor movement work.

## Terminal vs Shell (a key confusion)

These are **different things**:
- **Terminal (emulator)** — the **program that displays text and handles keyboard input**. It draws characters, colors, and the cursor, and sends your keystrokes onward. It knows nothing about commands.
- **Shell** (bash, zsh — see how-shells-work) — the **program that interprets commands**, running *inside* the terminal. It reads input, runs programs, produces output.
The terminal is the **display/IO device**; the shell is the **command interpreter** running on it. The terminal could run any program, not just a shell.

## The Pseudo-Terminal (PTY)

The bridge between them is the **pseudo-terminal (PTY)** — a software device pretending to be a hardware terminal. It has two ends:
- The **master** side — held by the terminal emulator.
- The **slave** side — connected to the shell (or program), which sees it as its standard input/output/error (a "terminal").
The terminal emulator writes your keystrokes into the PTY (the shell reads them as input); the shell/program writes output into the PTY (the terminal reads it and displays it). The PTY makes programs think they're talking to a real terminal, enabling job control, terminal signals (Ctrl+C → SIGINT), and line editing. This PTY abstraction is why remote shells (SSH — see how-ssh-works), `tmux`, and terminal apps all work.

## Escape / ANSI Sequences (the magic control codes)

Terminals are fundamentally a **stream of characters** — so how do you set colors, move the cursor, or clear the screen? **Escape sequences**: special character sequences (starting with the ESC character, e.g. `\x1b[31m`) embedded in the output stream that the terminal interprets as **commands** rather than text to display:
- **Colors/styles** — `\x1b[31m` = red text, `\x1b[1m` = bold.
- **Cursor movement** — move to a position, up/down, save/restore.
- **Screen control** — clear screen, scroll regions.
This **ANSI escape code** system (a legacy standard) is how command-line tools produce colored output, progress bars, and full-screen text UIs (vim, htop). The terminal parses these codes out of the character stream and acts on them; a program that doesn't understand them shows them as garbage (`^[[31m`).

## The Full Flow

1. You press a key → the terminal sends it into the PTY.
2. The shell/program reads it, processes it, and writes output (text + escape sequences) to the PTY.
3. The terminal reads that output, **interprets escape sequences** (colors, cursor), and **renders** the characters on screen.
Round and round, in real time.

## Pitfalls (in understanding/using)

- **Confusing the terminal (display/IO) with the shell (command interpreter)** — they're separate programs.
- Escape sequences showing as **garbage** (`^[[0m`) — output sent somewhere that doesn't interpret them (a file, a non-terminal), or a program assuming a terminal when there isn't one (check `isatty`).
- Assuming all terminals support the **same** escape codes — capabilities vary (hence `terminfo`/`TERM`); test or use a library.
- Programs behaving differently when output is **piped** vs a terminal (many disable colors when not a TTY — by design).
- Corrupting the terminal state (a program crashing mid-escape-sequence) → messed-up display (`reset` fixes it).
- Ignoring the **PTY** layer when building terminal tools (job control, signals, resizing all flow through it).
