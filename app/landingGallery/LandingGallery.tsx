import { Button } from "@/components/button/Button";
import { GalleryImage } from "@/components/galleryImage/GalleryImage";

import { GalleryImageType } from "@/types/types";

import { fetchData } from "@/graphqlClient";

const GET_GALLERY_QUERY = `
    query GetImages {
        images {
            id
            title
            description
            image {
                url
            }
        }
    }
`;

export default async function LandingGallery() {
  const data = await fetchData(GET_GALLERY_QUERY);

  return (
    <section
      className={`w-full my-20 flex justify-center items-center flex-col`}
    >
      <h1 className={`w-[60rem] pb-10 font-bold text-[2rem] align-center`}>
        Galeria <span className={`text-custom-red`}>zdjęć</span>
      </h1>
      <div
        className={`w-[60rem] mb-10 grid grid-cols-[350px,1fr,350px] grid-rows-[250px,250px] gap-3`}
      >
        {data.images
          .slice(0, 5)
          .map((galleryImage: GalleryImageType, index: number) => (
            <GalleryImage
              data={data.images}
              key={galleryImage.id}
              id={galleryImage.id}
              title={galleryImage.title}
              description={galleryImage.description}
              url={galleryImage?.image?.url}
              style={index === 1 ? "row-span-2" : ""}
            />
          ))}
      </div>
      <Button text="Zobacz więcej zdjęć" href="/galeria" style="px-24" />
    </section>
  );
}
