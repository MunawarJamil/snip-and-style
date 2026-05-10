import { About } from "@/components/sections/About";
import { CategoryCards } from "@/components/sections/CategoryCards";
import { FeaturedServices } from "@/components/sections/FeaturedServices";
import { Hero } from "@/components/sections/Hero";
import { Testimonials } from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryCards />
      <FeaturedServices />
      <About />
      <Testimonials />
    </>
  );
}
