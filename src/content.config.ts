import { defineCollection, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Share the schema directly so both collections retain their inferred data types.
const articleSchema = ({ image }: SchemaContext) =>
	z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.optional(image()),
		theme: z.string().optional(),
		date_debut: z.coerce.date().optional(),
		date_fin: z.coerce.date().optional(),
	});

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: articleSchema,
});

const Actus = defineCollection({
	loader: glob({ base: './src/content/Actus', pattern: '**/*.{md,mdx}' }),
	schema: articleSchema,
});

export const collections = { blog, Actus };
