import { getSession } from "@/lib/helpers/server-helpers";
import ReviewForm from "./review-form";

export default function AddReview({ productId }: { productId: string }) {
  const session = getSession();

  return (
    <div>
      <header>
        <h5 className="mb-3 text-h3-desktop">Add Review</h5>
        <p className="text-sm text-dark-gray">
          Your email address will not be published. Required fields are marked *
        </p>
      </header>
      <ReviewForm productId={productId} user={session?.user} />
    </div>
  );
}
