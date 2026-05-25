import { z } from "zod";

export const CategoryIdSchema = z.enum(["women", "men"]);

export const CategoryAccentSchema = z.enum(["gold", "ivory"]);

export const CategorySchema = z.object({
  id: CategoryIdSchema,
  name: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  image: z.string().url(),
  accent: CategoryAccentSchema,
});

export const CategoryListSchema = z.array(CategorySchema);

export const CategoryPillarSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const ServiceGroupSchema = z.enum([
  "hair",
  "color",
  "skin",
  "nails",
  "spa",
  "bridal",
  "beard",
  "grooming",
]);

export const CategoryGroupOrderItemSchema = z.object({
  group: ServiceGroupSchema,
  label: z.string(),
  description: z.string(),
});

export const CategorySpotlightSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  accent: z.string(),
  description: z.string(),
  image: z.string().url(),
  bullets: z.array(z.string()),
  serviceSlug: z.string(),
});

export const CategoryProcessStepSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const CategoryContentSchema = z.object({
  id: CategoryIdSchema,
  heroEyebrow: z.string(),
  heroTitle: z.string(),
  heroAccent: z.string(),
  heroSuffix: z.string().optional(),
  heroLead: z.string(),
  heroQuote: z.string(),
  heroQuoteAttribution: z.string(),
  heroImage: z.string().url(),
  heroPortrait: z.string().url(),
  pillars: z.array(CategoryPillarSchema),
  groupOrder: z.array(CategoryGroupOrderItemSchema),
  spotlight: CategorySpotlightSchema,
  process: z.array(CategoryProcessStepSchema),
});

export type Category = z.infer<typeof CategorySchema>;
export type CategoryList = z.infer<typeof CategoryListSchema>;
export type CategoryContent = z.infer<typeof CategoryContentSchema>;
export type CategoryId = z.infer<typeof CategoryIdSchema>;
export type ServiceGroup = z.infer<typeof ServiceGroupSchema>;
