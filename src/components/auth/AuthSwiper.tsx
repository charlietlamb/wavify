'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import Image from 'next/image'
import Wavify from '../wavify/Wavify'
import { slidesData } from './data/slidesData'

const AuthSwiper = () => {
  return (
    <div className="hidden lg:flex">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 10000 }}
        loop
        speed={1000}
        className="custom-swiper-transition h-full w-[50vw] cursor-grab active:cursor-grabbing"
      >
        {slidesData.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="relative flex items-center justify-center"
          >
            <Wavify className="absolute bottom-4 right-4 z-20 w-16" />
            <div className="relative z-20 flex h-full flex-col items-center justify-center text-center text-zinc-200">
              <div className="relative">
                <h2 className="relative z-10 p-2 text-6xl font-black italic 2xl:text-7xl">
                  {slide.title.toUpperCase()}
                </h2>
                {slide.underline}
              </div>
              <p className="max-w-[50%] text-xl text-zinc-400">{slide.text}</p>
            </div>
            <Image
              src={slide.image}
              alt={slide.title}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                // filter: 'grayscale(100%)',
                zIndex: '0',
              }}
              width={1720}
              height={1720}
            />
            <div className="absolute inset-0 z-10 bg-black bg-opacity-60" />{' '}
            {/* Overlay */}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default AuthSwiper
