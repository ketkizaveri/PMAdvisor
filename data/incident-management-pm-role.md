---
author: Lara Hogan
title: The PM's Role in Incident Management
url: https://increment.com/on-call/on-call-for-product-managers/
topic: incident management
published:
---

# The PM's Role in Incident Management

---

## Overview

When production incidents happen, PMs are often unsure of their role. They're not writing the fix — but they're not irrelevant either. PMs play a critical coordination and communication function during incidents, and they own the product decisions that emerge from postmortems. This document covers the PM's specific responsibilities before, during, and after incidents.

---

## Why PMs Need an Incident Management Practice

- **Product decisions cause incidents.** Rushed launches, skipped rollback plans, and untested edge cases are product-level failures.
- **Customers and stakeholders expect communication.** Someone needs to write the status page update; someone needs to brief the CEO. That's often the PM.
- **Postmortem action items are often product work.** Fixing the root cause may require design, prioritization, and engineering coordination — PM work.

---

## Incident Severity Levels

Most orgs use a severity scale (P0–P3 or SEV1–SEV4):

| Severity | Description | Example | PM Involvement |
|---|---|---|---|
| **P0 / SEV1** | Critical — widespread customer impact, revenue loss | Full outage, data loss | Active involvement required |
| **P1 / SEV2** | Major — significant degradation for large user segment | Checkout broken for 30% of users | Active involvement likely |
| **P2 / SEV3** | Moderate — noticeable issue, workaround exists | Slow load times, feature unavailable | Aware; ready to support |
| **P3 / SEV4** | Minor — minimal customer impact | Cosmetic bug, single-user issue | Monitor; no active role |

---

## During an Incident: PM Responsibilities

The incident commander (usually an engineer) owns the technical response. The PM's role is distinct:

### 1. Customer and Stakeholder Communication
- Write and maintain the status page update (plain language, no jargon)
- Draft executive summary: what happened, current status, ETA to resolution, customer impact
- Notify customer-facing teams (CS, sales) with what to tell customers
- Do *not* speculate on root cause until confirmed

**Status page update template:**
```
[Time] Investigating: We are aware of an issue affecting [feature/service]. 
Engineers are actively investigating. We will provide an update within [X] minutes.

[Time] Identified: We have identified the cause of [issue] and are working on a fix. 
Estimated resolution: [time]. Affected: [scope].

[Time] Resolved: The issue affecting [feature] has been resolved as of [time]. 
[Optional: brief explanation of cause and what was done.]
```

### 2. Decision Support
- If engineers need a product decision (e.g., "should we roll back or push a fix forward?"), the PM makes that call quickly
- Evaluate: customer impact of current state vs. risk of the proposed fix vs. time to resolution
- If in doubt: **rollback**

### 3. Business Impact Assessment
- Estimate affected users (segment and count)
- Identify revenue impact if applicable (enterprise customers, transaction failures)
- Flag SLA implications — which customers have uptime SLAs and are they being breached?

---

## Incident Communication Principles

1. **Communicate early, even with incomplete information.** An "investigating" update is better than silence.
2. **Never blame individuals.** "An engineer deployed a bad config" is not acceptable external or internal communication.
3. **Be specific about customer impact.** "Some users may have experienced" is less trusted than "Approximately 15% of users were affected."
4. **Give regular cadence updates.** Every 30 minutes for active P0/P1, even if status hasn't changed.
5. **Acknowledge, don't minimize.** Don't soften the impact; customers and stakeholders can tell.

---

## Postmortem: PM's Role

After resolution, the postmortem is where PMs add the most lasting value.

### The Blameless Postmortem
The goal is systemic learning, not individual accountability. Ask:
- What conditions made this failure possible?
- What did we do well during the response?
- What would have detected this earlier?
- What would have reduced impact?

### PM-Specific Postmortem Questions
- Were there product decisions (scope, timeline, feature flags) that contributed?
- Were there warning signals we ignored or didn't have visibility into?
- What monitoring or alerting would have helped?
- Which postmortem action items are product work (design, prioritization, spec)?

### Action Item Ownership
PMs should own or co-own:
- Adding monitoring for key product metrics
- Building rollback capabilities for features that don't have them
- Scheduling technical debt paydown related to the incident
- Updating launch checklists or runbooks

---

## Building Incident Resilience Into Products

PMs who wait for incidents to happen are reactive. Proactive resilience practices:

| Practice | Description |
|---|---|
| **Feature flags** | All major features behind a flag for instant rollback |
| **Graceful degradation** | Define what happens when dependencies fail |
| **Canary deployments** | 1% rollout before 100%; catch issues before full impact |
| **Chaos engineering** | Deliberately inject failure in staging to test response |
| **Runbook for every launch** | Document expected behavior, error conditions, and who to page |

---

## Key Takeaways

- PMs don't fix the incident — they manage communication and make product decisions under pressure.
- Own external and internal communication; write in plain language; update on a regular cadence.
- In rollback-vs-fix decisions, default to rollback unless the fix is very low risk.
- Postmortems are where PMs do their most lasting incident-related work.
- Build resilience into products by default — feature flags, graceful degradation, runbooks.
