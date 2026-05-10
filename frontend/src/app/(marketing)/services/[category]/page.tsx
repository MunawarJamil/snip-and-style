import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategoryHero } from "@/components/sections/category/CategoryHero";
import { CategoryPillars } from "@/components/sections/category/CategoryPillars";
import { CategorySignatures } from "@/components/sections/category/CategorySignatures";
import { CategoryMenu } from "@/components/sections/category/CategoryMenu";
import { CategorySpotlight } from "@/components/sections/category/CategorySpotlight";
import { CategoryProcess } from "@/components/sections/category/CategoryProcess";
import { CategoryArtists } from "@/components/sections/category/CategoryArtists";
import { CategoryFAQ } from "@/components/sections/category/CategoryFAQ";
import { CategoryCTA } from "@/components/sections/category/CategoryCTA";
import {
  categories,
  getCategory,
  getCategoryContent,
  getFAQsByCategory,
  getFeaturedByCategory,
  getServicesByCategory,
  getStylistsByCategory,
} from "@/data/services";
import type { CategoryId } from "@/types";

const VALID: CategoryId[] = ["women", "men"];

function isValid(id: string): id is CategoryId {
  return (VALID as string[]).includes(id);
}

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  if (!isValid(category)) return {};
  const cat = getCategory(category);
  if (!cat) return {};

  return {
    title: `${cat.name} — Snip & Style`,
    description: cat.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!isValid(category)) notFound();

  const cat = getCategory(category);
  if (!cat) notFound();

  const content = getCategoryContent(category);
  const services = getServicesByCategory(category);
  const featured = getFeaturedByCategory(category);
  const stylists = getStylistsByCategory(category);
  const faqs = getFAQsByCategory(category);

  return (
    <>
      <CategoryHero category={cat} content={content} services={services} />
      <CategoryPillars content={content} />
      <CategorySignatures category={cat} services={featured} />
      <CategoryMenu category={cat} content={content} services={services} />
      <CategorySpotlight category={cat} content={content} />
      <CategoryProcess content={content} />
      <CategoryArtists category={cat} stylists={stylists} />
      <CategoryFAQ faqs={faqs} />
      <CategoryCTA category={cat} content={content} />
    </>
  );
}
