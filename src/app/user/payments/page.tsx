'use client';

import React, { useState, useEffect } from 'react';
import {
    Eye,
    MessageCircle,
    Lock,
    CreditCard,
    Users,
    AlertCircle,
    Clock,
    Check,
} from 'lucide-react';
import { useUserStore } from '../store/userStore';
import { getImageBase64 } from '@/app/actions/imageProxyActions';
import { Redirect } from 'next';

const PaymentPage: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutos
    const user = useUserStore(state => state.user);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    

    useEffect(() => {
        const load = async () => {
            if (user?.profile_pic_url_hd) {
                debugger;
                const img = await getImageBase64(user.profile_pic_url_hd);
                setProfileImage(img);
            }
        };
        load();
    }, [user?.id]);

    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const redirectToPayments = () => {
       window.location.href = 'https://meupainel.digital/'
    }

    return (
        <div className="min-h-screen p-4 flex items-center justify-center">
            <div className="w-full max-w-sm h-screen bg-white flex flex-col mx-auto overflow-y-auto rounded-lg shadow-lg">

                {/* Timer */}
                <div className="bg-red-500 text-white p-2 flex items-center justify-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">
                        Relatório disponível por: {minutes}:{seconds.toString().padStart(2, '0')} minutos
                    </span>
                </div>

                {/* Foto do perfil */}
                <div className="flex-grow h-full px-6 pb-4 pt-10 text-center">
                    {profileImage ? (
                        <img
                            src={profileImage}
                            alt={user?.username}
                            className="w-24 h-24 rounded-full mx-auto mb-4 shadow-lg border-4 border-white object-cover"
                        />
                    ) : (
                        <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse border-4 border-white" />
                    )}
                    {
                        user && (
                            <><h1 className="text-xl font-bold">Olá {user.full_name}</h1><p className="text-orange-600 font-medium">@{user.username}</p></>
                        )
                    }

                </div>

                {/* Banner */}
                <div className="bg-orange-500 p-4 text-white text-center my-4">
                    <Lock className="w-6 h-6 mx-auto mb-2" />
                    <h2 className="text-xl font-bold">Ao desbloquear o Relatório Completo</h2>
                    <p className="text-sm">Você terá acesso em tempo real a:</p>
                </div>

                {/* Lista de funcionalidades */}
                <div className="px-4 flex flex-col space-y-4">
                    {[
                        {
                            icon: <Users className="w-5 h-5" />,
                            title: "Rastreio de Stalker's",
                            desc: 'Saiba quem está entrando no seu perfil, mesmo que não te siga',
                        },
                        {
                            icon: <AlertCircle className="w-5 h-5" />,
                            title: 'Alertas de prints',
                            desc: 'Veja quem tirou prints do seu perfil, posts, directs e stories!',
                        },
                        {
                            icon: <Eye className="w-5 h-5" />,
                            title: 'Quem te observa',
                            desc: 'Descubra quem viu e reviu seus stories',
                        },
                        {
                            icon: <MessageCircle className="w-5 h-5" />,
                            title: 'Rastreio de menções',
                            desc: 'Saiba quem está mencionando você em conversas do direct',
                        },
                    ].map(({ icon, title, desc }, i) => (
                        <div
                            key={i}
                            className="border border-gray-200 rounded-lg p-4 text-center"
                        >
                            <div className="flex justify-center mb-2">
                                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
                                    {icon}
                                </div>
                            </div>
                            <h3 className="font-bold text-gray-800">{title}</h3>
                            <p className="text-sm text-gray-600">{desc}</p>
                        </div>
                    ))}
                </div>

                {/* Example User Review */}
                <div className="px-4 py-2">
                    <div className="border rounded-lg p-3 flex items-start">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-3 flex-shrink-0">
                            <img
                                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150"
                                alt="User"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <div className="flex items-center">
                                <p className="font-semibold text-gray-800">Luzianne</p>
                                <p className="ml-2 text-gray-500 text-xs">@allannavieira1334</p>
                                <p className="ml-2 text-gray-500 text-xs">15min</p>
                            </div>
                            <p className="text-sm text-gray-700 mt-1">MENINA DO CÉU!!!! Toma cuidado com o EX de vcs, só falo isso, descobri que o abençoado tá tirando print de todos meus storie, pra q isso??????</p>
                        </div>
                    </div>
                </div>

                {/* Pricing Section */}
                <div className="px-4 py-4">
                    <div className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center">
                                <Lock className="w-5 h-5 mr-2 text-gray-700" />
                                <div>
                                    <p className="font-bold text-gray-800">Relatório Completo</p>
                                    <p className="text-xs text-gray-600">Pagamento 100% seguro</p>
                                </div>
                            </div>
                            <div className="bg-orange-500 text-white text-xs font-semibold py-1 px-2 rounded">
                                Promoção 50%OFF
                            </div>
                        </div>

                        <div className="mt-4 flex justify-between items-end">
                            <div>
                                <p className="text-xs text-gray-500">De R$ 84 por:</p>
                                <div className="flex items-baseline">
                                    <span className="text-2xl font-bold text-gray-800">R$ 39,90</span>
                                    <span className="text-xs text-gray-500 ml-1">à vista</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 space-y-2">
                            <div className="flex items-center">
                                <div className="w-5 h-5 mr-2 text-orange-500">
                                    <Check className="w-full h-full" />
                                </div>
                                <p className="text-sm text-gray-700">Acesso vitalício e Imediato</p>
                            </div>
                            <div className="flex items-center">
                                <div className="w-5 h-5 mr-2 text-orange-500">
                                    <Check className="w-full h-full" />
                                </div>
                                <p className="text-sm text-gray-700">Atualizações semanais</p>
                            </div>
                            <div className="flex items-center">
                                <div className="w-5 h-5 mr-2 text-orange-500">
                                    <Check className="w-full h-full" />
                                </div>
                                <p className="text-sm text-gray-700">Dados em tempo real</p>
                            </div>
                            <div className="flex items-center">
                                <div className="w-5 h-5 mr-2 text-orange-500">
                                    <Check className="w-full h-full" />
                                </div>
                                <p className="text-sm text-gray-700">Pagamento Único</p>
                            </div>
                        </div>

                        {/* Bonus Section */}
                        <div className="mt-4 border rounded-lg p-3 bg-gray-50">
                            <div className="flex">
                                <div className="bg-orange-500 text-white text-xs font-semibold py-1 px-2 rounded mr-2">
                                    Novo
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800">
                                        Bônus: <span className="font-normal">Tenha acesso exclusivo ao</span>
                                    </p>
                                    <p className="font-semibold text-gray-800">Close Friends <span className="font-normal">de qualquer pessoa</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Botão de ação final */}
                <div className="p-4 mt-auto">
                    <button className="w-full bg-orange-500 hover:bg-orange-600 transition text-white py-3 rounded-lg font-medium flex items-center justify-center cursor-pointer" onClick={redirectToPayments}>
                        <CreditCard className="mr-2 w-5 h-5" />
                        Desbloquear relatório completo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
