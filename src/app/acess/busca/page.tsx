'use client'

import { useEffect, useState } from 'react'
import { FaAt } from 'react-icons/fa'
import { useUserStore } from '@/app/user/store/userStore'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { emailStore } from '@/app/user/store/emailStore'
import FloatingPaywall from '../FloatingPaywall'

export default function Busca() {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [bloqueado, setBloqueado] = useState(false)
  const { setUser: setUserStore } = useUserStore()
  const email = emailStore((state) => state.email)
  const router = useRouter()

  useEffect(() => {
    const jaBuscou = localStorage.getItem('ultimaBusca')
    if (jaBuscou) {
      setBloqueado(true)
      localStorage.setItem('bloqueio_busca', 'true') // garante sincronismo
    }
  }, [])

  const redirect = () => {
    router.push('/acess/dashboard')
  }

  const searchProfile = async () => {
    try {
      const response = await axios.get(`/api/v1/instagram?username=${username}`)
      const user = response?.data?.data?.user

      if (!user) {
        setError('Usuário não encontrado.')
        return
      }

      localStorage.setItem('ultimaBusca', username)
      localStorage.setItem('bloqueio_busca', 'true')

      setError('')
      setUserStore(user)
      redirect()
    } catch (err) {
      console.error('Erro ao buscar usuário', err)
      setError('Erro ao buscar o usuário. Tente novamente mais tarde.')
    }
  }

  const handleSearch = () => {
    if (!username.trim()) {
      setError('Digite um nome de usuário válido.')
      return
    }

    if (bloqueado) return

    setError('')
    searchProfile()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <FloatingPaywall onClose={() => {}} />
      <div className="w-full max-w-md text-center">
        <div className="bg-orange-500 p-4 rounded-full w-fit mx-auto mb-4">
          <span className="text-white text-3xl">🕵️‍♂️</span>
        </div>

        <h1 className="text-2xl font-bold mb-1 text-gray-900">Descubra agora</h1>
        <p className="text-sm text-gray-600 mb-6">Quem está falando de você no Instagram.</p>

        <div className="flex items-center rounded-lg px-4 py-3 shadow-md mb-2 bg-black text-white">
          <FaAt className="mr-2" />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username do Instagram"
            className="bg-transparent outline-none w-full placeholder-gray-400 text-sm"
          />
        </div>

        <button
          onClick={handleSearch}
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm py-2 px-6 rounded-md mb-4 transition"
        >
          🔍 Pesquisar
        </button>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <p className="text-gray-500 text-xs mb-4">
          🔒 Dados seguros, não é necessário sua senha
        </p>

        <div className="bg-orange-500 text-white text-sm font-medium px-4 py-3 rounded-md shadow-md">
          <strong>Atenção:</strong> Limite de apenas <span className="underline">1 PESQUISA</span> por dispositivo
        </div>
      </div>
    </div>
  )
}
