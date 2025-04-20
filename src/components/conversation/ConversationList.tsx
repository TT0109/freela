'use client'

import React from 'react'
import { FaUser, FaCheck, FaCheckDouble, FaLock } from 'react-icons/fa'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Conversation {
  name: string
  lastMessage: string
  time: string
  unread: number
  status: 'delivered' | 'read' | 'sent'
  isOnline: boolean
  avatar?: string | null
}

interface ConversationListProps {
  conversations: Conversation[]
  selectedIndex: number | null
  onSelect: (index: number) => void
}

export default function ConversationList({ 
  conversations, 
  selectedIndex, 
  onSelect 
}: ConversationListProps) {
  const router = useRouter()

  const handleClick = (index: number) => {
    if (index === 0) {
      onSelect(index)
    }
  }

  return (
    <div>
      {conversations.map((conversation, index) => {
        const isUnlocked = index === 0

        return (
          <div 
            key={index}
            onClick={() => handleClick(index)}
            className={`flex items-center p-3 border-b border-gray-700 transition-all ${
              selectedIndex === index && isUnlocked ? 'bg-gray-700' : 'hover:bg-gray-700'
            } ${isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'}`}
          >
            {/* Avatar */}
            <div className="relative mr-3">
              <div className="w-12 h-12 rounded-full bg-gray-600 overflow-hidden flex items-center justify-center relative">
                {conversation.avatar ? (
                  <div className={`absolute inset-0 blur-sm`}>
                    <Image
                      src={conversation.avatar}
                      alt={''}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <FaUser className="text-gray-300 text-xl" />
                )}
                {!isUnlocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                    <FaLock className="text-white text-sm" />
                  </div>
                )}
              </div>
              {conversation.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
              )}
            </div>

            {/* Conteúdo da conversa */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <h3 className={`font-medium text-white truncate blur-sm`}>
                  {conversation.name}
                </h3>
                <span className="text-xs text-gray-400 whitespace-nowrap">{conversation.time}</span>
              </div>
              
              <div className="flex justify-between mt-1">
                <p className={`text-sm text-gray-400 truncate pr-2 ${!isUnlocked ? 'blur-sm' : ''}`}>
                  {conversation.lastMessage}
                </p>
                
                <div className="flex items-center">
                  {conversation.status === 'sent' && <FaCheck className="text-gray-400 text-xs" />}
                  {conversation.status === 'delivered' && <FaCheckDouble className="text-gray-400 text-xs" />}
                  {conversation.status === 'read' && <FaCheckDouble className="text-blue-400 text-xs" />}
                  
                  {conversation.unread > 0 && (
                    <div className="ml-2 w-5 h-5 rounded-full bg-green-500 text-white text-xs flex items-center justify-center">
                      {conversation.unread}
                    </div>
                  )}
                </div>
              </div>

              {/* Botão desbloquear */}
              {!isUnlocked && (
                <button
                  onClick={() => router.push('/acess/whatsapp/checkout')}
                  className="mt-2 text-xs text-green-400 underline hover:text-green-300"
                >
                  Desbloquear conversa
                </button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
