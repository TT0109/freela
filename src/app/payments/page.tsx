'use client';
import React, { useState, useEffect } from 'react';
import { Eye, MessageCircle, Lock, RefreshCw, CreditCard, Users, Check, AlertCircle, Clock } from 'lucide-react';
import { useUserStore } from '../user/store/userStore';
import { getImageBase64 } from '../actions/imageProxyActions';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const PaymentPage: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
    const user = useUserStore(state => state.user);
    const [profileImage, setProfileImage] = useState(null);
    const router = useRouter();
    
    useEffect(() => {
        if (!user?.id) {
            router.push("/");
            return;
        }
        const load = async () => {
            if (user?.profile_pic_url_hd) {
                const img = await getImageBase64(user.profile_pic_url_hd);
                setProfileImage(img);
            }
        };
        load();
    }, [router, user?.id, user?.profile_pic_url_hd]);

    useEffect(() => {
        if (timeLeft <= 0) {
          window.location.href = 'https://meupainel.digital/';
          return;
        }
      
        const timer = setInterval(() => {
          setTimeLeft(prev => prev - 1);
        }, 1000);
      
        return () => clearInterval(timer);
      }, [timeLeft]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="min-h-screen p-4 flex items-center justify-center">
            <div className="w-full max-w-sm h-screen bg-white flex flex-col mx-auto overflow-y-auto rounded-lg shadow-lg">
                {/* Countdown Timer */}
                <div className="bg-red-500 text-white p-2 flex items-center justify-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">
                        Relatório disponível por: {minutes}:{seconds.toString().padStart(2, '0')} minutos
                    </span>
                </div>

                {/* Header Section */}
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
                </div>
                {/* Main Unlock Banner */}
                <div className="bg-orange-500 p-4 text-white text-center my-4">
                    <Lock className="w-6 h-6 mx-auto mb-2" />
                    <h2 className="text-xl font-bold">Ao desbloquear o Relatório Completo</h2>
                    <p className="text-sm">Você terá acesso em tempo real a:</p>
                    <div className="mt-4 flex justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>

                {/* Features List */}
                <div className="px-4 flex flex-col space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-center mb-2">
                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
                                <Users className="w-5 h-5" />
                            </div>
                        </div>
                        <h3 className="text-center font-bold text-gray-800">Rastreio de Stalker&apos;s</h3>
                        <p className="text-center text-sm text-gray-600">Saiba quem está entrando no seu perfil, mesmo que não te siga</p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-center mb-2">
                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
                                <AlertCircle className="w-5 h-5" />
                            </div>
                        </div>
                        <h3 className="text-center font-bold text-gray-800">Alertas de prints</h3>
                        <p className="text-center text-sm text-gray-600">Veja quem tirou prints do seu perfil, posts, directs e stories!</p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-center mb-2">
                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
                                <Eye className="w-5 h-5" />
                            </div>
                        </div>
                        <h3 className="text-center font-bold text-gray-800">Quem te observa</h3>
                        <p className="text-center text-sm text-gray-600">Descubra quem são as pessoas que viram e reviram seus stories</p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-center mb-2">
                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
                                <MessageCircle className="w-5 h-5" />
                            </div>
                        </div>
                        <h3 className="text-center font-bold text-gray-800">Rastreio de menções</h3>
                        <p className="text-center text-sm text-gray-600">Saiba quem está mencionando você em conversas do direct</p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4 mb-4">
                        <div className="flex justify-center mb-2">
                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
                                <Users className="w-5 h-5" />
                            </div>
                        </div>
                        <h3 className="text-center font-bold text-gray-800">Quem deixou de seguir</h3>
                        <p className="text-center text-sm text-gray-600">Saiba quem são os perfis que deixaram de seguir você ou te bloquearam</p>
                    </div>

                    <p className="text-center text-orange-500 font-semibold">...e muito mais!</p>
                </div>

                {/* Branding Section */}
                <div className="px-4 py-6 text-center">
                    <div className="w-16 h-16 bg-orange-500 rounded-lg mx-auto flex items-center justify-center mb-2">
                        <div className="text-white">
                            <svg width="40" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5 8C17.5 8 19 9.5 19 12C19 14.5 17.5 16 17.5 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6.5 8C6.5 8 5 9.5 5 12C5 14.5 6.5 16 6.5 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8 15.5C8.79565 16.1631 9.79638 16.5 10.8304 16.5H13.1696C14.2036 16.5 15.2044 16.1631 16 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 4L12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M4.5 7.5L19.5 7.5L19.5 11.5C19.5 15.0899 16.5899 18 13 18L11 18C7.41015 18 4.5 15.0899 4.5 11.5L4.5 7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                    <h2 className="flex justify-center text-xl font-bold">
                        <span className="text-gray-800">Spy</span>
                        <span className="text-gray-500">App</span>
                        <span className="text-xs align-top">®</span>
                    </h2>
                    <p className="text-sm text-gray-600 mt-2 px-4">
                        O SpyApp® é o único sistema que possui uma Inteligência Artificial Exclusiva, criada e treinada do zero por nossa equipe.
                    </p>
                    <p className="text-sm text-gray-600 mt-2 px-4">
                        Por sermos o único sistema do mercado com essa tecnologia, fornecidos os resultados mais precisos e confiáveis possíveis!
                    </p>

                    <div className="mt-6">
                        <p className="text-5xl font-bold text-gray-800">203.549</p>
                        <p className="text-gray-600">Perfis analisados</p>
                    </div>
                </div>

                {/* Example User Review */}
                <div className="px-4 py-2">
                    <div className="border rounded-lg p-3 flex items-start">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-3 flex-shrink-0">
                            <Image
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

                {/* CTA Button */}
                <div className="px-4 py-4 mt-auto">
                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-4 rounded transition-colors duration-300">
                        Comprar Relatório Completo
                    </button>

                    <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
                        <div className="flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            <p>Por questões de privacidade, podemos manter seu relatório disponível para visualizar por apenas 10 minutos</p>
                        </div>
                        <button className="bg-orange-500 text-white py-2 px-4 rounded">
                            Desbloquear Relatório
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;