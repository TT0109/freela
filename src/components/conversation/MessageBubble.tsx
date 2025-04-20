'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { FaCheckDouble, FaCheck } from 'react-icons/fa'

interface ChatMessage {
  id: string
  text?: string
  imageUrl?: string
  time: string
  isFromTarget: boolean
  status?: 'sent' | 'delivered' | 'read'
}

interface ChatBubbleProps {
  message: ChatMessage
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const [isBlurred, setIsBlurred] = useState(true)

  const isImage = Boolean(message.imageUrl)

  return (
    <div className={`flex mb-4 ${message.isFromTarget ? 'justify-start' : 'justify-end'}`}>
      <div className={`
        max-w-[80%] rounded-lg px-3 py-2 relative
        ${message.isFromTarget ? 'bg-gray-700 text-white' : 'bg-green-800 text-white'}
      `}>
        {/* Renderiza imagem ou texto */}
        {isImage ? (
          <div
            className={`cursor-pointer ${isBlurred ? 'blur-md select-none' : ''}`}
            onClick={() => setIsBlurred(false)}
          >
            <Image
              src={message.imageUrl!}
              alt="Mensagem com imagem"
              width={250}
              height={250}
              className="object-cover rounded-lg"
            />
          </div>
        ) : (
          <p className={`text-sm ${isBlurred ? 'blur-sm select-none' : ''}`} onClick={() => setIsBlurred(false)}>
            {message.text}
          </p>
        )}

        {/* Status + Hora */}
        <div className="flex items-center justify-end mt-1 text-xs text-gray-300">
          <span>{message.time}</span>
          {!message.isFromTarget && message.status && (
            <span className="ml-1">
              {message.status === 'sent' && <FaCheck />}
              {message.status === 'delivered' && <FaCheckDouble />}
              {message.status === 'read' && <FaCheckDouble className="text-blue-400" />}
            </span>
          )}
        </div>

        {/* Tail da mensagem */}
        <div
          className={`absolute top-0 w-4 h-4 overflow-hidden
          ${message.isFromTarget ? 'left-[-8px]' : 'right-[-8px]'}
        `}>
          <div
            className={`transform rotate-45 w-3 h-3 
            ${message.isFromTarget ? 'bg-gray-700 ml-[6px]' : 'bg-green-800 ml-[-1px]'}
          `}></div>
        </div>
      </div>
    </div>
  )
}
