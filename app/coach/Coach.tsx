"use client";

import Image from "next/image";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import { Slider } from "@/components/slider/Slider";

import CoachImage from "@/public/coach.png";

import { secondSliderElements } from "@/constants/constants";

export const Coach = () => {
  const isDesktop = useMediaQuery("(min-width: 1000px)");

  return (
    <section
      className={`w-full my-20 flex justify-center items-center flex-col`}
    >
      <h1
        className={`${
          isDesktop ? "w-[60rem] text-[2rem]" : "w-full text-2xl text-center"
        } pb-6 font-bold`}
      >
        Koordynatorka <span className={`text-custom-red`}>campów</span>
      </h1>
      <div
        className={`${
          isDesktop
            ? "w-[60rem] justify-between items-end"
            : "w-[90%] flex-col-reverse items-center"
        } mb-20 flex gap-14`}
      >
        <Image
          src={CoachImage}
          alt="Agata Kopczyk"
          quality={100}
          width={isDesktop ? 400 : 300}
          height={isDesktop ? 300 : 250}
        />
        <div className={`p-8 rounded-3xl border border-gray-100 shadow-lg`}>
          <p className={`${isDesktop ? "text-lg" : "text-base text-center"}`}>
            <span className={`font-semibold`}>Agata Kopczyk</span> to trenerka o
            <span className={`text-custom-red`}> krajowej renomie</span>,
            łącząca bogate doświadczenie zawodnicze z ogromną pasją do pracy z
            młodzieżą.
            <span className={`text-custom-red`}>
              {" "}
              Była reprezentantka Polski i medalistka Mistrzostw Polski
            </span>
            , po zakończeniu kariery sportowej skupiła się na szkoleniu młodych
            talentów, osiągając z nimi liczne sukcesy na turniejach
            ogólnopolskich. Jej podopieczni odnoszą znaczące wyniki na krajowych
            parkietach, a wielu z nich kontnuuje karierę w
            <span className={`text-custom-red`}>
              {" "}
              Tauron Lidze i reprezentacjach Polski
            </span>
            . Trenerka Agata jest ceniona za swoje indywidualne podejście, które
            pozwala młodym zawodnikom nie tylko rozwijać umiejętności
            siatkarskie, ale także uczyć się dyscypliny, współpracy i czerpania
            radości z gry.
          </p>
        </div>
      </div>
      <Slider
        elements={secondSliderElements}
        style="text-white bg-custom-blue"
      />
    </section>
  );
};
