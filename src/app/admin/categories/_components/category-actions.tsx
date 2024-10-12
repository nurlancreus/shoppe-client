"use client";

import {
  LucideEye,
  LucideEdit,
  LucideTrash2,
  MoreHorizontal,
} from "lucide-react";
import React, { useState, useTransition } from "react";
import Modal from "../../_components/ui/modal";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../_components/ui/dropdown-menu";
import { deleteCategoryAction } from "@/app/_components/_actions/categories";

export default function CategoryActions({ id }: { id: string }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleView = (id: string) => {
    console.log(`Viewing category with ID: ${id}`);
  };

  const handleUpdate = (id: string) => {
    console.log(`Updating category with ID: ${id}`);
    router.push(`categories/${id}/update`);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    startTransition(async () => {
      await deleteCategoryAction(id);
      setShowDeleteModal(false);
      //router.refresh();
    });
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="text-gray-500 hover:text-gray-700 inline-block p-2">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleView(id)}>
            <LucideEye className="mr-2 h-4 w-4 text-blue-500" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleUpdate(id)}>
            <LucideEdit className="mr-2 h-4 w-4 text-yellow-500" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleDelete()}
            className="text-red-500"
          >
            <LucideTrash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {showDeleteModal && (
        <Modal
          title="Confirm Delete"
          description="Are you sure you want to delete this category?"
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
