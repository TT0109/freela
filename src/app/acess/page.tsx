'use client';
import { Bell, User, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { PiDetectiveBold } from "react-icons/pi";
import { BsInstagram, BsWhatsapp, BsFacebook, BsCamera } from "react-icons/bs";
import { FaLocationArrow, FaXTwitter } from "react-icons/fa6";
import { AiFillPicture } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";
import { useState, useCallback, useEffect } from "react";
import { emailStore } from "../user/store/emailStore";

export default function PainelSpy() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({ title: '', price: 0, redirectLink: '' });

  const handleProfileSpy = useCallback(() => {
    // Limpar o cache da busca ao entrar na página
    localStorage.removeItem('ultimaBusca');
    localStorage.removeItem('bloqueio_busca');
    
    router.push('/acess/busca');
  }, [router]);

  const handleOpenPopup = (title, price, redirectLink) => {
    setPopupData({ title, price, redirectLink });
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleAcquireLicense = () => {
    // Adiciona o preço como parâmetro na URL de redirecionamento
    if (popupData.redirectLink) {
      const url = `${popupData.redirectLink}?price=${popupData.price.toFixed(2)}`;
      router.push(url);
    }
    setShowPopup(false);
  };

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

      <div className="grid grid-cols-2 gap-4 mb-6">
        <button className="border rounded-xl p-4 shadow-sm bg-white text-left transition hover:bg-pink-50 active:scale-[0.98]" onClick={() => handleProfileSpy()}>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-1.5 rounded-full">
                <BsInstagram className="text-white" />
              </div>
              <h3 className="font-semibold text-sm">Instagram</h3>
            </div>
            <span className="text-green-500 text-xs font-medium">● Ativo</span>
          </div>
          <p className="text-xs text-gray-500">
            Veja Direct, Stalkers, Encaminhamentos...
          </p>
        </button>

        <button className="border rounded-xl p-4 shadow-sm bg-white text-left relative transition hover:bg-green-50 active:scale-[0.98] opacity-80" onClick={() => handleOpenPopup('WhatsApp', 39.90, '/payment/whatsapp')}>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className="bg-green-400 p-1.5 rounded-full">
                <BsWhatsapp className="text-white" />
              </div>
              <h3 className="font-semibold text-sm">WhatsApp</h3>
            </div>
            <span className="text-red-500 text-xs font-medium">● Inativo</span>
          </div>
          <p className="text-xs text-gray-500">
            Veja Conversas, Chamadas...
          </p>
        </button>

        <button className="border rounded-xl p-4 shadow-sm bg-white text-left relative transition hover:bg-blue-50 active:scale-[0.98] opacity-80" onClick={() => handleOpenPopup('Facebook', 49.90, '/payment/facebook')}>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className="bg-blue-500 p-1.5 rounded-full">
                <BsFacebook className="text-white" />
              </div>
              <h3 className="font-semibold text-sm">Facebook</h3>
            </div>
            <span className="text-red-500 text-xs font-medium">● Inativo</span>
          </div>
          <p className="text-xs text-gray-500">
            Acesse o Messenger, Veja interações...
          </p>
        </button>

        <button className="border rounded-xl p-4 shadow-sm bg-white text-left relative transition hover:bg-gray-50 active:scale-[0.98] opacity-80" onClick={() => handleOpenPopup('+18', 59.90, '/payment/adult')}>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className="bg-red-500 p-1.5 rounded-full">
                <FaXTwitter className="text-white" />
              </div>
              <h3 className="font-semibold text-sm">+18</h3>
            </div>
            <span className="text-red-500 text-xs font-medium">● Inativo</span>
          </div>
          <p className="text-xs text-gray-500">
            Veja os sites adultos que a pessoa acessa...
          </p>
        </button>

        <button className="border rounded-xl p-4 shadow-sm bg-white text-left relative transition hover:bg-orange-50 active:scale-[0.98] opacity-80" onClick={() => handleOpenPopup('Localização', 69.90, '/payment/location')}>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className="bg-orange-300 p-1.5 rounded-full">
                <FaLocationArrow className="text-white" />
              </div>
              <h3 className="font-semibold text-sm">Localização</h3>
            </div>
            <span className="text-red-500 text-xs font-medium">● Inativo</span>
          </div>
          <p className="text-xs text-gray-500">
            Veja em tempo real a localização da pessoa espionada.
          </p>
        </button>

        <button className="border rounded-xl p-4 shadow-sm bg-white text-left relative transition hover:bg-yellow-50 active:scale-[0.98] opacity-80" onClick={() => handleOpenPopup('Redes Sociais', 79.90, '/payment/social')}>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className="bg-yellow-300 p-1.5 rounded-full">
                <MdOutlineEmail className="text-white" />
              </div>
              <h3 className="font-semibold text-sm">Redes Sociais</h3>
            </div>
            <span className="text-red-500 text-xs font-medium">● Inativo</span>
          </div>
          <p className="text-xs text-gray-500">
            Veja todas as redes sociais que essa pessoa tem. Ex: Tinder
          </p>
        </button>

        <button className="border rounded-xl p-4 shadow-sm bg-white text-left relative transition hover:bg-gray-50 active:scale-[0.98] opacity-80" onClick={() => handleOpenPopup('Câmera', 39.90, '/payment/camera')}>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className="bg-gray-300 p-1.5 rounded-full">
                <BsCamera className="text-white" />
              </div>
              <h3 className="font-semibold text-sm">Câmera</h3>
            </div>
            <span className="text-red-500 text-xs font-medium">● Inativo</span>
          </div>
          <p className="text-xs text-gray-500">
            Tenha acesso a câmera e ao microfone do celular.
          </p>
        </button>

        <button className="border rounded-xl p-4 shadow-sm bg-white text-left relative transition hover:bg-purple-50 active:scale-[0.98] opacity-80" onClick={() => handleOpenPopup('Galeria', 49.90, '/payment/gallery')}>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className="bg-purple-300 p-1.5 rounded-full">
                <AiFillPicture className="text-white" />
              </div>
              <h3 className="font-semibold text-sm">Galeria</h3>
            </div>
            <span className="text-red-500 text-xs font-medium">● Inativo</span>
          </div>
          <p className="text-xs text-gray-500">
            Veja a galeria de fotos, álbuns secretos, fotos apagadas
          </p>
        </button>
      </div>

      <div className="bg-pink-500 rounded-xl p-4 text-white relative overflow-hidden mb-6">
        <div className="flex justify-end items-center mb-2">
          <div className="bg-green-500 text-white px-2 py-0.5 rounded text-xs font-medium mr-2">
            Economize R$ 162,30
          </div>
          <div className="bg-black text-white px-3 py-1 rounded-sm text-xs font-bold">
            50% OFF
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2">Desbloquear todos os recursos?</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          <div className="bg-blue-500 p-1.5 rounded-full"><BsFacebook className="text-white" /></div>
          <div className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-1.5 rounded-full"><BsInstagram className="text-white" /></div>
          <div className="bg-gray-800 p-1.5 rounded-full"><FaXTwitter className="text-white" /></div>
          <div className="bg-green-500 p-1.5 rounded-full"><BsWhatsapp className="text-white" /></div>
          <div className="bg-yellow-300 p-1.5 rounded-full"><MdOutlineEmail className="text-white" /></div>
          <div className="bg-orange-300 p-1.5 rounded-full"><FaLocationArrow className="text-white" /></div>
        </div>
        <button 
          className="bg-white text-pink-500 font-semibold py-2 px-4 rounded-lg w-full transition hover:bg-pink-50 active:scale-[0.98]"
          onClick={() => handleOpenPopup('Todas as Licenças', 162.30, '/payment/all')}
        >
          Adquirir todas as licenças
        </button>
      </div>
      {/* Popup para compra de licença */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-5 w-full max-w-sm relative">
            <button 
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={handleClosePopup}
            >
              <X size={20} />
            </button>
            
            <div className="flex justify-center mb-3">
              {popupData.title === 'Câmera' && (
                <div className="bg-gray-300 p-2 rounded-full">
                  <BsCamera className="text-white w-6 h-6" />
                </div>
              )}
              {popupData.title === 'WhatsApp' && (
                <div className="bg-green-400 p-2 rounded-full">
                  <BsWhatsapp className="text-white w-6 h-6" />
                </div>
              )}
              {popupData.title === 'Facebook' && (
                <div className="bg-blue-500 p-2 rounded-full">
                  <BsFacebook className="text-white w-6 h-6" />
                </div>
              )}
              {popupData.title === '+18' && (
                <div className="bg-red-500 p-2 rounded-full">
                  <FaXTwitter className="text-white w-6 h-6" />
                </div>
              )}
              {popupData.title === 'Localização' && (
                <div className="bg-orange-300 p-2 rounded-full">
                  <FaLocationArrow className="text-white w-6 h-6" />
                </div>
              )}
              {popupData.title === 'Redes Sociais' && (
                <div className="bg-yellow-300 p-2 rounded-full">
                  <MdOutlineEmail className="text-white w-6 h-6" />
                </div>
              )}
              {popupData.title === 'Galeria' && (
                <div className="bg-purple-300 p-2 rounded-full">
                  <AiFillPicture className="text-white w-6 h-6" />
                </div>
              )}
              {popupData.title === 'Todas as Licenças' && (
                <div className="bg-pink-500 p-2 rounded-full">
                  <PiDetectiveBold className="text-white w-6 h-6" />
                </div>
              )}
            </div>
            
            <h2 className="text-xl font-bold text-center mb-1">{popupData.title}</h2>
            <p className="text-center font-medium mb-4">Desconto exclusivo aplicado com sucesso!</p>
            
            <p className="text-center text-gray-600 text-sm mb-4">
              Adquira a licença {popupData.title === 'Todas as Licenças' ? 'completa' : `da ${popupData.title.toLowerCase()}`} com um 
              desconto exclusivo de R$30, investindo um pagamento único de apenas:
            </p>
            
            <p className="text-center text-xl font-bold mb-6">R${popupData.price.toFixed(2)}</p>
            
            <div className="flex flex-col gap-2">
              <button 
                className="bg-pink-500 text-white font-semibold py-3 rounded-lg w-full transition hover:bg-pink-600 active:scale-[0.98]"
                onClick={handleAcquireLicense}
              >
                Adquirir Licença
              </button>
              <button 
                className="text-pink-500 font-medium py-3 rounded-lg w-full transition hover:bg-pink-50 active:scale-[0.98]"
                onClick={handleClosePopup}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
