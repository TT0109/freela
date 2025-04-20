'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FaWhatsapp, FaUser, FaArrowLeft, FaDownload, FaInfoCircle, FaCamera } from 'react-icons/fa'
import Image from 'next/image'
import ConversationList from '@/components/conversation/ConversationList'
import MessageBubble from '@/components/conversation/MessageBubble'
import ConversationHeader from '@/components/conversation/ConversationHeader'
import { generateFakeConversations, generateFakeMessages } from '@/lib/fakeData'

export default function ConversasPage({ searchParams }: { searchParams: any }) {
  const router = useRouter()
  const numero = searchParams['numero'] || ''
  const displayNumber = formatDisplayNumber(numero)
  
  const [conversations, setConversations] = useState<any[]>([])
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [showScreenshot, setShowScreenshot] = useState(false)
  
  useEffect(() => {
    if (!numero) {
      router.push('/acess/whatsapp')
      return
    }
    
    const fakeConversations = generateFakeConversations()
    setConversations(fakeConversations)
    
    setTimeout(() => {
      setSelectedConversation(0)
      setMessages(generateFakeMessages(numero, fakeConversations[0].name))
    }, 1000)
  }, [numero, router])
  
  const handleConversationSelect = (index: number) => {
    setSelectedConversation(index)
    setMessages(generateFakeMessages(numero, conversations[index].name))
    setShowScreenshot(false)
  }
  
  const handleBack = () => {
    router.push('/acess/whatsapp')
  }
  
  const handleViewScreenshot = () => {
    setShowScreenshot(true)
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <header className="bg-green-700 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={handleBack}
            className="text-white mr-4 hover:bg-green-800 p-2 rounded-full transition-all"
          >
            <FaArrowLeft />
          </button>
          <div className="flex items-center">
            <FaWhatsapp className="text-white text-xl mr-2" />
            <h1 className="text-white font-bold">WhatsApp Investigação</h1>
          </div>
        </div>
        
        <div className="text-white text-sm">
          Alvo: +{displayNumber}
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        <div className="w-full sm:w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
          <div className="p-3 bg-gray-900 text-gray-400 text-sm">
            Conversas Extraídas ({conversations.length})
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <ConversationList 
              conversations={conversations}
              selectedIndex={selectedConversation}
              onSelect={handleConversationSelect}
            />
          </div>
        </div>
        
        <div className="hidden sm:flex flex-1 flex-col bg-gray-900 relative">
          {selectedConversation !== null && !showScreenshot ? (
            <>
              <ConversationHeader 
                contact={conversations[selectedConversation]}
                onScreenshot={handleViewScreenshot}
              />
              
              <div className="flex-1 overflow-y-auto bg-[#0b141a] p-4">
                {messages.map((message, i) => (
                  <MessageBubble key={i} message={message} />
                ))}
              </div>
              
              <div className="p-3 bg-gray-800 text-center text-gray-400 text-sm">
                <FaInfoCircle className="inline mr-2" />
                Todas as mensagens foram extraídas com sucesso
              </div>
            </>
          ) : showScreenshot ? (
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-900 p-4">
              <div className="max-w-md w-full">
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-medium">Screenshot da Conversa</h3>
                    <button 
                      onClick={() => setShowScreenshot(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      <FaArrowLeft />
                    </button>
                  </div>
                  
                  <div className="bg-black rounded-lg overflow-hidden relative aspect-[9/16] mb-4">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <FaCamera className="text-4xl mx-auto mb-2" />
                        <p>Screenshot simulado da conversa</p>
                        <p className="text-xs mt-2">Esta é uma simulação</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400">Capturado em: {new Date().toLocaleString()}</span>
                    <button className="text-green-500 text-sm flex items-center">
                      <FaDownload className="mr-1" /> Salvar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <FaWhatsapp className="text-6xl mx-auto mb-4 text-green-700 opacity-50" />
                <p>Selecione uma conversa para visualizar</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile view when conversation is selected */}
      {selectedConversation !== null && (
        <div className="fixed inset-0 bg-gray-900 sm:hidden z-10 flex flex-col">
          <div className="bg-green-700 p-4 flex items-center">
            <button 
              onClick={() => setSelectedConversation(null)}
              className="text-white mr-4"
            >
              <FaArrowLeft />
            </button>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-2">
                <FaUser className="text-gray-600" />
              </div>
              <span className="text-white font-medium">
                {selectedConversation !== null && conversations[selectedConversation].name}
              </span>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto bg-[#0b141a] p-4">
            {messages.map((message, i) => (
              <MessageBubble key={i} message={message} />
            ))}
          </div>
        </div>
      )}
    </div>
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