"use client";

import React from "react";
// Importujemy Twój nowy komponent
import { MaterialIcon } from "@/components/materialIcon/MaterialIcon";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export const CampOffer: React.FC = () => {
  const isDesktop = useMediaQuery("(min-width: 1000px)");

  // Lista funkcji z nazwami ikon (string) zamiast komponentów
  const features = [
    {
      iconName: "sports",
      title: (
        <>
          Trenuj z <span className="text-custom-red">najlepszymi</span>
        </>
      ),
      description:
        "Ucz się pod okiem specjalistów od szkolenia siatkarskich mistrzów.",
    },
    {
      iconName: "person_search",
      title: (
        <>
          Indywidualne <span className="text-custom-red">podejście</span>
        </>
      ),
      description:
        "Widzimy Twój potencjał. Pomożemy Ci go uwolnić i wzmocnić Twoje mocne strony.",
    },
    {
      iconName: "workspace_premium",
      title: (
        <>
          Siatkarski <span className="text-custom-red">Level‑UP</span>
        </>
      ),
      description:
        "Intensywny program szkoleniowy, który gwarantuje zauważalny postęp.",
    },
    {
      iconName: "psychology",
      title: (
        <>
          Fundamenty <span className="text-custom-red">mistrzów</span>
        </>
      ),
      description:
        "Treningi motoryczne, warsztaty z psychologiem sportowym i dietetykiem.",
    },
    {
      iconName: "sunny",
      title: (
        <>
          Trening <span className="text-custom-red">hybrydowy</span>
        </>
      ),
      description:
        "Trenujemy na nowoczesnej hali, boiskach zewnętrznych oraz na plaży.",
    },
    {
      iconName: "diversity_3",
      title: (
        <>
          Atmosfera i <span className="text-custom-red">team spirit</span>
        </>
      ),
      description:
        "Gwarantujemy nowe przyjaźnie i zgraną drużynę, za którą będziesz tęsknić.",
      fill: true, // Opcjonalnie: wypełnienie dla tej konkretnej ikony
    },
  ];

  return (
    <div className="w-full flex justify-center my-20">
      <div className={`${isDesktop ? "w-[60rem]" : "w-full"} px-4`}>
        <div
          className={`grid ${isDesktop ? "grid-cols-3" : "grid-cols-1"} gap-8`}
        >
          {features.map(({ iconName, title, description, fill }, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-8 border border-gray-100 shadow-lg rounded-2xl bg-white hover:border-custom-red transition-colors duration-300"
            >
              {/* Użycie MaterialIcon z odpowiednimi klasami Tailwind */}
              <MaterialIcon
                iconName={iconName}
                className="text-custom-red text-[64px] mb-4"
                fill={fill}
              />
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-base font-normal leading-snug text-gray-600">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
