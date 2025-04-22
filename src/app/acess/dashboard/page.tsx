'use client'
import { PieChart, Pie, Cell } from 'recharts';
import { useUserStore } from '@/app/user/store/userStore';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { getImageBase64 } from '@/app/actions/imageProxyActions';
import Image from 'next/image';
import { getRandomItems } from '@/app/actions/getRandowmItems';
import { StoriesActivity } from '@/app/compoents/stories';
import Link from 'next/link';
import { FaSearch, FaArrowRight, FaComment, FaCamera } from 'react-icons/fa';
import { emailStore } from '@/app/user/store/emailStore';

const CustomDashboard = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const getFollowers = useUserStore((state) => (state.getFollowers));
  const getFollowings = useUserStore((state) => (state.getFollowings));
  const getStories = useUserStore((state) => (state.getStories));
  const getPublications = useUserStore((state) => (state.getPublications));
  const [city, setCity] = useState<string>('');
  const [procfileImage, setProcfileImage] = useState<string>('');
  const email = emailStore((state) => state.email);
  
  // Estado para armazenar os dados do gráfico com percentagens aleatórias
  const [chartData, setChartData] = useState<{ name: string; label: string; value: number; color: string }[]>([]);
  // Estados para números aleatórios de menções e screenshots
  const [mentionsCount, setMentionsCount] = useState<number>(0);
  const [screenshotsCount, setScreenshotsCount] = useState<number>(0);
  const [talkingCount, setTalkingCount] = useState<number>(0);

  // Função para gerar percentagens aleatórias para o gráfico
  const generateRandomChartData = () => {
    // Gerar um valor aleatório entre 50-95 para seguidores
    const followersValue = Math.floor(Math.random() * 46) + 50;
    // Gerar um valor aleatório entre 5-30 para não seguidores
    const nonFollowersValue = Math.floor(Math.random() * 26) + 5;
    // O valor de visitantes é o restante para completar 100%
    const visitorsValue = 100 - followersValue - nonFollowersValue;

    return [
      { name: 'Visitas ao perfil', label: 'Visitas ao perfil', value: visitorsValue, color: '#f59e0b' },
      { name: 'Seguidores', label: 'Seguidores', value: followersValue, color: '#3b82f6' },
      { name: 'Não Seguidores', label: 'Não Seguidores', value: nonFollowersValue, color: '#8b5cf6' }
    ];
  };

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

      // Gerar dados aleatórios para o gráfico a cada carregamento
      setChartData(generateRandomChartData() as any);
      
      // Gerar números aleatórios para menções, screenshots e pessoas falando
      setMentionsCount(Math.floor(Math.random() * 15) + 5); // Entre 5 e 20 menções
      setScreenshotsCount(Math.floor(Math.random() * 20) + 10); // Entre 10 e 30 screenshots
      setTalkingCount(Math.floor(Math.random() * 8) + 3); // Entre 3 e 10 pessoas falando

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
  }, [email, email?.id, loadFollowers, router]);

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
              data={chartData}
              dataKey="value"
              outerRadius={50}
              innerRadius={35}
              paddingAngle={2}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </div>
        <div className="flex justify-between mt-2 px-4 text-sm">
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              <span className="text-yellow-500 font-bold">{chartData[1]?.value}%</span> Seguidores
            </p>
            <RandomFollowers />
          </div>
          <span className="text-purple-500">{chartData[2]?.value}% Não Seguidores</span>
          <span className="text-yellow-500">{chartData[0]?.value}% Visitantes</span>
        </div>
      </div>

      {/* Nova seção: Te mencionaram em conversas */}
      <div className="mt-6 bg-gray-100 rounded-xl p-4 shadow-md">
        <div className="flex items-center">
          <FaComment className="text-blue-500 mr-2" />
          <p className="font-medium">Te mencionaram em conversas</p>
        </div>
        <p className="text-sm text-gray-500 mt-1">{mentionsCount} vezes nas últimas 24h</p>
        <div className="mt-2">
          <RandomFollowers count={Math.floor(Math.random() * 3) + 3} /> {/* Entre 3 e 5 pessoas */}
        </div>
      </div>

      {/* Nova seção: Tiraram print do seu perfil */}
      <div className="mt-6 bg-gray-100 rounded-xl p-4 shadow-md">
        <div className="flex items-center">
          <FaCamera className="text-red-500 mr-2" />
          <p className="font-medium">Tiraram print do seu perfil</p>
        </div>
        <p className="text-sm text-gray-500 mt-1">{screenshotsCount} capturas de tela hoje</p>
        <div className="mt-2">
          <RandomFollowers count={Math.floor(Math.random() * 4) + 2} /> {/* Entre 2 e 5 pessoas */}
        </div>
      </div>
      
      {/* Nova seção: Estão falando de você agora */}
      <div className="mt-6 bg-gray-100 rounded-xl p-4 shadow-md">
        <div className="flex items-center">
          <span className="text-green-500 font-bold text-xl mr-2">•</span> {/* Indicador de "ao vivo" */}
          <p className="font-medium">Estão falando de você agora</p>
        </div>
        <p className="text-sm text-gray-500 mt-1">{talkingCount} conversas ativas</p>
        <div className="mt-2">
          <RandomFollowers count={Math.floor(Math.random() * 3) + 2} /> {/* Entre 2 e 4 pessoas */}
        </div>
      </div>

      <div className="mt-6">
        <p className="font-medium">Compartilharam seu perfil essa semana</p>
        <p className="text-sm text-gray-500 mt-1">36 pessoas</p>
        <div className="flex space-x-2 mt-2">
          <RandomFollowers count={Math.floor(Math.random() * 2) + 4} />
        </div>
      </div>

      <div className="mt-6">
        <p className="font-medium">Agora no seu perfil</p>
        <p className="text-sm text-gray-500 mt-1">5 pessoas</p>
        <div className="flex space-x-2 mt-2">
          <RandomFollowers count={Math.floor(Math.random() * 3) + 3} />
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

// Componente RandomFollowers modificado para mostrar username ao passar o mouse
// e com quantidade variável de pessoas
const RandomFollowers = ({ count = 4 }) => {
  const [visitantes, setVisitantes] = useState<{ avatar: string, username: string }[]>([]);
  const [hoveredUser, setHoveredUser] = useState<number | null>(null);
  const followings = useUserStore((state) => state.followers);
  const followers = useUserStore((state) => state.followings);
  
  // Quantidade atual de pessoas a mostrar
  const [displayCount, setDisplayCount] = useState<number>(count);

  const load = useCallback(async () => {
    const allUsersMap = new Map();
    [...followings.followers.users, ...followers.followers.users].forEach((u) => {
      allUsersMap.set(u.pk, u);
    });

    const allUsers = Array.from(allUsersMap.values());
    // Usar o displayCount ao invés do valor fixo 4
    const selectedUsers = await getRandomItems(allUsers, displayCount);

    const visitantesConvertidos = await Promise.all(
      selectedUsers.map(async (user: any) => ({
        avatar: await getImageBase64(user.profile_pic_url),
        username: user.username || `user_${Math.floor(Math.random() * 10000)}`
      }))
    );

    setVisitantes(visitantesConvertidos);
  }, [followings, followers, displayCount]);

  useEffect(() => {
    // Atualizar o displayCount quando a prop count mudar
    setDisplayCount(count);
  }, [count]);

  useEffect(() => {
    load();
  }, [load, displayCount]);

  return (
    <div className="flex justify-center -space-x-3 mt-2 relative">
      {visitantes.map((v, idx) => (
        <div key={idx} className="relative">
          <Image
            src={v.avatar}
            alt={`seguidor-${idx}`}
            width={36}
            height={36}
            className="rounded-full border-2 border-white hover:z-10 hover:scale-110 transition-all"
            onMouseEnter={() => setHoveredUser(idx)}
            onMouseLeave={() => setHoveredUser(null)}
          />
          {hoveredUser === idx && (
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded-md whitespace-nowrap z-20">
              {v.username}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CustomDashboard;