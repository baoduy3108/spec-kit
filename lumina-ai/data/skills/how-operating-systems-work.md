---
name: how-operating-systems-work
description: How an operating system works — processes and threads, the scheduler and context switching, virtual memory and paging, the kernel/user-mode split and system calls, and how the OS mediates all access to hardware. Use to understand what "a process", "the scheduler", "virtual memory", "a syscall", and "kernel vs user space" actually mean.
category: engineering
keywords_vi: hệ điều hành hoạt động thế nào, cơ chế os, process thread scheduler, virtual memory paging, system call syscall, kernel user mode, hiểu operating system
---

# How Operating Systems Work

The OS is the layer that shares finite hardware (CPU, memory, devices) safely among many programs, giving each the illusion it has the machine to itself.

## Processes & Threads

A **process** is a running program with its own isolated memory space and resources. A **thread** is a unit of execution within a process; threads of one process share its memory (fast communication, but need synchronization — see concurrency). Isolation between processes is enforced by the hardware + OS so one crashing/malicious program can't corrupt another.

## The Scheduler & Context Switching

There are always more runnable threads than CPU cores, so the **scheduler** rapidly time-slices the CPU among them, creating the illusion of simultaneity. A **context switch** saves one thread's registers/state and loads another's — cheap but not free, which is why spawning thousands of threads has overhead and why async I/O (fewer threads) can scale better. Scheduling policies balance fairness, throughput, and latency (interactive tasks get boosted).

## Virtual Memory

Each process sees a private, contiguous **virtual address space**; the OS + MMU (hardware) map virtual pages to physical RAM **pages** on demand. Benefits: isolation (a process can't address another's memory), the ability to use more memory than physically exists (**paging** to disk — thrashing when overcommitted), and lazy/shared loading. A **page fault** occurs when a needed page isn't in RAM; the OS fetches it. This is why "out of memory" and swap-thrashing behave as they do.

## Kernel vs User Mode & System Calls

The CPU runs in two privilege levels. **User mode** (your app) can't touch hardware directly. **Kernel mode** (the OS core) can. To do anything privileged — read a file, open a socket, allocate memory, create a process — a program makes a **system call**, a controlled trap into the kernel. This boundary is the security model: all hardware access is mediated and checked. System calls are relatively expensive (mode switch), which is why high-performance code batches them (buffered I/O) rather than calling per byte.

## Why It Matters

Processes/threads explain concurrency and isolation; the scheduler explains why timing is nondeterministic; virtual memory explains isolation, OOM, and swap; syscalls explain the cost of I/O and the user/kernel security boundary. Containers reuse exactly these primitives (namespaces isolate what a process sees; cgroups limit its scheduling/memory).
