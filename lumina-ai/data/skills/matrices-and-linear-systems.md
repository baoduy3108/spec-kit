---
name: matrices-and-linear-systems
description: Matrices and linear systems (advanced math) — matrix operations, determinants, the inverse, solving systems of linear equations (Gaussian elimination, Cramer's rule), and applications. Use for matrices, determinants, solving simultaneous equations, systems of linear equations, or matrix algebra.
category: knowledge
keywords_vi: ma trận và hệ phương trình tuyến tính, phép toán ma trận cộng nhân, định thức, ma trận nghịch đảo, giải hệ phương trình tuyến tính khử gauss, quy tắc cramer, ứng dụng ma trận
---

# Matrices & Linear Systems (Advanced Math)

Matrices are rectangular arrays of numbers that compactly represent and solve **systems of linear equations** and linear transformations (for the geometric view, see linear-algebra-intuition). Here the focus is the *algebra and computation*: operations, determinants, inverses, and solving systems — used across science, engineering, economics, and computing.

## Matrix Operations

- A **matrix** — an m×n array of numbers (m rows, n columns).
- **Addition/subtraction** — element-wise (same dimensions).
- **Scalar multiplication** — multiply every element.
- **Matrix multiplication** — (AB)ᵢⱼ = sum of row i of A times column j of B; requires A's columns = B's rows. **Not commutative** (AB ≠ BA generally) — order matters.
- **Identity matrix I** — 1s on the diagonal (the multiplicative identity: AI = A). **Transpose** Aᵀ — flip rows and columns.

## Determinants

- The **determinant** (det A, |A|) — a single number computed from a square matrix.
- **2×2**: |a b; c d| = ad − bc. **3×3** and larger — by cofactor expansion.
- **Meaning** — det ≠ 0 means the matrix is **invertible** (the system has a unique solution); **det = 0** means it's singular (no unique solution; rows/columns are linearly dependent). Geometrically, |det| is the area/volume scaling factor.

## The Inverse

- **A⁻¹** — the matrix with A·A⁻¹ = I (like a reciprocal). Exists only if det A ≠ 0.
- **2×2 inverse** — swap the diagonal, negate the off-diagonal, divide by the determinant.
- Used to solve **AX = B** as **X = A⁻¹B**.

## Solving Systems of Linear Equations

The central application — a system like {2x + y = 5; x − y = 1} written as **AX = B**:
- **Gaussian elimination** — use row operations to reduce the augmented matrix to row-echelon form, then back-substitute. The general, efficient method (works for any size).
- **Cramer's rule** — for a unique solution, each variable = (determinant of A with that column replaced by B) / (det A). Elegant for small systems.
- **Inverse method** — X = A⁻¹B (if A is invertible).
- **Types of solutions** — unique (det ≠ 0), none (inconsistent), or infinitely many (dependent equations) — revealed by the determinant/echelon form.

## Applications

- **Systems of equations** everywhere — physics, circuits (Kirchhoff's laws — see analog-circuit-design), economics (input-output models), and optimization.
- **Transformations** — rotations, scalings (computer graphics — see linear-algebra-intuition).
- **Data** — matrices represent datasets, and matrix operations power machine learning, statistics, and networks (adjacency matrices — see graph theory).

Master matrices and linear systems via **matrix operations** (addition, scalar and matrix multiplication — non-commutative, the identity/transpose), **determinants** (computing them; det ≠ 0 ⟺ invertible ⟺ unique solution), the **inverse** (A⁻¹, existing when det ≠ 0), and **solving linear systems** (Gaussian elimination generally, Cramer's rule and the inverse method for small systems, and recognizing unique/none/infinite solutions). Matrices turn systems of equations and transformations into compact, computable algebra — a workhorse across math, science, and computing.
