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
  pagination={{ 
    clickable: true,
    bulletClass: 'swiper-pagination-bullet !bg-white !opacity-70 !w-2 !h-2 sm:!w-3 sm:!h-3',
    bulletActiveClass: 'swiper-pagination-bullet-active !bg-white !opacity-100'
  }}
  navigation={{
    nextEl: '.custom-swiper-button-next',
    prevEl: '.custom-swiper-button-prev',
  }}
  autoplay={{ delay: 5000, disableOnInteraction: false }}
  loop
  className="w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] xl:h-[90vh]"
>
  {slides.map((slide, index) => (
    <SwiperSlide key={index}>
      <div className="relative w-full h-full">
        
        {/* Background Image as <img /> for better responsiveness */}
        <img 
          src={slide.image}
          alt={slide.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 md:bg-gradient-to-r md:from-black/40 md:via-black/20 md:to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex items-center h-full px-4 sm:px-6 md:px-12 lg:px-24">
          <div className="max-w-full sm:max-w-lg lg:max-w-2xl">
            
            {/* Category */}
            <p className="text-xs sm:text-sm md:text-base text-white/90 font-medium uppercase mb-2">
              {slide.title}
            </p>
            
            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              {slide.heading}
            </h1>
            
            {/* Subtext */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-6">
              {slide.subtext}
            </p>
            
            {/* CTA Button */}
            <button className="
              inline-flex items-center justify-center
              px-4 sm:px-6 md:px-8 
              py-2 sm:py-3
              text-sm sm:text-base font-semibold
              text-white bg-black/60 border border-white/80
              rounded-md hover:bg-white hover:text-black
              transition-all duration-200
              shadow-lg
            ">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </SwiperSlide>
  ))}

  {/* Navigation Arrows */}
  <div className="custom-swiper-button-prev hidden md:flex !text-white !w-10 !h-10 !left-4 lg:!left-6 !bg-black/40 !rounded-full hover:!bg-black/60 !items-center !justify-center cursor-pointer">
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  </div>
  <div className="custom-swiper-button-next hidden md:flex !text-white !w-10 !h-10 !right-4 lg:!right-6 !bg-black/40 !rounded-full hover:!bg-black/60 !items-center !justify-center cursor-pointer">
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
  </div>
</Swiper>

  );
};

export default HeroSection;
