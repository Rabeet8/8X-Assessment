import HeroSection from '../components/sections/HeroSection';
import FeaturesGrid from '../components/sections/FeaturesGrid';
import MarketingStudio from '../components/sections/MarketingStudio';
import CanvasWorkspace from '../components/sections/CanvasWorkspace';
import ProjectGallery from '../components/sections/ProjectGallery';

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="container">
        <FeaturesGrid />
        <MarketingStudio />
        <CanvasWorkspace />
        <ProjectGallery />
      </div>
    </>
  );
}
