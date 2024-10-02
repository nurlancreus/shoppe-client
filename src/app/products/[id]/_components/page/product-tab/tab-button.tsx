"use client";

import { useSearchParams, useRouter } from "next/navigation";

type TabButtonProps = {
  text: string;
  value: string;
};

export default function TabButton({ text, value }: TabButtonProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentTab = searchParams.get("tab") || "description";

  const handleTabChange = (tab: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("tab", tab);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <button
      className={`border-b px-4 pb-8 transition duration-300 ${currentTab == value ? "border-b-black text-black" : "border-b-transparent text-dark-gray"}`}
      onClick={() => handleTabChange(value)}
    >
      {text}
    </button>
  );
}
