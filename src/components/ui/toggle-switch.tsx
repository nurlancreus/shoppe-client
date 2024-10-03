"use client";
import { useRouter, useSearchParams } from "next/navigation";

type ToggleSwitchProps = {
  paramKey: string;
  label: string;
};

export default function ToggleSwitch({ paramKey, label }: ToggleSwitchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentValue = searchParams.get(paramKey) === "true";

  const handleToggle = () => {
    const params = new URLSearchParams(searchParams);
    const newValue = !currentValue;

    if (newValue) {
      params.set(paramKey, "true");
    } else {
      params.delete(paramKey);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-[.625rem] justify-between">
      <span>{label}</span>

      <label
        htmlFor={paramKey}
        className={`relative h-5 w-10 border border-dark-gray rounded-full bg-dark-gray ${!currentValue ? "bg-dark-gray" : "bg-white"}`}
      >
        <span
          className={`absolute top-1/2 inline-block size-4 -translate-y-1/2 rounded-full transition duration-200 ${!currentValue ? "left-1 bg-white" : "right-1 bg-dark-gray"}`}
        ></span>
        <input
          type="checkbox"
          id={paramKey}
          checked={currentValue}
          onChange={handleToggle}
          className="hidden"
        />
      </label>
    </div>
  );
}
