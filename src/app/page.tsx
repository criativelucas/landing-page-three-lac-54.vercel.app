import BrainCanvasLoader from "@/components/BrainCanvasLoader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SectionNavProvider from "@/components/SectionNavProvider";
import JsonLd from "@/components/JsonLd";
import Hero from "@/components/sections/Hero";
import SocialProofBar from "@/components/sections/SocialProofBar";
import Problem from "@/components/sections/Problem";
import Pricing from "@/components/sections/Pricing";
import Process from "@/components/sections/Process";
import Work from "@/components/sections/Work";
import Testimonials from "@/components/sections/Testimonials";
import Founder from "@/components/sections/Founder";
import Guarantee from "@/components/sections/Guarantee";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <JsonLd />
      <BrainCanvasLoader />
      <Navbar />
      <SectionNavProvider />
      <main id="main-content" className="flex-1">
        <Hero />
        <div className="relative bg-background">
          <SocialProofBar />
          <Problem />
          <Pricing />
          <Process />
          <Work />
          <Testimonials />
          <Founder />
          <Guarantee />
          <Faq />
        </div>
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
