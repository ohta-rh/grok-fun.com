import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const tips = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tips' }),
  schema: z.object({
    title: z.string().max(60),
    description: z.string().max(160),
    order: z.number().int().positive(),
    product: z.enum(['chat', 'bot', 'build', 'imagine', 'voice', 'automations', 'api', 'series']),
    last_verified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD'),
    source_url: z.array(z.string().url()).default([]),
  }),
});

export const collections = { tips };
