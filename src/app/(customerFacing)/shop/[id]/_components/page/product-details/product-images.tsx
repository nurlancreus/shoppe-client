import { generateImageUrl } from "@/lib/helpers/client-helpers";
import { ProductImageDTOType } from "@/lib/types";
import Image from "next/image";

type ProductImagesProps = {
  images: Array<ProductImageDTOType>;
};

export default function ProductImages({ images }: ProductImagesProps) {
  const others: ProductImageDTOType[] = [];
  let mainImage: ProductImageDTOType | undefined;

  images?.forEach((image) => {
    if (image.isMain) mainImage = image;
    else others.push(image);
  });

  return (
    <section className="grid grow grid-cols-[7.5rem_1fr] grid-rows-4 gap-10">
      {others.slice(0, 4).map((image) => (
        <article
          key={image.id}
          className="relative col-[1/2] h-[120px] w-[120px] border border-black"
        >
          <Image
            src={generateImageUrl(image.pathName, image.fileName)} // Use dynamic image URL from the array
            alt={`product-thumbnail-${image.fileName}`}
            fill
            style={{ objectFit: "cover" }}
          />
        </article>
      ))}

      {mainImage ? (
        <article className="relative col-[2/3] row-[1/4] h-full w-full border border-black">
          <Image
            src={generateImageUrl(mainImage.pathName, mainImage.fileName)}
            alt="main product image"
            fill
            style={{ objectFit: "cover" }}
          />
        </article>
      ) : (
        <p>No main image found</p> // Handle case where no main image exists
      )}
    </section>
  );
}
