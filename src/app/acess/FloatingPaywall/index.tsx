'use client'
import { useSearchParmsStore } from '@/app/user/store/searchParams';
import { useEffect, useState } from 'react'

export default function FloatingPaywall({ onClose }: { onClose: () => void }) {
  const [show, setShow] = useState(false)
  const getQueryString = useSearchParmsStore(state=> state.getQueryString);

  useEffect(() => {
    const blocked = localStorage.getItem('bloqueio_busca')
    if (blocked) {
      setTimeout(() => {
        setShow(true)
      }, 500) // pequeno delay pra UX
    }
  }, [])

  const redirectToPaymentsPremium = () => {
    localStorage.removeItem('bloqueio_busca')
    window.location.href = 'https://go.perfectpay.com.br/PPU38CPMP2K?upsell=true' + getQueryString()
  }

  const redirectToPaymentsDiamond = () => {
    localStorage.removeItem('bloqueio_busca')
    window.location.href = 'https://go.perfectpay.com.br/PPU38CPMP30?upsell=true' + getQueryString()
  }

  if (!show) return null

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 shadow-lg rounded-xl p-4 z-50 w-80">
      <h2 className="text-lg font-bold mb-2">⚠️ Limite atingido</h2>
      <p className="text-sm text-gray-700 mb-3">
        Você atingiu o limite de buscas gratuitas. Para continuar, escolha um plano:
      </p>
      <div className="flex flex-col gap-2">
        <button onClick={redirectToPaymentsPremium} className="bg-orange-500 text-white py-2 rounded-md text-sm hover:bg-orange-600 transition">
          Acessar Premium
        </button>
        <button onClick={redirectToPaymentsDiamond} className="bg-purple-600 text-white py-2 rounded-md text-sm hover:bg-purple-700 transition">
          Acessar Diamond
        </button>
        <button onClick={onClose} className="text-xs text-gray-400 mt-2 hover:underline">
          Fechar
        </button>
      </div>
    </div>
  )
}
