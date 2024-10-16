import React from "react";
import { Button } from "../../app/admin/_components/ui/button";
import Spinner from "@/components/ui/spinner";

interface ModalProps {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDestructive?: boolean;
  isLoading?: boolean;
}

export default function Modal({
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isOpen,
  onClose,
  onConfirm,
  isDestructive = false,
  isLoading = false,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[90%] max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">{title}</h2>
        <p>{description}</p>
        <div className="mt-4 flex justify-end">
          <Button
            variant="secondary"
            className="mr-2"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            variant={isDestructive ? "destructive" : "default"}
            onClick={onConfirm}
            disabled={isLoading}
            className="flex items-center gap-1"
          >
            {isLoading && <Spinner color="light" />} {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
