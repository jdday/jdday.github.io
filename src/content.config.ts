import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const cv = defineCollection({
  loader: glob({ pattern: 'cv.md', base: './src/contents' }),
  schema: z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    title: z.string(),
    intro: z.string(),
    education: z.array(
      z.object({
        title: z.string(),
        start: z.string(),
        end: z.string(),
        institution: z.string(),
      })
    ),
    experience: z.array(
      z.object({
        title: z.string(),
        company: z.string(),
        start: z.string(),
        end: z.string(),
        responsibilities: z.array(z.string()).optional(),
        
      })
    ),
    skills: z.array(
      z.object({
        category: z.string(),
        items: z.array(z.string()),
      })
    ),
  }),
});

export const collections = { cv };
