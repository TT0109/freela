"use client"
import { useState } from 'react';
import { FaUserSecret, FaUser, FaUsers } from 'react-icons/fa';
import { AiOutlineLock } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

export default function ProfileSpySelector() {
  const [progress, setProgress] = useState(25);

  const router = useRouter();

  const handleProfileSpy = () => {
    router.push('/user/search');
  };

  return (
    <div className="w-full max-w-sm h-screen bg-gray-100 flex flex-col mx-auto">
      {/* Barra de progresso */}
      <div className="w-full h-2 bg-gray-300 relative">
        <div className="h-2 bg-orange-500" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="bg-white rounded-t-3xl shadow-md flex-grow flex flex-col items-center pt-12">
        {/* Ícone */}
        <div className="bg-orange-500 w-20 h-20 rounded-full flex items-center justify-center text-white text-4xl shadow-lg -mt-10 z-10">
          <FaUserSecret />
        </div>

        <h1 className="text-xl font-semibold mt-4 text-center">Descubra em 1 minuto</h1>
        <p className="text-gray-600 text-center px-8 mt-2 text-sm">
          Todas as informações que <br /> o instagram esconde de você.
        </p>

        <hr className="w-4/5 my-6 border-gray-200" />
        <p className="text-sm text-gray-600 mb-4">Qual perfil você quer investigar?</p>

        {/* Botões */}
        <div className="w-full px-8 space-y-4">
          <button className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white font-semibold py-3 rounded-lg shadow-md" onClick={handleProfileSpy} style={{cursor: 'pointer'}}> 
            <FaUser /> Meu próprio perfil
          </button>
          <button className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white font-semibold py-3 rounded-lg shadow-md" onClick={handleProfileSpy} style={{cursor: 'pointer'}}>
            <FaUsers /> Perfil de outras pessoas
          </button>
        </div>
      </div>

      {/* Menu inferior */}
      <div className="bg-white py-4 flex justify-around items-center shadow-inner">
        <div className="flex flex-col items-center text-gray-400 text-xs">
          <AiOutlineLock className="text-2xl" />
          Painel
        </div>
        <div className="flex flex-col items-center text-orange-500 text-xs">
          <FaUser className="text-2xl" />
          Espionar
        </div>
        <div className="flex flex-col items-center text-gray-400 text-xs">
          <AiOutlineLock className="text-2xl" />
          Prints
        </div>
      </div>
    </div>
  );
}
