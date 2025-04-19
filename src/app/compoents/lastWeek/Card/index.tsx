'use client';
import { useUserStore } from '@/app/user/store/userStore';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { getImageBase64 } from '@/app/actions/imageProxyActions';
import { getRandomItems } from '@/app/actions/getRandowmItems';

const fakeVisitantes = [
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
  const [visitantes, setVisitantes] = useState(null);
  const user = useUserStore((state) => state.user);

  const followings = useUserStore((state) => state.followers);
  const followers = useUserStore((state) => state.followings);

  const load = useCallback(async () => {

    const allUsersMap = new Map();
    [...followings.followers.users, ...followers.followers.users].forEach((u) => {
      allUsersMap.set(u.pk, u);
    });

    const allUsers = Array.from(allUsersMap.values());

    const selectedUsers = await getRandomItems(allUsers, 3);

    const visitantesConvertidos = await Promise.all(
      selectedUsers.map(async (user: any) => ({
        nome: user.full_name,
        username: user.username,
        avatar: await getImageBase64(user.profile_pic_url),
      }))
    );

    setVisitantes(visitantesConvertidos as any);
    //eslint-disable-next-line
  }, [user?.id]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
      {visitantes && (visitantes as any).map((v, idx) => (
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
