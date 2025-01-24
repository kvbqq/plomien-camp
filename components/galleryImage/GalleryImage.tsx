import Image from "next/image";

import { MdRemoveRedEye } from "react-icons/md";

interface ImageProps {
  title: string;
  description: string;
  url: string;
  style?: string;
}

export const GalleryImage: React.FC<ImageProps> = ({
  title,
  description,
  url,
  style,
}) => {
  return (
    <div className={`relative group ${style}`}>
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
  );
};
