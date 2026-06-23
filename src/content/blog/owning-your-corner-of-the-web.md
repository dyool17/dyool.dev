---
title: "Why I'm building my own corner of the web"
description: "After years of writing on rented platforms, I'm consolidating my site, CV, and engineering notes into a single static site that I fully own."
pubDate: 2026-06-15
updatedDate: 2026-06-20
tags: ['meta', 'writing', 'backend']
lang: 'en'
translationKey: 'owning-your-corner-of-the-web'
---

# Introduction

This is the first post on a site I own end to end. It's a static site. There is no
database, no backend, no CMS, and no analytics — at least not yet. Everything you
see was generated from a folder of Markdown files at build time.

# Context

I used to publish on platforms I didn't control. Each one had different rules,
different formats, and different ways of going away. After the third time a
platform changed its mind, I decided the cure was a static site I could
copy-paste to any host in under an hour.

The PRD that drives this site is short and unsentimental: Astro on GitHub Pages,
Markdown as the only content format, no JavaScript on the critical path, and a
maintenance budget of two hours per month.

# Implementation

The interesting bits:

- **Content collections** with a strict schema. Each post must declare a
  `pubDate`, a one-line `description`, and at least one tag. Drafts are
  filtered at build time, never at runtime.
- **RSS and sitemap** generated from the same collection. One source of truth,
  two output formats.
- **Light and dark themes** from CSS custom properties. A tiny inline script
  applies the user's choice before paint to avoid a flash of the wrong theme.
- **Structured data** in JSON-LD on the site, the person, and each post. This
  makes the content easier for both traditional search and generative engines
  to cite cleanly.

# Results

A site that loads in under a second, costs nothing to host, and survives any
single provider going down. I can write in `vim`, commit, and push. There is
no deploy script to maintain.

# Conclusions

The point of this site is not the technology. The point is the discipline of
owning your work, end to end, including the words. Everything else is a
constraint to be respected, not a problem to be solved.
