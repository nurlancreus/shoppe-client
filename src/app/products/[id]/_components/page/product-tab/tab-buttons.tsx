"use client";
import { useSearchParams, useRouter } from "next/navigation";
import TabButton from "./tab-button";

export default function TabButtons() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentTab = searchParams.get("tab") || "description";

  const handleTabChange = (tab: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("tab", tab);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex gap-4">
      <TabButton
        text="Description"
        value="description"
        isActive={currentTab === "description"}
        onClick={() => handleTabChange("description")}
      />
      <TabButton
        text="Additional Info"
        value="additional-info"
        isActive={currentTab === "additional-info"}
        onClick={() => handleTabChange("additional-info")}
      />
      <TabButton
        text="Reviews"
        value="reviews"
        isActive={currentTab === "reviews"}
        onClick={() => handleTabChange("reviews")}
      />
    </div>
  );
}
