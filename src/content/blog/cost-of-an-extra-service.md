---
title: 'The cost of an extra service'
description: 'A real incident where adding a second database turned a five-line change into a four-hour fire. Lessons on when not to add infrastructure.'
pubDate: 2026-06-22
tags: ['backend', 'devops', 'learnings']
lang: 'en'
translationKey: 'cost-of-an-extra-service'
---

# Introduction

It's easy to reach for a new service when an old one is uncomfortable. This
post is about a moment when I did exactly that, and what it cost.

# Context

A simple internal tool was storing its job state in the same Postgres instance
the main product used. A teammate wanted the jobs migrated to a separate
database "for safety". I agreed, mostly because the request sounded
reasonable.

# Implementation

What I actually did:

1. Provisioned a new managed Postgres cluster.
2. Wrote a one-shot migration script.
3. Updated the worker to point at the new connection string.
4. Added a feature flag so we could route jobs to the old or new DB.
5. Wrote a rollback plan that nobody would ever read.

The diff was about five lines. The blast radius was not.

# Results

The migration itself was fine. The rollback was not. The feature flag worked,
but it required a restart of the worker fleet, and the runbook for that
restart was a paragraph in a wiki page nobody opened. We spent four hours
recovering from a routine cutover because the path back was theoretical, not
exercised.

# Conclusions

Three rules I'm keeping:

- **The new service must pay for itself before the next quarter.** If the only
  reason is "for safety", the safety isn't there yet — you have one more
  thing to break.
- **The rollback is part of the feature.** If you can't roll back in under
  five minutes, you don't have a rollback, you have a plan.
- **Two databases is a state machine, not a configuration.** The cost of
  getting them out of sync is paid in incident time, not in invoices.

The lesson is the boring one: small, well-understood systems beat larger,
defensive ones, almost every time.
