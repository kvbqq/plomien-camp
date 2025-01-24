import Image from "next/image";

import { fetchData } from "@/graphqlClient";

import { Camp } from "@/components/camp/Camp";

const GET_CAMPS_QUERY = `
    query GetCamps {
        camps {
            id
            name
            place
            date
            image {
                url
            }
        }
    }
`;

interface CampType {
  id: string;
  name: string;
  place: string;
  date: string;
  image: {
    url: string;
  };
}

export default async function LandingCamps() {
  const data = await fetchData(GET_CAMPS_QUERY);

  return (
    <section
      className={`w-full my-20 flex justify-center items-center flex-col`}
    >
      <h1 className={`my-16 font-bold text-[2rem]`}>
        Nasze <span className={`text-custom-red`}>campy</span>
      </h1>
      <div className={`w-[60rem] grid grid-cols-3 gap-5`}>
        {data.camps.map((camp: CampType) => (
          <div key={camp.id}>
            <Camp
              name={camp.name}
              place={camp.place}
              date={camp.date}
              image={camp.image.url}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
