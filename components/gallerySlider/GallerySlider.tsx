"use client";

import Image from "next/image";

import { GalleryImageType } from "@/types/types";
import { GalleryCampType } from "@/types/types";

import { HiOutlineX } from "react-icons/hi";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

import { useState, useEffect } from "react";

interface GallerySliderProps {
  images: GalleryImageType[] | GalleryCampType[];
  startId: number;
  showGallery: boolean;
  setShowGallery: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GallerySlider: React.FC<GallerySliderProps> = ({
  images,
  startId,
  setShowGallery,
}) => {
  const [currentIndex, setCurrentIndex] = useState(startId);

  useEffect(() => {
    const handleKeyDown = (event: { key: string }) => {
      if (event.key === "Escape") {
        setShowGallery(false);
      } else if (event.key === "ArrowLeft") {
        prevImage();
      } else if (event.key === "ArrowRight") {
        nextImage();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      className={`w-screen h-screen fixed flex flex-col justify-between inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-20 overflow-auto`}
    >
      <div className={`w-full p-10 flex justify-between text-white`}>
        {/* <p>{images[currentIndex].title}</p> */}
        <button onClick={() => setShowGallery(false)}>
          <HiOutlineX size={42} />
        </button>
      </div>
      <div
        className={`w-full p-10 flex justify-between align-center text-white`}
      >
        <button onClick={() => prevImage()}>
          <MdKeyboardArrowLeft size={64} />
        </button>

        {"image" in images[0] ? (
          <Image
            src={images[currentIndex]?.image?.url}
            alt={images[currentIndex]?.id}
            width={1000}
            height={500}
            style={{ width: "50%", height: "auto" }}
            quality={100}
          />
        ) : (
          <Image
            src={images[currentIndex]?.url}
            alt={images[currentIndex]?.id}
            width={1000}
            height={500}
            style={{ width: "50%", height: "auto" }}
            quality={100}
          />
        )}

        <button onClick={() => nextImage()}>
          <MdKeyboardArrowRight size={64} />
        </button>
      </div>
      <div className={`w-full p-10 flex justify-center text-white`}>
        <p>
          {currentIndex + 1} / {images.length}
        </p>
      </div>
    </div>
  );
};
