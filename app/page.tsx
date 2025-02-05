import { Nav } from "./navbar/Nav";
import { Landing } from "./landing/Landing";
import LandingCamps from "./landingCamps/LandingCamps";
import { About } from "./about/About";
import { Coach } from "./coach/Coach";
import LandingGallery from "./landingGallery/LandingGallery";
import { Partners } from "./partners/Partners";
import { FaqSection } from "./faqSection/FaqSection";

export default function Home() {
  return (
    <main>
      <Nav isLanding={true} />
      <Landing />
      <LandingCamps />
      <About />
      <Coach />
      <LandingGallery />
      <Partners />
      <FaqSection />
    </main>
  );
}
