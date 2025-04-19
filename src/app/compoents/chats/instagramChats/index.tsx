'use client'
import React from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { FaPhone, FaVideo, FaInfoCircle } from 'react-icons/fa'
import Image from 'next/image'
import { useUserStore } from '@/app/user/store/userStore'
import { getImageBase64 } from '@/app/actions/imageProxyActions'

type Message = {
  id: number
  username?: string
  avatarUrl?: string
  text?: string
  isMe?: boolean
  isAudio?: boolean
  image?: string
  isSharedStories?: boolean
  storyImage?: string
  storyUsername?: string
  isSharedPublic?: boolean
  publicAvatarUrl?: string
  publicText?: string
}

type Props = {
  card: 'primeiroCard' | 'segundoCard' | 'terceiroCard' | 'censured'
}

// Move outside component to prevent recreation on each render
const blacklist = ['golpista', 'mentiroso', 'enganou', 'traiu']

// Messages are defined outside to prevent recreating on each render
const mensagensOriginais: Record<string, Message[]> = {
  primeiroCard: [
    { id: 1, username: 'lucas_fake', avatarUrl: 'https://randomuser.me/api/portraits/men/22.jpg', text: 'Mano do céu' },
    { id: 3, username: 'lucas_fake', avatarUrl: 'https://randomuser.me/api/portraits/men/22.jpg', text: ':isFullNameHere é muito golpista' },
    { id: 4, avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg', text: 'pqppp nem fodendooo KKKKKKKKKK', isMe: true },
    { id: 5, avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg', text: 'eu te falei q é melhor se afastar', isMe: true },
    { id: 7, avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg', isMe: true, isAudio: true },
    { id: 8, avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg', text: 'mais nem comenta', isMe: true },
  ],
  censured: [
    { id: 1, avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg', text: '😱😱😱😱😱' },
    { id: 5, image: '/naked-lady.jpeg', isSharedPublic: false },
    { id: 2, avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg', text: '😱😱😱😱😱' },
    { id: 3, avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg', text: 'é o que se afasta disso', isMe: true },
    { id: 4, avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg', text: '😱😱😱😱😱', isMe: true },
  ],
  segundoCard: [
    { id: 1, username: 'ana_fake', avatarUrl: 'https://randomuser.me/api/portraits/women/33.jpg', text: 'Mas miga, tô até agora incrédula' },
    { id: 2, username: 'ana_fake', avatarUrl: 'https://randomuser.me/api/portraits/women/33.jpg', text: '😱😱😱😱😱' },
    { id: 3, username: 'ana_fake', avatarUrl: 'https://randomuser.me/api/portraits/women/33.jpg', text: 'Me falaram que :isFullNameHere também mentiroso' },
    { id: 4, username: 'ana_fake', avatarUrl: 'https://randomuser.me/api/portraits/women/33.jpg', text: 'Melhor coisa aí fizz foi afastar mesmo' },
  ],
  terceiroCard: [
    { id: 1, username: 'joao_fake', avatarUrl: 'https://randomuser.me/api/portraits/men/10.jpg', text: 'Olha isso, :isFullNameHere parece um enganou todo mundo' },
    { id: 2, avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg', text: 'Que dó vei kkkkk', isMe: true },
    { id: 3, avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg', text: 'Se afasta disso....', isMe: true },
  ],
}

// Extracted component for message rendering to reduce re-renders
const MessageItem = React.memo(({ msg, highlightTextWithBlur }: { msg: Message, highlightTextWithBlur: (text: string) => (JSX.Element | string)[] }) => {
  return (
    <div
      className={`flex items-start gap-2 mb-3 ${msg.isMe ? 'justify-end' : 'justify-start'}`}
    >
      {!msg.isMe && msg.avatarUrl && (
        <img src={msg.avatarUrl} className="w-7 h-7 rounded-full blur-[2px]" alt="avatar" />
      )}
      <div
        className={`max-w-[65%] text-sm whitespace-pre-wrap rounded-2xl
          ${msg.isSharedStories
            ? 'p-0 overflow-hidden bg-transparent'
            : msg.isMe
              ? 'bg-[#5865F2] text-white rounded-br-sm px-3 py-2'
              : 'bg-[#262626] text-white rounded-bl-sm px-3 py-2'}`}
      >
        {msg.isSharedPublic && (
          <div className="flex flex-col w-full rounded-xl overflow-hidden bg-[#292929] border border-[#444]">
            <div className="flex items-center gap-2 px-3 py-2">
              <img src={msg.publicAvatarUrl} alt="avatar" className="w-6 h-6 rounded-full" />
              <span className="text-white text-sm font-medium">@{msg.username}</span>
            </div>
            {msg.image && (
              <div className="relative w-full pb-[120%]">
                <Image
                  src={msg.image}
                  alt="Publicação compartilhada"
                  fill
                  className="object-cover"
                  loading="lazy"
                  unoptimized={true} // Skip image optimization for better performance
                />
              </div>
            )}
            {msg.publicText && (
              <div className="px-3 py-2 text-white text-sm bg-[#1e1e1e]">
                {msg.publicText}
              </div>
            )}
          </div>
        )}

        {msg.isSharedStories && (
          <div className="flex flex-col w-full rounded-xl overflow-hidden bg-[#5664F3]">
            <div className="w-full py-2 px-3 text-white">
              <span className="text-xs font-medium">
                Enviou o story de {msg.storyUsername}
              </span>
            </div>
            <div className="relative px-1 pb-1 pt-0 bg-[#5664F3]">
              <div className="relative w-full pb-[130%] rounded-md overflow-hidden">
                {msg.storyImage ? (
                  <Image
                    src={msg.storyImage}
                    alt="Story compartilhado"
                    fill
                    className="object-cover"
                    loading="lazy"
                    unoptimized={true} // Skip image optimization for better performance
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
                    <span className="text-sm text-gray-300">Imagem indisponível</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-50"></div>
              </div>
            </div>
          </div>
        )}

        {msg.image && msg.image !== msg.storyImage && !msg.isSharedPublic && (
          <Image
            src={msg.image}
            alt="Imagem enviada"
            width={250}
            height={250}
            className="rounded-md"
            loading="lazy"
            unoptimized={true} // Skip image optimization for better performance
          />
        )}
        {msg.text && !msg.isSharedStories && !msg.isSharedPublic && (
          <p className="text-sm">
            {highlightTextWithBlur(msg.text)}
          </p>
        )}
        {msg.isAudio && (
          <div className="flex items-center gap-2 bg-[#ffffff1a] text-white px-3 py-2 rounded-xl mt-1">
            <button className="w-4 h-4">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            <div className="flex gap-[1px] items-end h-5">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="w-0.5 rounded-full bg-white"
                  style={{ height: `${Math.random() * 20 + 5}px` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
})

MessageItem.displayName = 'MessageItem'

// Create a cache for storing processed images
const imageCache = new Map()

function mapMessagesWithFullName(
  mensagensPorCard: Record<string, Message[]>,
  fullName: string
): Record<string, Message[]> {
  const result: Record<string, Message[]> = {}

  for (const card in mensagensPorCard) {
    result[card] = mensagensPorCard[card].map((message) => ({
      ...message,
      text: message.text?.replace(':isFullNameHere', fullName) ?? message.text,
    }))
  }

  return result
}

export default function InstagramChatFull({ card }: Props) {
  const userStories = useUserStore((state) => state.stories)
  const userId = useUserStore((state) => state.user?.id)
  const user = useUserStore((state) => state.user)
  const publicationsUser = useUserStore((state) => state.publications)
  // Processed messages state
  const [processedMessages, setProcessedMessages] = useState<Record<string, Message[]>>({})
  // Loading state for content
  const [loading, setLoading] = useState(true)
  // Flag to avoid redundant media loading operations
  const [mediaLoaded, setMediaLoaded] = useState(false)

  // Create the initial messages with fullName only once
  const initialMessages = useMemo(() => {
    return mapMessagesWithFullName(mensagensOriginais, user?.full_name || 'Fulano')
  }, [user?.full_name])

  // Combine initial messages with processed messages
  const mensagensPorCard = useMemo(() => {
    return { ...initialMessages, ...processedMessages }
  }, [initialMessages, processedMessages])

  // Optimized version of getImageBase64 with caching
  const getCachedImage = useCallback(async (url: string) => {
    if (!url) return null
    if (imageCache.has(url)) {
      return imageCache.get(url)
    }
    try {
      const base64 = await getImageBase64(url)
      imageCache.set(url, base64)
      return base64
    } catch (error) {
      console.error('Error fetching image:', error)
      return null
    }
  }, [])

  // Process media data (stories and publications) efficiently
  useEffect(() => {
    if (!user || mediaLoaded) return
    
    const processMedia = async () => {
      try {
        setLoading(true)
        const updates: Record<string, Message[]> = {}
        
        // Process stories if available
        if (userStories?.stories?.reels?.[userId]?.items?.length > 0) {
          const firstStory = userStories.stories.reels[userId].items[0]
          const storyImage = await getCachedImage(firstStory?.image_versions2?.candidates?.[0]?.url)
          const profilePic = await getCachedImage((user as any)?.profile_pic_url_hd)
          
          if (storyImage && profilePic) {
            const storyMessage: Message = {
              id: 0,
              avatarUrl: profilePic,
              isMe: true,
              isSharedStories: true,
              storyImage,
              storyUsername: user.username || 'Desconhecido',
              isSharedPublic: false,
            }
            
            updates.terceiroCard = [storyMessage, ...(initialMessages.terceiroCard || [])]
          }
        }
        
        // Process publications if available
        if (publicationsUser?.stories?.items?.length > 0) {
          const firstPub = publicationsUser.stories.items[0]
          const pubImage = await getCachedImage(firstPub?.image_versions2?.candidates?.[0]?.url)
          const profilePic = await getCachedImage((user as any)?.profile_pic_url_hd)
          
          if (pubImage && profilePic) {
            const pubMessage: Message = {
              id: 0,
              avatarUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
              publicAvatarUrl: profilePic,
              isSharedPublic: true,
              image: pubImage,
              username: user.username || 'Desconhecido',
              publicText: firstPub?.caption?.text || '',
              text: 'Olha isso mano, que golpista'
            }
            
            updates.primeiroCard = [pubMessage, ...(initialMessages.primeiroCard || [])]
          }
        }
        
        if (Object.keys(updates).length > 0) {
          setProcessedMessages(updates)
        }
        
        setMediaLoaded(true)
        setLoading(false)
      } catch (error) {
        console.error('Error processing media:', error)
        setLoading(false)
      }
    }
    
    processMedia()
  }, [user, userId, userStories, publicationsUser, initialMessages, getCachedImage, mediaLoaded])

  // Highlight blacklisted words with blur effect
  const highlightTextWithBlur = useCallback((text: string): (JSX.Element | string)[] => {
    if (!text) return []
    
    const words = text.split(/\b/)

    return words.map((word, idx) => {
      const clean = word
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')

      if (blacklist.some(banned => clean.includes(banned))) {
        return (
          <span
            key={idx}
            className="inline-block blur-[4px] bg-gray-100 rounded px-1 text-black"
            title="Palavra censurada"
          >
            {word}
          </span>
        )
      }

      return word
    })
  }, [])

  // Get messages for current card
  const mensagens = mensagensPorCard[card] || []

  if (loading) {
    return (
      <div className="relative w-full max-w-md h-[600px] bg-[#0D0D0D] rounded-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-[#2F2F2F] z-10">
          <div className="font-semibold text-sm text-white blur-sm">@fake_user</div>
          <div className="flex gap-4 text-[#A8A8A8]">
            <FaPhone />
            <FaVideo />
            <FaInfoCircle />
          </div>
        </div>
        
        {/* Loading state */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-10 h-10 border-4 border-t-[#5865F2] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-[#A8A8A8] text-sm">Carregando prints...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full max-w-lg h-full bg-[#0D0D0D] rounded-xl overflow-hidden flex flex-col">
      <div className="flex justify-between items-center px-4 py-3 border-b border-[#2F2F2F] z-10">
        <div className="font-semibold text-sm text-white blur-sm">@fake_user</div>
        <div className="flex gap-4 text-[#A8A8A8]">
          <FaPhone />
          <FaVideo />
          <FaInfoCircle />
        </div>
      </div>
  
      <div className={`flex-1 relative overflow-y-auto px-4 py-4 ${card === 'censured' ? 'blur-sm' : ''}`}>
        {mensagens.map((msg) => (
          <MessageItem key={msg.id} msg={msg} highlightTextWithBlur={highlightTextWithBlur} />
        ))}
      </div>
  
      {card === 'censured' && (
        <div className="absolute top-0 left-0 w-full h-full z-20 flex flex-col items-center justify-center text-white px-6 text-center pointer-events-none">
          <h2 className="text-red-500 font-bold text-2xl mb-3 drop-shadow-md">Alerta!</h2>
          <p className="text-sm mb-2 drop-shadow">
            Essa conversa contém <span className="font-bold text-yellow-400">linguagens impróprias</span> e sensíveis envolvendo <span className="font-bold">seu nome</span>
          </p>
        </div>
      )}
    </div>
  )
}