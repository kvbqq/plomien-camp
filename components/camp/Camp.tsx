import Image from "next/image";

import { Button } from "../button/Button";

import { useMediaQuery } from "@/hooks/useMediaQuery";

interface CampProps {
  name: string;
  place: string;
  date: string;
  image: string;
  href: string;
}

export const Camp: React.FC<CampProps> = ({
  name,
  place,
  date,
  image,
  href,
}) => {
  const isDesktop = useMediaQuery("(min-width: 1000px)");
  return (
    <div className={`p-6 bg-custom-blue rounded-3xl flex flex-col text-white`}>
      <Image
        src={image}
        alt="camp"
        width={300}
        height={50}
        style={{
          borderRadius: "1rem",
        }}
      />
      <h1
        className={`${
          isDesktop ? "text-xl" : "text-medium"
        } px-5 py-2 mb-5 self-center font-semibold bg-custom-red rounded-b-lg`}
      >
        {name}
      </h1>
      <h2 className={`${isDesktop ? "text-xl" : "text-medium"} font-semibold`}>
        {place.toUpperCase()}
      </h2>
      <p className={`${isDesktop ? null : "text-sm"}`}>{date}</p>
      <Button
        text="Dowiedz się więcej!"
        href={`/obozy/${href}`}
        style={`${isDesktop ? "" : "text-sm"} mt-5 font-semibold`}
      />
    </div>
  );
};
