"use client";

import { useOptimistic } from "react";
import { changeMainImageAction } from "@/app/_components/_actions/products";
import { ProductImageDTOType } from "@/types";
import { generateImageUrl } from "@/utils/client-utils";
import Image from "next/image";

export default function ProductImages({
  productId,
  productImages,
}: {
  productId: string;
  productImages: ProductImageDTOType[];
}) {
  // Set up optimistic state for current main image
  const [currentMainImage, setCurrentMainImage] = useOptimistic<
    ProductImageDTOType | null,
    ProductImageDTOType | null
  >(
    productImages.find((image) => image.isMain) || null,
    (state, newMainImage) => newMainImage,
  );

  const otherImages = productImages.filter((image) => !image.isMain);

  const handleChangeMainImage = async (newMainImage: ProductImageDTOType) => {
    const previousMainImage = currentMainImage; // Keep track of the previous main image
    setCurrentMainImage(newMainImage); // Optimistically update the main image

    try {
      // Attempt to change the main image on the server
      await changeMainImageAction(productId, newMainImage.id);
    } catch (error) {
      // If the request fails, revert to the previous main image
      setCurrentMainImage(previousMainImage);
      console.error("Failed to change main image:", error);
    }
  };

  return (
    <div className="mt-6 flex items-center gap-6">
      {/* Main image section */}
      {currentMainImage ? (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Main Image</h3>
          <div className="relative h-40 w-60">
            <Image
              src={generateImageUrl(
                currentMainImage.pathName,
                currentMainImage.fileName,
              )}
              fill
              alt={currentMainImage.fileName}
              style={{ objectFit: "cover" }}
              onError={(e) => {
                // Fallback for failed image loading
                e.currentTarget.src = "/path/to/placeholder-image.png"; // Replace with your placeholder path
              }}
            />
          </div>
        </div>
      ) : (
        <p>No main image available.</p>
      )}

      {/* Other images section */}
      {otherImages.length > 0 ? (
        otherImages.map((image) => (
          <div
            key={image.fileName}
            className="relative m-2 inline-block h-20 w-20 cursor-pointer" // Added cursor pointer for better UX
            onClick={() => handleChangeMainImage(image)}
            role="button"
          >
            <Image
              src={generateImageUrl(image.pathName, image.fileName)}
              fill
              alt={image.fileName}
              style={{ objectFit: "cover" }}
              onError={(e) => {
                // Fallback for failed image loading
                e.currentTarget.src = "/path/to/placeholder-image.png"; // Replace with your placeholder path
              }}
            />
          </div>
        ))
      ) : (
        <p>No additional images available.</p>
      )}
    </div>
  );
}
