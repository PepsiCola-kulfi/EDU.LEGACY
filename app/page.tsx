import Hero from "../components/Hero";
import Partners from "../components/Partners";
import Features from "../components/Features";
import WillInfo from "../components/WillInfo";
import ImpactSection from "../components/ImpactSection";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar"; // Import Navbar

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white antialiased">
      <Navbar />
      <main>
        <Hero />
        {/* <Partners /> */}
        <Features />
        <WillInfo />
        {/* <ImpactSection /> */}
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
