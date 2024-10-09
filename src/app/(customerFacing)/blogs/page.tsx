import CardWrapper from "@/components/shared/card-wrapper";
import Heading from "@/components/ui/heading";
import { BlogType } from "@/types";
import { fetchData } from "@/utils/client-utils";
import BlogFilters from "./_components/blog-filters";
import BlogCard from "./_components/ui/blog-card";
import Pagination from "@/components/shared/pagination";

export default async function Blogs() {
  const blogs = await fetchData<Array<BlogType>>("/blogs");

  return (
    <div className="mt-24">
      <header className="mb-10">
        <Heading>Blogs</Heading>
      </header>
      <section>
        <div className="flex items-start gap-9">
          <div className="basis-1/4">
            <BlogFilters />
          </div>
          <div className="flex flex-col items-center gap-16">
            <CardWrapper
              gap="md"
              columns={2}
              data={blogs}
              renderProps={(blog) => <BlogCard key={blog.id} blog={blog} />}
            />
            <Pagination totalPages={10} />
          </div>
        </div>
      </section>
    </div>
  );
}
