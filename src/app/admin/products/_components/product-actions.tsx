"use client";

import { LucideEye, LucideEdit, LucideTrash2 } from "lucide-react";
import React, { useState } from "react";
import Modal from "../../_components/ui/modal";
import { useRouter } from "next/navigation";

export default function ProductActions({id}:{id:string}) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(
      null,
    );
    const router = useRouter();
  
    const handleView = (id: string) => {
      console.log(`Viewing product with ID: ${id}`);
      // Logic to view product page
    };
  
    const handleUpdate = (id: string) => {
      console.log(`Updating product with ID: ${id}`);
      // Logic to update product
    };
  
    const handleDelete = (id: string) => {
      setSelectedProductId(id);
      setShowDeleteModal(true);
    };
  
    const confirmDelete = () => {
      console.log(`Deleting product with ID: ${selectedProductId}`);
      // Logic to delete product
      setShowDeleteModal(false);
    };
  
    const cancelDelete = () => {
      setShowDeleteModal(false);
    };

  return (
    <>
      <LucideEye
        className="mr-2 inline-block size-6 cursor-pointer text-blue-500"
        onClick={() => handleView(id)}
      />
      <LucideEdit
        className="mr-2 inline-block size-6 cursor-pointer text-yellow-500"
        onClick={() => {
            
            router.push(`products/${id}/update`);
            handleUpdate(id)}}
      />
      <LucideTrash2
        className="inline-block size-6 cursor-pointer text-red-500"
        onClick={() => handleDelete(id)}
      />
      {showDeleteModal && (
        <Modal
          title="Confirm Delete"
          description="Are you sure you want to delete this product?"
          isOpen={showDeleteModal}
          onClose={cancelDelete}
          onConfirm={confirmDelete}
          isDestructive
        />
      )}
    </>
  );
}
