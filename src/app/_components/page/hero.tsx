"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Import required modules
import { Pagination } from "swiper/modules";
import Image from "next/image";

export default function Hero() {
  const pagination = {
    clickable: true,
    renderBullet: (index: number, className: string) => {
      return `
        <span class="${className}" style="
          display: inline-block; 
          background-color: transparent; 
          border: 1px solid white;
          border-radius: 50%; 
          width: 0.5rem; 
          height: 0.5rem; 
          transition: all 0.3s ease-in-out; 
        "></span>`;
    },
  };

  return (
    <section id="hero" className="relative h-[40.375rem]">
      <Swiper
        pagination={pagination}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div>
            <Image src="/images/hero-01.png" alt="hero" width={1248} height={646} />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <Image src="/images/hero-01.png" alt="hero" width={1248} height={646} />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <Image src="/images/hero-01.png" alt="hero" width={1248} height={646} />
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
