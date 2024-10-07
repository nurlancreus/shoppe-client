"use client";
import React from "react";
import Button from "./button";
import clsx from "clsx";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  className?: string;
  children: React.ReactNode;
};

export default function SubmitButton({
  children,
  className,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="black"
      isLoading={pending}
      disabled={pending}
      className={clsx("", className)}
    >
      {children}
    </Button>
  );
}
