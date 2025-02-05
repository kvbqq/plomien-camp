"use client";

import Image from "next/image";
import PlomienLogo from "@/public/plomien-milowice-logo.webp";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export const About = () => {
  const isDesktop = useMediaQuery("(min-width: 1000px)");

  return (
    <section id="o-nas" className={`w-full my-10 flex flex-col items-center`}>
      <h1
        className={`${
          isDesktop ? "w-[60rem] text-[2rem]" : "w-full text-2xl text-center"
        } pb-6 font-bold`}
      >
        O nas
      </h1>
      <div
        className={`${
          isDesktop
            ? "w-[60rem] grid grid-cols-3 gap-8"
            : "w-[90%] flex flex-col items-center text-center"
        }`}
      >
        {/* LOGO NA MOBILE – będzie nad tekstem */}

        <div
          className={`${
            isDesktop ? "text-lg" : "text-base"
          } col-span-2 space-y-4`}
        >
          <p>
            <span className="font-semibold text-custom-red">
              Płomień Volleyball Camp
            </span>{" "}
            to projekt organizowany przez Akademię Siatkówki Płomień Milowice,
            dynamicznie rozwijający się ośrodek szkoleniowy, uznawany za jeden z
            najszybciej rosnących w Polsce.
          </p>
          <p>
            Nasze obozy to miejsce, gdzie młodzi pasjonaci siatkówki doskonalą
            swoje umiejętności pod okiem profesjonalnych trenerów z Akademii,
            którzy na co dzień szkolą przyszłe pokolenia siatkarzy.
          </p>
          <p>
            Łączymy pasję do sportu z wartościami, takimi jak współpraca,
            szacunek i radość z gry, tworząc niezapomniane doświadczenia, które
            motywują uczestników do dalszego rozwoju.
          </p>
        </div>

        {!isDesktop && (
          <Image
            src={PlomienLogo}
            alt="Płomień Milowice - logo"
            quality={100}
            width={200}
            height={200}
            className="mt-10"
          />
        )}

        {/* LOGO NA DESKTOP – zostaje obok tekstu */}
        {isDesktop && (
          <Image
            src={PlomienLogo}
            alt="Płomień Milowice - logo"
            quality={100}
            width={250}
            height={250}
            className="m-auto"
          />
        )}
      </div>
    </section>
  );
};
