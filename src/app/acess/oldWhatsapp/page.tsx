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
    router.push(`/acess/whatsapp/conversas?numero=${finalNumber}`)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-between py-10 px-4 bg-white">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-green-500 p-4 rounded-full">
            <FaWhatsapp className="text-white text-3xl" />
          </div>
        </div>
        <h1 className="text-xl font-bold text-green-600">Acesse conversas do WhatsApp</h1>
        <p className="text-gray-600 mt-2 text-sm">Digite o número que você quer investigar:</p>

        <div className="mt-6 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">+55</span>
          <input
            type="text"
            value={number}
            onChange={handleChange}
            placeholder="(62) 99229-5634"
            className="pl-12 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Iniciar Investigação
        </button>
      </div>

      <footer className="text-xs text-gray-400 mt-12">
        acesso.spyapp.digital — confidencial
      </footer>
    </div>
  )
}
