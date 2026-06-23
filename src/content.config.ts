import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // Language of this post. Defaults to English so existing posts remain valid.
    lang: z.enum(['en', 'es']).default('en'),
    // Stable key that links a post to its translation(s) in other languages.
    // Posts with the same `translationKey` are treated as translations of one
    // another. The language switch uses this to find the counterpart.
    translationKey: z.string().optional(),
  }),
});

// The "projects" route is now backed by the curated experience data in
// src/data/experience.ts rather than authored Markdown entries. Keeping
// the route functional is a deliberate design choice; nothing imports
// this collection anymore.

export const collections = { blog };

