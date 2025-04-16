"use client"

import React, { useEffect, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { MdOutlineVisibility } from "react-icons/md";
import axios from "axios";

type Props = {
  userId: string;
};

const StalkerResumo: React.FC<Props> = ({ userId }) => {
  const [imagesBlur, setImagesBlur] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);


  return (
    <div className="max-w-md mx-auto font-sans px-4 py-6 text-center">
      <p className="text-orange-600 font-semibold text-lg mb-4">... e mais:</p>

      {/* Prints no perfil */}
      <div className="bg-white border border-gray-200 shadow rounded-xl p-4 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MdOutlineVisibility className="text-2xl text-orange-500" />
          <span className="text-xl font-bold text-gray-800">10</span>
        </div>
        <span className="text-sm text-gray-700 text-left">
          Pessoas tiraram print do seu perfil nos <strong>últimos 7 dias</strong>
        </span>
      </div>

      {/* Menções no direct */}
      <div className="bg-white border border-gray-200 shadow rounded-xl p-4 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BsFillPersonLinesFill className="text-2xl text-orange-500" />
          <span className="text-xl font-bold text-gray-800">5</span>
        </div>
        <span className="text-sm text-gray-700 text-left">
          Pessoas <strong>mencionaram seu nome</strong> em conversas no direct
        </span>
      </div>

      {/* Descubra seus stalkers */}
      <div className="border border-orange-400 bg-orange-50 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-center gap-2 text-orange-700 font-medium">
          <FaExclamationTriangle className="text-xl" />
          <span>
            Descubra seus <strong>Stalker's</strong> no relatório completo
          </span>
        </div>
      </div>

      {/* Botão de ação */}
      <button className="bg-orange-500 hover:bg-orange-600 transition text-white w-full py-3 rounded-xl font-semibold mt-2 text-lg">
        🔒 Descobrir stalkers
      </button>
    </div>
  );
};

export default StalkerResumo;
