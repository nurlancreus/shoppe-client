import { ProductType } from "@/types";
import AddReview from "./add-review";
import ReviewList from "./review-list";

export default function Reviews({product}: {product: ProductType}) {

  return (
    <div className="flex items-start [&>*]:flex-1 gap-20">
      <div>
        <h4 className="mb-20 text-h3-desktop">
          {product.reviews.length} Reviews for{" "}
          <span className="capitalize">{product.name ?? ""}</span>
        </h4>
        <ReviewList reviews={product.reviews} />
      </div>
      <AddReview />
    </div>
  );
}
