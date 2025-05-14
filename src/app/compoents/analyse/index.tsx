import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaExclamationTriangle } from 'react-icons/fa';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { getOnblueImages } from "@/static/instagram/images";
import axios from 'axios';
import Image from 'next/image';

const getCidadeFromIP = async () => {
  try {
    const res = await fetch('https://ipapi.co/json');
    const data = await res.json();
    return data.city || 'sua cidade';
  } catch (err) {
    console.error('Erro ao buscar cidade por IP:', err);
    return 'sua cidade';
  }
};

const StalkerAlert = ({ userId }) => {
  const [cidade, setCidade] = useState('sua cidade');
  const [imagesBlur, setImagesBlur] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCidadeFromIP().then(setCidade);
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const imagesBlur = await getOnblueImages(userId);
        const res = { data: imagesBlur };
        setImagesBlur(res.data?.imagesBlur || []);
      } catch (err) {
        console.error('Erro ao buscar imagens com blur:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchImages();
  }, [userId]);

  return (
    <div className="max-w-lg mx-auto mt-8 text-center font-sans">
      <h2 className="text-2xl font-bold mb-6">Análise Concluída!</h2>

      {/* Cidade */}
      <div className="border border-green-400 rounded-lg p-4 mb-4 bg-green-50">
        <div className="flex items-center justify-center text-green-700 mb-2">
          <FaMapMarkerAlt className="mr-2" />
          <span>
            <strong>5 perfis de {cidade}</strong> estão no seu perfil agora
          </span>
        </div>

        {imagesBlur[0] && (
          <div className="mt-2 flex justify-center">
            <Image
              src={imagesBlur[0]}
              alt="perfil-cidade"
              className="w-10 h-10 rounded-full border border-green-300"
              width={100}
              height={100}
            />
          </div>
        )}
      </div>

      {/* Stalkers da semana */}
      <div className="border border-yellow-400 rounded-lg p-4 mb-4 bg-yellow-50">
        <div className="flex items-center justify-center text-yellow-800 mb-2">
          <BsFillPersonLinesFill className="mr-2" />
          <span>
            <strong>11 Stalker&apos;s</strong> identificados na última semana
          </span>
        </div>

        <div className="mt-2 flex justify-center gap-2">
          {imagesBlur[1] && (
            <Image
              src={imagesBlur[1]}
              alt="stalker1"
              className="w-10 h-10 rounded-full border border-yellow-300"
              width={100}
              height={100}
            />
          )}
          {imagesBlur[2] && (
            <Image
              src={imagesBlur[2]}
              alt="stalker2"
              className="w-10 h-10 rounded-full border border-yellow-300"
              width={100}
              height={100}
            />
          )}
        </div>
      </div>

      {/* Alerta Crítico */}
      <div className="border border-red-400 rounded-lg p-4 bg-red-50">
        <div className="flex items-center justify-center text-red-700 mb-2">
          <FaExclamationTriangle className="mr-2 text-xl" />
          <span>
            <strong>Alerta Crítico:</strong> 1 Stalker obsessivo encontrado
          </span>
        </div>

        <p className="text-red-700 font-semibold text-lg mb-3">Alguém pode estar te vigiando!</p>

        <ul className="text-left text-sm text-red-700 space-y-1">
          <li>⚠️ Esse Stalker pode estar coletando informações sobre você.</li>
          <li>⚠️ Ele está mencionando seu nome frequentemente em conversas privadas.</li>
          <li>⚠️ Notamos interações suspeitas entre esse Stalker e alguém próximo a você.</li>
          <li>⚠️ Criou um perfil fake e interagiu com seu nome sem que você notasse.</li>
          <li>⚠️ Realizou buscas externas conectando seu nome a perfis desconhecidos.</li>
        </ul>

        {imagesBlur[3] && (
          <div className="mt-4 flex justify-center">
            <Image
              src={imagesBlur[3]}
              alt="stalker-final"
              className="w-12 h-12 rounded-full border border-red-300"
              width={100}
              height={100}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StalkerAlert;
