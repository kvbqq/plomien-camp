"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import { Button } from "@/components/button/Button";
import { Slider } from "@/components/slider/Slider";
import { firstSliderElements } from "@/constants/constants";

// Slajdy (pliki wrzuć do /public)
// Jeśli masz inne nazwy -> podmień src
const landingImages = [
  { src: "/1.png", alt: "Slajd 1" },
  { src: "/2.png", alt: "Slajd 2" },
  { src: "/3.png", alt: "Slajd 3" },
  { src: "/4.png", alt: "Slajd 4" },
  { src: "/5.png", alt: "Slajd 5" },
  { src: "/6.png", alt: "Slajd 5" },
];

export const Landing = () => {
  const isDesktop = useMediaQuery("(min-width: 1000px)");
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
    renderMode: "precision",
    drag: false,
    defaultAnimation: { duration: 2000 },
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
    created(s) {
      setInterval(() => {
        s.next();
      }, 4000);
    },
  });

  // ważne na przełączanie mobile/desktop (jak u Ciebie w Milowicach)
  useEffect(() => {
    if (slider) {
      const timeout = setTimeout(() => {
        slider.current?.update();
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [slider, isDesktop]);

  return (
    <section className="h-[75svh] min-h-[500px] relative">
      <div
        className={`absolute inset-0 w-vw bg-gradient-to-r from-custom-red to-custom-blue -z-10`}
      ></div>

      {isDesktop ? (
        <div
          className="absolute inset-0 h-svh min-h-[1920px] min-w-[800px] bg-white -z-10"
          style={{
            transform: "rotate(115deg) translateX(-400px) translateY(76%)",
          }}
        ></div>
      ) : null}

      <div className={`h-full w-full flex justify-center`}>
        <div
          className={`${
            isDesktop
              ? "w-[63rem] gap-14"
              : "w-[90%] items-center justify-center gap-5 flex-col-reverse"
          } flex h-full pt-20`}
        >
          {/* TU BYŁO IMAGE -> TERAZ JEST KEEN SLIDER */}
          <div
            className={`${
              isDesktop ? "w-1/2" : "relative w-full max-w-[22rem] h-1/3 mb-5"
            } flex items-center`}
          >
            <div
              ref={sliderRef}
              className={`keen-slider relative overflow-hidden ${
                isDesktop ? "w-[500px] h-[340px]" : "w-full h-full"
              }`}
              style={{ borderRadius: "1rem" }}
            >
              {landingImages.map((img, idx) => (
                <div
                  key={idx}
                  className="keen-slider__slide relative w-full h-full transform-gpu"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    quality={100}
                    objectFit="cover"
                  />
                </div>
              ))}

              {/* kropki */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {landingImages.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-3 h-3 rounded-full transition-all duration-500 border-2 border-white ${
                      currentSlide === idx ? "bg-white" : ""
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* PRAWA KOLUMNA – BEZ ZMIAN */}
          <div
            className={`${
              isDesktop ? "w-1/2 gap-3" : "max-w-[22rem] gap-2"
            } flex flex-col justify-center text-white`}
          >
            <h2 className={`${isDesktop ? "text-lg" : "text-[12px]"}`}>
              PŁOMIEŃ VOLLEYBALL CAMP
            </h2>

            <h1
              className={`${isDesktop ? "text-5xl" : "text-2xl/7"} font-bold`}
            >
              Tutaj rodzą
              <br />
              się mistrzowie!
            </h1>

            <p className={`${isDesktop ? "text-lg" : "text-sm"}`}>
              Obozy siatkarskie z doświadczoną kadrą,
              <br />
              nowoczesnymi metodami treningowymi
              <br />i niezapomnianą atmosferą - wszystko, czego
              <br />
              potrzebujesz, by rozpalić siatkarski płomień
            </p>

            <Button
              text="SPRAWDŹ NASZĄ OFERTĘ"
              href="#campy"
              style={`${isDesktop ? "w-[90%]" : "w-[22rem]"} font-semibold`}
            />
          </div>
        </div>
      </div>

      {/* DOLNY SLIDER – BEZ ZMIAN */}
      <Slider elements={firstSliderElements} style="bg-white" />
    </section>
  );
};
