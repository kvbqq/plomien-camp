import Image from "next/image";

import { Slider } from "@/components/slider/Slider";

import CoachImage from "@/public/coach.png";

import { secondSliderElements } from "@/constants/constants";

export const Coach = () => {
  return (
    <section
      className={`w-full my-20 flex justify-center items-center flex-col`}
    >
      <h1 className={`w-[60rem] pb-10 font-bold text-[2rem] align-center`}>
        Koordynatorka <span className={`text-custom-red`}>campów</span>
      </h1>
      <div className={`w-[60rem] mb-20 flex justify-between items-end`}>
        <Image
          src={CoachImage}
          alt="Agata Kopczyk"
          style={{
            width: "40%",
            height: "50%",
          }}
        />
        <div className={`p-8 rounded-3xl border border-gray-100 shadow-lg`}>
          <p className={`text-lg`}>
            <span className={`font-semibold`}>Agata Kopczyk</span> to trenerka o{" "}
            <span className={`text-custom-red`}>krajowej renomie</span>,
            <br />
            łącząca bogate doświadczenie zawodnicze
            <br />z ogromną pasją do pracy z młodzieżą.{" "}
            <span className={`text-custom-red`}>
              Była
              <br />
              reprezentantka Polski i medalistka Mistrzostw
              <br />
              Polski
            </span>
            , po zakończeniu kariery sportowej skupiła
            <br />
            się na szkoleniu młodych talentów, osiągając
            <br />
            z nimi liczne sukcesy na turniejach
            <br />
            ogólnopolskich. Jej podopieczni odnoszą
            <br />
            znaczące wyniki na krajowych parkietach,
            <br />a wielu z nich kontnuuje karierę w{" "}
            <span className={`text-custom-red`}>
              Tauron
              <br />
              Lidze i reprezentacjach Polski
            </span>
            . Trenerka Agata
            <br />
            jest ceniona za swoje indywidualne podejście,
            <br />
            które pozwala młodym zawodnikom nie tylko
            <br />
            rozwijać umiejętności siatkarskie, ale także
            <br />
            uczyć się dyscypliny, współpracy i czerpania
            <br />
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
