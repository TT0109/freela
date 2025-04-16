'use client';
import { useState } from 'react';
import {
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
  text?: string;
  isMe?: boolean;
  isAudio?: boolean;
};

export default function InstagramChatFull({follwinsgs: any}) {
  const blacklist = ['golpista', 'mentiroso', 'enganou', 'traiu'];

  const isCensored = (text: string): boolean => {
    return blacklist.some((word) => text.toLowerCase().includes(word));
  };

  const [messages] = useState<Message[]>([
    {
      id: 1,
      username: 'lucas_fake',
      avatarUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
      text: 'Mano do céu',
    },
    {
      id: 2,
      username: 'lucas_fake',
      avatarUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
      text: 'Se não tá ligado',
    },
    {
      id: 3,
      username: 'lucas_fake',
      avatarUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
      text: 'sander é muito',
    },
    {
      id: 4,
      username: 'meu_user',
      avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      text: 'pqppp nem fodendooo KKKKKKKKKK',
      isMe: true,
    },
    {
      id: 5,
      username: 'meu_user',
      avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      text: 'eu te falei q é melhor se afastar',
      isMe: true,
    },
    {
      id: 6,
      username: 'meu_user',
      avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      text: 'KAAKAKAKAKAKAK',
      isMe: true,
    },
    {
      id: 7,
      username: 'meu_user',
      avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      isAudio: true,
      isMe: true,
    },
    {
      id: 8,
      username: 'meu_user',
      avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      text: 'mais nem comenta',
      isMe: true,
    },
  ]);

  const [blurAtivo, setBlurAtivo] = useState(true);

  return (
    <div className="relative max-w-sm mx-auto h-[90vh] bg-[#000000] border border-gray-800 rounded-xl flex flex-col overflow-hidden shadow-md text-white">
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
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700 bg-[#0f0f0f] z-10">
        <div className="flex items-center gap-2">
          <img
            src="https://randomuser.me/api/portraits/men/22.jpg"
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <div className="flex flex-col text-xs">
            <span className="font-semibold text-sm text-white">lucas_fake</span>
            <span className="text-gray-400 text-xs">Instagram</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-white text-lg">
          <FaVideo />
          <FaPhone />
          <FaInfoCircle />
        </div>
      </div>

      {/* Mensagens */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'} items-end`}
          >
            {!msg.isMe && (
              <img
                src={msg.avatarUrl}
                alt={msg.username}
                className="w-6 h-6 rounded-full mr-2"
              />
            )}
            <div
              className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${
                msg.isMe
                  ? 'bg-purple-600 text-white self-end'
                  : 'bg-gray-800 text-white self-start'
              }`}
            >
              {msg.isAudio ? (
                <div className="text-gray-300 italic">Mensagem de áudio</div>
              ) : isCensored(msg.text || '') ? (
                <span className="blur-sm select-none">[Conteúdo censurado]</span>
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center px-4 py-2 border-t border-gray-700 bg-[#0f0f0f] gap-4">
        <FaCamera className="text-xl" />
        <FaMicrophone className="text-xl" />
        <div className="bg-gray-700 rounded-full px-4 py-1 text-sm text-gray-300 flex-1">
          Mensagem...
        </div>
        <FaThumbsUp className="text-xl text-blue-500" />
      </div>
    </div>
  );
}
