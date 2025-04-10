'use client';
import { useState } from 'react';
import {
  FaArrowUp,
  FaCamera,
  FaMicrophone,
  FaThumbsUp,
  FaPhone,
  FaVideo,
  FaInfoCircle,
} from 'react-icons/fa';

type Message = {
  id: number;
  username: string;
  avatarUrl: string;
  text: string;
  isMe?: boolean;
};

export default function InstagramChatFull() {
  const blacklist = ['golpista', 'mentiroso', 'enganou', 'traiu'];

  const isCensored = (text: string): boolean => {
    return blacklist.some((word) => text.toLowerCase().includes(word));
  };

  const [messages] = useState<Message[]>([
    {
      id: 1,
      username: 'lucas_fake',
      avatarUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
      text: 'Ele enganou muita gente com esse golpe!',
    },
    {
      id: 2,
      username: 'meu_user',
      avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      text: 'Sério? Conta mais, tô passada!',
      isMe: true,
    },
    {
      id: 3,
      username: 'lucas_fake',
      avatarUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
      text: 'É um golpista, total!',
    },
    {
      id: 4,
      username: 'meu_user',
      avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      text: 'Vou expor ele agora mesmo kkk',
      isMe: true,
    },
  ]);

  const [blurAtivo, setBlurAtivo] = useState(true);

  return (
    <div className="relative max-w-sm mx-auto h-[90vh] bg-white border rounded-xl flex flex-col text-black overflow-hidden shadow-md">

      {/* Overlay de blur */}
      {blurAtivo && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-center p-6">
          <div className="text-red-600 text-xl font-bold mb-2">🚨 Alerta!</div>
          <p className="text-sm text-gray-800 mb-2">
            Esta conversa contém linguagem sensível. Nossa IA decidiu censurar este conteúdo.
          </p>
          <button
            className="bg-red-600 text-white text-sm px-4 py-2 rounded-full hover:bg-red-700 transition"
            onClick={() => setBlurAtivo(false)}
          >
            Desbloquear Relatório Completo
          </button>
        </div>
      )}

      {/* Header estilo Insta */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-white z-10">
        <div className="flex items-center gap-2">
          <img
            src="https://randomuser.me/api/portraits/men/22.jpg"
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <div className="flex flex-col text-xs">
            <span className="font-semibold text-sm">lucas_fake</span>
            <span className="text-gray-400 text-xs">Instagram</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-[#262626] text-xl">
          <FaVideo />
          <FaPhone />
          <FaInfoCircle />
        </div>
      </div>

      {/* Mensagens */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4 bg-white">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'} px-1`}>
            {!msg.isMe && (
              <img
                src={msg.avatarUrl}
                alt={msg.username}
                className="w-6 h-6 rounded-full mr-2 self-end"
              />
            )}
            <div
              className={`relative max-w-[70%] px-4 py-2 rounded-2xl text-sm ${
                msg.isMe
                  ? 'bg-[#0084FF] text-white rounded-br-none'
                  : isCensored(msg.text)
                  ? 'bg-red-100 text-red-600 rounded-bl-none'
                  : 'bg-[#F0F0F0] text-black rounded-bl-none'
              }`}
            >
              {isCensored(msg.text) ? (
                <div className="text-sm font-semibold">🚨 Mensagem censurada por IA</div>
              ) : (
                msg.text
              )}
              {/* Reação */}
              <div className="absolute bottom-[-10px] right-[-10px] text-xs text-gray-400 hover:text-blue-600 cursor-pointer">
                <FaArrowUp />
              </div>
            </div>
            {msg.isMe && (
              <img
                src={msg.avatarUrl}
                alt={msg.username}
                className="w-6 h-6 rounded-full ml-2 self-end"
              />
            )}
          </div>
        ))}
      </div>

      {/* Input com ícones estilo Insta */}
      <div className="border-t px-3 py-2 flex items-center gap-2 bg-white z-10">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="me"
          className="w-6 h-6 rounded-full"
        />
        <input
          type="text"
          placeholder="Mensagem..."
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none"
        />
        <div className="flex gap-2 text-[#262626]">
          <FaCamera />
          <FaMicrophone />
          <FaThumbsUp />
        </div>
      </div>
    </div>
  );
}
