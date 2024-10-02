type TabContentProps = {
  searchParams: {
    tab: string;
  };
};

export default function TabContent({ searchParams }: TabContentProps) {
  // const searchParams = useSearchParams();
  const currentTab = searchParams.tab || "description";

  return (
    <div>
      {currentTab === "description" && <p>Description content...</p>}
      {currentTab === "additional-info" && <p>Additional Info content...</p>}
      {currentTab === "reviews" && <p>Reviews content...</p>}
    </div>
  );
}
