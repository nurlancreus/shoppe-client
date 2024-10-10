"use client";

import React from "react";
import { Label } from "../../_components/ui/label";
import { Input } from "../../_components/ui/input";
import { Textarea } from "../../_components/ui/textarea";
import { useFormState } from "react-dom";
import {
  addCategoryAction,
  updateCategoryAction,
} from "@/app/_components/_actions/categories";
import { CategoryDTOType } from "@/types";
import SubmitButton from "../../_components/ui/submit-btn";

type CategoryFormProps = {
  category?: CategoryDTOType | null;
};

export default function CategoryForm({ category = null }: CategoryFormProps) {
  const [error, action] = useFormState(
    category ? updateCategoryAction.bind(null, category.id) : addCategoryAction,
    {},
  );

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Category Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          defaultValue={category?.name ?? ""}
          className="w-full"
        />
        <div className="text-destructive">{error?.name?.[0]}</div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={category?.description ?? ""}
          className="h-24 w-full rounded border p-2"
        />
        <div className="text-destructive">{error?.description?.[0]}</div>
      </div>

      <SubmitButton
        pendingCase={category ? "Updating..." : "Saving..."}
      >
        {category ? "Update" : "Save"}
      </SubmitButton>
    </form>
  );
}
