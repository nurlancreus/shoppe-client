"use client";

import { useSearchParams, useRouter } from "next/navigation";

type TabButtonProps = {
  text: string;
  value: string;
  paramKey: string;
  defaultValue: string;
  variant: "product" | "category";
};

export default function TabButton({
  text,
  value,
  paramKey,
  defaultValue,
  variant,
}: TabButtonProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentTab = searchParams.get(paramKey) || defaultValue;

  const handleTabChange = (tab: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set(paramKey, tab);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <button
      className={`${variant == "product" ? "border-b px-4 pb-8 text-h3-desktop" : "text-h5-desktop"} transition duration-300 ${
        currentTab == value
          ? variant === "product"
            ? "border-b-black text-black"
            : "text-black"
          : "border-b-transparent text-dark-gray"
      }`}
      onClick={() => handleTabChange(value)}
    >
      {text}
    </button>
  );
}
