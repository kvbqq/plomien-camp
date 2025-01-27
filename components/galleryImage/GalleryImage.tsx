"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import { GallerySlider } from "../gallerySlider/GallerySlider";

import { MdRemoveRedEye } from "react-icons/md";

import { GalleryImageType } from "@/types/types";

interface ImageProps {
  data: GalleryImageType[];
  id: string;
  title: string;
  description: string;
  url: string;
  style?: string;
}

export const GalleryImage: React.FC<ImageProps> = ({
  data,
  id,
  title,
  description,
  url,
  style,
}) => {
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

  return (
    <React.Fragment>
      <div
        className={`relative group ${style}`}
        onClick={() => setShowGallery(true)}
      >
        <div
          className={`w-full h-full absolute flex justify-center items-center bg-black opacity-0 group-hover:opacity-50 group-hover:cursor-pointer transition-all duration-300 rounded-2xl z-10`}
        >
          <MdRemoveRedEye size="42" color="white" />
        </div>
        <Image
          src={url}
          alt={description}
          fill
          objectFit="cover"
          quality={100}
          className={`rounded-2xl`}
        />
      </div>
      {showGallery ? (
        <GallerySlider
          images={data}
          startId={data.findIndex((image) => image.id === id)}
          showGallery={showGallery}
          setShowGallery={setShowGallery}
        />
      ) : null}
    </React.Fragment>
  );
};
