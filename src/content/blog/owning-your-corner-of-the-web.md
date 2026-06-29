---
title: "Why I'm building my own corner of the web"
description: "After years of wanting to share learnings and opinions, I'm consolidating my site, CV, and engineering notes into a single static site that I fully own."
pubDate: 2026-06-15
updatedDate: 2026-06-29
tags: ['meta', 'writing', 'backend']
lang: 'en'
translationKey: 'owning-your-corner-of-the-web'
category: 'Web'
---

# Introduction

This is the first post on a site I own end to end. It's a static site. There is no
database, no backend, no CMS, and no analytics — at least not yet. Everything you
see was generated from a folder of Markdown files at build time.

# Context

Everyone has something to share, without exception. Just like me, you've probably thought about it too, dear reader. Each person has their reasons for why they haven't done it yet. In my case, it was always feeling like I didn't know enough to provide real value. When I finally overcame that feeling, I realized I didn't really want to spend much time on social media; it's really not my thing. I prefer to keep things simple, and this was the solution I came up with: a simple and practical static site that I could copy and paste to any host in less than an hour.

The PRD that drives this site is short and unsentimental: Astro on GitHub Pages,
Markdown as the only content format, no JavaScript on the critical path, and a
maintenance budget of two hours per month.

# Implementation

The interesting bits:

- **Content collections** with a strict schema. Each post must declare a
  `pubDate`, a one-line `description`, and at least one tag. Drafts are
  filtered at build time, never at runtime.
- **Sitemap** generated from the same collection. One source of truth.
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
