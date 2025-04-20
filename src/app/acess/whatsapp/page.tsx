'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaWhatsapp } from 'react-icons/fa'

const formatPhoneNumber = (value: string) => {
  // Remove tudo que não for número
  const onlyNums = value.replace(/\D/g, '')
  const nums = onlyNums.slice(0, 11) // só pega os 11 dígitos depois do 55

  if (nums.length <= 2) return `(${nums}`
  if (nums.length <= 6) return `(${nums.slice(0, 2)}) ${nums.slice(2)}`
  if (nums.length <= 10)
    return `(${nums.slice(0, 2)}) ${nums.slice(2, 6)}-${nums.slice(6)}`
  return `(${nums.slice(0, 2)}) ${nums.slice(2, 7)}-${nums.slice(7, 11)}`
}

export default function WhatsAppSpyPage() {
  const [number, setNumber] = useState('')
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(formatPhoneNumber(e.target.value))
  }

  const handleSubmit = () => {
    const raw = number.replace(/\D/g, '')
    const finalNumber = '55' + raw
    router.push(`/acess/whatsapp/investigacao?numero=${finalNumber}`)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-between py-10 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-green-500 p-4 rounded-full animate-pulse">
            <FaWhatsapp className="text-white text-3xl" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-green-500 mb-2">WHATSAPP SPY</h1>
        <h2 className="text-xl font-bold text-white">Acesso Restrito</h2>
        <p className="text-gray-400 mt-2 text-sm">Digite o número que você quer investigar:</p>

        <div className="mt-6 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">+55</span>
          <input
            type="text"
            value={number}
            onChange={handleChange}
            placeholder="(99) 99999-9999"
            className="pl-12 pr-4 py-3 w-full border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={number.replace(/\D/g, '').length < 10}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:bg-gray-700 disabled:cursor-not-allowed"
        >
          Iniciar Investigação
        </button>
        
        <div className="mt-4 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></div>
          <p className="text-xs text-red-400">Acesso não autorizado é crime</p>
        </div>
      </div>

      <footer className="text-xs text-gray-500 mt-12 flex flex-col items-center">
        <p>acesso.spyapp.digital — altamente confidencial</p>
        <p className="mt-1">v3.4.2 — Sistema WhatsApp Cipher</p>
      </footer>
    </div>
  )
}