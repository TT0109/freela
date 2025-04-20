'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FaShieldAlt, FaUnlock, FaDatabase, FaCamera, FaCheck, FaExclamationTriangle } from 'react-icons/fa'
import InvestigationSteps from '@/components/investigation/InvestigationSteps'
import TerminalOutput from '@/components/investigation/TerminalOutput'
import ProgressBar from '@/components/investigation/ProgressBar'
import { Suspense } from 'react';

export default function InvestigacaoPage({ searchParams }: { searchParams: any }) {
  const router = useRouter()
  const numero = searchParams['numero'] || ''
  const displayNumber = formatDisplayNumber(numero)
  
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const [stepStatus, setStepStatus] = useState<('pending' | 'processing' | 'complete' | 'failed')[]>([
    'pending', 'pending', 'pending', 'pending', 'pending'
  ])

  const steps = [
    { name: 'Inicialização', icon: FaShieldAlt, time: 5 },
    { name: 'Bypass Firewall', icon: FaUnlock, time: 8 },
    { name: 'Obtenção de Conversas', icon: FaDatabase, time: 12 },
    { name: 'Captura de Screenshots', icon: FaCamera, time: 10 },
    { name: 'Finalização', icon: FaCheck, time: 5 }
  ]

  const totalSteps = steps.length

  useEffect(() => {
    if (!numero) {
      router.push('/acess/whatsapp')
      return
    }

    const simulateProcess = async () => {
      // Inicialização
      await processStep(0, [
        `Iniciando processo de investigação para +${displayNumber}...`,
        `Conexão com os servidores WhatsApp estabelecida...`,
        `Verificando autenticação...`,
        `Iniciando módulo de acesso remoto...`,
        `Preparando ambiente de extração...`
      ])

      // Bypass Firewall
      await processStep(1, [
        `Detectando firewall do WhatsApp...`,
        `Analisando pontos de vulnerabilidade...`,
        `Aplicando técnica de bypass v3.2...`,
        `Bypass em progresso...`,
        `Infiltração bem-sucedida!`
      ])

      // Obtenção de Conversas
      await processStep(2, [
        `Acessando banco de dados de mensagens...`,
        `Identificando conversas recentes...`,
        `Extraindo metadados das conversas...`,
        `Decifrando mensagens criptografadas...`,
        `Organizando dados extraídos...`
      ])

      // Captura de Screenshots
      await processStep(3, [
        `Preparando módulo de captura visual...`,
        `Conectando-se ao espelhamento de tela...`,
        `Capturando screenshots das conversas recentes...`,
        `Aplicando algoritmo de melhoramento de imagem...`,
        `Screenshots obtidos com sucesso!`
      ])

      // Finalização
      await processStep(4, [
        `Verificando integridade dos dados...`,
        `Compilando resultados da investigação...`,
        `Removendo rastros de acesso...`,
        `Preparando relatório final...`,
        `Investigação concluída! Redirecionando para resultados...`
      ])

      // Redirect to results page
      setTimeout(() => {
        router.push(`/acess/whatsapp/conversas?numero=${numero}`)
      }, 2000)
    }

    simulateProcess()
  }, [numero, router])

  const processStep = async (stepIndex: number, lines: string[]) => {
    // Update step status to processing
    setStepStatus(prev => {
      const newStatus = [...prev]
      newStatus[stepIndex] = 'processing'
      return newStatus
    })
    
    setCurrentStep(stepIndex)
    
    // Simulate terminal output
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      await new Promise(resolve => setTimeout(resolve, 1000))
      setTerminalLines(prev => [...prev, line])
      setProgress((stepIndex * 100 / totalSteps) + ((i + 1) * (100 / totalSteps) / lines.length))
    }
    
    // Complete the step
    await new Promise(resolve => setTimeout(resolve, 500))
    setStepStatus(prev => {
      const newStatus = [...prev]
      newStatus[stepIndex] = 'complete'
      return newStatus
    })
  }

  return (
    <Suspense fallback={<div>Carregando...</div>}>

    <div className="min-h-screen bg-black text-white flex flex-col p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2 text-green-500">Investigação WhatsApp</h1>
        <p className="text-gray-400">Alvo: <span className="text-white">+{displayNumber}</span></p>
      </header>

      <div className="flex flex-col md:flex-row gap-6 flex-1">
        <div className="w-full md:w-1/3">
          <InvestigationSteps steps={steps} currentStep={currentStep} stepStatus={stepStatus} />
        </div>
        
        <div className="w-full md:w-2/3 bg-gray-900 rounded-lg p-4 flex flex-col">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-400 mb-2">PROGRESSO DA INVESTIGAÇÃO</h3>
            <ProgressBar progress={progress} />
          </div>
          
          <div className="flex-1 overflow-hidden">
            <TerminalOutput lines={terminalLines} />
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2"></div>
              <span className="text-xs text-gray-400">Sistema ativo</span>
            </div>
            
            <div className="flex items-center">
              <FaExclamationTriangle className="text-yellow-500 mr-2" />
              <span className="text-xs text-gray-400">Conexão criptografada</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Suspense>
  )
}

function formatDisplayNumber(numero: string): string {
  if (!numero) return ''
  
  // Format as +55 (99) 99999-9999
  const countryCode = numero.slice(0, 2)
  const areaCode = numero.slice(2, 4)
  const firstPart = numero.slice(4, 9)
  const secondPart = numero.slice(9, 13)
  
  return `${countryCode} (${areaCode}) ${firstPart}-${secondPart}`
}