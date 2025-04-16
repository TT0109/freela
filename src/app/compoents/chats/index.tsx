"use client"
import { useRef } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import InstagramChatFull from './instagramChats';

interface UserCardProps {
  users: React.ReactNode[]; // componente já renderizado com chat
}

export default function VisitantesContainer({ users = ["Joao", "Pedro", "Matheus", "Jhonas", "Thiago"]}: UserCardProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full p-4 bg-white rounded-xl shadow-md">
      {/* Texto superior */}
      <div className="text-center mb-4">
        <p className="text-lg font-semibold text-gray-800">Tem amigos querendo se afastar de você</p>
        <p className="text-sm text-gray-600">
          Detectamos <span className="font-bold text-orange-600">3x</span> a palavra{" "}
          <span className="font-bold">"afastar"</span> nos últimos 7 dias
        </p>
      </div>

      {/* Indicador de arrastar */}
      <div className="flex justify-center items-center mb-2">
        <div className="bg-orange-500 text-white p-1 rounded-full animate-bounce">
          <FiChevronDown size={20} />
        </div>
      </div>

      {/* Área de scroll horizontal */}
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide px-2"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {users.map((chat, index) => (
          <div
            key={index}
            className="min-w-[280px] flex-shrink-0 scroll-snap-align-start"
          >
            <InstagramChatFull follwinsgs={[]}/>
          </div>
        ))}
      </div>
    </div>
  );
}
