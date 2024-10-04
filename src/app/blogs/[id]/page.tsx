import BlogContent from "./_components/page/blog-content";
import Comments from "./_components/page/comments";

export default function Blog() {
  return (
    <div className="mt-24">
      <BlogContent />
      <Comments />
    </div>
  );
}
