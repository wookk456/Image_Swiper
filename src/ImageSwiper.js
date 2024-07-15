import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import './ImageSwiper.css';

const ImageSwiper = () => {
  const images = [
    'https://via.placeholder.com/400x500?text=Image+1',
    'https://via.placeholder.com/500x600?text=Image+2',
    'https://via.placeholder.com/300x400?text=Image+3',
    'https://via.placeholder.com/600x700?text=Image+4',
    'https://via.placeholder.com/400x600?text=Image+5',
    'https://via.placeholder.com/500x600?text=Image+6',
    'https://via.placeholder.com/600x800?text=Image+7',
    'https://via.placeholder.com/300x400?text=Image+8',
    'https://via.placeholder.com/400x500?text=Image+9',
    'https://via.placeholder.com/500x500?text=Image+10',
  ];

  const fixedHeight = 400;

  return (
    <div className="swiper-wrapper">
      <Swiper
        spaceBetween={30}
        slidesPerView={1.5}
        centeredSlides={true} 
        slideToClickedSlide={true} 
        navigation
        pagination={{ clickable: true, el: '.swiper-pagination', type: 'bullets' }}
        loop={true}
        modules={[Navigation, Pagination]}
        style={{ width: '100%', height: `${fixedHeight}px` }}
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            className="swiper-slide-custom"
          >
            <img src={image} alt={`Slide ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-pagination"></div>
    </div>
  );
};

export default ImageSwiper;