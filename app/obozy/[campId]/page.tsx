"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import React, { useState, useEffect } from "react";

import { fetchData } from "@/graphqlClient";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import { IoMdPin } from "react-icons/io";
import { MdOutlineVerified } from "react-icons/md";
import { IoApps } from "react-icons/io5";

import { Nav } from "@/app/navbar/Nav";
import { Button } from "@/components/button/Button";
import { GallerySlider } from "@/components/gallerySlider/GallerySlider";
import { MaterialIcon } from "@/components/materialIcon/MaterialIcon";

import verifiedImage from "@/public/verified.png";
// import sporturLogo from "@/public/sportur-logo.png";
import map from "@/public/map.png";
import { GalleryCampType } from "@/types/types";
import { fbq } from "@/types/fbq";

const GET_CAMPS_QUERY_WHERE = `
    query GetCampsWhere($campId: String!) {
        camps(where: { slug: $campId }) {
            id
            slug
            name
            place
            date
            start
            end
            address
            priceBefore
            price
            link
            description
            foodInfo
            hallInfo
            includes
            image {
              url
            }
            hallImage {
              url
            }
            gallery(first: 100) {
              id
              url
            }
            visitId
            buttonId        
        }
    }
  `;

interface CampType {
  id: string;
  slug: string;
  name: string;
  place: string;
  date: string;
  start: string;
  end: string;
  address: string;
  priceBefore: string;
  price: string;
  link: string;
  description: string;
  foodInfo: string;
  hallInfo: string;
  includes: string[];
  image: {
    url: string;
  };
  hallImage: {
    url: string;
  };
  gallery: GalleryCampType[];
  visitId: string;
  buttonId: string;
}

export default function CampDetails() {
  const [camps, setCamps] = useState<CampType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isDesktop = useMediaQuery("(min-width: 1000px)");
  const { campId } = useParams();
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    if (showGallery) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showGallery]);

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const data = await fetchData(GET_CAMPS_QUERY_WHERE, { campId });
        setCamps(data.camps);
      } catch (err) {
        setError("Nie udało się załadować danych." + err);
      } finally {
        setLoading(false);
      }
    };

    fetchCamps();
  }, [campId]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof fbq !== "undefined" &&
      camps.length > 0
    ) {
      fbq("trackCustom", camps[0].visitId);
    }
  }, []);

  if (loading) return <p className="text-center">Ładowanie...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  if (camps.length == 0) return <p>Nie znaleziono obozu</p>;

  const offerItems = [
    {
      iconName: "sports",
      title: { before: "Trenuj z ", highlight: "najlepszymi" },
      description:
        "Ucz się pod okiem specjalistów od szkolenia siatkarskich mistrzów.",
    },
    {
      iconName: "person_search",
      title: { before: "Indywidualne ", highlight: "podejście" },
      description:
        "Widzimy Twój potencjał. Pomożemy Ci go uwolnić i wzmocnić Twoje mocne strony.",
    },
    {
      iconName: "workspace_premium",
      title: { before: "Siatkarski ", highlight: "Level-UP" },
      description:
        "Intensywny program szkoleniowy, który gwarantuje zauważalny postęp.",
    },
    {
      iconName: "psychology",
      title: { before: "Fundamenty ", highlight: "mistrzów" },
      description:
        "Treningi motoryczne, warsztaty z psychologiem sportowym i dietetykiem.",
    },
    {
      iconName: "wb_sunny",
      title: { before: "Trening ", highlight: "hybrydowy" },
      description:
        "Trenujemy na nowoczesnej hali, boiskach zewnętrznych oraz na plaży.",
    },
    {
      iconName: "groups",
      title: { before: "Atmosfera i ", highlight: "team spirit" },
      description:
        "Gwarantujemy nowe przyjaźnie i zgraną drużynę, za którą będziesz tęsknić.",
    },
  ];

  const stayItems = [
    {
      iconName: "shield_lock",
      title: { before: "Bezpieczeństwo ", highlight: "24/7" },
      description:
        "Ośrodek jest ogrodzony i monitorowany, dostępny tylko dla gości. Twoje dziecko jest bezpieczne i pod stałą opieką wychowawców 24/7.",
    },
    {
      iconName: "bed",
      title: { before: "Komfort & ", highlight: "Integracja" },
      description:
        "Pokoje 4–5 osobowe z łazienkami. Idealne warunki, by budować przyjaźnie na całe życie w swojej campowej drużynie.",
    },
    {
      iconName: "anchor",
      title: { before: "100m do ", highlight: "Morza" },
      description:
        "Mieszkamy tuż przy plaży! Morski klimat, jod i szum fal towarzyszą nam każdego dnia.",
    },
  ];

  const mid = Math.ceil(camps[0].includes.length / 2);
  //const includesLeft = camps[0].includes.slice(0, mid);
  //const includesRight = camps[0].includes.slice(mid);

  return (
    <React.Fragment>
      <Nav isLanding={false} />
      <section
        className={`w-full mb-24 pt-44 relative flex justify-center items-center flex-col`}
      >
        <h1
          className={`${
            isDesktop ? "w-[60rem] text-2xl" : "w-[90%] text-xl"
          } pb-6 font-bold`}
        >
          {campId?.toString().slice(0, 1).toUpperCase()}
          {campId?.toString().slice(1).replace("-", " ")} -{" "}
          <span className={`text-custom-red`}>
            {camps[0].place.toUpperCase()}
          </span>
        </h1>
        <div
          className={`${
            isDesktop ? "w-[60rem]" : "w-[90%] flex-col"
          } flex gap-5`}
        >
          <div
            className={`${
              isDesktop ? "w-2/3 h-[350px]" : "w-full h-[250px]"
            } relative rounded-2xl hover:cursor-pointer`}
            onClick={() => setShowGallery(true)}
          >
            <Image
              src={camps[0].gallery[0].url}
              alt={camps[0].name}
              fill
              objectFit="cover"
              unoptimized
              quality={100}
              className={`rounded-2xl`}
            />
            <div
              className={`w-full h-full absolute inset-0 flex justify-end items-end`}
            >
              <div
                className={`m-5 px-5 py-2 flex gap-3 items-center bg-white rounded-full`}
              >
                <IoApps color="#EE3135" />
                <p className={`text-sm`}>Pokaż wszystkie zdjęcia</p>
              </div>
            </div>
          </div>
          <div
            className={`${
              isDesktop ? "w-1/3" : "w-full"
            } h-[350px] p-10 flex flex-col items-center rounded-2xl border border-gray-100 shadow-lg`}
          >
            <p className={`w-full font-semibold`}>
              <span className={`text-custom-red`}>Start:</span> {camps[0].start}
              <br />
              <span className={`text-custom-red`}>Koniec:</span> {camps[0].end}
            </p>
            <p className={`w-full mt-2 flex font-semibold gap-1`}>
              <IoMdPin size={24} color="#EE3135" />
              {camps[0].address}, {camps[0].place}
            </p>
            <h3
              className={`w-full mt-6 text-xl font-semibold text-center line-through`}
            >
              {camps[0].priceBefore} zł
            </h3>
            <h2
              className={`w-full mb-6 text-2xl text-custom-red font-semibold text-center`}
            >
              {camps[0].price} zł
            </h2>
            <Button
              text="ZAPISZ SIĘ"
              href={""}
              style="w-full font-semibold"
              onclick={() => {
                fbq("trackCustom", camps[0].buttonId);
                window.open(camps[0].link, "_blank");
              }}
            />
            <p className={`mt-2 text-sm`}>Liczba miejsc ograniczona</p>
          </div>
        </div>
        {showGallery ? (
          <GallerySlider
            images={camps[0].gallery}
            startId={0}
            showGallery={showGallery}
            setShowGallery={setShowGallery}
          />
        ) : null}
        <div
          className={`${
            isDesktop ? "w-[60rem]" : "flex-col items-center"
          } flex gap-5 my-10`}
        >
          {/* <div
            className={`${
              isDesktop ? "w-2/3 px-10" : "w-[90%] px-5"
            } py-5 flex gap-5 rounded-2xl border border-gray-100 shadow-lg`}
          > */}
          <div
            className={`${
              isDesktop ? "w-[100%] px-10" : "w-[90%] px-5"
            } py-5 flex gap-5 rounded-2xl border border-gray-100 shadow-lg`}
          >
            <div
              className={`${
                isDesktop ? "w-2/3" : "w-1/2"
              } flex items-center gap-4`}
            >
              <MdOutlineVerified size={52} color="#EE3135" />
              <p className={`${isDesktop ? null : "text-[0.6rem]"}`}>
                Obóz zgłoszony do Ministerstwa Sportu i Turystyki
              </p>
            </div>
            <div
              className={`${
                isDesktop ? "w-1/3" : "w-1/2"
              } h-[50px] relative flex items-center`}
            >
              <Image
                src={verifiedImage}
                alt={"Ministerstwo Sportu i Turystyki"}
                quality={100}
              />
            </div>
          </div>
          {/* <div
            className={`${
              isDesktop ? "w-1/3 px-10 gap-3" : "w-[90%] px-5 justify-between"
            } h-24 flex items-center rounded-2xl border border-gray-100 shadow-lg`}
          >
            <div
              className={`${
                isDesktop ? null : "w-1/2 justify-center"
              } flex items-center`}
            >
              <p className={`${isDesktop ? null : "text-[0.6rem]"}`}>
                Organizator: B.U.T Sportur
              </p>
            </div>
            <div
              className={`${
                isDesktop ? "w-2/3" : "w-1/2"
              } h-[50px] relative flex items-center justify-center`}
            >
              <Image src={sporturLogo} alt={"B.U.T Sportur"} quality={100} />
            </div>
          </div> */}
        </div>
        <h1 className={`${isDesktop ? "text-3xl" : "text-2xl"} font-semibold`}>
          Oferta <span className={`text-custom-red`}>campu</span>
        </h1>
        <div
          className={`${isDesktop ? "w-[60rem]" : "w-[90%]"} grid ${
            isDesktop ? "grid-cols-3" : "grid-cols-1"
          } gap-6 my-10`}
        >
          {offerItems.map((item) => (
            <div
              key={`${item.iconName}-${item.title.highlight}`}
              className="flex flex-col items-center text-center bg-white rounded-2xl shadow-lg border border-gray-100 px-8 py-10"
            >
              <MaterialIcon
                iconName={item.iconName}
                className="text-custom-red !text-8xl"
              />
              <h3 className="mt-6 text-2xl font-semibold leading-tight">
                {item.title.before}
                <span className="text-custom-red">{item.title.highlight}</span>
              </h3>
              <p className="mt-4 text-base font-semibold leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        {/* <div
          className={`${
            isDesktop ? "w-[60rem]" : "w-[90%] flex-col"
          } flex gap-10 px-14 py-10 my-10 rounded-2xl border border-gray-100 shadow-lg`}
        >
          <div className={`${isDesktop ? "w-1/2" : "w-full"}`}>
            <h2 className={`w-full mb-5 text-lg font-semibold text-center`}>
              Oferta <span className={`text-custom-red`}>siatkarska</span>
            </h2>
            <ul className={`list-disc`}>
              <li>Wykwalifikowana kadra trenerska</li>
              <li>Indywidualne podejście do każdego zawodnika</li>
              <li>Wszechstronny rozwój siatkarski</li>
              <li>Codzienne zajęcia praktyczne i teoretyczne</li>
              <li>Turnieje i mecze - rywalizacja w przyjaznej atmosferze</li>
            </ul>
          </div>
          <div className={`${isDesktop ? "w-1/2" : "w-full"}`}>
            <h2 className={`w-full mb-5 text-lg font-semibold text-center`}>
              Dodatkowe <span className={`text-custom-red`}>atrakcje</span>
            </h2>
            <ul className={`list-disc`}>
              <li>
                Specjalistyczne warsztaty z dietetyki, przygotowania
                motorycznego i treningu mentalnego, prowadzone przez ekspertów
              </li>
              <li>Zaplanowane gry i atrakcje na cały dzień</li>
              <li>
                Aktywny czas w sportowej atmosferze, z ograniczonym dostępem do
                telefonów
              </li>
              <li>Ognisko, kino plenerowe, turnieje sportowe</li>
            </ul>
          </div>
        </div> */}
        <h1
          className={`${isDesktop ? "text-2xl" : "text-xl"} font-semibold mt-4`}
        >
          Zakwaterowanie{" "}
          <span className={`text-custom-blue`}>i wyżywienie</span>
        </h1>
        <div
          className={`${isDesktop ? "w-[60rem]" : "w-[90%]"} grid ${
            isDesktop ? "grid-cols-3" : "grid-cols-1"
          } gap-6 my-8`}
        >
          {stayItems.map((item) => (
            <div
              key={`${item.iconName}-${item.title.highlight}`}
              className="flex flex-col items-center text-center bg-white rounded-2xl shadow-lg border border-gray-100 px-8 py-10"
            >
              <MaterialIcon
                iconName={item.iconName}
                className="text-custom-blue !text-8xl"
              />
              <h3 className="mt-6 text-xl font-semibold leading-tight">
                {item.title.before}
                <span className="text-custom-blue">{item.title.highlight}</span>
              </h3>
              <p className="mt-4 text-sm font-medium leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        <div
          className={`${
            isDesktop ? "w-[60rem]" : "w-[90%] flex-col"
          } flex gap-10 p-10 my-5 rounded-2xl border border-gray-100 shadow-lg`}
        >
          <div className={`${isDesktop ? "w-1/2" : "w-full"}`}>
            <h2 className={`mb-3 text-lg font-semibold`}>
              Nowoczesna{" "}
              <span className={`text-custom-red`}>hala sportowa</span>
            </h2>
            <p className={`font-medium`}>{camps[0].hallInfo}</p>
          </div>
          <div
            className={`${
              isDesktop ? "w-1/2 h-[16rem]" : "w-full h-[12rem]"
            } relative rounded-xl`}
          >
            <Image
              src={camps[0].hallImage.url}
              alt={`Hala sportowa - ${camps[0].place}`}
              fill
              unoptimized
              objectFit="cover"
              quality={100}
              className={`rounded-xl`}
            />
          </div>
        </div>
        {/* Transport */}
        <div
          className={`${
            isDesktop ? "w-[60rem]" : "w-[90%] flex-col"
          } flex gap-10 px-10 pt-10 my-5 rounded-2xl border border-gray-100 shadow-lg`}
        >
          <div className={`${isDesktop ? "w-1/2" : "w-full"}`}>
            <h2 className="mb-3 text-lg font-semibold">
              Transport <span className="text-custom-blue">na obóz</span>
            </h2>
            <p className="text-sm font-medium leading-relaxed">
              Zabieramy dzieci z południa i zachodu Polski. Jedziemy bezpiecznie
              drogami ekspresowymi i autostradami. Twoje dziecko jest pod opieką
              wychowawców od momentu wejścia do autokaru. Współpracujemy tylko
              ze sprawdzonymi, licencjonowanymi przewoźnikami.
            </p>
            <p className="mt-4 text-sm font-semibold">Główne przystanki:</p>
            <p className="text-sm">
              Sosnowiec → Wrocław → Legnica → Gorzów Wlkp. → Szczecin →
              Niechorze
            </p>
          </div>
          <div
            className={`${
              isDesktop ? "w-1/2" : "w-full"
            } flex items-center justify-center`}
          >
            {/* Podmień na obrazek mapy trasy (np. /transport-map.png) jeśli go masz w public */}
            {/* <MaterialIcon iconName="map" className="text-custom-red text-7xl" /> */}
            <Image
              src={map}
              alt={`mapa trasy transportu`}
              height={500}
              width={400}
              quality={100}
            />
          </div>
        </div>

        {/* Cena zawiera */}
        <h1
          className={`${
            isDesktop ? "w-[60rem] text-2xl" : "w-full text-xl"
          } my-10 font-semibold text-center`}
        >
          Cena zawiera:
        </h1>
        <div
          className={`${
            isDesktop ? "w-[60rem]" : "w-[90%]"
          } bg-white px-10 py-8 rounded-2xl border border-gray-100 shadow-lg`}
        >
          <div
            className={`${
              isDesktop ? "grid grid-cols-2" : "grid grid-cols-1"
            } gap-8`}
          >
            <div>
              <h3 className="text-center font-semibold mb-6">
                Sport <span className="text-custom-red">i atrakcje</span>
              </h3>
              <ul className="space-y-3">
                {camps[0].includes.slice(0, mid).map((element, index) => (
                  <li key={`left-${index}`} className="flex gap-3 items-start">
                    <MaterialIcon
                      iconName="check_circle"
                      fill
                      className="text-green-500 text-xl mt-0.5"
                    />
                    <span className={`${isDesktop ? "text-sm" : "text-sm"}`}>
                      {element}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className={`${isDesktop ? "border-l border-gray-200 pl-8" : ""}`}
            >
              <h3 className="text-center font-semibold mb-6">
                Komfort{" "}
                <span className="text-custom-blue">i bezpieczeństwo</span>
              </h3>
              <ul className="space-y-3">
                {camps[0].includes.slice(mid).map((element, index) => (
                  <li key={`right-${index}`} className="flex gap-3 items-start">
                    <MaterialIcon
                      iconName="check_circle"
                      fill
                      className="text-green-500 text-xl mt-0.5"
                    />
                    <span className={`${isDesktop ? "text-sm" : "text-sm"}`}>
                      {element}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <Button
          text="ZAPISZ SIĘ"
          href={""}
          style="w-[14rem] mt-10 font-semibold"
          onclick={() => {
            fbq("trackCustom", camps[0].buttonId);
            window.open(camps[0].link, "_blank");
          }}
        />
      </section>
    </React.Fragment>
  );
}
