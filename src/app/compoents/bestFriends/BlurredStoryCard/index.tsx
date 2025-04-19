'use client';

import { useEffect, useState } from 'react';
import { FaEllipsisH, FaStar } from 'react-icons/fa';
import Image from 'next/image';
import { displayTime } from '@/app/actions/randomHouters';

type BlurredStoryCardProps = {
  mediaUrl: string;
  type: 'image' | 'video';
};

const BlurredStoryCard = ({ mediaUrl, type }: BlurredStoryCardProps) => {
  const [timeAgo, setTimeAgo] = useState<string>('...');

  useEffect(() => {
    const fetchTime = async () => {
      const result = await displayTime();
      setTimeAgo(result);
    };

    fetchTime();
  }, []);

  return (
    <div className="relative w-[100px] h-[180px] rounded-xl overflow-hidden shadow-md border border-red-400">
      {type === 'video' ? (
        <video
          src={mediaUrl}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        <Image
          src={mediaUrl}
          alt="Blurred Story"
          className="w-full h-full object-cover"
          width={100}
          height={180}
        />
      )}

      {/* Overlay com blur e info */}
      <div className="absolute top-0 left-0 w-full px-2 py-1 bg-black/40 backdrop-blur-md flex justify-between items-center z-10">
        {/* Nome e tempo */}
        <div className="flex flex-col text-white text-[11px] leading-tight">
          <span className="font-semibold blur-xs">Alguém</span>
          <span className="text-gray-300">{timeAgo}</span>
        </div>

        {/* Estrela + menu */}
        <div className="flex items-center gap-1">
          <div className="bg-green-500 rounded-full p-1 flex items-center justify-center">
            <FaStar className="text-white text-[10px]" />
          </div>
          <FaEllipsisH className="text-white text-sm" />
        </div>
      </div>
    </div>
  );
};

export default BlurredStoryCard;
