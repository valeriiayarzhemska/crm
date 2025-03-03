import React, { useRef, useState } from 'react';

import { Navigation, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { colors } from '../../../data/constants';

export const SwiperImages = ({ children, realtyId }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const swiperRef = useRef(null);

  const handleSlideChange = swiper => {
    setCurrentSlide(swiper.realIndex + 1);
  };

  return (
    <>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, A11y]}
        loop={true}
        spaceBetween={30}
        slidesPerView={1}
        navigation={{
          nextEl: `.arrow-right${realtyId}`,
          prevEl: `.arrow-left${realtyId}`,
        }}
        onSwiper={swiper => {}}
        onSlideChange={handleSlideChange}
      >
        {React.Children.map(children, (child, index) => (
          <SwiperSlide>{child}</SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute top-1 w-full text-center z-[1]">
        <span className="font-bold text-white opacity-80">{`${currentSlide}/${children.length}`}</span>
      </div>

      <div
        className={`absolute top-1/3 left-[-1rem] z-[1] opacity-40 outline-0 arrow-left${realtyId} arrow`}
      >
        <ChevronLeft
          size={80}
          color={colors.lightGrayColor}
        />
      </div>
      <div
        className={`absolute top-1/3 right-[-1rem] z-[1] opacity-40 outline-0 arrow-right${realtyId} arrow`}
      >
        <ChevronRight
          size={80}
          color={colors.lightGrayColor}
        />
      </div>
    </>
  );
};
