'use client';

import React, { useState, useEffect, useCallback } from 'react';

import { Highlights } from '@/types';

interface TypeWriterProps {
  data: string;
  speed?: number;
  typeOut?: boolean;
}

// Adapted from https://codesandbox.io/s/react-typewriter-effect-rdis2?file=/components/Typewriter.js
function TypeWriter({
  data,
  speed = 37,
  typeOut = true
}: TypeWriterProps) {

  const [ text, setText ] = useState(typeOut ? '' : data);
  const [ index, setIndex ] = useState(typeOut ? 0 : data.length);
  const [ isComplete, setIsComplete ] = useState(false);

  const tick = useCallback(() => {

    console.log('tick ~', text, typeOut);

    if (!typeOut && index < data.length) {
      setText(data);
      setIndex(data.length);
      setIsComplete(true);
      return;
    }

    if (!typeOut || isComplete) return;

    const newText = data.substring(0, index+1);
    setText(newText);
    setIndex(index + 1);

  }, [text, data, typeOut, isComplete, speed]);

  useEffect(() => {
    if (index >= data.length) setIsComplete(true);
    else setTimeout(tick, speed);
  }, [index]);

  // useEffect(() => {
  //   if (!typeOut && text.length < data.length) {
  //     setText(data);
  //     setIndex(data.length);
  //     setIsComplete(true);
  //   }
  // }, [typeOut]);

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
