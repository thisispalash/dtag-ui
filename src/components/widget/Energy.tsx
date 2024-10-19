'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { energyState } from '@/util/recoil';

const Bolt = ({ fill, isHovered }: { fill: number; isHovered: boolean }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    className={clsx(
      "size-6 transition-colors duration-200",
      isHovered ? "stroke-primary" : "stroke-energy"
    )}
  >
    <defs>
      <linearGradient id={`energyFill${fill}`}>
        <stop offset={`${fill * 100}%`} stopColor="#FCD34D" />
        <stop offset={`${fill * 100}%`} stopColor="transparent" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" 
      fill={`url(#energyFill${fill})`}
    />
  </svg>
);

export default function Energy() {
  
  const energy = useRecoilValue(energyState);
  const [ isHovered, setIsHovered ] = useState(false);

  return (
    <div 
      className="flex gap-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {Array.from({ length: Math.ceil(energy) }).map((_, index) => {
        const fillAmount = Math.min(Math.max(energy - index, 0), 1);
        return <Bolt key={index} fill={fillAmount} isHovered={isHovered} />;
      })}
    </div>
  );
}
