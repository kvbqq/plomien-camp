"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import React, { useState, useEffect } from "react";

import { fetchData } from "@/graphqlClient";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import { IoMdPin } from "react-icons/io";
import { MdOutlineVerified } from "react-icons/md";
import { MdBed } from "react-icons/md";
import { MdOutlineRestaurant } from "react-icons/md";
import { IoApps } from "react-icons/io5";

import { Nav } from "@/app/navbar/Nav";
import { Button } from "@/components/button/Button";
import { GallerySlider } from "@/components/gallerySlider/GallerySlider";

import verifiedImage from "@/public/verified.png";
import sporturLogo from "@/public/sportur-logo.png";
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
          <div
            className={`${
              isDesktop ? "w-2/3 px-10" : "w-[90%] px-5"
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
          <div
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
          </div>
        </div>
        <h1 className={`${isDesktop ? "text-3xl" : "text-2xl"} font-semibold`}>
          Oferta <span className={`text-custom-red`}>campu</span>
        </h1>
        <div
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
        </div>
        <h1 className={`${isDesktop ? "text-2xl" : "text-xl"} font-semibold`}>
          Zakwaterowanie <span className={`text-custom-red`}>i wyżywienie</span>
        </h1>
        <p
          className={`${isDesktop ? "w-[60rem]" : "w-[90%]"} my-3 text-center`}
        >
          {camps[0].description}
        </p>
        <div
          className={`${
            isDesktop ? "w-[60rem]" : "w-[90%] flex-col"
          } flex gap-5`}
        >
          <div
            className={`${
              isDesktop ? "w-1/2" : "w-full"
            } p-10 flex items-center gap-5 rounded-2xl border border-gray-100 shadow-lg`}
          >
            <MdBed size={86} color="#EE3135" />
            {camps[0].foodInfo}
          </div>
          <div
            className={`${
              isDesktop ? "w-1/2" : "w-full"
            } p-10 flex gap-5 items-center rounded-2xl border border-gray-100 shadow-lg`}
          >
            <MdOutlineRestaurant size={86} color="#EE3135" />
            <p>
              Pełne wyżywienie: 3 posiłki dziennie - śniadanie, obiad +
              podwieczorek, kolacja
            </p>
          </div>
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
              objectFit="cover"
              quality={100}
              className={`rounded-xl`}
            />
          </div>
        </div>
        <h1
          className={`${
            isDesktop ? "w-[60rem] text-2xl" : "w-full text-xl"
          } my-10 font-semibold text-center`}
        >
          Cena zawiera:
        </h1>
        <div
          className={`${
            isDesktop ? "w-[38rem]" : "w-[90%]"
          } px-14 py-10 rounded-2xl border border-gray-100 shadow-lg`}
        >
          <ul className={`list-disc`}>
            {camps[0].includes.map((element, index) => (
              <li key={index} className={`${isDesktop ? null : "text-sm"}`}>
                {element}
              </li>
            ))}
          </ul>
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
