"use client";

import React, { useState } from "react";
import { Button } from "../../_components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../_components/ui/input";
import Image from "next/image";
import { useFormState, useFormStatus } from "react-dom";
import { ProductDTOType } from "@/types";
import {
  addProductAction,
  updateProductAction,
} from "@/app/_components/_actions/products";

const categoryIds: string[] = [];

type ProductFormProps = {
  product?: ProductDTOType | null;
};

export default function ProductForm({ product = null }: ProductFormProps) {
  const [error, action] = useFormState(
    product ? updateProductAction.bind(null, product.id) : addProductAction,
    {},
  );
  //   const [price, setPrice] = useState<number | undefined>(product?.price);
  //   const [selectedImages, setSelectedImages] = useState<File[] | null>(null);

  let mainImage = null;

  if (product != null)
    mainImage = product.productImages.find((image) => image.isMain);

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          defaultValue={product?.name ?? ""}
          className="w-full"
        />
        {error.name && <div className="text-destructive">{error.name}</div>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input
          type="number"
          id="price"
          name="price"
          
          className="w-full"
        />
        {error.price && <div className="text-destructive">{error.price}</div>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          name="description"
          
          defaultValue={product?.description ?? ""}
          className="h-24 w-full rounded border p-2"
        />
        {error.description && (
          <div className="text-destructive">{error.description}</div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="stock">Stock</Label>
        <Input
          type="number"
          id="stock"
          name="stock"
          
          defaultValue={product?.stock ?? 0}
          className="w-full"
        />
        {error.stock && <div className="text-destructive">{error.stock}</div>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="weight">Weight (kg)</Label>
        <Input
          type="number"
          id="weight"
          name="weight"
          
          defaultValue={product?.weight ?? 0}
          className="w-full"
        />
        {error.weight && <div className="text-destructive">{error.weight}</div>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="height">Height (cm)</Label>
        <Input
          type="number"
          id="height"
          name="height"
          
          defaultValue={product?.height ?? 0}
          className="w-full"
        />
        {error.height && <div className="text-destructive">{error.height}</div>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="width">Width (cm)</Label>
        <Input
          type="number"
          id="width"
          name="width"
          
          defaultValue={product?.width ?? 0}
          className="w-full"
        />
        {error.width && <div className="text-destructive">{error.width}</div>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="material">Material</Label>
        <Input
          type="text"
          id="material"
          name="material"
          
          defaultValue={product?.material ?? ""}
          className="w-full"
        />
        {error.material && (
          <div className="text-destructive">{error.material}</div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="colors">Colors (comma separated)</Label>
        <Input
          type="text"
          id="colors"
          name="colors"
          
          defaultValue={product?.colors.join(", ") ?? ""}
          className="w-full"
        />
        {error.colors && <div className="text-destructive">{error.colors}</div>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="categoryIds">Category IDs (comma separated)</Label>
        <Input
          type="text"
          id="categoryIds"
          name="categoryIds"
          defaultValue={categoryIds.join(", ") ?? ""}
          className="w-full"
        />
        {error?.categoryIds && (
          <div className="text-destructive">{error.categoryIds}</div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="productImages">Product Images</Label>
        <Input
          type="file"
          id="productImages"
          name="productImages"
          accept="image/*"
          multiple
          // onChange={(e) => setSelectedImages(Array.from(e.target.files || []))}
          className="w-full"
        />
        {mainImage != null && (
          <div className="relative h-40 w-60">
            <Image
              src={mainImage.pathName}
              fill
              alt="Product image"
              style={{ objectFit: "cover" }}
            />
          </div>
        )}
        {error.productImages && (
          <div className="text-destructive">{error.productImages}</div>
        )}
      </div>

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
