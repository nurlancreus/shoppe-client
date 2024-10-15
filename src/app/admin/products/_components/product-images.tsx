"use client";

//import { useOptimistic } from "react";
import {
  changeMainImageAction,
  deleteProductImageAction,
} from "@/lib/_actions/products";
import { ProductImageDTOType } from "@/lib/types";
import { generateImageUrl } from "@/lib/helpers/client-helpers";
import Image from "next/image";
import { Button } from "../../_components/ui/button";
import { useState, useTransition } from "react";
import Modal from "../../_components/ui/modal";
import { useRouter } from "next/navigation";

export default function ProductImages({
  productId,
  productImages,
}: {
  productId: string;
  productImages: ProductImageDTOType[];
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [removedImageId, setRemovedImageId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // const [imagesState, setImagesState] = useOptimistic<
  //   {
  //     currentMainImage: ProductImageDTOType | null;
  //     otherImages: ProductImageDTOType[];
  //   },
  //   {
  //     currentMainImage: ProductImageDTOType | null;
  //     otherImages: ProductImageDTOType[];
  //   }
  // >(
  //   {
  //     currentMainImage: productImages.find((image) => image.isMain) || null,
  //     otherImages: productImages.filter((image) => !image.isMain),
  //   },
  //   (state, newState) => newState
  // );

  // const { currentMainImage, otherImages } = imagesState;

  // const handleChangeMainImage = async (newMainImage: ProductImageDTOType) => {
  //   const previousState = imagesState;

  //   // Optimistically swap the main image with the clicked image

  //   setImagesState({
  //     currentMainImage: newMainImage,
  //     otherImages: [
  //       currentMainImage!, // Old main image goes to otherImages
  //       ...otherImages.filter((img) => img.id !== newMainImage.id), // Filter out the new main image from otherImages
  //     ],
  //   });

  //   try {
  //     // Perform the server-side update
  //     await changeMainImageAction(productId, newMainImage.id);
  //   } catch (error) {
  //     // If server update fails, revert to previous state
  //     setImagesState(previousState);
  //     console.error("Failed to change main image:", error);
  //   }
  // };

  const handleChangeMainImage = async (imageId: string) => {
    await changeMainImageAction(productId, imageId);
  };

  let currentMainImage: ProductImageDTOType;
  const otherImages: ProductImageDTOType[] = [];

  productImages.forEach((image) => {
    if (image.isMain) currentMainImage = image;
    else otherImages.push(image);
  });

  const handleDelete = (imageId: string) => {
    setRemovedImageId(imageId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    startTransition(async () => {
      await deleteProductImageAction(productId, removedImageId!);
      setShowDeleteModal(false);
      router.refresh();
    });
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="mt-6 flex items-end gap-6">
        {/* Main image section */}
        {currentMainImage! != null ? (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Main Image</h3>
            <div className="relative size-60">
              <Image
                src={generateImageUrl(
                  currentMainImage.pathName,
                  currentMainImage.fileName,
                )}
                fill
                alt={currentMainImage.fileName}
                style={{ objectFit: "cover" }}
                onError={(e) => {
                  e.currentTarget.src = "/path/to/placeholder-image.png";
                }}
              />
            </div>
          </div>
        ) : (
          <p>No main image available.</p>
        )}

        {/* Other images section */}
        {otherImages.length > 0 ? (
          <div className="inline-flex items-end gap-4 overflow-x-auto">
            {otherImages.map((image) => (
              <div
                key={image.fileName}
                className="group relative size-52 shrink-0 cursor-pointer"
              >
                <Image
                  src={generateImageUrl(image.pathName, image.fileName)}
                  fill
                  alt={image.fileName}
                  style={{ objectFit: "cover" }}
                  onError={(e) => {
                    e.currentTarget.src = "/path/to/placeholder-image.png";
                  }}
                />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-6 bg-black bg-opacity-30 opacity-0 transition duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleChangeMainImage(image.id)}
                  >
                    Make Main
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(image.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No additional images available.</p>
        )}
      </div>
      {showDeleteModal && (
        <Modal
          title="Confirm Delete"
          description="Are you sure you want to delete this product?"
          isOpen={showDeleteModal}
          onClose={cancelDelete}
          onConfirm={confirmDelete}
          isDestructive
          confirmText={isPending ? "Deleting..." : "Confirm"}
          isLoading={isPending}
        />
      )}
    </>
  );
}
