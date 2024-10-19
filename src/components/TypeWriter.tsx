'use client';

import React, { useState, useEffect, useCallback } from 'react';

import { Highlights } from '@/types';

interface TypeWriterProps {
  data: string;
  speed?: number;
}

// Adapted from https://codesandbox.io/s/react-typewriter-effect-rdis2?file=/components/Typewriter.js
function TypeWriter({
  data,
  speed = 83
}: TypeWriterProps) {
  
  const [ text, setText ] = useState('');
  const [ index, setIndex ] = useState(0);

  const tick = useCallback(() => {
    setText(data.slice(0, index + 1));
    setIndex((prevIndex) => prevIndex + 1);
  }, [data, index]);

  useEffect(() => {
    if (index < data.length) {
      const timer = setTimeout(tick, speed);
      return () => clearTimeout(timer);
    }
  }, [data, index, speed, tick]);

  useEffect(() => {
    setText('');
    setIndex(0);
  }, [data]);

  const renderText = () => {
    const parts = text.split(/([ied]\\.*?\\[ied])/);
    return parts.map((part, i) => {
      const match = part.match(/([ied])\\(.*?)\\([ied])/);
      if (match) {
        const [, startTag, content, endTag] = match;
        if (startTag === endTag) {
          let color;
          switch(startTag) {
            case 'i': color = Highlights.item; break;
            case 'e': color = Highlights.entity; break;
            case 'd': color = Highlights.direction; break;
            default: color = 'inherit';
          }
          return <span key={i} style={{color}}>{content}</span>;
        }
      }
      return part;
    });
  };

  return (
    <div className="w-full text-lg font-terminal break-words whitespace-pre-wrap">
      {renderText()}
    </div>
  );
};

export default React.memo(TypeWriter);
