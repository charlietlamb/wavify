import Underline1 from '@/components/decoration/underlines/Underline1'
import Underline2 from '@/components/decoration/underlines/Underline2'
import Underline3 from '@/components/decoration/underlines/Underline3'
import Underline4 from '@/components/decoration/underlines/Underline4'

const underlineClassName = 'absolute bottom-0 w-full'
export const slidesData = [
  {
    title: 'Collaboration',
    text: 'Easily collaborate with other producers through collectives.',
    image: 'https://source.unsplash.com/5kYKzH5Gwgk',
    rating: 5,
    underline: <Underline3 className={underlineClassName} />,
  },
  {
    title: 'Revenue',
    text: 'Start generating revenue selling your music, kits and expertise.',
    image: 'https://source.unsplash.com/EaZdLOxkcpI',
    rating: 5,
    underline: <Underline4 className={underlineClassName} />,
  },
  {
    title: 'Expand',
    text: 'Grow your own fan base and team with collectives.',
    image: 'https://source.unsplash.com/rMdOHpO3h5E',
    rating: 5,
    underline: <Underline1 className={underlineClassName} />,
  },
  {
    title: 'Profile',
    text: 'Raise your profile and reach the next generation of aspiring producers.',
    image: 'https://source.unsplash.com/wLJqFMTQfa0',
    rating: 5,
    underline: <Underline2 className={underlineClassName} />,
  },
  {
    title: 'Placements',
    text: 'Connect with the worlds biggest producers and enjoy limitless placement opportunities.',
    image: 'https://source.unsplash.com/pwhGHarpllQ',
    rating: 5,
    underline: <Underline1 className={underlineClassName} />,
  },
]
