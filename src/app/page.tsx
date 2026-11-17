import AboutSection from "@/components/about/AboutSection";
import ContactSection from "@/components/contact/ContactSection";
import ExpertiseSection from "@/components/expertise/ExpertiseSection";
import HeroSection from "@/components/hero/HeroSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import ServicesSection from "@/components/services/ServicesSection";
import Footer from "@/components/layout/Footer";
import Navigation from "@/components/layout/Navigation";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SmoothScroll from "@/components/animations/SmoothScroll";

export default function Home() {
  return (
    <>
      <SmoothScroll />

      <div className="min-h-screen bg-[#05070b] text-white">
        <Navigation />

        <main>
          <HeroSection />

          <ScrollReveal>
            <AboutSection />
          </ScrollReveal>

          <ScrollReveal>
            <ExpertiseSection />
          </ScrollReveal>

          <ScrollReveal>
            <ProjectsSection />
          </ScrollReveal>

          <ScrollReveal>
            <ServicesSection />
          </ScrollReveal>

          <ScrollReveal>
            <ContactSection />
          </ScrollReveal>
        </main>

        <Footer />
      </div>
    </>
  );
}
