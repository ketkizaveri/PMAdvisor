---
author: Lenny Rachitsky
title: Prioritization Frameworks Every PM Should Know
url:
topic: roadmapping
published:
---

# Prioritization Frameworks Every PM Should Know

---

## Overview

Prioritization is the most consequential decision a PM makes repeatedly. This document surveys the most widely used prioritization frameworks, when each is appropriate, and their failure modes.

---

## Why Prioritization Is Hard

- **Uncertainty:** You rarely know which bet will pay off most.
- **Politics:** Stakeholders push for their own priorities.
- **Recency bias:** The loudest, most recent request dominates.
- **False precision:** Scoring models create confidence that isn't real.

The goal is not a perfect system — it's a defensible, repeatable process that reduces bias and aligns the team.

---

## Framework 1: RICE

**Formula:** (Reach × Impact × Confidence) / Effort

| Variable | Definition | Scale |
|---|---|---|
| Reach | How many users affected per time period? | Absolute number |
| Impact | How much does it move the needle per user? | 3x / 2x / 1x / 0.5x / 0.25x |
| Confidence | How confident are you in the estimates? | 100% / 80% / 50% |
| Effort | Person-months to ship | Absolute number |

**Best for:** Teams with enough data to estimate reach and effort reliably.  
**Failure mode:** Confidence scores are often inflated; effort estimates are notoriously wrong.

---

## Framework 2: ICE

**Formula:** Impact × Confidence × Ease

Simpler than RICE — no reach estimate. Useful for early-stage teams or when data is sparse.

**Best for:** Fast-moving teams doing lots of experiments.  
**Failure mode:** "Impact" is subjective; same item gets wildly different scores from different people.

---

## Framework 3: Kano Model

Classifies features into three buckets based on customer satisfaction:

| Category | Description | Example |
|---|---|---|
| **Basic** | Expected — their absence causes dissatisfaction | App doesn't crash |
| **Performance** | More = better linearly | Faster load time |
| **Delighters** | Unexpected — their presence creates delight | Personalized empty states |

**Best for:** UX-heavy decisions, understanding the emotional impact of features.  
**Process:** Survey customers with functional ("How do you feel if this feature exists?") and dysfunctional ("How do you feel if it doesn't exist?") question pairs.

---

## Framework 4: Opportunity Scoring

From Anthony Ulwick's Jobs-to-be-Done work. Ask customers:

1. How *important* is this job/outcome to you? (1–10)
2. How *satisfied* are you with current solutions? (1–10)

**Opportunity score = Importance + max(Importance − Satisfaction, 0)**

High importance + low satisfaction = high opportunity.

**Best for:** Discovery phase, deciding which problem to solve before evaluating solutions.

---

## Framework 5: Value vs. Effort Matrix

A 2×2 matrix — quick, visual, low ceremony:

```
         Low Effort          High Effort
High    ┌─────────────────┬─────────────────┐
Value   │  Quick Wins ✓   │  Big Bets ◎     │
        ├─────────────────┼─────────────────┤
Low     │  Fill-ins ○     │  Avoid ✗        │
Value   └─────────────────┴─────────────────┘
```

**Best for:** Sprint planning, stakeholder conversations, rapid triage.  
**Failure mode:** "High value" is not defined rigorously; becomes subjective.

---

## How to Choose a Framework

| Situation | Recommended Framework |
|---|---|
| Early discovery, what problem to solve | Opportunity Scoring / Kano |
| Large backlog triage | RICE or ICE |
| Sprint-level planning | Value vs. Effort |
| Feature feel and delight | Kano |
| Experiment backlog | ICE |

---

## The Meta-Rule: Transparency Over Precision

No framework produces the "correct" answer. The value of any framework is:

1. **Making assumptions explicit** so they can be challenged
2. **Creating a shared language** for discussion
3. **Reducing recency and loudness bias**

Share your scoring with stakeholders. The conversation it starts is more valuable than the score.

---

## Key Takeaways

- No framework is universally best — match the framework to the decision type.
- Prioritization is a repeatable process, not a one-time ranking.
- Make your scoring transparent so bias can be surfaced and challenged.
- Revisit priorities when new evidence arrives, not just at quarterly planning.
