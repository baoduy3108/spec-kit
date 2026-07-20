---
name: ui-context-and-scope
description: UI should make it immediately clear where the user is, what context they are operating in, and what their actions will affect. Use lines, regions, colour areas, breadcrumbs, and scope labels to communicate hierarchy and context — especially in deep navigation, multi-section layouts, impersonation/"act on behalf" modes, login/trust screens, and internal tools that must be distinct from the customer app.
category: design
keywords_vi: breadcrumb điều hướng, người dùng đang ở đâu, phạm vi thay đổi ảnh hưởng, banner mạo danh view as, act on behalf, màn đăng nhập tin cậy, phân biệt tool nội bộ, điều hướng nhiều tầng
---

# UI Context and Scope

Users need to know three things at all times:
1. **Where am I?** — current location in the product hierarchy
2. **What context am I in?** — which section, record, or workspace is active
3. **What will my actions affect?** — scope of changes before committing them

When these are unclear, users make mistakes, feel lost, and lose trust in the product.

## Communicating Hierarchy with Visual Structure

### Lines and Dividers
Horizontal rules and borders signal the boundary between sections. A line between a header and content says "the content below belongs to this header"; a sidebar border says "this is a different region with a different purpose." Avoid overuse — proximity and whitespace should do most of the work.

### Colour Regions and Background Fills
Background colour is one of the strongest signals for "you are now in a different area." Use a distinct background shade for sidebars, panels, or contextual drawers. When a user's changes are scoped to a specific section, that section should be visually bounded — border, fill, or both — so the scope is self-evident before the user commits.

### Section Labels and Context Headers
Every major region should answer "what am I?" without the user reading surrounding content. Show the active entity: "Editing: Invoice #2041" or "Settings for: Workspace" — not just "Settings." Name sections with the user's vocabulary, not the system's.

## Navigating Depth

### Breadcrumbs
Use breadcrumbs when the product has three or more levels of hierarchy, or when users can arrive from multiple paths.

```
Home > Projects > Website Redesign > Tasks > #142 Fix header
```

- Each breadcrumb item is a clickable link back to that level; the current page is the last item (plain text, not a link).
- On mobile, collapse to show only the immediate parent: `← Website Redesign`.
- Breadcrumbs complement primary navigation; they do not replace it.

### Search and Filter as Navigation
In products with large or dynamic content trees, global search finds any entity, and contextual filters narrow within the current scope. Results should show enough context to distinguish similar items.

## Scope Communication Before Action

When a change or action affects a specific scope, communicate it **before** the user commits — not after.

- **Labels:** "This setting applies to: this workspace only" / "All users will see this change."
- **Visual bounding:** highlight or outline the affected region when the user is about to edit it.
- **Confirmation copy:** destructive or wide-scope actions state the scope in the dialog ("Delete this project and all 47 tasks inside it?").

## Acting on Behalf of Someone Else

Whenever the user is viewing or changing data **as another user, customer, or account** — impersonation, admin "view as", support acting on a customer's behalf — the interface must make that unmistakably obvious the entire time:

- **Persistent, unmissable indicator** — a coloured banner that stays on screen the whole session ("You are acting as **Acme Corp** — changes affect their account"), not a toast that disappears.
- **Name whose view this is**, visually distinct from the operator's own context so the two can never be confused.
- **An always-visible exit** — "Return to your account / Stop acting as…".

The risk being designed against is an operator making a change believing they're in their own context when they're really in a customer's.

## Authentication Is a Trust Context

The login / sign-up screen is where the user hands over a password — the point where they most need to feel they're in the right, safe place:

- **It must feel unmistakably like the brand.** A generic or off-brand login page reads as suspicious ("is this a phishing page?"). Carry the full brand identity into auth screens.
- **The URL must live in the customer's own ecosystem** — `app.customer.com`, `customer.com/login` — with a shallow, legible path. Users read the address bar to judge safety; an opaque redirect chain reads as phishing.

## Distinguish Internal Tools from External Products

Internal / back-office software should carry a deliberate visual cue — a distinct accent colour, an env badge, a marked header — that makes it impossible to mistake for the customer-facing app (or staging for production). The cue should be persistent and immediately legible.

## Review Checklist

- [ ] Can the user always identify which section or record they are currently editing?
- [ ] Are colour regions or borders used consistently to separate distinct contexts?
- [ ] Does navigation deeper than 2 levels use breadcrumbs or a clear back path?
- [ ] Do action confirmation dialogs state the scope of what will be affected?
- [ ] When acting on behalf of another account, is there a persistent, unmissable indicator naming who, plus an always-visible exit?
- [ ] Do internal/back-office tools carry a persistent visual cue distinguishing them from the customer-facing app (and staging from production)?
- [ ] Do auth screens feel fully on-brand, and does the login URL sit in the customer's own domain with a shallow path?
