'use client';

import clsx from 'clsx';
import { useState, useEffect, useRef } from 'react';

import { useGameProvider } from '@/context/GameContext';

import TypeWriter from './TypeWriter';

export default function REPL() {
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');

  const { description, makeMove } = useGameProvider();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setInput(event.target.value);
  
  const handleMove = async () => {
    const valid = await makeMove(input);
    if (valid) setInput(''); // Clear input field on accepted move
  }

  const handleTab = () => {
    // This functions as an autocomplete, if applicable
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') handleMove();
    if (event.key === 'Tab') handleTab();
  }
  
  useEffect(() => {
    console.log('description changed')
    console.log(description)
    descriptionRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [description]);

  return (
    <div 
      ref={descriptionRef}
      className={clsx(
        'flex flex-col w-4/5',
        'border border-primary rounded-lg',
        'flex-grow h-full'
      )}
    >

      <div className={clsx(
        'p-4 flex-grow scrollbar-hide',
        'overflow-x-hidden overflow-y-auto',
      )}>
        {description && <TypeWriter data={description} />}
      </div>

      {/* Input Box */}
      <div className={clsx('border-t border-primary')}>
        <div className={clsx(
          'px-3 py-1 m-0 items-center',
          'flex flex-row gap-2',
          'font-terminal'
        )}>
          <span className={clsx('text-primary text-lg')}>$</span>
          <input 
            className={clsx(
              'w-full bg-transparent text-base',
              'placeholder-secondary placeholder-opacity-50',
              'focus:outline-none caret-primary'
            )}
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder='make your move'
            spellCheck='false'
            autoComplete='off'
          />
        </div>
      </div>
    </div>
  );
}
