import React from "react";
import { Button } from "./button";

interface ModalProps {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDestructive?: boolean;
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
}: ModalProps) {
  if (!isOpen) return null; // Don't render if modal is closed

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg bg-white p-6 shadow-lg w-[90%] max-w-md">
        <h2 className="mb-4 text-xl font-bold">{title}</h2>
        <p>{description}</p>
        <div className="mt-4 flex justify-end">
          <Button
            variant="secondary"
            className="mr-2"
            onClick={onClose}
          >
            {cancelText}
          </Button>
          <Button
            variant={isDestructive ? "destructive" : "default"}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
