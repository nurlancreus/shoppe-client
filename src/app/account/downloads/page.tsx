import EmptyPlaceholder from "../_components/ui/empty-placeholder";

const downloads = [];

export default function DownloadsPage() {
  return (
    <div>
      {downloads.length === 0 && (
        <EmptyPlaceholder
          message="No downloads available yet."
          text="Browse Products"
          href="/shop"
        />
      )}
    </div>
  );
}
