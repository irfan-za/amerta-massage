import { LangProvider } from "./LangProvider";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { TrustMarquee } from "./TrustMarquee";
import { Services } from "./Services";
import { ServiceModal } from "./ServiceModal";
import { About } from "./About";
import { HowItWorks } from "./HowItWorks";
import { BookingSection } from "./BookingSection";
import { Testimonials } from "./Testimonials";
import { FaqCoverage } from "./FaqCoverage";
import { CtaBand } from "./CtaBand";
import { Footer } from "./Footer";
import { FloatingWA } from "./FloatingWA";

export function Landing() {
  return (
    <LangProvider>
      <Navbar />
      <main>
        <Hero />
        <TrustMarquee />
        <Services />
        <About />
        <HowItWorks />
        <BookingSection />
        <Testimonials />
        <FaqCoverage />
        <CtaBand />
      </main>
      <Footer />
      <ServiceModal />
      <FloatingWA />
    </LangProvider>
  );
}
