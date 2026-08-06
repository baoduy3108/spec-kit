---
name: bioinformatics-and-sequence-analysis
description: Bioinformatics fundamentals — biological sequences (DNA/RNA/protein) as data, sequence alignment (global/local, BLAST), file formats (FASTA/FASTQ/SAM/VCF), the NGS pipeline (reads→alignment→variant calling), genome assembly, phylogenetics, and handling large biological datasets. Use when analyzing genomic/sequence data, building bioinformatics pipelines, or working with biological data formats.
category: engineering
keywords_vi: tin sinh học và phân tích chuỗi bioinformatics, chuỗi sinh học dna rna protein như dữ liệu, gióng hàng chuỗi alignment blast toàn cục cục bộ, định dạng fasta fastq sam vcf, quy trình giải trình tự ngs reads variant calling, lắp ráp bộ gen assembly, phát sinh loài phylogenetics, xử lý dữ liệu sinh học lớn
---

# Bioinformatics & Sequence Analysis

Bioinformatics applies computation to biological data — chiefly the **sequences** of DNA, RNA, and proteins, which are just strings over small alphabets (4 nucleotides, 20 amino acids). Modern biology generates data at enormous scale (a human genome is ~3 billion bases), so it's fundamentally a computer-science and data-engineering discipline as much as a biological one.

## Sequences as Data

A genome, transcript, or protein is a **string** — but a huge, information-dense one. The core computational tasks are comparing, searching, aligning, assembling, and annotating these strings, and relating them to biological function (see molecular-biology-and-gene-expression). Efficient algorithms and data structures matter because the data is massive.

## Sequence Alignment

The workhorse operation: **align** two (or many) sequences to measure similarity and find conserved regions, mutations, or common ancestry.
- **Global alignment** (Needleman-Wunsch) — align entire sequences end to end.
- **Local alignment** (Smith-Waterman) — find the best-matching *sub-regions* (better for finding domains/motifs).
- Both use **dynamic programming** with scoring (matches, mismatches, gap penalties). Optimal DP is O(n·m) — too slow for huge databases.
- **BLAST** — the ubiquitous heuristic for fast database search: "what known sequences resemble mine?" It trades guaranteed-optimality for speed, making genome-scale search practical.

Alignment underlies homology detection, variant finding, and evolutionary analysis.

## File Formats

Bioinformatics runs on standard text/binary formats — knowing them is half the job:
- **FASTA** — sequences (a header + the sequence).
- **FASTQ** — sequencing reads *with per-base quality scores*.
- **SAM/BAM** — aligned reads mapped to a reference (BAM = compressed binary).
- **VCF** — called variants (differences from a reference).
- **GFF/BED** — genomic feature annotations (where genes/regions are).

Pipelines are largely transformations between these formats.

## The NGS Pipeline

Next-Generation Sequencing produces millions of short **reads**; a typical **variant-calling pipeline**:
1. **Quality control** — trim/filter reads (FASTQ), remove adapters, check quality.
2. **Alignment** — map reads to a **reference genome** (BWA, Bowtie) → SAM/BAM.
3. **Post-processing** — sort, mark duplicates, recalibrate.
4. **Variant calling** — identify SNPs/indels differing from the reference → VCF.
5. **Annotation** — interpret variants (which gene, likely effect, known significance).

This reads→alignment→variants→interpretation flow is the backbone of genomics (clinical diagnostics, research).

## Assembly & Other Tasks

- **Genome assembly** — reconstruct a full genome from overlapping reads *without* a reference (de novo), using overlap or de Bruijn graph methods — a hard combinatorial problem.
- **Phylogenetics** — build evolutionary trees from sequence differences (who's related to whom, how ancestry branched).
- **Gene prediction & annotation**, **RNA-seq** (expression quantification), **motif finding**, **structure prediction** (AlphaFold-era), and increasingly **ML** on biological data.

## Scale & Engineering

The defining practical challenge is **scale and reproducibility**: terabytes of data, long-running pipelines, HPC/cloud clusters, workflow managers (Nextflow, Snakemake) for reproducible multi-step analyses, and careful data management. Bioinformatics is as much about robust, reproducible data engineering (see reproducible pipelines) as about biology — pipelines must be correct, versioned, and rerunnable, because science depends on the results.

Bioinformatics is **treating life's sequences as big data**: align and search them (DP, BLAST), move them through standardized formats, run reproducible NGS pipelines from reads to interpreted variants, and scale it all — turning raw sequence into biological insight.
