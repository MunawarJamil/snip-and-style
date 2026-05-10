export type CategoryId = "women" | "men";

export type ServiceGroup =
  | "hair"
  | "color"
  | "skin"
  | "nails"
  | "spa"
  | "bridal"
  | "beard"
  | "grooming";

export interface Category {
  id: CategoryId;
  name: string;
  tagline: string;
  description: string;
  image: string;
  accent: "gold" | "ivory";
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  description: string;
  /** Price in Pakistani Rupees (PKR). */
  price: number;
  /** Duration in minutes. */
  duration: number;
  categoryId: CategoryId;
  group: ServiceGroup;
  image: string;
  featured: boolean;
  tags?: string[];
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  categoryIds: CategoryId[];
  years: number;
  signature: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  categoryIds: CategoryId[];
}

export interface CategoryContent {
  id: CategoryId;
  /** Tiny eyebrow above hero headline */
  heroEyebrow: string;
  /** Plain prefix; italic word handled separately */
  heroTitle: string;
  heroAccent: string;
  heroSuffix?: string;
  heroLead: string;
  heroQuote: string;
  heroQuoteAttribution: string;
  heroImage: string;
  heroPortrait: string;
  /** 3-column promise strip below hero */
  pillars: { title: string; description: string }[];
  /** Ordered groups to render in the menu */
  groupOrder: { group: ServiceGroup; label: string; description: string }[];
  /** Spotlight (e.g. bridal for women, hot-shave ritual for men) */
  spotlight: {
    eyebrow: string;
    title: string;
    accent: string;
    description: string;
    image: string;
    bullets: string[];
    serviceSlug: string;
  };
  /** Process / "your visit" steps */
  process: { title: string; description: string }[];
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  image?: string;
}
