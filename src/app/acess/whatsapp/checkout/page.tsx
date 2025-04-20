'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaLock, FaWhatsapp, FaCreditCard, FaShieldAlt } from 'react-icons/fa'

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handlePayment = () => {
    setLoading(true)
    // Simulate payment processing
    setTimeout(() => {
      router.push('/acess/whatsapp/conversas')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl p-6">
        <div className="flex justify-center mb-6">
          <div className="bg-green-600 p-4 rounded-full">
            <FaWhatsapp className="text-white text-3xl" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-white text-center mb-2">
          Desbloquear Conversas
        </h1>
        
        <p className="text-gray-400 text-center mb-6">
          Acesso completo às conversas e mídia do WhatsApp
        </p>

        <div className="space-y-4 mb-6">
          <div className="flex items-center text-gray-300">
            <FaLock className="mr-3 text-green-500" />
            <span>Desbloqueio instantâneo</span>
          </div>
          <div className="flex items-center text-gray-300">
            <FaShieldAlt className="mr-3 text-green-500" />
            <span>Acesso seguro e anônimo</span>
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-300">Valor:</span>
            <span className="text-white font-bold">R$ 97,00</span>
          </div>
          <div className="text-xs text-gray-400">
            Pagamento único - Acesso vitalício
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className={`
            w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg
            flex items-center justify-center gap-2 transition-colors
            ${loading ? 'opacity-75 cursor-not-allowed' : ''}
          `}
        >
          <FaCreditCard />
          {loading ? 'Processando...' : 'Pagar Agora'}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Pagamento 100% seguro e criptografado
        </p>
      </div>
    </div>
  )
}