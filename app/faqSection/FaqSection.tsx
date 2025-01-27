import React from "react";

import { FaqElement } from "@/components/faqElement/FaqElement";

export const FaqSection = () => {
  return (
    <section className={`w-full my-20 flex justify-center items-center`}>
      <div
        className={`w-[60rem] flex items-center flex-col p-20 rounded-3xl border border-gray-100 shadow-lg`}
      >
        <h1 className={`mb-20 font-bold text-[2rem] align-center`}>
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
          answer="Proces rejestracji jest prosty i odbywa się online poprzez formularz na naszej stronie."
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
