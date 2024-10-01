"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";

export default function Hero() {
  const slides = [
    {
      image: "/images/hero-01.png", // Your image path
      title: "Gold big hoops",
      price: "$68.00",
    },
    {
      image: "/images/hero-01.png", // Your image path
      title: "Gold big hoops",
      price: "$68.00",
    },
    {
      image: "/images/hero-01.png", // Your image path
      title: "Gold big hoops",
      price: "$68.00",
    },
    {
      image: "/images/hero-01.png", // Your image path
      title: "Gold big hoops",
      price: "$68.00",
    },
  ];

  const pagination = {
    clickable: true,
    renderBullet: (index: number, className: string) =>
      `<span class="${className}"></span>`,
  };

  return (
    <section className="relative h-[40rem] w-full overflow-hidden mb-16">
      <Swiper
        pagination={pagination}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
        autoplay={{ delay: 5000 }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              {/* Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                // layout="fill"
                // objectFit="cover"
                // quality={100}
                width={1248}
                height={646}
              />
              {/* Overlay */}
              <div className="from-black/50 absolute inset-0 flex flex-col items-start justify-center bg-gradient-to-r to-transparent pl-8 pr-4 text-white lg:pl-16">
                <h2 className="mb-4 text-h1-desktop">{slide.title}</h2>
                <p className="mb-6 text-h2-desktop">{slide.price}</p>
                <button className="border border-white px-6 py-2 transition hover:bg-white hover:text-black">
                  View Product
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
