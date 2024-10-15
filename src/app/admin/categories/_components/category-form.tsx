"use client";

import React from "react";
import {
  addCategoryAction,
  updateCategoryAction,
} from "@/lib/_actions/categories";
import { CategoryDTOType } from "@/lib/types";
import InputController from "../../_components/ui/input-controller";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../_components/ui/select";
import {
  addCategorySchema,
  AddCategorySchema,
  updateCategorySchema,
  UpdateCategorySchema,
} from "./category-schema";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../_components/ui/button";

type CategoryFormProps = {
  category?: CategoryDTOType | null;
};

type CategorySchema = AddCategorySchema | UpdateCategorySchema;

export default function CategoryForm({ category = null }: CategoryFormProps) {
  const form = useForm<CategorySchema>({
    resolver: zodResolver(category ? updateCategorySchema : addCategorySchema),
    defaultValues: {
      name: category?.name ?? "",
      description: category?.description ?? "",
      type: category?.type ?? "Product", // Default to "product" if not specified
    },
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmitForm: SubmitHandler<CategorySchema> = async (data) => {
    const formData = new FormData();
    if (data.name) formData.append("name", data.name);
    if (data.description) formData.append("description", data.description);
    if (data.type) formData.append("type", data.type); // Add the type to form data

    if (!category) await addCategoryAction(formData);
    else await updateCategoryAction(category.id, formData);
  };

  return (
    <FormProvider {...form}>
      <form className="space-y-8" onSubmit={handleSubmit(onSubmitForm)}>
        <InputController
          id="name"
          name="name"
          label="Category Name"
          defaultValue={category?.name}
          error={errors.name?.message}
        />

        <InputController
          id="description"
          name="description"
          label="Description"
          defaultValue={category?.description}
          error={errors.description?.message}
          type="textarea"
        />

        <div className="space-y-2">
          <label htmlFor="type" className="block">
            Category Type
          </label>
          <Select
            onValueChange={(value) =>
              setValue("type", value as "Product" | "Blog")
            }
            defaultValue={category?.type ?? "Product"}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Product">Product</SelectItem>
              <SelectItem value="Blog">Blog</SelectItem>
            </SelectContent>
          </Select>
          {errors.type && (
            <div className="text-destructive">{errors.type.message}</div>
          )}
        </div>

        <Button disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </form>
    </FormProvider>
  );
}
