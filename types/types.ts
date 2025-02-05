import { ReactNode } from "react";

export interface SliderElement {
  id: number;
  icon: ReactNode;
  text: ReactNode;
}

export interface GalleryImageType {
  id: string;
  image: {
    url: string;
  };
}

export interface GalleryCampType {
  id: string;
  url: string;
}
