import type { Category, Service, Testimonial } from "@/types";

export const categories: Category[] = [
  {
    id: "women",
    name: "Women",
    tagline: "Soft, elevated, unmistakably you.",
    description:
      "Hair, skin, and styling crafted by master artists who treat every detail as ceremony.",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80",
    accent: "gold",
  },
  {
    id: "men",
    name: "Men",
    tagline: "Sharp lines. Confident finish.",
    description:
      "Precision haircuts, classic shaves, and grooming rituals — engineered for the modern gentleman.",
    image:
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1600&q=80",
    accent: "ivory",
  },
];

export const services: Service[] = [
  // ---------- WOMEN ----------
  {
    id: "w-haircut-signature",
    slug: "signature-haircut",
    name: "Signature Haircut & Blow-Dry",
    description:
      "A consultation-led cut tailored to your face shape and lifestyle, finished with a sculpted blow-dry.",
    price: 4500,
    duration: 75,
    categoryId: "women",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    tags: ["haircut", "styling"],
  },
  {
    id: "w-color-balayage",
    slug: "balayage-color",
    name: "Hand-Painted Balayage",
    description:
      "Soft, sun-kissed dimension hand-painted by our color specialists, finished with a glossing treatment.",
    price: 18500,
    duration: 180,
    categoryId: "women",
    image:
      "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    tags: ["color"],
  },
  {
    id: "w-keratin",
    slug: "keratin-smoothing",
    name: "Keratin Smoothing Therapy",
    description:
      "A salon-grade smoothing ritual that reduces frizz, restores shine, and lasts up to twelve weeks.",
    price: 22000,
    duration: 210,
    categoryId: "women",
    image:
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    tags: ["treatment"],
  },
  {
    id: "w-facial-radiance",
    slug: "radiance-facial",
    name: "Radiance Facial",
    description:
      "A 60-minute brightening facial with vitamin-C infusion and lymphatic massage for an instant glow.",
    price: 6500,
    duration: 60,
    categoryId: "women",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    tags: ["skin", "facial"],
  },
  {
    id: "w-mani-luxe",
    slug: "luxe-manicure",
    name: "Luxe Manicure",
    description:
      "Precision shaping, cuticle ritual, hand mask, and your choice of polish — the complete refresh.",
    price: 3200,
    duration: 60,
    categoryId: "women",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    tags: ["nails"],
  },
  {
    id: "w-pedi-spa",
    slug: "spa-pedicure",
    name: "Spa Pedicure",
    description:
      "Warm soak, exfoliation, foot massage, and finish — a full reset from the soles up.",
    price: 4200,
    duration: 75,
    categoryId: "women",
    image:
      "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    tags: ["nails"],
  },
  {
    id: "w-massage-aroma",
    slug: "aroma-massage",
    name: "Aromatherapy Massage",
    description:
      "A 75-minute full-body massage with hand-blended essential oils to release tension and reset.",
    price: 8500,
    duration: 75,
    categoryId: "women",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    tags: ["spa", "massage"],
  },
  {
    id: "w-bridal",
    slug: "bridal-styling",
    name: "Bridal Styling",
    description:
      "A bespoke bridal package: trial session, day-of hair, makeup, and a gentle on-site touch-up.",
    price: 65000,
    duration: 240,
    categoryId: "women",
    image:
      "https://images.unsplash.com/photo-1549417229-7686ac5595fd?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    tags: ["bridal", "styling"],
  },

  // ---------- MEN ----------
  {
    id: "m-haircut-classic",
    slug: "classic-haircut",
    name: "Classic Haircut",
    description:
      "Timeless cut and finish with hot-towel cleanse and styling — the foundation of a sharp look.",
    price: 2200,
    duration: 45,
    categoryId: "men",
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    tags: ["haircut"],
  },
  {
    id: "m-fade-skin",
    slug: "skin-fade",
    name: "Skin Fade & Style",
    description:
      "Razor-sharp skin fade with detailed line-up, finished with premium pomade or matte clay.",
    price: 2800,
    duration: 50,
    categoryId: "men",
    image:
      "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    tags: ["haircut", "fade"],
  },
  {
    id: "m-beard-sculpt",
    slug: "beard-sculpt",
    name: "Beard Sculpt & Hot Shave",
    description:
      "Steamed towel preparation, precision trim, and a straight-razor finish for an immaculate edge.",
    price: 1800,
    duration: 40,
    categoryId: "men",
    image:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    tags: ["beard", "shave"],
  },
  {
    id: "m-color-grey",
    slug: "grey-blending",
    name: "Grey Blending",
    description:
      "Subtle, natural-looking color to soften greys without an obvious dye line — undetectably refined.",
    price: 4500,
    duration: 60,
    categoryId: "men",
    image:
      "https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    tags: ["color"],
  },
  {
    id: "m-facial-deep",
    slug: "deep-cleanse-facial",
    name: "Deep-Cleanse Facial",
    description:
      "Targeted extraction, charcoal mask, and cooling gel finish — engineered for skin clarity.",
    price: 5200,
    duration: 60,
    categoryId: "men",
    image:
      "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    tags: ["skin", "facial"],
  },
  {
    id: "m-mani-grooming",
    slug: "executive-manicure",
    name: "Executive Manicure",
    description:
      "Cuticle care, precision shaping, and a buffed natural finish — your hands, properly presented.",
    price: 2200,
    duration: 45,
    categoryId: "men",
    image:
      "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    tags: ["nails", "grooming"],
  },
  {
    id: "m-pedi-classic",
    slug: "classic-pedicure",
    name: "Classic Pedicure",
    description:
      "Foot soak, callus care, and conditioning massage — recovery for feet that work hard.",
    price: 2600,
    duration: 50,
    categoryId: "men",
    image:
      "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    tags: ["nails"],
  },
  {
    id: "m-massage-deep",
    slug: "deep-tissue-massage",
    name: "Deep-Tissue Massage",
    description:
      "A 60-minute focused massage to dissolve knots, release tension, and restore mobility.",
    price: 7200,
    duration: 60,
    categoryId: "men",
    image:
      "https://images.unsplash.com/photo-1591343395082-e120087004b4?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    tags: ["spa", "massage"],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Ayesha R.",
    role: "Architect, Lahore",
    quote:
      "The level of detail is unreal — from the consultation to the goodbye coffee. My balayage looks softer than anything I've had abroad.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Hamza S.",
    role: "Founder",
    quote:
      "Finally a place that takes men's grooming seriously. Skin fade is precise every single time and the hot shave is a real ritual.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Sana K.",
    role: "Bride, March '26",
    quote:
      "They styled me for my nikkah and walima. Calm, organised, and the photos still look like they were taken in another universe.",
    rating: 5,
  },
];

// ---------- helpers ----------
export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getServicesByCategory(id: string): Service[] {
  return services.filter((s) => s.categoryId === id);
}

export function getFeaturedServices(): Service[] {
  return services.filter((s) => s.featured);
}

export function getServiceBySlug(
  category: string,
  slug: string,
): Service | undefined {
  return services.find((s) => s.categoryId === category && s.slug === slug);
}
