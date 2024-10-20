'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { livesState } from '@/util/recoil';

const Heart = ({ fill, isHovered }: { fill: number; isHovered: boolean }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    strokeWidth={1} 
    className={clsx(
      "size-6 transition-colors duration-200",
      isHovered ? "stroke-primary" : "stroke-health"
    )}
  >
    <defs>
      <linearGradient id={`heartFill${fill}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset={`${fill * 100}%`} stopColor="#EF4444" />
        <stop offset={`${fill * 100}%`} stopColor="transparent" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" 
      fill={`url(#heartFill${fill})`}
    />
  </svg>
);

export default function Health() {
  
  const lives = useRecoilValue(livesState);
  
  const [ isHovered, setIsHovered ] = useState(false);

  return (
    <div 
      className="flex gap-1 w-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {Array.from({ length: 5 }).map((_, index) => {
        const fillAmount = Math.min(Math.max(lives - index, 0), 1);
        return <Heart key={index} fill={fillAmount} isHovered={isHovered} />;
      })}
    </div>
  );
}
