'use client'

const slidesData = [
  {
    title: 'Collaboration',
    text: 'Easily collaborate with other producers through collectives.',
    image: 'https://source.unsplash.com/5kYKzH5Gwgk',
    rating: 5,
  },
  {
    title: 'Revenue',
    text: 'Start generating revenue selling your music, kits and expertise.',
    image: 'https://source.unsplash.com/EaZdLOxkcpI',
    rating: 5,
  },
  {
    title: 'Expand',
    text: 'Grow your own fan base and team with collectives.',
    image: 'https://source.unsplash.com/rMdOHpO3h5E',
    rating: 5,
  },
  {
    title: 'Profile',
    text: 'Raise your profile and reach the next generation of aspiring producers.',
    image: 'https://source.unsplash.com/wLJqFMTQfa0',
    rating: 5,
  },
  {
    title: 'Placements',
    text: 'Connect with the worlds biggest producers and enjoy limitless placement opportunities.',
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
import Wavify from '../wavify/Wavify'

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
          <Wavify className="absolute bottom-4 right-4 z-20 w-16" />
          <div className="relative z-20 flex h-full flex-col justify-center text-center text-zinc-200">
            <h2 className="text-2xl font-bold">{slide.title}</h2>
            <p className="text-zinc-300">{slide.text}</p>
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
              filter: 'grayscale(100%)',
              zIndex: '0',
            }}
            width={1720}
            height={1720}
          />
          <div className="absolute inset-0 z-10 bg-black bg-opacity-50" />{' '}
          {/* Overlay */}
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default AuthSwiper
