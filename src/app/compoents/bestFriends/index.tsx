'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'

import BlurredStoryCard from './BlurredStoryCard'
import { FaStar } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

const stories = [
  { mediaUrl: "/story-01.jpg", type: "image" },
  { mediaUrl: "/story-02.jpg", type: "image" },
  { mediaUrl: "/story-03.jpg", type: "image" },
  { mediaUrl: "/story-04.jpg", type: "image" },
  { mediaUrl: "/story-05.jpg", type: "image" },
  { mediaUrl: "/story-06.gif", type: "image" },
]

export default function BestFriendsCard() {

  const router = useRouter();
  
  const redirectToPayments = () => {
    router.push('payments');
  };

  return (
    <div className="w-full flex flex-col items-center px-4">
      {/* Título com ícone */}
      <div className="flex flex-col items-center mt-2">
        <div className="bg-green-500 p-2 rounded-full text-white text-xl">
          <FaStar />
        </div>
        <h2 className="text-xl font-bold mt-2">Close Friends</h2>
        <p className="text-sm text-gray-600 text-center mt-1 px-4">
          <span className='blur-sm'>@fulano</span> e outras <strong>4 pessoas</strong> que você <br />
          não segue, te adicionaram ao Close Friends
        </p>

        {/* Avatares (fake) e botão Ver Pessoas */}
        <div className="flex items-center justify-center mt-2 space-x-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-8 h-8 rounded-full overflow-hidden">
              <img
                src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i * 8}.jpg`}
                alt="Avatar"
                className="w-full h-full object-cover filter blur-sm"
              />
            </div>
          ))}
        </div>

        <button className="text-orange-600 text-sm font-semibold mt-1 hover:underline">
          Ver Pessoas →
        </button>
      </div>

      {/* Swiper de histórias */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        centeredSlides={true}
        slidesPerView="auto"
        spaceBetween={16}
        className="w-full px-4 mt-4"
      >
        {stories.map((story, index) => (
          <SwiperSlide key={index} style={{ width: '100px' }}>
            <BlurredStoryCard
              mediaUrl={story.mediaUrl}
              type={story.type as 'image' | 'video'}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <p className="text-sm text-gray-600 text-center mt-3">
        ...e outras 2 pessoas que você não segue
      </p>

      <p className="text-orange-600 text-center text-sm font-semibold">
        Tenha acesso a tudo isso sem <br /> censuras no relatório completo
      </p>

      <div className="animate-bounce mt-1 text-orange-600">↓</div>

      <button className="bg-orange-500 text-white text-sm font-semibold px-6 py-2 rounded-full hover:bg-orange-600 transition-all mt-1 cursor-pointer" onClick={redirectToPayments}>
        👁️ Ver relatório completo
      </button>
    </div>
  )
}
