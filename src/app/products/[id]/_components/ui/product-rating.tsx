import SvgIcon from "@/components/shared/svg-icon";

export default function ProductRating() {
  const totalStars = 5;
  const rating = 4;
  const reviews: unknown[] = [];

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
      if (rating >= i) {
        stars.push(<SvgIcon id="star" key={i} className="text-black" />);
      } else {
        stars.push(<SvgIcon id="star" key={i} className="text-gray-400" />);
      }
    }
    return stars;
  };

  return (
    <div className="flex items-center space-x-1">
      <div className="flex">{renderStars()}</div>
      {reviews.length > 0 && (
        <span className="text-gray-600 ml-2 text-sm">
          {reviews.length} customer review{reviews.length > 1 ? "s" : ""}
        </span>
      )}
    </div>
  );
}
