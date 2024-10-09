import Image from "next/image";
import Link from "next/link";
import { BlogType } from "@/types";

type BlogCardProps = {
  blog: BlogType;
};

export default function BlogCard({ blog }: BlogCardProps) {
  const mainImage = blog.images.find((image) => image.isMain);

  return (
    <article className="">
      <div className="mb-6 overflow-hidden rounded-lg h-[18.75rem] relative">
        {mainImage && (
          <Image
            src={mainImage.url}
            alt={blog.title}
            fill
            style={{ objectFit: "cover" }}
          />
        )}
      </div>

      <div>
        <p className="text-body-medium text-dark-gray">
          <span>{blog.category} </span> - <span>{blog.date}</span>
        </p>

        <h4 className="mb-4 mt-1 text-h3-desktop font-semibold">
          {blog.title}
        </h4>

        <p className="mb-6 line-clamp-2 text-h5-desktop text-dark-gray">
          {blog.excerpt}
        </p>

        <Link href={`/blogs/${blog.id}`} className="text-body-large font-bold text-accent">
          Read More
        </Link>
      </div>
    </article>
  );
}
