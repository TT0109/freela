'use client';
import Image from 'next/image';

const visitantes = [
  {
    nome: 'Sheila',
    username: 'dikabrunna',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    nome: 'Idah',
    username: 'idahqueen',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
  {
    nome: 'Bruna',
    username: 'bruna_star',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
];

function mascararNome(nome: string): string {
  return `(${nome.substring(0, 2)})` + '*'.repeat(8);
}

function mascararUsername(username: string): string {
  return username.substring(0, 3) + '*'.repeat(5);
}

export default function VisitantesCards() {
  return (
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
      {visitantes.map((v, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow p-3 flex flex-col items-center text-center">
          <Image
            src={v.avatar}
            alt={v.nome}
            width={80}
            height={80}
            className="rounded-full object-cover mb-2"
          />
          <span className="font-semibold text-sm">{mascararNome(v.nome)}</span>
          <span className="text-gray-500 text-xs">@{mascararUsername(v.username)}</span>
        </div>
      ))}
    </div>
  );
}
