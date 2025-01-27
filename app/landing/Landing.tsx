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
            isDesktop ? "w-[63rem]" : "w-[90%]"
          } h-full pt-20 flex gap-14`}
        >
          {isDesktop ? (
            <div className={`w-1/2 flex items-center`}>
              <Image
                src={LandingImage}
                alt={"Płomień Camp"}
                width={500}
                quality={100}
                style={{
                  borderRadius: "1rem",
                }}
              />
            </div>
          ) : null}

          <div
            className={`${
              isDesktop ? "w-1/2" : "w-full"
            } flex flex-col justify-center gap-3 text-white`}
          >
            <h2 className={`text-lg`}>PŁOMIEŃ VOLLEYBALL CAMP</h2>
            <h1 className={`font-bold text-5xl`}>
              Tutaj rodzą
              <br />
              się mistrzowie!
            </h1>
            <p className={`text-lg`}>
              Obozy siatkarskie z doświadzczoną kadrą,
              <br />
              nowoczesnymi metodami traningowymi
              <br />i niezapomnianą atmosferą - wszystko, czego
              <br />
              potrzebujesz, by rozpalić siatkarski płomień
            </p>
            <Button
              text="SPRAWDŹ NASZĄ OFERTĘ"
              href=""
              style="w-[90%] font-semibold"
            />
          </div>
        </div>
      </div>
      <Slider elements={firstSliderElements} style="bg-white" />
    </section>
  );
};
