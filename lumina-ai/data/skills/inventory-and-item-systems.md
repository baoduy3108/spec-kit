---
name: inventory-and-item-systems
description: Inventory and item systems for games — item data definitions, stacking, slot/grid/weight constraints, equipment, item instances vs stats, rarity and modifiers, crafting and loot tables, and inventory UX (drag-drop, sorting, tooltips). Use when building an inventory, loot, equipment, or item system in a game.
category: engineering
keywords_vi: hệ thống túi đồ và vật phẩm inventory item, định nghĩa dữ liệu vật phẩm, xếp chồng stack ràng buộc ô lưới trọng lượng, trang bị equipment, thực thể vật phẩm so với chỉ số, độ hiếm rarity thuộc tính modifier, chế tạo crafting bảng rơi đồ loot table, kéo thả sắp xếp tooltip túi đồ
---

# Inventory & Item Systems

An inventory system manages the items a player carries, equips, and uses. It sounds like "a list of things", but doing it well touches data design, constraints, UX, and often crafting and loot — and it's a system players interact with constantly, so friction here is very visible.

## Item Data: Definition vs Instance

The key modeling decision:
- **Item definition (template)** — the shared, immutable data for a *kind* of item: name, icon, base stats, max stack, type, description. One "Iron Sword" definition exists once.
- **Item instance** — a specific item in the world/inventory: which definition it is, plus per-instance state (durability, quantity, rolled modifiers, enchantments, unique ID).

Stackable commodities (potions, arrows) often need only `{defId, count}`; unique/modifiable gear needs full instances. Mixing these up — storing per-instance data on the shared definition, or duplicating template data per item — is the classic beginner mistake. Keep templates as **data** (see data-driven authoring) so designers add items without code.

## Constraints: The Rules of Carrying

The inventory's *rules* define its feel:
- **Slot-based** — fixed number of slots; simple, classic.
- **Grid / "Tetris"** — items occupy shapes on a grid; spatial management as a mini-game (Diablo/Resident Evil).
- **Weight-based** — capacity by total weight; encourages hard choices.
- **Stacking** — identical stackables merge up to a max stack size; splitting/merging stacks is expected UX.

The constraint model is a design lever: scarcity and inventory management can be core tension or pure convenience — pick deliberately.

## Equipment & Effects

Equipping moves an item into a **slot** (weapon, head, ring…) and applies its **stat modifiers** to the character. Model modifiers additively/multiplicatively and recompute derived stats on any change. Handle set bonuses, two-handed occupying two slots, and swapping cleanly (unequip → equip).

## Rarity, Modifiers & Loot

- **Rarity tiers** (common→legendary) gate power and drop odds, and drive that dopamine loop.
- **Procedural modifiers** — roll affixes ("+12% fire damage") onto instances for variety (ARPG loot). The item instance stores the rolled result.
- **Loot tables** — weighted drop definitions per source (this enemy drops X with p, Y with q). Data-driven so designers tune drops.
- **Crafting** — recipes consume items to produce others; validate ingredients, handle partial stacks, and give clear feedback.

## Inventory UX

Since players live in the inventory, its interface matters (see form-design, data-tables-and-grids):
- **Drag-and-drop** to move/equip/split, with clear valid-target highlighting.
- **Sorting & filtering / auto-stack** — respect the player's time; manual tidy of 200 slots is tedious.
- **Rich tooltips** — full stats, comparison to currently equipped ("+3 armor vs equipped"), rarity color.
- **Feedback** — pickups, "inventory full", weight warnings; confirm destructive actions (drop/destroy valuable items).
- **Quick actions** — hotbar assignment, quick-use, quick-transfer to storage/vendor.

A good inventory system is invisible plumbing done right: clean template/instance data underneath, deliberate constraints, and a UX that lets players find, compare, and manage their stuff without fighting the interface — while loot and crafting hang off the same foundation.
