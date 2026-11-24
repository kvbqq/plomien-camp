import { Nav } from "@/app/navbar/Nav";
import { Landing } from "@/app/landing/Landing";
import LandingCamps from "@/app/landingCamps/LandingCamps";
import { About } from "@/app/about/About";
import { Coach } from "@/app/coach/Coach";
import LandingGallery from "@/app/landingGallery/LandingGallery";
import { Partners } from "@/app/partners/Partners";
import { FaqSection } from "@/app/faqSection/FaqSection";

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
