import { formatCurrency } from "@/utils/helpers";
import ProductRating from "./product-rating";
import AddToCart from "../../ui/add-to-cart";
import LikeProduct from "../../ui/like-product";
import SocialMedias from "@/components/ui/social-medias";

const socialMediaLinks = [
  { platform: "Gmail", url: "https://www.gmail.com", ariaLabel: "Gmail" },
  {
    platform: "Facebook",
    url: "https://www.facebook.com",
    ariaLabel: "Facebook",
  },
  {
    platform: "Instagram",
    url: "https://www.instagram.com",
    ariaLabel: "Instagram",
  },
  { platform: "Twitter", url: "https://www.twitter.com", ariaLabel: "Twitter" },
];

const categories: unknown[] = ["bir", "iki"];

export default function ProductInfo() {
  return (
    <article className="basis-5/12">
      <div className="mb-16 flex flex-col gap-6">
        <h4 className="text-h2-desktop">Title</h4>

        <p className="text-h4-desktop font-medium text-accent">
          {formatCurrency(200)}
        </p>
      </div>

      <ProductRating defaultRating={4} />
      <p className="mb-12 mt-5 text-h5-desktop text-dark-gray">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
        placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a
        maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis
        consequat sed eu felis.{" "}
      </p>
      <AddToCart />
      <div className="mb-10 flex items-center gap-10">
        <LikeProduct />
        <span className="inline-block h-5 w-[1px] bg-dark-gray" />
        <SocialMedias socialMedias={socialMediaLinks} />
      </div>
      <div className="flex items-center gap-4 text-h5-desktop">
        <span className="text-black">Categories: </span>
        <span className="text-dark-gray">{categories.join(", ")}</span>
      </div>
    </article>
  );
}
