import HeroSection from './components/home/HeroSection';
import FeaturesSection from './components/home/FeaturesSection';
import HowItWorksSection from './components/home/HowItWorksSection';
import CtaSection from './components/home/CtaSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
