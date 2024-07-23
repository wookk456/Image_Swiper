import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/keyboard';
import { Navigation, Keyboard } from 'swiper/modules';
import './ImageSwiper.css';

const ImageSwiper = () => {
  const images = [
    'https://placehold.co/2000x2500',
    'https://placehold.co/3000x3500',
    'https://placehold.co/3000x4000',
    'https://placehold.co/3000x3500',
    'https://placehold.co/2000x3000',
    'https://placehold.co/2500x3000',
    'https://placehold.co/3000x4000',
    'https://placehold.co/3000x4000',
    'https://placehold.co/3000x3700',
    'https://placehold.co/4000x4000',
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
  const [descriptionStyle, setDescriptionStyle] = useState({});
  const [description, setDescription] = useState({});
  const [animate, setAnimate] = useState(false);
  const [hideText, setHideText] = useState(false);
  const swiperRef = useRef(null);

  const updateBorderStyle = () => {
    const activeSlide = swiperRef.current?.swiper?.slides[activeIndex];
    if (activeSlide) {
      const img = activeSlide.querySelector('img');
      if (img) {
        const rect = img.getBoundingClientRect();
        setBorderStyle({
          width: `${1.8*rect.width}px`,
          height: `${1.8* rect.height}px`,
          transition: 'width 0.3s ease, height 0.3s ease',
          transform: 'translate(-50%, -50%)'
        });
        setDescriptionStyle({
          left: `calc(30vw - ${rect.width * 0.9}px)`,
          transition: 'left 0.3s ease'
        });
        setDescription({
          left: `calc(30vw - ${rect.width * 0.9}px)`,
          transition: 'left 0.3s ease'
        })
      }
    }
  };

  useEffect(() => {
    updateBorderStyle();
    window.addEventListener('resize', updateBorderStyle);
    return () => window.removeEventListener('resize', updateBorderStyle);
  }, [activeIndex]);

  const handleSlideChange = (swiper) => {
    const totalSlides = swiper.slides.length;
    const currentIndex = swiper.realIndex;
    const newLeft = (currentIndex / totalSlides) * 100;
    setActiveIndex(currentIndex);
    setScrollbarLeft(newLeft);
    setAnimate(false);
    setHideText(true);
    setTimeout(() => {
      setHideText(false);
      setAnimate(true);
    }, 300);
  };

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
      <div className="description-title" style={descriptionStyle}>
        Kim Woo Jin
      </div>
      <div className="description" style={description}>
        <span className={`desc ${animate ? 'reveal' : ''} ${hideText ? 'hide' : ''}`}>
          {descriptions[activeIndex]}
        </span>
      </div>
      <div className="scrollbar-container">
        <div className="scrollbar" style={{ left: `${scrollbarLeft}%` }}></div>
      </div>
    </div>
  );
};

export default ImageSwiper;