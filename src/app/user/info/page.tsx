"use client";
import { useCallback, useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";
import { getImageBase64 } from "@/app/actions/imageProxyActions";
import { FaUserSecret } from "react-icons/fa";
import { AiOutlineLock } from "react-icons/ai";
import StalkerAlert from "@/app/compoents/analyse";
import LastWeek from "@/app/compoents/lastWeek";
import { useRouter } from "next/navigation";
import StalkerResumo from "@/app/compoents/stalkerResume";
import VisitantesCards from "@/app/compoents/VisitantesCards";
import VisitantesContainer from "@/app/compoents/chats";
import BestFriendsCard from "@/app/compoents/bestFriends";
import Image from 'next/image';

export default function InfoPage() {
  const user = useUserStore((state) => state.user);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [city, setCity] = useState("sua cidade");
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [verifying, setVerifying] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(-1);

  const getFollowers = useUserStore((state) => (state.getFollowers));
  const getFollowings = useUserStore((state) => (state.getFollowings));
  const getStories = useUserStore((state) => (state.getStories));
  const getPublications = useUserStore((state) => (state.getPublications));

  const router = useRouter();

  const loadFollowers = useCallback(async () => {
    if (!user?.id) return;
    try {
      await getFollowings(user.id, 10, null);
      await getFollowers(user.id, 10, null);
      await getStories(user.id);
      await getPublications(user.id, 10, null);
    } catch (err) {
      console.error("Erro ao carregar listas:", err);
    }
  }, [getFollowers, getFollowings, getPublications, getStories, user?.id]);
  
  useEffect(() => {
    if (!user?.id) {
      router.push("/");
      return;
    }
    const load = async () => {
      if (user?.profile_pic_url_hd) {
        const img = await getImageBase64(user.profile_pic_url_hd);
        setProfileImage(img);
        await loadFollowers();
      }
    };
    load();
  }, [loadFollowers, router, user?.id, user?.profile_pic_url_hd]);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data?.city) setCity(data.city);
      })
      .catch(() => setCity("sua cidade"));
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const relatorio = [
    { label: "cidade", text: `📍 5 pessoas de ${city} encaminharam publicações suas recentemente` },
    { label: "mensagens diretas", text: `📩 Foram encontradas 9 menções a @${user?.username} em mensagens no direct` },
    { label: "prints", text: "🕵️‍♀️ Prints de conversas sobre você foram detectados" },
    { label: "stalkers semana", text: "🔍 11 stalkers novos na última semana" },
    { label: "stalker fixo", text: "❤️ Um stalker acessou seu perfil por 11 dias seguidos" },
    { label: "melhores amigos", text: "💛 3 perfis que você não segue te colocaram nos melhores amigos" },
  ];

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
  }, [currentStep, relatorio]);

  useEffect(() => {
    if (user && currentStep === -1) {
      setCurrentStep(0);
    }
  }, [currentStep, user]);

  if (!user) {
    return (
      <div className="w-full max-w-sm h-screen bg-white flex flex-col justify-center items-center text-center px-6">
        <p className="text-sm text-gray-500">Carregando ou sem usuário...</p>
      </div>
    );
  }

  const chegouNosMelhoresAmigos =
    currentStep >= relatorio.findIndex((r) => r.label === "melhores amigos");

  return (
    <div className="w-full max-w-sm h-screen bg-white flex flex-col mx-auto ">
      <div className="w-full h-2 bg-orange-500" />

      <div className="flex-grow overflow-y-auto px-6 pb-4 pt-10 text-center">
        {profileImage ? (
          <Image
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
          <div className={chegouNosMelhoresAmigos ? 'hidden' : ''}>
            {completedSteps.map((text, i) => (
              <div key={i} className="flex items-start gap-2 text-gray-800">
                <span>✅</span>
                <p>{text}</p>
              </div>
            ))}

          {verifying && (
            <div className={`flex items-start gap-2 text-orange-500 italic`} >
              <span className="animate-ping mt-[2px]">🟠</span>
              <p>Verificando {verifying}...</p>
            </div>
          )}

          </div>

          { !verifying && chegouNosMelhoresAmigos && (
            <>
              <StalkerAlert userId={user.id} />
              <LastWeek />
              <StalkerResumo></StalkerResumo>
              <VisitantesContainer></VisitantesContainer>
              <VisitantesCards></VisitantesCards>
              <BestFriendsCard></BestFriendsCard>
            </>
          )}
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
