"use client";

import React, { useState } from "react";
import { Button } from "../../_components/ui/button";
import { Label } from "../../_components/ui/label";
import { Input } from "../../_components/ui/input";
import Image from "next/image";
import { useFormState } from "react-dom";
import { ProductDTOType } from "@/types";
import {
  addProductAction,
  updateProductAction,
} from "@/app/_components/_actions/products";

// Import shadcn Dropdown components
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../_components/ui/dropdown-menu";
import { Textarea } from "../../_components/ui/textarea";
import SubmitButton from "../../_components/ui/submit-btn";

// Mock data for categories
const mockCategories = [
  { id: "C001", name: "Electronics" },
  { id: "C002", name: "Furniture" },
  { id: "C003", name: "Clothing" },
];

const colorOptions = ["Red", "Blue", "Green", "Yellow", "Black", "White"];

type ProductFormProps = {
  product?: ProductDTOType | null;
};

export default function ProductForm({ product = null }: ProductFormProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    product?.categories.map((category) => category.id) || [],
  );

  const [selectedColors, setSelectedColors] = useState<string[]>(
    product?.colors || [],
  );

  const [error, action] = useFormState(
    product
      ? updateProductAction.bind(
          null,
          product.id,
          selectedCategories,
          selectedColors,
        )
      : addProductAction.bind(null, selectedCategories, selectedColors),
    {},
  );

  let mainImage = null;
  if (product != null) {
    mainImage = product.productImages.find((image) => image.isMain);
  }

  const handleCategoryChange = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleColorChange = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color)
        ? prev.filter((item) => item !== color)
        : [...prev, color],
    );
  };

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
        <div className="text-destructive">{error?.name?.[0]}</div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input type="number" id="price" name="price" className="w-full" />
        <div className="text-destructive">{error?.price?.[0]}</div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={product?.description ?? ""}
          className="h-24 w-full rounded border p-2"
        />
        <div className="text-destructive">{error?.description?.[0]}</div>
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
        <div className="text-destructive">{error?.stock?.[0]}</div>
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
        <div className="text-destructive">{error?.weight?.[0]}</div>
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
        <div className="text-destructive">{error?.height?.[0]}</div>
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
        <div className="text-destructive">{error?.width?.[0]}</div>
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
        <div className="text-destructive">{error?.material?.[0]}</div>
      </div>

      {/* Dropdown Menu for Colors */}
      <div className="w-1/4 space-y-2">
        <Label htmlFor="colors">Colors (select multiple)</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full">
              Select Colors
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Select Colors</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {colorOptions.map((color) => (
              <DropdownMenuCheckboxItem
                key={color}
                checked={selectedColors.includes(color)}
                onCheckedChange={() => handleColorChange(color)}
              >
                {color}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="text-destructive">{error?.colors?.[0]}</div>
      </div>

      {/* Dropdown Menu for Category IDs */}
      <div className="w-1/4 space-y-2">
        <Label htmlFor="categoryIds">Category IDs (select multiple)</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full">
              Select Categories
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Select Categories</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {mockCategories.map((category) => (
              <DropdownMenuCheckboxItem
                key={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => handleCategoryChange(category.id)}
              >
                {category.name}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="text-destructive">{error?.categoryIds?.[0]}</div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="productImages">Product Images</Label>
        <Input
          type="file"
          id="productImages"
          name="productImages"
          accept="image/*"
          multiple
          className="w-full"
          required={product === null}
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

        <div className="text-destructive">{error?.productImages?.[0]}</div>
      </div>

      <SubmitButton pendingCase={product ? "Updating..." : "Saving..."}>
        {product ? "Update" : "Save"}
      </SubmitButton>
    </form>
  );
}
