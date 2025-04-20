'use client'

import { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { FaAt } from 'react-icons/fa'
import { useUserStore } from '@/app/user/store/userStore'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { emailStore } from '@/app/user/store/emailStore'

export default function Busca() {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const { setUser: setUserStore } = useUserStore()
  const email = emailStore((state) => state.email)
  const [ultimaBusca, setUltimaBusca] = useState<any>(null)
  const router = useRouter()

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
      if(email?.id) {
        await axios.post('/api/v1/busca', {
          email: email.id,
          username: user.username,
        })
      }

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

    setError('')
    searchProfile()
  }

  useEffect(() => {
    if (!email?.id) {
      router.push('/login')
      return
    }

    const fetchUltimaBusca = async () => {
      try {
        const response = await axios.get(`/api/v1/busca?idEmail=${email.id}`)
        const data = response?.data?.data

        if (data) setUltimaBusca(data)
      } catch (err) {
        console.error('Erro ao buscar última busca:', err)
      }
    }

    fetchUltimaBusca()
  }, [email])

  const buscaBloqueada = !!ultimaBusca

  const redirectToPayments = () => {
    window.location.href = 'https://go.perfectpay.com.br/PPU38CPMP2K?upsell=true'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md text-center">
        <div className="bg-orange-500 p-4 rounded-full w-fit mx-auto mb-4">
          <span className="text-white text-3xl">🕵️‍♂️</span>
        </div>

        <h1 className="text-2xl font-bold mb-1 text-gray-900">Descubra agora</h1>
        <p className="text-sm text-gray-600 mb-6">Quem está falando de você no Instagram.</p>

        <div
          className={`flex items-center rounded-lg px-4 py-3 shadow-md mb-4 ${
            buscaBloqueada ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-black text-white'
          }`}
        >
          <FaAt className="mr-2" />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username do Instagram"
            disabled={buscaBloqueada}
            className="bg-transparent outline-none w-full placeholder-gray-400 text-sm disabled:cursor-not-allowed"
          />
          <button
            onClick={handleSearch}
            disabled={buscaBloqueada}
            className={`ml-2 ${buscaBloqueada ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <FiSearch className="text-purple-500 hover:text-purple-300 transition" size={20} />
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <p className="text-gray-500 text-xs mb-4">
          🔒 Dados seguros, não é necessário sua senha
        </p>

        <div className="bg-orange-500 text-white text-sm font-medium px-4 py-3 rounded-md shadow-md">
          <strong>Atenção:</strong> Limite de apenas{' '}
          <span className="underline">1 PESQUISA</span> por dispositivo
        </div>

        {ultimaBusca && (
          <div className="bg-gray-100 border border-gray-300 p-4 rounded-md mb-4 text-left mt-4">
            <p className="text-sm text-gray-700">
              Última busca feita: <strong>{ultimaBusca.username}</strong>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Executada em: {new Date(ultimaBusca.dataExecucao).toLocaleString()}
            </p>

            <button
              className="mt-3 bg-purple-600 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-500 transition"
              // eslint-disable-next-line react/jsx-no-duplicate-props
              onClick={(e) => {
                e.preventDefault();
                // alert('Comprar mais buscas (em construção)'); // se ainda quiser manter isso
                redirectToPayments();
              }}
            >
              Comprar mais buscas
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
