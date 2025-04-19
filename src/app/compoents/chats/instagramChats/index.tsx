'use client'
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
}

type Props = {
  card: 'primeiroCard' | 'segundoCard' | 'terceiroCard' | 'censured'
}

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
  const [stories, setStories] = useState<any[]>([])
  const [isClient, setIsClient] = useState(false)
  const publicationsUser = useUserStore((state) => state.publications)
  const [publications, setPublications] = useState<any[]>([])
  // New state for processed messages
  const [processedMessages, setProcessedMessages] = useState<Record<string, Message[]>>({})
  // Loading state for content
  const [isLoading, setIsLoading] = useState(false)
  // Flag to indicate if we need to wait for media
  const [shouldWaitForMedia, setShouldWaitForMedia] = useState(false)

  // Create the initial messages with fullName
  const initialMessages = useMemo(() => {
    return mapMessagesWithFullName(mensagensOriginais, user?.full_name || 'Fulano')
  }, [user?.full_name])

  // Combine initial messages with processed messages
  const mensagensPorCard = useMemo(() => {
    return { ...initialMessages, ...processedMessages }
  }, [initialMessages, processedMessages])

  // Check if we need to wait for media content to load
  useEffect(() => {
    const hasUserStories = userStories?.stories?.reels?.[userId]?.items?.length > 0
    const hasPublications = publicationsUser?.stories?.items?.length > 0
    
    // Set the flag if we have any media to load
    setShouldWaitForMedia(hasUserStories || hasPublications)
    
    // If we need to wait for media, set loading to true
    if (hasUserStories || hasPublications) {
      setIsLoading(true)
    }
  }, [userStories, userId, publicationsUser])

  const loadStories = useCallback(async () => {
    try {
      if (!user) return
      
      const hasUserStories = userStories?.stories?.reels?.[userId]?.items?.length > 0
      const hasPublications =  publicationsUser?.stories?.items?.length > 0
      
      // If we have no media to load, just exit early
      if (!hasUserStories && !hasPublications) {
        setIsLoading(false)
        return
      }
      
      // Process stories if they exist
      let storyMessage = null
      if (hasUserStories && userId) {
        const userReel = userStories?.stories?.reels?.[userId]
        
        if (userReel?.items) {
          const mapped = await Promise.all(
            userReel.items.map(async (item: any, i: number) => {
              try {
                return {
                  id: i,
                  image: await getImageBase64(item?.image_versions2?.candidates?.[0]?.url),
                  procfileImage: await getImageBase64((user as any)?.profile_pic_url_hd),
                  username: user?.username || 'Desconhecido',
                  stats: item?.fees || 'Sem dados',
                  statsDetail: 'encaminharam esse story',
                  isPrimary: false,
                }
              } catch (error) {
                console.error('Error processing story item:', error)
                return null
              }
            })
          )

          const filteredMapped = mapped.filter(Boolean)
          setStories(filteredMapped)

          // Create a story message if we have stories
          if (filteredMapped.length > 0) {
            storyMessage = {
              id: 0,
              avatarUrl: mapped[0].procfileImage ,
              isMe: true,
              isSharedStories: true,
              storyImage: filteredMapped[0].image,
              storyUsername: user.username || 'Desconhecido',
              isSharedPublic: false,
            }
          }
        }
      }
      
      // Process publications if they exist
      let publicationMessage = null
      console.log(publicationsUser)
      debugger

      if (hasPublications) {
        debugger 
        const publicationsMaped = await Promise.all(
          publicationsUser.stories.items.map(async (publication: any, i: number) => {
            try {
              debugger 
              return {
                id: i,
                image: await getImageBase64(publication?.image_versions2?.candidates?.[0]?.url),
                procfileImage: await getImageBase64((user as any)?.profile_pic_url_hd),
                username: user?.username || 'Desconhecido',
                stats: publication?.fees || 'Sem dados',
                statsDetail: 'encaminharam esse story',
                text: publication?.caption?.text || '',
                isPrimary: false,
              }
            } catch (error) {
              console.error('Error processing publication:', error)
              return null
            }
          })
        )

        const filteredPublications = publicationsMaped.filter(Boolean)
        setPublications(filteredPublications)

        // Create a publication message if we have publications
        if (filteredPublications.length > 0) {
          publicationMessage = {
            id: 0,
            avatarUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
            publicAvatarUrl: filteredPublications[0].procfileImage,
            isSharedPublic: true,
            image: filteredPublications[0].image,
            username: user.username || 'Desconhecido',
            publicText: filteredPublications[0].text,
            text: 'Olha isso mano, que golpista'
          }
        }
      }
      
      // Update messages with the new content
      const updatedMessages = { ...processedMessages }
      
      if (storyMessage) {
        updatedMessages.terceiroCard = [storyMessage, ...(initialMessages.terceiroCard || [])]
      }
      
      if (publicationMessage) {
        updatedMessages.primeiroCard = [publicationMessage, ...(initialMessages.primeiroCard || [])]
      }
      
      // Set the processed messages
      setProcessedMessages(updatedMessages)
      
      // Done loading
      setIsLoading(false)
    } catch (error) {
      console.error('Error in loadStories:', error)
      setIsLoading(false)
    }
  }, [userStories, userId, user, publicationsUser, initialMessages, processedMessages])

  useEffect(() => {
    setIsClient(true)
    loadStories()
  }, [loadStories])

  // Memoize the blacklist checking function
  const blacklist = useMemo(() => ['golpista', 'mentiroso', 'enganou', 'traiu'], [])

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
  }, [blacklist])

  // Get messages for current card
  const mensagens = mensagensPorCard[card] || []

  // If we're supposed to wait for media and still loading, show loading state
  if (isLoading && shouldWaitForMedia) {
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
          <div
            key={msg.id}
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
  
              {msg.image && (
                <Image
                  src={msg.image}
                  alt="Imagem enviada"
                  width={250}
                  height={250}
                  className="rounded-md"
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
                    {Array.from({ length: 15 }).map((_, i) => (
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
  );
}