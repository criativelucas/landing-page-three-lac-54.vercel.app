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
        {/* Order is the argument: agitate the problem, show the mechanism, prove
            it works, then social proof. Only once the value is built does Pricing
            appear, immediately backed by the founder and the guarantee, with the
            FAQ mopping up the last objections before the ask. Moving Pricing
            earlier puts a number in front of a visitor who has no reason to want
            it yet. Section backgrounds alternate and each one mounts onto the
            previous with -mt/rounded-t, so reordering means moving those classes
            too (see Process/Pricing). */}
        <div className="relative bg-background">
          <SocialProofBar />
          <Problem />
          <Process />
          <Work />
          <Testimonials />
          <Pricing />
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
