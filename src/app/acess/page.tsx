'use client';
import { Bell, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { PiDetectiveBold } from "react-icons/pi";
import { BsInstagram } from "react-icons/bs";
import { useCallback, useEffect } from "react";
import { emailStore } from "../user/store/emailStore";

export default function PainelSpy() {
  const router = useRouter();

  const handleProfileSpy = useCallback(() => {
    // Limpar o cache da busca ao entrar na página
    localStorage.removeItem('ultimaBusca');
    localStorage.removeItem('bloqueio_busca');
    
    router.push('/acess/busca');
  }, [router]);

  useEffect(() => {
    // Limpar o cache toda vez que o componente for montado
    localStorage.removeItem('ultimaBusca');
    localStorage.removeItem('bloqueio_busca');
  }, []);

  return (
    <div className="min-h-screen bg-white px-4 py-5">
      <div className="flex justify-between items-center mb-4">
        <div className="bg-pink-200 p-2 rounded-full">
          <User className="text-white w-5 h-5" />
        </div>
        <div className="bg-pink-200 p-2 rounded-full">
          <Bell className="text-white w-5 h-5" />
        </div>
      </div>

      <div className="bg-pink-500 text-white rounded-xl px-4 py-3 flex justify-between items-center mb-6">
        <div className="flex-1 pr-2">
          <h1 className="text-lg font-bold leading-tight">Bem vindo(a)!</h1>
          <p className="text-sm">Você tem 1 relatório disponível esta semana.</p>
        </div>
        <div className="bg-pink-300 p-2 rounded-full">
          <PiDetectiveBold className="text-white w-5 h-5" />
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-bold text-pink-500">Serviços Spy</h2>
        <p className="text-sm text-gray-500">disponíveis para você</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button className="border rounded-xl p-4 shadow-sm bg-white text-left transition hover:bg-pink-50 active:scale-[0.98]" onClick={() => handleProfileSpy()}>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-1.5 rounded-full">
                <BsInstagram />
              </div>
              <h3 className="font-semibold text-sm">Instagram</h3>
            </div>
            <span className="text-green-500 text-xs font-medium">● Ativo</span>
          </div>
          <p className="text-xs text-gray-500">
            Veja Direct, Stalkers, Encaminhamentos...
          </p>
        </button>

        {/* <button className="border rounded-xl p-4 shadow-sm bg-white text-left relative transition hover:bg-green-50 active:scale-[0.98] opacity-60">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className="bg-green-400 p-1.5 rounded-full">
                <BsWhatsapp />
              </div>
              <h3 className="font-semibold text-sm">WhatsApp</h3>
            </div>
            <span className="text-red-500 text-xs font-medium">● Inativo</span>
          </div>
          <p className="text-xs text-gray-500 mb-6">
            Veja Conversas, Chamadas...
          </p>
          <span className="absolute bottom-3 right-3 bg-yellow-400 text-xs px-3 py-1 rounded-full text-white font-semibold">
            Comprar
          </span>
        </button> */}
      </div>
    </div>
  );
}
