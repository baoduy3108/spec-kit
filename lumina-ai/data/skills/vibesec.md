---
name: vibesec
description: Secure coding guide approaching code from a bug hunter's perspective — IDOR, XSS, CSRF, SQL injection, SSRF, XXE, path traversal, file upload, JWT security, password storage, mass assignment, GraphQL hardening. Use when writing or reviewing code that handles user input, auth, or external requests.
category: engineering
keywords_vi: idor, xss, csrf, sql injection, ssrf, bug hunter, lỗ hổng bảo mật code, secure coding
---

# VibeSec — Secure Coding Guide

Approach code from a **bug hunter's perspective** to strengthen applications against common vulnerabilities.

## Access Control & Authorization

- Preventing IDOR (Insecure Direct Object Reference) attacks
- Ensuring users access only their own data
- Validating ownership at the data layer, not just routing
- Using UUIDs instead of sequential IDs to prevent enumeration

## Client-Side Security

- XSS prevention through output encoding and Content Security Policy
- CSRF protection via tokens and SameSite cookies
- Protecting against open redirects with allowlisting
- Preventing secret/sensitive data exposure in client code

## Server-Side Security

- SQL injection prevention through parameterized queries
- SSRF (Server-Side Request Forgery) mitigation
- XXE (XML External Entity) protection
- Path traversal prevention via canonicalization
- Secure file upload validation (magic bytes, size limits)

## Authentication & Tokens

- JWT security configuration (algorithm whitelisting, expiration)
- Secure password storage (Argon2id, bcrypt, scrypt)
- Proper cookie flags (HttpOnly, Secure, SameSite)

## API Security

- Mass assignment prevention through field whitelisting
- GraphQL hardening (introspection, depth/complexity limits)

## Principles

Apply defense-in-depth, recommend fail-secure approaches, and follow the principle of least privilege throughout all recommendations.
