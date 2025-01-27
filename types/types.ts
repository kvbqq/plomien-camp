import { ReactNode } from "react";

export interface SliderElement {
  id: number;
  icon: ReactNode;
  text: ReactNode;
}

export interface GalleryImageType {
  id: string;
  title: string;
  description: string;
  image: {
    url: string;
  };
}
