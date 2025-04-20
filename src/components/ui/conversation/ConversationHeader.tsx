'use client'

import React from 'react'
import { FaUser, FaCamera, FaEllipsisV, FaLock } from 'react-icons/fa'

interface Contact {
  name: string
  isOnline: boolean
}

interface ConversationHeaderProps {
  contact: Contact
  onScreenshot: () => void
}

export default function ConversationHeader({ contact, onScreenshot }: ConversationHeaderProps) {
  const handleUnlock = () => {
    // Redirect to payment page
    window.location.href = '/acess/whatsapp/checkout'
  }

  return (
    <div className="p-3 bg-gray-800 flex items-center justify-between border-b border-gray-700">
      <div className="flex items-center">
        <div className="relative mr-3">
          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
            <FaUser className="text-gray-300" />
          </div>
          {contact.isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
          )}
        </div>
        
        <div>
          <h2 className="font-medium text-white">{contact.name}</h2>
          <p className="text-xs text-gray-400">
            {contact.isOnline ? 'Online agora' : 'offline'}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button 
          onClick={handleUnlock}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md text-sm transition-colors"
        >
          <FaLock size={12} />
          Desbloquear Conversas
        </button>
        
        <button 
          onClick={onScreenshot}
          className="text-gray-400 hover:text-white p-2 transition-colors"
          title="Ver screenshot"
        >
          <FaCamera />
        </button>
        
        <button className="text-gray-400 hover:text-white p-2 ml-1 transition-colors">
          <FaEllipsisV />
        </button>
      </div>
    </div>
  )
}