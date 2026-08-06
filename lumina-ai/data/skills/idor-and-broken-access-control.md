---
name: idor-and-broken-access-control
description: The #1 web vulnerability class — broken access control — and its most common form, IDOR (Insecure Direct Object Reference), where changing an id in a request accesses someone else's data. Covers server-side authorization on every request, why hiding ids/UUIDs isn't security, function- vs object-level checks, deny-by-default, and mass-assignment. Use to enforce that every request checks "is THIS user allowed THIS resource?"
category: security
keywords_vi: kiểm soát truy cập bị hỏng broken access control lỗ hổng web số một, idor tham chiếu trực tiếp đối tượng đổi id trong request để xem dữ liệu người khác, phân quyền phía máy chủ trên mọi request, giấu id hay dùng uuid không phải bảo mật, kiểm tra cấp chức năng và cấp đối tượng, từ chối mặc định deny by default, gán hàng loạt mass assignment
---

# IDOR & Broken Access Control

**Broken Access Control** is the **most common** serious web vulnerability (OWASP #1): the app **authenticates** you (knows who you are) but fails to properly **authorize** you (check what you're allowed to touch). Its signature form is **IDOR — Insecure Direct Object Reference**: a request references an object by id (`GET /api/orders/1043`, `GET /invoices/5567.pdf`), and the server returns it **without checking whether *this* user owns it**. Change the number to `1044` and you're reading a stranger's order. The vulnerability is an *absence* — a missing check — which is why it's so widespread and so easy to ship (see authentication-and-authorization, sql-injection-and-parameterized-queries, ssrf-and-url-fetch-safety).

## The Core Failure

Authentication ≠ authorization. Logging a user in is not enough; **every request that touches a resource must verify the current user is permitted that specific resource/action**. IDOR happens when code does `getOrder(id)` but not `getOrder(id) where owner == currentUser` (or an explicit permission check). The client fully controls the id, so it's trivially exploitable — often just by editing a URL.

## Why "Hiding" Ids Isn't Security

Switching sequential ids to **UUIDs** or obscuring them makes IDOR **harder to discover**, but it is **not** access control — it's security by obscurity. UUIDs leak (in URLs, emails, referrers, shared links, other API responses), can sometimes be enumerated, and a leaked UUID with no authorization check is still full access. **Always enforce the authorization check server-side**, regardless of how "unguessable" the id is. Unguessable ids are a mild defense-in-depth, never the control.

## The Two Levels of Access Control

- **Object-level (horizontal)** — "can this user access *this specific* object?" (order 1043 belongs to them). IDOR is a failure here. Check ownership/permission for **the actual resource**, using the authenticated user from the session/token — **never** an id/role the client sends.
- **Function-level (vertical)** — "can this user perform *this action* at all?" (a regular user hitting `/admin/deleteUser`). Failure = privilege escalation. Enforce role/permission on **every** privileged endpoint, not just by hiding admin buttons in the UI.

## Related: Mass Assignment

A cousin: binding request data straight to a model lets an attacker set fields they shouldn't (`{"role":"admin","balance":99999}` in a profile-update). Defend by **allowlisting** which fields a request may modify (DTOs / explicit field maps), never blindly `Model.update(request.body)`.

## Design Guidance (for understanding/using)

- **Authorize every request against the authenticated identity** — derive the user from the session/token, then check they may access **the specific object/action**.
- **Deny by default** — no explicit permission = rejected; don't rely on the UI hiding options.
- **Check object-level ownership** on every read/write of a user-scoped resource (the classic IDOR fix: scope queries to the current user).
- **Enforce function-level roles server-side** on privileged endpoints — hiding buttons isn't authorization.
- **Allowlist assignable fields** to prevent mass assignment; treat unguessable ids as *bonus*, not the control.
- **Test with two accounts** — try to access A's resources as B; automate horizontal/vertical access tests.

## Pitfalls (in understanding/using)

- Authenticating but not **authorizing per resource** → IDOR: change the id, read others' data.
- Relying on **UUIDs/obscured ids** as protection → obscurity, not access control; leaked id = access.
- Trusting a **client-supplied** user id/role for the check → the attacker just sends someone else's.
- Enforcing access only in the **UI** (hidden admin links) → the API is called directly.
- Blind **mass assignment** (`update(body)`) → privilege/field escalation; allowlist fields.
