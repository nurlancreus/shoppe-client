"use client";
import TabButton from "../../../../../../components/ui/tab-button";

export default function TabButtons() {
  return (
    <div className="mb-10 flex gap-4 border-b border-b-light-gray">
      <TabButton
        text="Description"
        value="description"
        defaultValue="description"
        paramKey="tab"
        variant="product"
      />
      <TabButton
        text="Additional Info"
        value="additional-info"
        defaultValue="description"
        paramKey="tab"
        variant="product"
      />
      <TabButton
        text="Reviews"
        value="reviews"
        defaultValue="description"
        paramKey="tab"
        variant="product"
      />
    </div>
  );
}
