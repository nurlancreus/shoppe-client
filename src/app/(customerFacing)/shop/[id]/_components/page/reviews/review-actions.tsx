"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/shared/dropdown";
import Modal from "@/components/shared/modal";
import IconButton from "@/components/shared/icon-button";
import { EditIcon, EllipsisIcon, TrashIcon } from "lucide-react";
import { removeProductReviewAction } from "@/lib/_actions/reviews";

type ReviewActionsProps = {
  reviewId: string;
};

export default function ReviewActions({ reviewId }: ReviewActionsProps) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Handler to update the review
  const handleUpdate = () => {
    console.log(`Updating review with ID: ${reviewId}`);
    router.push(`/reviews/${reviewId}/update`); // Navigate to the update page
  };

  // Handler to show delete modal
  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  // Confirm deletion logic
  const confirmDelete = async () => {
    // Replace this with your actual delete action
    console.log(`Deleting review with ID: ${reviewId}`);

    startTransition(async () => {
      await removeProductReviewAction(reviewId);
      setShowDeleteModal(false);
    });
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const menu = [
    {
      id: 1,
      icon: <EditIcon width={16} height={16} />,
      label: "Edit",
      action: handleUpdate,
    },
    {
      id: 2,
      icon: <TrashIcon width={16} height={16}/>,
      label: "Delete",
      action: handleDelete,
    },
  ];

  return (
    <>
      <div className="z-30">
        <IconButton onClick={() => setDropdownOpen((prev) => !prev)}>
          <EllipsisIcon />
        </IconButton>

        <Dropdown
          isOpened={isDropdownOpen}
          menu={menu}
          close={() => setDropdownOpen(false)}
        />

        {showDeleteModal && (
          <Modal
            title="Confirm Delete"
            description="Are you sure you want to delete this review?"
            isOpen={showDeleteModal}
            onClose={cancelDelete}
            onConfirm={confirmDelete}
            isDestructive
            confirmText={isPending ? "Deleting..." : "Confirm"}
            isLoading={isPending}
          />
        )}
      </div>
    </>
  );
}
