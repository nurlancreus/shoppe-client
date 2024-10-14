/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addProductAction,
  updateProductAction,
} from "@/app/_components/_actions/products";
import { CategoryDTOType, ProductDTOType } from "@/types";
import InputController from "../../_components/ui/input-controller";
import { MultiSelectDropdown } from "../../_components/ui/multi-select-dropdown";
import { Button } from "../../_components/ui/button";
import {
  AddProductSchema,
  addProductSchema,
  UpdateProductSchema,
  updateProductSchema,
} from "./product-schema";
import ProductImages from "./product-images";

type ProductFormProps = {
  categories?: CategoryDTOType[];
  colors?: string[];
  materials?: string[];
  product?: ProductDTOType | null;
};

type ProductSchema = AddProductSchema | UpdateProductSchema;

export default function ProductForm({
  categories = [],
  colors = [],
  materials = [],
  product = null,
}: ProductFormProps) {
  const form = useForm<ProductSchema>({
    resolver: zodResolver(product ? updateProductSchema : addProductSchema),
    defaultValues: {
      name: product?.name ?? "",
      description: product?.description ?? "",
      price: product?.price ?? 0,
      stock: product?.stock ?? 0,
      weight: product?.weight ?? 0,
      height: product?.height ?? 0,
      width: product?.width ?? 0,
      materials: product?.materials ?? [],
      colors: product?.colors ?? [],
      categories: product?.categories.map((cat) => cat.id) ?? [],
      productImages: undefined,
    },
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    getValues,
    register,
  } = form;

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    product?.categories.map((cat) => cat.name) ?? [],
  );
  const [selectedColors, setSelectedColors] = useState<string[]>(
    product?.colors ?? [],
  );
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>(
    product?.materials ?? [],
  );

  console.log(product);


  const onSubmitForm: SubmitHandler<ProductSchema> = async (data) => {
    const formData = new FormData();
    console.log(data, "THTHTHTHTHHHT");
    // Append all data to FormData
    Object.keys(data).forEach((key) => {
      if (
        key !== "productImages" &&
        key !== "categories" &&
        key !== "materials" &&
        key !== "colors"
      ) {
        formData.append(key, data[key as keyof ProductSchema] as any);
      }
    });

    // Append product images to FormData
    const productImages = getValues("productImages");
    if (productImages && productImages.length > 0) {
      Array.from(productImages).forEach((file: File) => {
        formData.append("productImages", file);
      });
    }

    selectedColors.forEach((color) => {
      formData.append("colors", color);
    });

    selectedCategories.forEach((name) => {
      formData.append("categories", name);
    });

    selectedMaterials.forEach((material) => {
      formData.append("materials", material);
    });

    console.log(formData.entries());

    if (!product) {
      await addProductAction(formData);
    } else {
      await updateProductAction(product.id, formData);
    }
  };

  const handleCategoryChange = (name: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(name)) {
        return prev.filter((catName) => catName !== name);
      } else {
        return [...prev, name];
      }
    });
  };

  const handleColorChange = (color: string) => {
    setSelectedColors((prev) => {
      if (prev.includes(color)) {
        return prev.filter((c) => c !== color);
      } else {
        return [...prev, color];
      }
    });
  };

  const handleMaterialChange = (material: string) => {
    setSelectedMaterials((prev) => {
      if (prev.includes(material)) {
        return prev.filter((c) => c !== material);
      } else {
        return [...prev, material];
      }
    });
  };

  // Sync states with react-hook-form values
  useEffect(() => {
    setValue("categories", selectedCategories);
  }, [selectedCategories, setValue]);

  useEffect(() => {
    setValue("colors", selectedColors);
  }, [selectedColors, setValue]);

  useEffect(() => {
    setValue("materials", selectedMaterials);
  }, [selectedMaterials, setValue]);


  return (
    <FormProvider {...form}>
      <form className="space-y-8" onSubmit={handleSubmit(onSubmitForm)}>
        <InputController
          id="name"
          name="name"
          label="Product Name"
          error={errors.name?.message}
        />

        <InputController
          id="description"
          name="description"
          label="Description"
          type="textarea"
          error={errors.description?.message}
        />

        <InputController
          id="price"
          name="price"
          label="Price"
          type="number"
          error={errors.price?.message}
        />

        <InputController
          id="stock"
          name="stock"
          label="Stock"
          type="number"
          error={errors.stock?.message}
        />

        <InputController
          id="weight"
          name="weight"
          label="Weight (kg)"
          type="number"
          error={errors.weight?.message}
        />

        <InputController
          id="height"
          name="height"
          label="Height (cm)"
          type="number"
          error={errors.height?.message}
        />

        <InputController
          id="width"
          name="width"
          label="Width (cm)"
          type="number"
          error={errors.width?.message}
        />

        <MultiSelectDropdown
          options={categories?.map((cat) => cat.name) ?? []}
          selectedValues={selectedCategories}
          onChange={(id) => handleCategoryChange(id)}
          label="Categories"
          error={errors.categories?.message}
        />

        <MultiSelectDropdown
          options={colors}
          selectedValues={selectedColors}
          onChange={(color) => handleColorChange(color)}
          label="Colors"
          error={errors.colors?.message}
        />

        <MultiSelectDropdown
          options={materials}
          selectedValues={selectedMaterials}
          onChange={(material) => handleMaterialChange(material)}
          label="Materials"
          error={errors.materials?.message}
        />

        {/* Product Image Upload */}
        <div className="space-y-2">
          <label htmlFor="productImages" className="block">
            Product Images
          </label>
          <input
            type="file"
            id="productImages"
            multiple
            accept="image/*"
            {...register("productImages")}
            className="w-full border p-2"
            //  onChange={handleFileChange}
          />
          {errors.productImages && (
            <div className="text-destructive">
              {errors.productImages.message}
            </div>
          )}
          {product && <ProductImages productId={product.id} productImages={product.productImages}/>}
        </div>

        <Button disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </form>
    </FormProvider>
  );
}
