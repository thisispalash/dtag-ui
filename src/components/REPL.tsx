'use client';

import clsx from 'clsx';
import { useState, useEffect, useRef } from 'react';

import { useGameProvider } from '@/context/GameContext';

import TypeWriter from './TypeWriter';

export default function REPL() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState('');
  const [skipTyping, setSkipTyping] = useState(false);

  const { description, textHistory, addToHistory, makeMove } = useGameProvider();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setInput(event.target.value);
  
  const handleMove = async () => {
    console.log('in handleMove ~', input)
    addToHistory(description);
    addToHistory(`$ ${input}`);
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
  
  const handleSkip = () => {
    setSkipTyping(true);
    inputRef.current?.focus();
  };

  const resetSkip = () => {
    setSkipTyping(false);
  }

  useEffect(() => {
    console.log('description changed')
    console.log(description)
    console.log(textHistory)
    if (!description) resetSkip();
    else {
      inputRef.current?.focus();
      // descriptionRef.current?.scrollIntoView({ behavior: 'smooth' });
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [description]);

  return (
    <div 
      className={clsx(
        'flex flex-col',
        'w-4/5 h-[calc(100vh-10rem)]',
        'border border-primary rounded-lg',
        'relative'
      )}
    >
      <div 
        ref={scrollRef}
        className={clsx(
          'flex-1 overflow-y-auto scrollbar-hide',
          'p-4',
          'flex flex-col gap-1 justify-end'
        )}
      >
        {textHistory.map((text, index) => (
          <TypeWriter 
            key={index} 
            data={text} 
            typeOut={false}
          />
        ))}
        {description && (
          <TypeWriter data={description} typeOut={!skipTyping} />
        )}
      </div>

      {/* Skip button */}
      <button 
        onClick={handleSkip}
        className={clsx(
          'absolute bottom-16 right-4',
          'px-2 py-1 text-sm',
          'bg-primary text-background rounded',
          'hover:bg-background hover:text-primary',
          'transition-colors duration-200',
          {
            'hidden': !description || skipTyping
          }
        )}
      >
        {'>>'}
      </button>

      {/* Input Box */}
      <div className={clsx('border-t border-primary', 'mt-auto')}>
        <div className={clsx(
          'px-3 py-2 m-0 items-center',
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
            ref={inputRef}
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
