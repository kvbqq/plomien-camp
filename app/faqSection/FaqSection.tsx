"use client";

import React from "react";

import { FaqElement } from "@/components/faqElement/FaqElement";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export const FaqSection = () => {
  const isDesktop = useMediaQuery("(min-width: 1000px)");
  return (
    <section className={`w-full my-20 flex justify-center items-center`}>
      <div
        className={`${
          isDesktop ? "w-[60rem] p-20" : "w-[90%] p-10"
        } flex items-center flex-col rounded-3xl border border-gray-100 shadow-lg`}
      >
        <h1
          className={`${
            isDesktop ? "text-[2rem]" : "text-2xl text-center"
          } mb-20 font-bold align-center`}
        >
          Najczęściej zadawane pytania
        </h1>
        <FaqElement
          question="Dla jakiej grupy wiekowej jest przeznaczony obóz?"
          answer="Nasz obóz jest skierowany do dzieci i młodzieży w wieku od 10 do 17 lat."
        />
        <hr className="w-full mb-5 border-t-2 border-gray-200" />
        <FaqElement
          question="Czy moje dziecko potrzebuje doświadczenia w siatkówce, aby wziąć udział?"
          answer="Obozy są odpowiednie zarówno dla początkujących, jak i zaawansowanych zawodników."
        />
        <hr className="w-full mb-5 border-t-2 border-gray-200" />
        <FaqElement
          question="Jak wygląda typowy dzień na obozie?"
          answer="Przykładowy plan dnia zawiera treningi siatkówki, zajęcia integracyjne, czas na relaks oraz wieczorne aktywności."
        />
        <hr className="w-full mb-5 border-t-2 border-gray-200" />
        <FaqElement
          question="Jak mogę zapisać dziecko na obóz?"
          answer='Wystarczy wybrać turnus, przeczytać ofertę i kliknąć przycisk "Zapisz się". Nastąpi przekierowanie na stronę biura podróży, gdzie należy wybrać odpowiedni termin i kliknąć "Rezerwuj wstępnie". Następnie należy wypełnić formularz i kliknąć na samym dole przycisk "Rezerwuj". Po tym etapie biuro podróży skontaktuje się z państwem drogą mailową.'
        />
        <hr className="w-full mb-5 border-t-2 border-gray-200" />
        <FaqElement
          question="Czy moje dziecko będzie w grupie z rówieśnikami?"
          answer="Tak, uczestnicy są dzieleni na grupy według wieku i poziomu zaawansowania, aby zapewnić najlepsze warunki do nauki i integracji."
        />
      </div>
    </section>
  );
};
