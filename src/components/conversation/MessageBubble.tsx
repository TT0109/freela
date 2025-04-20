'use client'

import React, { useState } from 'react'
import { FaCheckDouble, FaCheck, FaLock } from 'react-icons/fa'

interface Message {
  id: string
  text: string
  time: string
  isFromTarget: boolean
  status?: 'sent' | 'delivered' | 'read'
}

interface MessageBubbleProps {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const [isBlurred, setIsBlurred] = useState(true)

  return (
    <div className={`flex mb-4 ${message.isFromTarget ? 'justify-start' : 'justify-end'}`}>
      <div className={`
        max-w-[80%] rounded-lg px-3 py-2 relative
        ${message.isFromTarget ? 'bg-gray-700 text-white' : 'bg-green-800 text-white'}
      `}>
        <p className={`text-sm ${isBlurred ? 'blur-sm select-none' : ''}`}>{message.text}</p>
        
        <div className="flex items-center justify-end mt-1 text-xs text-gray-400">
          <span>{message.time}</span>
          
          {!message.isFromTarget && message.status && (
            <span className="ml-1">
              {message.status === 'sent' && <FaCheck />}
              {message.status === 'delivered' && <FaCheckDouble />}
              {message.status === 'read' && <FaCheckDouble className="text-blue-400" />}
            </span>
          )}
        </div>
        
        {/* Message tail */}
        <div className={`
          absolute top-0 w-4 h-4 overflow-hidden
          ${message.isFromTarget ? 'left-[-8px]' : 'right-[-8px]'}
        `}>
          <div className={`
            transform rotate-45 w-3 h-3 
            ${message.isFromTarget ? 'bg-gray-700 ml-[6px]' : 'bg-green-800 ml-[-1px]'}
          `}></div>
        </div>
      </div>
    </div>
  )
}