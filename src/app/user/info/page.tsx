"use client";
import { useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";
import { getImageBase64 } from "@/app/actions/imageProxyActions";
import { FaUserSecret } from "react-icons/fa";
import { AiOutlineLock } from "react-icons/ai";
import StalkerAlert from "@/app/compoents/analyse";
import LastWeek from "@/app/compoents/lastWeek";

export default function InfoPage() {
  const user = useUserStore((state) => state.user);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [city, setCity] = useState("sua cidade");
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [verifying, setVerifying] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(-1);

  // Pega imagem de perfil em base64
  useEffect(() => {
    const load = async () => {
      if (user?.profile_pic_url_hd) {
        const img = await getImageBase64(user.profile_pic_url_hd);
        setProfileImage(img);
      }
    };
    load();
  }, [user]);

  // Cidade via IP
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data?.city) setCity(data.city);
      })
      .catch(() => setCity("sua cidade"));
  }, []);

  // Relatório passo a passo
  const relatorio = [
    { label: "cidade", text: `📍 5 pessoas de ${city} encaminharam publicações suas recentemente` },
    { label: "mensagens diretas", text: `📩 Foram encontradas 9 menções a @${user?.username} em mensagens no direct` },
    { label: "prints", text: "🕵️‍♀️ Prints de conversas sobre você foram detectados" },
    { label: "stalkers semana", text: "🔍 11 stalkers novos na última semana" },
    { label: "stalker fixo", text: "❤️ Um stalker acessou seu perfil por 11 dias seguidos" },
    { label: "melhores amigos", text: "💛 3 perfis que você não segue te colocaram nos melhores amigos" },
  ];

  // Lógica de verificação animada
  useEffect(() => {
    if (currentStep < relatorio.length - 1) {
      const timeout = setTimeout(() => {
        const nextStep = currentStep + 1;
        setVerifying(relatorio[nextStep].label);

        setTimeout(() => {
          setCompletedSteps((prev) => [...prev, relatorio[nextStep].text]);
          setCurrentStep(nextStep);
          setVerifying(null);
        }, 2000);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [currentStep]);

  // Inicia animação
  useEffect(() => {
    if (user && currentStep === -1) {
      setCurrentStep(0);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="w-full max-w-sm h-screen bg-white flex flex-col justify-center items-center text-center px-6">
        <p className="text-sm text-gray-500">Carregando ou sem usuário...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm h-screen bg-white flex flex-col mx-auto">
      <div className="w-full h-2 bg-orange-500" />

      <div className="flex-grow overflow-y-auto px-6 pb-4 pt-10 text-center">
        {profileImage ? (
          <img
            src={profileImage}
            alt={user.username}
            className="w-24 h-24 rounded-full mx-auto mb-4 shadow-lg border-4 border-white object-cover"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse border-4 border-white" />
        )}

        <h1 className="text-xl font-bold">Olá {user.full_name}</h1>
        <p className="text-orange-600 font-medium">@{user.username}</p>

        <hr className="my-4" />

        <div className="text-left text-sm space-y-3">
          {completedSteps.map((text, i) => (
            <div key={i} className="flex items-start gap-2 text-gray-800">
              <span>✅</span>
              <p>{text}</p>
            </div>
          ))}

          {verifying && (
            <div className="flex items-start gap-2 text-orange-500 italic">
              <span className="animate-ping mt-[2px]">🟠</span>
              <p>Verificando {verifying}...</p>
            </div>
          )}
          {!verifying && (
            <StalkerAlert userId={user.id} />)
          }
          {
            !verifying && ( 
            <LastWeek  />
            )
          }
        </div>
      </div>

      <div className="bg-white py-4 flex justify-around items-center shadow-inner border-t">
        <div className="flex flex-col items-center text-orange-500 text-xs">
          <AiOutlineLock className="text-2xl" />
          Painel
        </div>
        <div className="flex flex-col items-center text-gray-400 text-xs">
          <FaUserSecret className="text-2xl" />
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
