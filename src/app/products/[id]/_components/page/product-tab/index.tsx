import TabButtons from "./tab-buttons";
import TabContent from "./tab-content";

export default function ProductTab({ currentTab }: { currentTab: string }) {
  return (
    <section className="my-24">
      <TabButtons />
      <TabContent>
        {currentTab === "description" && <p>Description content...</p>}
        {currentTab === "additional-info" && <p>Additional Info content...</p>}
        {currentTab === "reviews" && <p>Reviews content...</p>}
      </TabContent>
    </section>
  );
}
