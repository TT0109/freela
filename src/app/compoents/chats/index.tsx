"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode, Autoplay } from 'swiper/modules';

import InstagramChatFull from './instagramChats';
import HeaderInstagramAlert from './headerAlert';

interface UserCardProps {
  users?: any;  // Mudado de React.ReactNode[] para string[] para melhor tipagem
}

export default function VisitantesContainer({ users = ["primeiroCard", "segundoCard", "censured", "terceiroCard"] }: any) {
  return (
    <div className="relative w-full p-4 bg-white rounded-xl shadow-md">
      <HeaderInstagramAlert />

      <Swiper
        slidesPerView={'auto'}
        spaceBetween={12}
        freeMode={true}
        autoplay={{
          delay: 1500,  // Tempo de atraso entre cada slide (3 segundos)
          disableOnInteraction: false,  // Não desabilitar autoplay ao interagir
        }}
        modules={[FreeMode, Autoplay]}
        className="mt-2 px-2"
      >
        {users.map((user, index) => (
          <SwiperSlide key={index} style={{ width: '280px' }}>
            <InstagramChatFull card={user}  />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
