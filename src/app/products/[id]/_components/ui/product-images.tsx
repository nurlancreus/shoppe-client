import Image from "next/image";

export default function ProductImages() {
  return (
    <section className="grid grow grid-cols-[7.5rem_1fr] grid-rows-4 gap-10">
      <article className="relative col-[1/2] h-[120px] w-[120px] border border-black">
        <Image
          src="/images/product-01.png"
          alt="product"
          fill
          objectFit="cover"
        />
      </article>
      <article className="relative col-[1/2] h-[120px] w-[120px] border border-black">
        <Image
          src="/images/product-01.png"
          alt="product"
          fill
          objectFit="cover"
        />
      </article>
      <article className="relative col-[1/2] h-[120px] w-[120px] border border-black">
        <Image
          src="/images/product-01.png"
          alt="product"
          fill
          objectFit="cover"
        />
      </article>
      <article className="relative col-[1/2] h-[120px] w-[120px] border border-black">
        <Image
          src="/images/product-01.png"
          alt="product"
          fill
          objectFit="cover"
        />
      </article>
      <article className="relative col-[2/3] row-[1/4] h-full w-full border border-black">
        <Image
          src="/images/product-01.png"
          alt="product"
          fill
          objectFit="cover"
        />
      </article>
    </section>
  );
}
