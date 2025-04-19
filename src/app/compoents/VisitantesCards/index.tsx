'use client';

import { useUserStore } from '@/app/user/store/userStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { FaLock } from 'react-icons/fa';

const fakeVisitantes = [
  {
    nome: 'Sheila',
    username: 'dikabrunna',
    avatar: 'https://i.pravatar.cc/150?img=3',
    acao: 'Visitou seu perfil 12 vezes ontem',
  },
  {
    nome: 'Idah',
    username: 'idahqueen',
    avatar: 'https://i.pravatar.cc/150?img=4',
    acao: 'Colocou você nos melhores amigos',
  },
  {
    nome: 'Bruna',
    username: 'bruna_star',
    avatar: 'https://i.pravatar.cc/150?img=5',
    acao: 'Encaminhou um post seu para @a********',
  },
  {
    nome: 'Dani',
    username: 'danixxx',
    avatar: 'https://i.pravatar.cc/150?img=6',
    acao: 'Tirou print de uma conversa na sua DM hoje',
  },
];

function mascararUsername(username: string): string {
  return username.substring(0, 2) + '*'.repeat(6);
}

export default function VisitantesCards() {
  const router = useRouter();

  const redirectToPayments = () => {
    router.push('payments');
  };

  return (
    <div className="px-4 py-6 max-w-lg mx-auto text-center font-sans">
      <p className="text-sm text-gray-700 mb-1">
        ...e mais <span className="text-orange-600 font-bold">2 menções</span> e prints
      </p>
      <p className="text-xs text-pink-600 font-semibold uppercase mb-4">
        DESCUBRA <span className="underline">QUEM FALOU DE VOCÊ</span><br />NO RELATÓRIO COMPLETO
      </p>

      <button className="bg-orange-500 hover:bg-orange-600 transition text-white w-full py-3 rounded-xl font-semibold text-base mb-5 cursor-pointer" onClick={redirectToPayments}>
        🔓 Desbloquear prints
      </button>

      <h3 className="text-sm text-gray-800 font-semibold mb-4">
        Principais <span className="text-orange-600">STALKER&apos;S</span><br />detectados essa semana
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {fakeVisitantes.map((v, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col items-center text-center relative">
            <div className="relative w-20 h-20 mb-2">
              <Image
                src={v.avatar}
                alt={v.nome}
                fill
                className="rounded-full object-cover filter blur-md"
              />
              <FaLock className="absolute inset-0 m-auto text-white text-lg" />
            </div>
            <span className="text-xs font-bold text-gray-800">@{mascararUsername(v.username)}</span>
            <p className="text-[11px] text-gray-600 mt-1">{v.acao}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
