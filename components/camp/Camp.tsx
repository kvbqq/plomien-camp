import Image from "next/image";

import { Button } from "../button/Button";

interface CampProps {
  name: string;
  place: string;
  date: string;
  image: string;
}

export const Camp: React.FC<CampProps> = ({ name, place, date, image }) => {
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
        className={`px-5 py-2 mb-5 self-center font-semibold text-xl bg-custom-red rounded-b-lg`}
      >
        {name}
      </h1>
      <h2 className={`text-xl font-semibold`}>{place.toUpperCase()}</h2>
      <p>{date}</p>
      <Button text="Dowiedz się więcej!" href="" style="mt-5" />
    </div>
  );
};
