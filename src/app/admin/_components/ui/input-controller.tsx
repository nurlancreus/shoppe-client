import React from "react";
import { Label } from "./label";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { useFormContext } from "react-hook-form";

type InputControllerProps = {
  id: string;
  name: string;
  label: string;
  defaultValue?: string | null;
  error?: string;
  className?: string;
  type?: "textarea" | "input";
};

export default function InputController({
  id,
  name,
  label,
  defaultValue = "",
  error,
  className,
  type = "input",
}: InputControllerProps) {
  const { register } = useFormContext();

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={id}>{label}</Label>
      {type === "textarea" ? (
        <Textarea
          id={id}
          defaultValue={defaultValue ?? ""}
          className="h-24 w-full rounded border p-2"
          {...register(name)}
        />
      ) : (
        <Input
          type="text"
          id={id}
          defaultValue={defaultValue ?? ""}
          className="w-full"
          {...register(name)}
        />
      )}
      {error && <div className="text-destructive">{error}</div>}
    </div>
  );
}
