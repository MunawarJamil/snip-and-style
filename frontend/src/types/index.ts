export type CategoryId = "women" | "men";

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
  image: string;
  featured: boolean;
  tags?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  image?: string;
}
