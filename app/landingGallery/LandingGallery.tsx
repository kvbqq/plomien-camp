"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/button/Button";
import { GalleryImage } from "@/components/galleryImage/GalleryImage";

import { GalleryImageType } from "@/types/types";

import { fetchData } from "@/graphqlClient";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const GET_GALLERY_QUERY = `
    query GetImages {
        images {
            id
            title
            description
            image {
                url
            }
        }
    }
`;

export default function LandingGallery() {
  const [images, setImages] = useState<GalleryImageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isDesktop = useMediaQuery("(min-width: 1000px)");

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const data = await fetchData(GET_GALLERY_QUERY);
        setImages(data.images);
      } catch (err) {
        setError("Nie udało się załadować danych." + err);
      } finally {
        setLoading(false);
      }
    };

    fetchCamps();
  }, []);

  if (loading) return <p className="text-center">Ładowanie...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section
      id="galeria"
      className={`w-full my-20 flex justify-center items-center flex-col`}
    >
      <h1
        className={`${
          isDesktop ? "w-[60rem] text-[2rem]" : "w-full text-2xl text-center"
        } pb-6 font-bold`}
      >
        Galeria <span className={`text-custom-red`}>zdjęć</span>
      </h1>
      <div
        className={`${
          isDesktop
            ? "w-[60rem] grid grid-cols-[350px,1fr,350px] grid-rows-[250px,250px] gap-3"
            : "w-[90%] min-h-screen grid grid-cols-1 grid-rows-3 gap-3"
        } mb-10 `}
      >
        {isDesktop &&
          images
            .slice(0, 5)
            .map((galleryImage: GalleryImageType, index: number) => (
              <GalleryImage
                data={images}
                key={galleryImage.id}
                id={galleryImage.id}
                url={galleryImage?.image?.url}
                style={index === 1 ? "row-span-2" : ""}
              />
            ))}

        {!isDesktop &&
          images.slice(0, 3).map((galleryImage: GalleryImageType) => (
            <div className={`w-full flex justify-center`} key={galleryImage.id}>
              <GalleryImage
                data={images}
                id={galleryImage.id}
                url={galleryImage?.image?.url}
                style="w-[22rem]"
              />
            </div>
          ))}
      </div>
      <Button
        text="Zobacz więcej zdjęć"
        href="/galeria"
        style="px-24 font-semibold"
      />
    </section>
  );
}
