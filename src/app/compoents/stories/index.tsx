'use client'
import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { FaLock } from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { FreeMode, Autoplay } from 'swiper/modules';
import { useUserStore } from '@/app/user/store/userStore'
import { getImageBase64 } from '@/app/actions/imageProxyActions'
import { useRouter } from 'next/navigation'

export function StoriesActivity() {
  const userStories = useUserStore((state) => (state.stories))
  const userId = useUserStore((state) => (state.user?.id))
  const user = useUserStore((state) => (state.user))
  const [stories, setStories] = useState<any[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true);
  }, [])

  const loadStories = useCallback(async () => {
    if (!userStories || !userId) return;

    const userReel = userStories?.stories?.reels?.[userId];

    if (!userReel?.items) {
      setStories([]);
      return;
    }

    const mapped = await Promise.all(userReel.items.map(async (item: any, i: number) => ({
      id: i,
      image: await getImageBase64(item?.image_versions2?.candidates?.[0]?.url),
      procfileImage: await getImageBase64((user as any)?.profile_pic_url_hd),
      username: user?.username || 'Desconhecido',
      stats: Math.floor(Math.random() * 100),
      statsDetail: 'encaminharam esse story',
      isPrimary: false,
    })));

    setStories(mapped);
    //eslint-disable-next-line
  }, [userStories, userId, user?.username]);

  useEffect(() => {
    loadStories();
  }, [loadStories]);

  if (!isClient || stories.length === 0) {
    return null
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-xl font-bold text-center mb-4">Atividade nos stories</h2>
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={12}
          freeMode={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Autoplay]}
          className="mt-2 px-2"
        >
          {stories.map((story) => (
            <SwiperSlide
              key={story.id}
              style={{ width: '180px' }}
              className="!w-[180px] !h-[320px] rounded-xl overflow-hidden relative shadow-md"
            >
              <div className="relative w-full h-full">
                <Image
                  src={story.image}
                  alt={story.username}
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>

                <div className="absolute top-3 left-3 right-3 flex items-center z-10">
                  {!story.isPrimary && (
                    <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center mr-2">
                      <div className="w-full h-full rounded-full bg-white"> <Image className='rounded-full w-full h-full' src={story.procfileImage} alt={story.username} width={100} height={100}/></div>
                    </div>
                  )}
                  <span className="text-white text-sm font-medium truncate">
                    {story.username}
                  </span>
                </div>

                {story.title && (
                  <div className="absolute top-16 left-3 right-3">
                    <h3 className="text-white text-2xl font-serif">{story.title}</h3>
                    {story.eventDetails && (
                      <p className="text-white text-xs mt-1">{story.eventDetails}</p>
                    )}
                    {story.timeInfo && (
                      <div className="mt-4 inline-block bg-black/60 text-xs text-white px-2 py-1">
                        {story.timeInfo}
                      </div>
                    )}
                  </div>
                )}

                <div className="absolute bottom-3 left-3 right-3 flex flex-col">
                  <div className="flex items-center mb-1">
                    {story.stats && (
                      <>
                        <div className="flex mr-2">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className="w-6 h-6 rounded-full border-2 border-black overflow-hidden -ml-2 first:ml-0"
                              style={{ zIndex: 3 - i }}
                            >
                              <Image
                                src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i * 7}.jpg`}
                                alt="Pessoa"
                                className="w-full h-full object-cover filter blur-[2px]"
                                width={100}
                                height={100}
                              />
                            </div>
                          ))}
                        </div>
                        <span className="text-white text-sm font-medium">{story.stats}</span>
                      </>
                    )}
                  </div>
                  {story.statsDetail && (
                    <span className="text-white/80 text-xs">{story.statsDetail}</span>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}



export function StoriesActionButtons() {
  const router = useRouter();

  const redirectToPayments = () => {
    router.push('payments');
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 pb-4">
      <p className="text-center text-red-500 text-sm font-medium my-3">
        Veja tudo que acontece nos seus <br /> stories no relatório completo
      </p>

      <button
        className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium flex items-center justify-center cursor-pointer"
        onClick={redirectToPayments}
      >
        <FaLock className="mr-2" />
        Revelar perseguidores
      </button>
    </div>
  );
}

export default function StoriesActivityFull() {
  return (
    <div className="w-full max-w-md mx-auto bg-white">
      <StoriesActivity />
      <StoriesActionButtons />
    </div>
  )
}