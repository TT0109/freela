"use client";

import { useEffect, useState } from "react";
import { FaUserSecret } from "react-icons/fa";
import { AiOutlineLock } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { getImageBase64 } from "@/app/actions/imageProxyActions";
import { useRouter } from "next/navigation";
import { useUserStore } from "../store/userStore";
import Image from 'next/image';

export default function SearchProfile() {
    const progress = 50;
    const [username, setUsername] = useState("");
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [profileImage, setProfileImage] = useState<string>('');
    const router = useRouter();
    const { setUser: setUserStore } = useUserStore(); // ✅ renomeando o setter do Zustand

    useEffect(() => {
        const loadImage = async () => {
            if (user?.profile_pic_url_hd) {
                const base64 = await getImageBase64(user.profile_pic_url_hd);
                if(typeof base64 === 'string') setProfileImage(base64);
            }
        };
        loadImage();
    }, [user]);

    const feedbacks = [
        {
            name: "Geovana",
            username: "@ge0_vanna1v",
            time: "1min",
            text: "Que meu ex via meu perfil todo dia eu já sabia kakaka usei a IA só pra ter certeza msm kkk",
            avatar: "https://randomuser.me/api/portraits/women/79.jpg",
        },
        {
            name: "Paulinho",
            username: "@pauluandrre_",
            time: "4min",
            text: "Rapaizz, não é que funciona mesmo? Testei aqui e deu certinho viu",
            avatar: "https://randomuser.me/api/portraits/men/42.jpg",
        },
        {
            name: "Alê",
            username: "@allessandr4_",
            time: "4min",
            text: "GEEeeente eu to chocaaaada!! Essa IA me mostrou que um menino da minha sala não para de ver meu perfil KKKKKKKKKKK",
            avatar: "https://randomuser.me/api/portraits/women/22.jpg",
        },
    ];

    const searchProfile = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/v1/instagram?username=${username}`);
            setUser(response.data.data.user);
            setUserStore(response.data.data.user);
        } catch (err) {
            console.error("Erro ao buscar usuário", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="w-full max-w-sm h-screen bg-white flex flex-col mx-auto">
                <div className="w-full h-2 bg-orange-500" />
                <div className="flex-grow flex flex-col justify-center items-center text-center px-6">
                    <div className="bg-orange-500 w-20 h-20 rounded-full flex items-center justify-center text-white text-4xl shadow-lg -mt-10 z-10">
                        <FaUserSecret />
                    </div>
                    <div className="mt-6 animate-spin text-orange-500 text-3xl">⭮</div>
                    <h1 className="text-xl font-bold mt-4">Procurando...</h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Nossos robôs estão procurando o seu perfil, aguarde um momento
                    </p>
                </div>
            </div>
        );
    }

    if (user) {
        return (
            <div className="w-full max-w-sm h-screen bg-white flex flex-col mx-auto">
                <div className="w-full h-2 bg-orange-500" />
                <div className="flex-grow flex flex-col items-center justify-center text-center px-6">
                    {profileImage ? (
                        <Image
                            src={profileImage}
                            alt={user.username}
                            className="w-24 h-24 rounded-full object-cover shadow-lg -mt-14 border-4 border-white"
                            width={100}
                            height={100}
                        />
                    ) : (
                        <div className="w-24 h-24 bg-gray-200 rounded-full animate-pulse -mt-14 border-4 border-white" />
                    )}

                    <h2 className="text-xl font-bold mt-4">Olá {user.full_name}</h2>
                    <p className="text-orange-600 font-medium">@{user.username}</p>
                    <p className="mt-4 text-sm text-gray-600">Seu perfil está correto?</p>

                    <Button
                         onClick={() => {
                            const alreadySearched = localStorage.getItem("hasSearched");
                            if (alreadySearched) {
                                router.push(`/user/payments?limitExeceded=true`);
                            } else {
                                localStorage.setItem("hasSearched", 'true');
                                router.push(`/user/info`);
                            }
                        }}
                        className="mt-4 w-full bg-orange-500 text-white font-semibold py-3 rounded-xl shadow-md"
                    >
                        Continuar, está correto!
                    </Button>

                    <button
                        onClick={() => {
                            setUser(null);
                            setProfileImage('');
                        }}
                        className="mt-2 text-sm text-gray-600 flex items-center gap-1"
                    >
                        ← Corrigir
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-sm h-screen bg-white flex flex-col mx-auto">
            <div className="w-full h-2 bg-gray-300 relative">
                <div
                    className="h-2 bg-orange-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            <div className="flex-grow overflow-y-auto px-6 pb-4">
                <div className="flex flex-col items-center mt-12">
                    <div className="bg-orange-500 w-20 h-20 rounded-full flex items-center justify-center text-white text-4xl shadow-lg -mt-10 z-10">
                        <FaUserSecret />
                    </div>
                    <h1 className="text-xl font-bold mt-4">Descubra agora</h1>
                    <p className="text-sm text-gray-600 text-center">
                        Quem está falando de você <br /> no instagram.
                    </p>
                </div>

                <div className="mt-6">
                    <label className="block text-sm font-medium mb-1">
                        Digite seu instagram abaixo:
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-800">
                        <span className="mr-1 text-gray-400">@</span>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="usuario_exemplo"
                            className="w-full bg-transparent outline-none text-sm"
                        />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                        🔒 Dados seguros, não é necessário sua senha
                    </p>
                    {username && (
                        <Button
                            onClick={searchProfile}
                            className="mt-4 w-full bg-orange-500 text-white font-semibold py-3 rounded-xl shadow-md flex items-center justify-center gap-2"
                        >
                            Pesquisar <span className="text-lg">➤</span>
                        </Button>
                    )}
                </div>

                <div className="mt-6 bg-orange-500 text-white rounded-xl p-4 text-sm flex items-center gap-3">
                    <AiOutlineLock className="text-xl" />
                    <span>
                        <strong>Atenção:</strong> Limite de apenas <strong>1 PESQUISA</strong> por dispositivo
                    </span>
                </div>

                <hr className="my-6 border-gray-200" />
                <h2 className="text-center font-semibold text-lg mb-4">FeedBacks</h2>
                <div className="space-y-4 pb-20">
                    {feedbacks.map((f, i) => (
                        <div
                            key={i}
                            className="bg-white border rounded-xl p-4 shadow-sm flex gap-3"
                        >
                            <Image
                                src={f.avatar}
                                alt={f.name}
                                className="w-10 h-10 rounded-full object-cover"
                                width={100}
                                height={100}
                            />
                            <div>
                                <div className="text-sm font-semibold">
                                    {f.name} <span className="text-gray-400">{f.username}</span>{" "}
                                    <span className="text-xs text-gray-400 ml-2">{f.time}</span>
                                </div>
                                <p className="text-sm text-gray-700 mt-1">{f.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white py-4 flex justify-around items-center shadow-inner border-t">
                <div className="flex flex-col items-center text-gray-400 text-xs">
                    <AiOutlineLock className="text-2xl" /> Painel
                </div>
                <div className="flex flex-col items-center text-orange-500 text-xs">
                    <FaUserSecret className="text-2xl" /> Espionar
                </div>
                <div className="flex flex-col items-center text-gray-400 text-xs">
                    <AiOutlineLock className="text-2xl" /> Prints
                </div>
            </div>
        </div>
    );
}
