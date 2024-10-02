import Image from "next/image";

type ImageType = {
  id: string;
  url: string;
  isMain: boolean;
};

type ProductImagesProps = {
  images: Array<ImageType>;
};

export default function ProductImages({ images }: ProductImagesProps) {
  const others: ImageType[] = [];
  let mainImage: ImageType | undefined;

  images.forEach((image) => {
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
            src={image.url} // Use dynamic image URL from the array
            alt={`product-thumbnail-${image.id}`}
            fill
            objectFit="cover"
          />
        </article>
      ))}

      {mainImage ? (
        <article className="relative col-[2/3] row-[1/4] h-full w-full border border-black">
          <Image
            src={mainImage.url}
            alt="main product image"
            fill
            objectFit="cover"
          />
        </article>
      ) : (
        <p>No main image found</p> // Handle case where no main image exists
      )}
    </section>
  );
}
