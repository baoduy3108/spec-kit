// Eight abilities and thirty-one skills, checked for the two ways a list this
// size goes wrong: entries that cost nothing, and entries that are the same
// entry twice.

import test from 'node:test';
import assert from 'node:assert/strict';

import { KNIGHT } from '../src/rules.js';
import {
  ABILITIES,
  ABILITY_IDS,
  BRANCHES,
  LIVE,
  SKILLS,
  requirementKind,
  skillById,
  skillsOf,
} from '../src/abilities.js';

test('eight combat abilities and one traversal, thirty-one skills, no id twice', () => {
  // Eight was the number asked for and eight it stays — every one of them a
  // combat verb. `hook` is the ninth and it is deliberately not one of them: it
  // is the traversal unlock the level design needs, the equivalent of Dead
  // Cells hanging its vertical shafts behind the Spider Rune. Counting it in
  // with the eight would quietly turn "8 abilities" into a number that drifts.
  const TRAVERSAL = ['hook'];
  const combat = ABILITY_IDS.filter((id) => !TRAVERSAL.includes(id));
  assert.equal(combat.length, 8, 'the eight combat abilities');
  assert.equal(ABILITY_IDS.length, 9, 'eight combat plus one traversal');
  assert.equal(SKILLS.length, 31);
  assert.equal(new Set(SKILLS.map((s) => s.id)).size, 31, 'no duplicate skill ids');
  const order = combat.map((id) => ABILITIES[id].n).sort((a, b) => a - b);
  assert.deepEqual(order, [1, 2, 3, 4, 5, 6, 7, 8], 'the combat abilities are numbered once each');
});

test('every ability spends something', () => {
  // An ability that costs nothing is a button, not a decision.
  for (const id of ABILITY_IDS) {
    assert.ok(ABILITIES[id].spends && ABILITIES[id].spends.length > 3, `${id} is free`);
    assert.ok(ABILITIES[id].name.en && ABILITIES[id].name.vi, `${id} is missing a language`);
    assert.ok(ABILITIES[id].line.en.length > 40 && ABILITIES[id].line.vi.length > 40, `${id} is thin`);
  }
});

test('every skill costs essence and hangs off something real', () => {
  for (const s of SKILLS) {
    assert.ok(s.cost >= 100, `${s.id} is nearly free (${s.cost})`);
    const kind = requirementKind(s.requires);
    assert.ok(kind, `${s.id} requires ${s.requires}, which does not exist`);
    assert.ok(s.effect && (s.effect.add !== undefined || s.effect.mul !== undefined), `${s.id} does nothing`);
    assert.ok(s.name.en && s.name.vi && s.line.en && s.line.vi, `${s.id} is missing a language`);
    for (const t of [s.name.en, s.name.vi, s.line.en, s.line.vi]) {
      assert.ok(!/[*_`]|<[a-z/]/i.test(t), `${s.id} has markup in it`);
    }
  }
});

test('no two skills are the same skill', () => {
  const seen = new Map();
  for (const s of SKILLS) {
    const sig = `${s.effect.key}:${s.effect.add ?? ''}:${s.effect.mul ?? ''}`;
    assert.ok(!seen.has(sig), `${s.id} does exactly what ${seen.get(sig)} does`);
    seen.set(sig, s.id);
  }
});

test('the prerequisites form a tree with no cycles, and every branch has a root', () => {
  for (const s of SKILLS) {
    const chain = new Set([s.id]);
    let at = s.requires;
    while (requirementKind(at) === 'skill') {
      assert.ok(!chain.has(at), `${s.id} depends on itself through ${at}`);
      chain.add(at);
      at = skillById(at).requires;
    }
    assert.equal(requirementKind(at), 'ability', `${s.id} never reaches an ability`);
  }
  for (const b of BRANCHES) {
    const mine = skillsOf(b);
    assert.ok(mine.length >= 5, `${b} is too thin a branch (${mine.length})`);
    assert.ok(
      mine.some((s) => requirementKind(s.requires) === 'ability'),
      `${b} has no entry point`,
    );
  }
  assert.equal(BRANCHES.length, 5, 'five branches');
});

test('a deeper skill costs more than the one it depends on', () => {
  for (const s of SKILLS) {
    if (requirementKind(s.requires) !== 'skill') continue;
    assert.ok(s.cost > skillById(s.requires).cost, `${s.id} is cheaper than its own prerequisite`);
  }
});

test('the three abilities the fight already has are still wired to it', () => {
  // The data file and rules.js must not drift apart: if a skill block is
  // renamed in the fight, this stops describing something that exists.
  assert.deepEqual(LIVE, ['kindle', 'seal', 'draw']);
  for (const id of LIVE) assert.ok(KNIGHT.skills[id], `${id} is described but not implemented`);
  // hook is implemented, but in the movement block rather than in skills — it
  // is a traversal verb, not something you spend a fight resource on.
  assert.ok(KNIGHT.hook && KNIGHT.hook.reach > 0, 'the pole is described but does not reach');
  const unimplemented = ABILITY_IDS.filter((id) => !KNIGHT.skills[id] && id !== 'hook');
  assert.equal(unimplemented.length, 5, `five are still design only: ${unimplemented.join(', ')}`);
});
