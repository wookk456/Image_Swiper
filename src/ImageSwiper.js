import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/keyboard';
import { Navigation, Keyboard } from 'swiper/modules';
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

  const descriptions = [
    'Description for Image 1',
    'Description for Image 2',
    'Description for Image 3',
    'Description for Image 4',
    'Description for Image 5',
    'Description for Image 6',
    'Description for Image 7',
    'Description for Image 8',
    'Description for Image 9',
    'Description for Image 10',
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollbarLeft, setScrollbarLeft] = useState(0);
  const [borderStyle, setBorderStyle] = useState({});
  const swiperRef = useRef(null);

  const handleSlideChange = (swiper) => {
    const totalSlides = swiper.slides.length;
    const currentIndex = swiper.realIndex;
    const newLeft = (currentIndex / totalSlides) * 100;
    setActiveIndex(currentIndex);
    setScrollbarLeft(newLeft);
  };

  useEffect(() => {
    const activeSlide = swiperRef.current?.swiper?.slides[activeIndex];
    if (activeSlide) {
      const img = activeSlide.querySelector('img');
      if (img) {
        const rect = img.getBoundingClientRect();
        setBorderStyle({
          width: rect.width * 1.8,
          height: rect.height * 1.8,
          transition: 'width 0.3s ease, height 0.3s ease'
        });
      }
    }
  }, [activeIndex]);

  return (
    <div className="swiper-wrapper">
      <Swiper
        spaceBetween={30}
        slidesPerView={2}
        centeredSlides={true}
        slideToClickedSlide={true}
        navigation={false}
        loop={false}
        onSlideChange={handleSlideChange}
        modules={[Navigation, Keyboard]}
        keyboard={{ enabled: true }}
        style={{ width: '100%', height: '50%' }}
        ref={swiperRef}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="swiper-slide-custom">
            <img src={image} alt={`Slide ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="border-box" style={borderStyle}></div>
      <div className="scrollbar-container">
        <div className="scrollbar" style={{ left: `${scrollbarLeft}%` }}></div>
      </div>
    </div>
  );
};

export default ImageSwiper;