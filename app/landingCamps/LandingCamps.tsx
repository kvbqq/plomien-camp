"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import { fetchData } from "@/graphqlClient";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import { Camp } from "@/components/camp/Camp";

const GET_CAMPS_QUERY = `
    query GetCamps {
        camps {
            id
            slug
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
  slug: string;
  name: string;
  place: string;
  date: string;
  image: {
    url: string;
  };
}

export default function LandingCamps() {
  const [camps, setCamps] = useState<CampType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isDesktop = useMediaQuery("(min-width: 1000px)");

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const data = await fetchData(GET_CAMPS_QUERY);
        setCamps(data.camps);
      } catch (err) {
        setError("Nie udało się załadować danych.");
      } finally {
        setLoading(false);
      }
    };

    fetchCamps();
  }, []);

  if (loading) return <p className="text-center">Ładowanie...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section
      id="campy"
      className="w-full my-20 flex justify-center items-center flex-col"
    >
      <h1
        className={`${
          isDesktop ? "text-[2rem] my-16" : "text-2xl mt-16 mb-11"
        } font-bold`}
      >
        Nasze <span className="text-custom-red">campy</span>
      </h1>
      <div
        className={`${
          isDesktop ? "w-[60rem] grid-cols-3" : "w-[16rem] grid-cols-1"
        } grid gap-5`}
      >
        {camps.map((camp) => (
          <Camp
            key={camp.id}
            name={camp.name}
            place={camp.place}
            date={camp.date}
            image={camp.image.url || "/fallback-image.jpg"}
            href={camp.slug}
          />
        ))}
      </div>
    </section>
  );
}
