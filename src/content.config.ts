import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const postSchema = ({ image }) => z.object({
  title: z.string(),
  description: z.string().max(160),
  slug: z.string().optional(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  image: z.object({
    src: image(),
    alt: z.string(),
  }),
  rating: z.number().min(1).max(5).optional(),
  toolName: z.string().optional(),
  toolUrl: z.string().url().optional(),
  tags: z.array(z.string()).default([]),
  faq: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })).optional(),
  draft: z.boolean().default(false),
});

const reviews = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reviews' }),
  schema: postSchema,
});

const compare = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/compare' }),
  schema: postSchema,
});

const howTo = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/how-to' }),
  schema: postSchema,
});

const bestTools = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/best-tools' }),
  schema: postSchema,
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: postSchema,
});

export const collections = { reviews, compare, howTo, bestTools, blog };