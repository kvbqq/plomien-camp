import Image from "next/image";

import PlomienLogo from "@/public/plomien-milowice-logo.webp";

export const About = () => {
  return (
    <section
      id="about"
      className={`w-full my-20 flex justify-center items-center flex-col`}
    >
      <h1 className={`w-[60rem] pb-10 font-bold text-[2rem] align-center`}>
        O nas
      </h1>
      <div className={`w-[60rem] grid grid-cols-3`}>
        <div className={`text-xl col-span-2 space-y-5`}>
          <p>
            <span className={`font-semibold text-custom-red`}>
              Płomień Volleyball Camp
            </span>{" "}
            to projekt organizowany przez
            <br />
            Akademię Siatkówki Płomień Milowice, dynamicznie
            <br />
            rozwijający się ośrodek szkoleniowy, uznawany za jeden
            <br />z najszybciej rosnących w Polsce.
          </p>
          <p>
            Nasze obozy to miejsce, gdzie młodzi pasjonaci siatkówki
            <br />
            doskonalą swoje umiejętności pod okiem profesjonalnych
            <br />
            trenerów z Akademii, którzy na co dzień szkolą przyszłe
            <br />
            pokolenia siatkarzy.
          </p>
          <p>
            Łączymy pasję do sportu z wartościami, takimi jak
            <br />
            współpraca, szacunek i radość z gry, tworząc
            <br />
            niezapomniane doświadczenia, które motywują
            <br />
            uczestników do dalszego rozwoju.
          </p>
        </div>
        <Image
          src={PlomienLogo}
          alt="Płomień Milowice - logo"
          quality={100}
          style={{
            width: "100%",
            height: "90%",
            margin: "auto",
          }}
        />
      </div>
    </section>
  );
};
