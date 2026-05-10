import type {
  Category,
  CategoryContent,
  CategoryId,
  FAQ,
  Service,
  Stylist,
  Testimonial,
} from "@/types";

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
    group: "hair",
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
    group: "color",
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
    group: "hair",
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
    group: "skin",
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
    group: "nails",
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
    group: "nails",
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
    group: "spa",
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
    group: "bridal",
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
    group: "hair",
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
    group: "hair",
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
    group: "beard",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=1200&q=80",
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
    group: "color",
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
    group: "skin",
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
    group: "grooming",
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
    group: "grooming",
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
    group: "spa",
    image:
      "https://images.unsplash.com/photo-1591343395082-e120087004b4?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    tags: ["spa", "massage"],
  },
];

// ---------- stylists ----------
export const stylists: Stylist[] = [
  {
    id: "s-aiman",
    name: "Aiman Tariq",
    role: "Creative Director · Hair",
    bio: "Trained at Vidal Sassoon London. Aiman leads our cutting floor and signature consultations with an architect's eye for form.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=80",
    categoryIds: ["women"],
    years: 14,
    signature: "Editorial layered cuts",
  },
  {
    id: "s-zara",
    name: "Zara Mehmood",
    role: "Senior Color Specialist",
    bio: "A balayage purist with a quiet obsession over light. Zara hand-paints every strand for a finish that grows out as softly as it begins.",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=80",
    categoryIds: ["women"],
    years: 10,
    signature: "Hand-painted balayage",
  },
  {
    id: "s-noor",
    name: "Noor Shah",
    role: "Bridal & Editorial Lead",
    bio: "Noor styles the brides whose photographs you save. A calm presence on the most important morning of your year.",
    image:
      "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=900&q=80",
    categoryIds: ["women"],
    years: 12,
    signature: "Soft, modern bridal",
  },
  {
    id: "s-laila",
    name: "Laila Iqbal",
    role: "Skin Therapist",
    bio: "CIDESCO-certified facialist with a gentle, methodical hand. Laila reads skin the way most people read a book.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
    categoryIds: ["women"],
    years: 8,
    signature: "Lymphatic drainage facials",
  },
  {
    id: "s-omar",
    name: "Omar Raza",
    role: "Master Barber",
    bio: "Eight years on Savile Row and a steady hand on the straight razor. Omar believes a great fade is a quiet kind of confidence.",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=900&q=80",
    categoryIds: ["men"],
    years: 11,
    signature: "Skin fade & hot shave",
  },
  {
    id: "s-hassan",
    name: "Hassan Ali",
    role: "Senior Stylist · Men",
    bio: "Hassan blends classic technique with a contemporary read of how a man wants to be seen. Detailed, considered, never rushed.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
    categoryIds: ["men"],
    years: 9,
    signature: "Modern classic cuts",
  },
];

// ---------- FAQs ----------
export const faqs: FAQ[] = [
  {
    id: "faq-consult",
    question: "Do I need a consultation before my first service?",
    answer:
      "For colour, smoothing, and bridal services, yes — a 15-minute in-salon or video consultation is included free of charge so we can plan tone, technique, and timing properly. Cuts and skincare can be booked directly.",
    categoryIds: ["women", "men"],
  },
  {
    id: "faq-products",
    question: "What product lines do you carry?",
    answer:
      "Our shelves are curated, not crowded. We work with Davines, Olaplex, Wella Professionals, and ZO Skin Health — all sulfate-free where possible and ammonia-conscious across the colour bar.",
    categoryIds: ["women", "men"],
  },
  {
    id: "faq-bridal-lead",
    question: "How far in advance should I book my bridal package?",
    answer:
      "Eight to twelve weeks for the trial, with the day-of slot reserved at the time of booking. For peak wedding season (October — March) we recommend reaching out four months ahead.",
    categoryIds: ["women"],
  },
  {
    id: "faq-balayage-time",
    question: "How long does balayage take?",
    answer:
      "Plan for three to four hours including the consultation, application, processing, glossing, and finishing blow-dry. We'll let you know exactly when you book, based on your hair length and starting tone.",
    categoryIds: ["women"],
  },
  {
    id: "faq-children",
    question: "Do you take walk-ins or younger guests?",
    answer:
      "We are an appointment-only studio so each guest gets the full attention of their stylist. We welcome guests aged 12 and above — younger children are best served at a dedicated kids' salon.",
    categoryIds: ["women", "men"],
  },
  {
    id: "faq-cancellation",
    question: "What's your cancellation policy?",
    answer:
      "Reschedule or cancel up to 24 hours before your appointment with no charge. Within 24 hours, a 50% retention applies; no-shows are charged in full so we can pay the artist for their reserved time.",
    categoryIds: ["women", "men"],
  },
  {
    id: "faq-shave",
    question: "How is a hot-towel shave different from a regular shave?",
    answer:
      "We open the pores with steamed towels, soften the beard with pre-shave oil, then take two passes with a straight razor — first with the grain, then against. The finish is closer than any cartridge shave and soothing rather than abrasive.",
    categoryIds: ["men"],
  },
];

// ---------- per-category extended content ----------
export const categoryContent: Record<CategoryId, CategoryContent> = {
  women: {
    id: "women",
    heroEyebrow: "The Atelier · For Her",
    heroTitle: "Where every visit is a",
    heroAccent: "small portrait",
    heroSuffix: ".",
    heroLead:
      "A quiet studio shaped around the women who walk through it — colour, cut, skin, and ceremony, all delivered without rush.",
    heroQuote:
      "The atelier feels like an old friend's living room, only the friend happens to be the best colourist in the city.",
    heroQuoteAttribution: "VOGUE Arabia, on Snip & Style",
    heroImage:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2000&q=85",
    heroPortrait:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1400&q=85",
    pillars: [
      {
        title: "Master colourists",
        description:
          "A team led by Sassoon-trained artists with a genuine fluency in soft, lived-in colour.",
      },
      {
        title: "Sulfate-free, always",
        description:
          "Every wash, treatment, and finish uses considered products — clean formulas, real results.",
      },
      {
        title: "Bridal specialists",
        description:
          "Trial sessions, day-of styling, and on-site touch-ups planned with the calm of a wedding planner.",
      },
      {
        title: "Unhurried by design",
        description:
          "Appointments are spaced so your stylist can be fully present — no double-booking, no rush.",
      },
    ],
    groupOrder: [
      {
        group: "hair",
        label: "Hair & Styling",
        description:
          "Cuts, blow-dries, and treatments tailored to your hair's character — not a trend chart.",
      },
      {
        group: "color",
        label: "Colour Bar",
        description:
          "Hand-painted technique, ammonia-conscious formulas, and the kind of glaze you can feel.",
      },
      {
        group: "skin",
        label: "Skin & Facials",
        description:
          "Brightening, balancing, restorative — skin rituals tuned to your week, not just your skin type.",
      },
      {
        group: "nails",
        label: "Hands & Feet",
        description:
          "Quiet, careful manicures and pedicures that treat the ritual as much as the result.",
      },
      {
        group: "spa",
        label: "Spa & Body",
        description:
          "A small, calm spa wing for the days you want the city to fall away.",
      },
      {
        group: "bridal",
        label: "Bridal",
        description:
          "Considered packages for the bride who wants to look like the best version of herself, not a stranger.",
      },
    ],
    spotlight: {
      eyebrow: "Bridal Atelier",
      title: "The morning of your",
      accent: "biggest yes",
      description:
        "From the trial to the goodbye coffee, our bridal package is built like a small production: a dedicated artist, a planned timeline, and a steady, unhurried hand on the morning that matters most.",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=85",
      bullets: [
        "Two-hour trial session, eight weeks ahead",
        "Day-of hair, makeup, and dressing",
        "On-site touch-up between functions",
        "Calm, organised arrival window",
      ],
      serviceSlug: "bridal-styling",
    },
    process: [
      {
        title: "Consult",
        description:
          "We start with a quiet ten minutes — your hair history, what you've loved, what you're moving toward.",
      },
      {
        title: "Plan",
        description:
          "Your artist sketches a plan you can see, with timing and pricing confirmed before any product is mixed.",
      },
      {
        title: "Craft",
        description:
          "Cut, colour, or treatment, performed by a single artist from start to finish — no chair-hopping.",
      },
      {
        title: "Send-off",
        description:
          "A finishing styling, an aftercare card, and a coffee for the road. We'll text to check in three days later.",
      },
    ],
  },
  men: {
    id: "men",
    heroEyebrow: "The Barbershop · For Him",
    heroTitle: "Sharp lines.",
    heroAccent: "Quiet confidence",
    heroSuffix: ".",
    heroLead:
      "A modern barbershop built around precision haircuts, classic shaves, and grooming rituals that respect both the craft and your time.",
    heroQuote:
      "It feels less like a barbershop and more like a tailor — the same fastidiousness about millimetres, the same calm.",
    heroQuoteAttribution: "GQ Pakistan",
    heroImage:
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=2000&q=85",
    heroPortrait:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1400&q=85",
    pillars: [
      {
        title: "Master barbers",
        description:
          "Savile Row and London-trained barbers whose hands know the difference between a fade and a finish.",
      },
      {
        title: "Straight-razor shaves",
        description:
          "Steamed towels, two-pass technique, and a soothing balm finish — the proper way, every time.",
      },
      {
        title: "Considered grooming",
        description:
          "Skin, beard, and detail work that treats grooming as discipline, not afterthought.",
      },
      {
        title: "On time, always",
        description:
          "Arrive at your slot, leave at the time we promised. Your morning is not negotiable.",
      },
    ],
    groupOrder: [
      {
        group: "hair",
        label: "Cuts & Fades",
        description:
          "Classic, modern, and editorial cuts — every one finished with a hot-towel cleanse.",
      },
      {
        group: "beard",
        label: "Beard & Shave",
        description:
          "Sculpts, line-ups, and proper hot-towel straight-razor shaves.",
      },
      {
        group: "color",
        label: "Colour & Grey",
        description:
          "Subtle grey blending and natural tone work that nobody is meant to notice — except, perhaps, you.",
      },
      {
        group: "skin",
        label: "Skin & Facials",
        description:
          "Targeted, no-fuss skin rituals built for a man's routine and Lahore's air.",
      },
      {
        group: "grooming",
        label: "Hands & Feet",
        description:
          "Executive manicures, classic pedicures — quiet maintenance done properly.",
      },
      {
        group: "spa",
        label: "Spa & Body",
        description:
          "Deep-tissue work and recovery sessions for shoulders carrying a long week.",
      },
    ],
    spotlight: {
      eyebrow: "The Hot-Towel Ritual",
      title: "The shave we",
      accent: "still mean",
      description:
        "A forty-minute ritual: steamed towels, a hand-blended pre-shave oil, two passes with a straight razor, and a cooling balm. The kind of grooming that used to be standard and somehow became rare.",
      image:
        "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1800&q=85",
      bullets: [
        "Steamed towel preparation",
        "Two-pass straight-razor shave",
        "Cooling balm and aftercare",
        "Beard line-up if desired",
      ],
      serviceSlug: "beard-sculpt",
    },
    process: [
      {
        title: "Brief",
        description:
          "A short, direct conversation — the look you want, the routine you keep, what you'd rather avoid.",
      },
      {
        title: "Plan",
        description:
          "Your barber confirms the cut, fade level, and finish before reaching for a single tool.",
      },
      {
        title: "Cut",
        description:
          "Precision work performed in a single chair, by a single barber, from first cut to final detail.",
      },
      {
        title: "Finish",
        description:
          "Hot-towel cleanse, product to taste, and a clear note on when to come back. No upsell theatre.",
      },
    ],
  },
};

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

export function getCategoryContent(id: CategoryId): CategoryContent {
  return categoryContent[id];
}

export function getStylistsByCategory(id: CategoryId): Stylist[] {
  return stylists.filter((s) => s.categoryIds.includes(id));
}

export function getFAQsByCategory(id: CategoryId): FAQ[] {
  return faqs.filter((f) => f.categoryIds.includes(id));
}

export function getFeaturedByCategory(id: CategoryId): Service[] {
  return services.filter((s) => s.categoryId === id && s.featured);
}
