'use client'

const slidesData = [
  {
    title: 'Development',
    text: 'Lorem ipsum dolor sit /amet, consectetur adipiscing elit.',
    image: 'https://source.unsplash.com/5kYKzH5Gwgk',
    rating: 5,
  },
  {
    title: 'Branding',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://source.unsplash.com/rMdOHpO3h5E',
    rating: 5,
  },
  {
    title: 'Design',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://source.unsplash.com/EaZdLOxkcpI',
    rating: 5,
  },
  {
    title: 'Seo',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://source.unsplash.com/wLJqFMTQfa0',
    rating: 5,
  },
  {
    title: 'Management',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://source.unsplash.com/pwhGHarpllQ',
    rating: 5,
  },
]
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

const AuthSwiper = () => {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 10000 }}
      loop
      speed={1000}
      className="custom-swiper-transition hidden h-full w-[50vw] cursor-grab active:cursor-grabbing lg:flex"
    >
      {slidesData.map((slide, index) => (
        <SwiperSlide
          key={index}
          className="relative flex items-center justify-center"
        >
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
            }}
            width={1720}
            height={1720}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />{' '}
          {/* Overlay */}
          <div className="relative z-10 text-center text-white">
            <h2 className="text-2xl font-bold">{slide.title}</h2>
            <p>{slide.text}</p>
            <div>
              {[...Array(slide.rating)].map((_, i) => (
                <FontAwesomeIcon key={i} icon={faStar} className="text-white" />
              ))}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default AuthSwiper
