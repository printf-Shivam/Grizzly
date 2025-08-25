import React from 'react';
import HeroImg from '../../assets/img/hero-img.jpg'; 
import footwear from '../../assets/img/hero-image-footwear.jpeg'; 
import warmWear from '../../assets/img/warm-wear.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const HeroSection = () => {
  const slides = [
    {
      title: "T-shirt / Tops",
      heading: "Summer Value Pack",
      subtext: "cool / colorful / comfy",
      image: HeroImg,
    },
    {
      title: "Winter / Jackets",
      heading: "Warm Collection",
      subtext: "cozy / stylish / premium",
      image: warmWear,
    },
    {
      title: "Footwear",
      heading: "Sneaker Season",
      subtext: "trendy / bold / sporty",
      image: footwear,
    },
  ];

  return (
    <Swiper
      modules={[Pagination, Navigation, Autoplay]}
      pagination={{ clickable: true }}
      navigation
      autoplay={{ delay: 4000 }}
      loop
      className="w-full h-svh"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="relative flex flex-wrap items-center bg-cover bg-center text-left h-svh w-full"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-black/30"></div>
            <main className="px-10 lg:px-24 z-10">
              <div className="text-left">
                <h2 className="text-2xl text-white">{slide.title}</h2>
              </div>
              <p className="mt-3 text-white sm:mt-5 sm:max-w-xl text-6xl">
                {slide.heading}
              </p>
              <p className="mt-3 text-white sm:mt-5 sm:max-w-xl text-2xl">
                {slide.subtext}
              </p>
              <button className="border rounded mt-6 border-black hover:bg-white hover:text-black hover:border-black text-white bg-black w-44 h-12">
                Shop Now
              </button>
            </main>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSection;
