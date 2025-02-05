"use client";

import React, { useState, useEffect } from "react";
import { Nav } from "../navbar/Nav";
import { GalleryImage } from "@/components/galleryImage/GalleryImage";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { fetchData } from "@/graphqlClient";
import { GalleryImageType } from "@/types/types";

const GET_GALLERY_QUERY = `
    query GetImages {
        images(first: 100) {
            id
            title
            description
            image {
                url
            }
        }
    }
`;

export default function Home() {
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

  return (
    <React.Fragment>
      <Nav isLanding={false} />
      <section className={`w-full py-24 flex flex-col items-center`}>
        <h1
          className={`${
            isDesktop
              ? "w-[60rem] text-[2rem] mt-24 mb-10"
              : "w-[90%] text-2xl mt-10 mb-5 text-center"
          } font-semibold`}
        >
          Galeria <span className={`text-custom-red`}>zdjęć</span>
        </h1>
        <div
          className={`${
            isDesktop
              ? "w-[60rem] grid-cols-3"
              : "w-[90%] grid-cols-1 justify-items-center"
          } h-full grid gap-3`}
        >
          {images.map((galleryImage: GalleryImageType) => (
            <div
              className={`${
                isDesktop ? "w-[1fr] h-[220px]" : "w-[350px] h-[250px]"
              } inline-grid`}
              key={galleryImage.id}
            >
              <GalleryImage
                data={images}
                key={galleryImage.id}
                id={galleryImage.id}
                url={galleryImage?.image?.url}
              />
            </div>
          ))}
        </div>
      </section>
    </React.Fragment>
  );
}
