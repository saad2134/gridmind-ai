import Hero from "@/components/sections/hero/default";
import FeaturesSection from "@/components/sections/features/default";
import AboutSection from "@/components/sections/about/default";
import FAQSection from "@/components/sections/faq/default";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturesSection />
      <AboutSection />
      <FAQSection />
    </>
  );
}
