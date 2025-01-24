import Image, { StaticImageData } from "next/image";

interface PartnerProps {
  logo: StaticImageData;
  image: StaticImageData;
  text: String;
  style?: String;
}

export const Partner: React.FC<PartnerProps> = ({
  logo,
  image,
  text,
  style,
}) => {
  return (
    <div className={`w-[60rem] h-[22rem] flex gap-5 ${style}`}>
      <div className={`w-2/3 relative rounded-2xl shadow-lg`}>
        <Image
          src={image}
          alt={`description`}
          fill
          objectFit="cover"
          quality={100}
          className={`rounded-2xl`}
        />
      </div>
      <div
        className={`w-[22rem] flex flex-col justify-center items-center gap-5 rounded-2xl border border-gray-100 shadow-lg`}
      >
        <Image src={logo} alt={`description`} width={170} quality={100} />
        <h1 className={`w-1/2 font-semibold text-lg text-center`}>{text}</h1>
      </div>
    </div>
  );
};
