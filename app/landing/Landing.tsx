"use client";

import Image from "next/image";

import LandingImage from "@/public/landing-main.webp";

import { useMediaQuery } from "@/hooks/useMediaQuery";

import { Button } from "@/components/button/Button";
import { Slider } from "@/components/slider/Slider";
import { firstSliderElements } from "@/constants/constants";

export const Landing = () => {
  const isDesktop = useMediaQuery("(min-width: 1000px)");

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
          <div
            className={`${
              isDesktop ? "w-1/2" : "relative w-full max-w-[22rem] h-1/3 mb-5"
            } flex items-center`}
          >
            {isDesktop ? (
              <Image
                src={LandingImage}
                alt={"Płomień Camp"}
                width={500}
                quality={100}
                style={{
                  borderRadius: "1rem",
                }}
              />
            ) : (
              <Image
                src={LandingImage}
                alt={"Płomień Camp"}
                fill
                objectFit="cover"
                quality={100}
                style={{
                  borderRadius: "1rem",
                }}
              />
            )}
          </div>

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
      <Slider elements={firstSliderElements} style="bg-white" />
    </section>
  );
};
