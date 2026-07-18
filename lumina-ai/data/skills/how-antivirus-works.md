---
name: how-antivirus-works
description: How antivirus / endpoint protection works — signature (hash/pattern) detection, heuristic and behavioral analysis, sandboxing, real-time on-access scanning, and why detection is an arms race against polymorphic/zero-day malware. Use to understand antivirus, malware detection, EDR, or why AV isn't a complete defense.
category: engineering
keywords_vi: antivirus hoạt động thế nào, phần mềm diệt virus, phát hiện malware, signature chữ ký, heuristic behavioral phân tích hành vi, sandbox, zero-day polymorphic
---

# How Antivirus Works

Antivirus (AV) — and its modern form, EDR (Endpoint Detection and Response) — tries to detect and block malicious software. It's fundamentally a **detection** problem in an adversarial setting: attackers constantly change malware to evade it, so AV layers several techniques rather than relying on one.

## Signature-Based Detection

The classic method: maintain a database of **signatures** — hashes or byte-pattern fingerprints of known malware. Scan files and match against the database; a hit means "known bad."
- **Fast and precise** for known threats, near-zero false positives.
- **Blind to new/unknown malware** — it can only catch what's already in the database. Attackers defeat it trivially by changing a few bytes (**polymorphic**/metamorphic malware mutates each copy, and **packers** encrypt the payload) so the hash/pattern differs. Hence signatures alone are insufficient.

## Heuristic & Static Analysis

Instead of exact matches, look for **suspicious characteristics** in a file without running it: unusual API imports (keylogging, disabling security), code that looks like a packer/obfuscator, self-modifying code, structural anomalies. Catches **variants** of known families and some novel threats — at the cost of **false positives** (legit software can look weird).

## Behavioral / Dynamic Analysis

Watch what a program **does** at runtime rather than what it looks like: does it encrypt many files rapidly (ransomware), inject into other processes, modify boot records, contact known-bad domains, escalate privileges? Behavior is **harder to disguise** than code — malware ultimately must *act* maliciously. This is the core of modern EDR, which continuously monitors process/file/network activity and can correlate a chain of events into a detection, then alert/roll back.

## Sandboxing

Run a suspicious file in an **isolated sandbox** (a disposable VM/container) and observe its behavior safely before letting it touch the real system. Detonating it reveals intent. Sophisticated malware tries to **detect the sandbox** (checking for VM artifacts, delaying activation, requiring user interaction) to stay dormant during analysis — part of the arms race.

## The Arms Race

Detection is never "solved":
- Attackers use **zero-days** (no signature exists yet), **polymorphism** (evade signatures), **living-off-the-land** (abuse legitimate tools like PowerShell, so nothing looks like "malware"), and **sandbox evasion**.
- Defenders add cloud reputation, ML classifiers, telemetry correlation, and rapid signature updates.
There's an inherent trade-off: aggressive detection catches more but causes more **false positives** (blocking legit software); conservative detection has fewer false alarms but misses more.

## Why AV Isn't Enough Alone

AV is one layer of **defense in depth**, not a silver bullet. It complements, doesn't replace: patching (remove the vulnerabilities), least privilege, network segmentation, backups (ransomware recovery), user training, and application allowlisting. A confident "I have antivirus" is not a security strategy (see security-and-hardening, threat-modeling).

## Pitfalls (in understanding/using)

- Believing AV catches everything — **zero-days and novel malware slip past** signature detection.
- Relying on AV **instead of** patching, least privilege, and backups (it's one layer).
- Ignoring **behavioral** alerts (EDR's strength) in favor of only file scans.
- Disabling real-time/on-access scanning for performance (removes the main protection).
- Trusting a "clean scan" as proof of safety — absence of detection ≠ absence of malware.
