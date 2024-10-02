import { formatCurrency } from "@/utils/helpers";
import ProductRating from "./product-rating";

export default function ProductDetails() {
  return (
    <article className="basis-2/5">
      <div className="mb-16 flex flex-col gap-6">
        <h4 className="text-h2-desktop">Title</h4>

        <p className="text-h4-desktop text-accent">{formatCurrency(200)}</p>
      </div>

      <ProductRating />
    </article>
  );
}
