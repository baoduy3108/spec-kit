---
name: formal-logic-and-argumentation
description: Formal logic and argumentation — propositional and predicate logic, truth tables, validity and soundness, deductive vs inductive reasoning, logical connectives and quantifiers, proof, and constructing/evaluating arguments. Use for formal logic, symbolic logic, argument structure, validity, or rigorous reasoning.
category: knowledge
keywords_vi: logic hình thức và lập luận, logic mệnh đề và logic vị từ, bảng chân trị, tính hợp lệ và tính đúng đắn, suy luận diễn dịch và quy nạp, các phép nối logic và lượng từ, chứng minh và đánh giá lập luận
---

# Formal Logic & Argumentation

Logic is the study of **valid reasoning** — the rules by which conclusions follow from premises. Formal (symbolic) logic makes reasoning precise and mechanical, underpinning mathematics, computer science, philosophy, and clear thinking. It's the backbone of rigorous argument.

## Propositions & Connectives

- A **proposition** — a statement that is true or false.
- **Logical connectives** combine propositions:
  - **NOT (¬)** — negation; **AND (∧)** — conjunction (true if both); **OR (∨)** — disjunction (true if either); **IF...THEN (→)** — conditional (implication); **IF AND ONLY IF (↔)** — biconditional.
- **Truth tables** — systematically list a compound statement's truth value for every combination of its parts. The basic tool for analyzing logical relationships.

## The Conditional & Its Relatives

- **Implication (P → Q)** — "if P then Q" — false *only* when P is true and Q false. Note it's true when P is false ("vacuously true").
- **Converse** (Q → P), **inverse** (¬P → ¬Q), and **contrapositive** (¬Q → ¬P). The **contrapositive is logically equivalent** to the original (used in proofs — see mathematical-induction-and-proof); the converse is *not* — confusing them is a common error.

## Validity & Soundness

The crucial distinction:
- **Valid** — the conclusion *follows logically* from the premises (if the premises were true, the conclusion *must* be true). About *form*, not content.
- **Sound** — valid **and** the premises are actually **true**. Only sound arguments establish true conclusions.
- An argument can be valid but unsound (valid form, false premise → possibly false conclusion). Evaluating both form (validity) and premises (truth) is the core skill.

## Deductive vs Inductive Reasoning

- **Deductive** — from general premises to a *certain* conclusion (if valid & sound, the conclusion is guaranteed). Math proofs, syllogisms. "All men are mortal; Socrates is a man; therefore Socrates is mortal."
- **Inductive** — from specific observations to a *probable* generalization (strong but not certain — the basis of science and everyday reasoning). Conclusions can be well-supported but not guaranteed (see cognitive-biases for its pitfalls).
- **Abductive** — inference to the best explanation.

## Predicate Logic & Quantifiers

Beyond whole propositions, **predicate logic** analyzes internal structure:
- **Quantifiers** — **∀** ("for all") and **∃** ("there exists"). "All cats are mammals" = ∀x (Cat(x) → Mammal(x)).
- Enables reasoning about *properties* and *relations*, and precise statements (crucial in math and CS).

## Constructing & Evaluating Arguments

- **Structure** — identify **premises** and **conclusion**; check whether the premises validly support the conclusion.
- **Proof** — deriving a conclusion via valid steps (direct, contradiction, cases).
- **Evaluate** — is it valid (good form)? are premises true (sound)? watch for **fallacies** (see philosophy-and-critical-thinking) — invalid forms disguised as reasoning (affirming the consequent, denying the antecedent).
- **Rules of inference** — modus ponens (P→Q, P ⊢ Q), modus tollens (P→Q, ¬Q ⊢ ¬P), syllogism, etc.

Master formal logic via **propositions and connectives** (¬, ∧, ∨, →, ↔ with truth tables), the **conditional and contrapositive** (equivalent) vs converse (not), the **validity vs soundness** distinction (valid form + true premises), **deductive** (certain) vs **inductive** (probable) reasoning, **predicate logic with quantifiers** (∀, ∃), and **constructing/evaluating arguments** via rules of inference while spotting fallacies. Precise reasoning about what *follows* from what — the machinery of valid argument — is the foundation logic gives to mathematics, computing, and clear thought.
