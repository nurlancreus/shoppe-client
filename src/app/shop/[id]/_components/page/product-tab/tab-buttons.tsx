"use client";
import TabButton from "./tab-button";

export default function TabButtons() {


  return (
    <div className="flex gap-4 border-b border-b-light-gray mb-10">
      <TabButton
        text="Description"
        value="description"
        
      />
      <TabButton
        text="Additional Info"
        value="additional-info"
      
      
      />
      <TabButton
        text="Reviews"
        value="reviews"
     
      />
    </div>
  );
}
