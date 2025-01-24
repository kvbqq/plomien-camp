import { Partner } from "@/components/partner/Partner";

import PartnerImage1 from "@/public/partner1.jpg";
import LogoPartner1 from "@/public/logo-partner1.png";
import PartnerImage2 from "@/public/partner2.jpg";
import LogoPartner2 from "@/public/logo-partner2.png";

export const Partners = () => {
  return (
    <section
      className={`w-full my-20 flex justify-center items-center flex-col`}
    >
      <h1 className={`w-[60rem] pb-10 font-bold text-[2rem] align-center`}>
        Kluby <span className={`text-custom-red`}>partnerskie</span>
      </h1>
      <div className={`flex flex-col items-center gap-5`}>
        <Partner
          logo={LogoPartner1}
          text="Aluron CMC WARTA Zawiercie"
          image={PartnerImage1}
        />
        <Partner
          logo={LogoPartner2}
          text="Hospel Płomień Sosnowiec"
          image={PartnerImage2}
          style={`flex-row-reverse`}
        />
      </div>
    </section>
  );
};
