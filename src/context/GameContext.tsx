import { createContext, useContext, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { Adventure, Room } from '@/types';
import { gameIdState } from '@/util/recoil';

interface GameContextType {
  description: string;
  textHistory: string[];
  addToHistory: (text: string) => void;
  makeMove: (move: string) => Promise<boolean>;
}

interface MoveHistoryType {
  id: number;
  move: string;
  result: string;
  isValid: boolean;
}

const GameContext = createContext<GameContextType>({} as GameContextType);

export function GameProvider({ children }: { children: React.ReactNode }) {

  const [ game, setGame ] = useState<Adventure>({} as Adventure);
  const [ room, setRoom ] = useState<Room>({} as Room);
  const [ description, setDescription ] = useState('');

  const [ moveHistory, setMoveHistory ] = useState<MoveHistoryType[]>([]);
  const [ textHistory, setTextHistory ] = useState<string[]>([]);

  const gameId = useRecoilValue(gameIdState);

  const fetchGame = async () => {
    console.log(gameId)
    const url = `/api/games?method=getOne&_id=${gameId}`
    console.log(url)
    const res = await fetch(url);
    const g = await res.json();
    setMoveHistory([]);
    setTextHistory([]);
    loadGame(g);
  }

  useEffect(() => { if (gameId) fetchGame(); }, [gameId]);
  
  // This parses the description and highlights any keywords
  const processDescription = (rawDescription: string, room: Room) => {
    let processedDescription = rawDescription;

    // Highlight items
    room.items.forEach(item => {
      const regex = new RegExp(`\\b${item.name}\\b`, 'gi');
      processedDescription = processedDescription.replace(regex, `i\\${item.name}\\i`);
    });

    // Highlight entities
    room.entities.forEach(entity => {
      const regex = new RegExp(`\\b${entity.name}\\b`, 'gi');
      processedDescription = processedDescription.replace(regex, `e\\${entity.name}\\e`);
    });

    // Highlight directions
    room.exits.forEach(exit => {
      const regex = new RegExp(`\\b${exit.direction}\\b`, 'gi');
      processedDescription = processedDescription.replace(regex, `d\\${exit.direction}\\d`);
    });

    return processedDescription;
  };

  useEffect(() => {
    if (room.description) {
      const processedDescription = processDescription(room.description, room);
      setDescription(processedDescription);
      // addToHistory(processedDescription);
    }
  }, [room]);

  const addToHistory = (text: string) => {
    setTextHistory(prev => [...prev, text]);
  }

  const loadGame = (g: Adventure) => {
    // This is called when the user has selected a game from the previous screen and purchased it.
    // This expects the game object
    setGame(g);
    const txt = 'Game loaded. Type in d\\start\\d and hit Enter!';
    setDescription(txt);
    // addToHistory(txt);
  }

  const displayHelp = () => {
    // This displays the help message to the user with basic game commands and mechanics.
    // Not sent to chain.
    return '';
  }

  const makeMove = async (move: string) => {
    // Sends the room object along with the input to the chain (Flow)
    // Expects an intent and params from the chain
    // Executes the intent with the params
    // Updates the room object

    // addToHistory(`$ ${move}`);
    setDescription('');

    console.log('makeMove from context ~', move);

    if (move === 'help') {
      const txt = displayHelp();
      setDescription(txt);
      // addToHistory(txt);
      return true;
    } else if (move === 'start') {
      const start = game.rooms.find(( r => r.name.toLowerCase() === game.start_room.toLowerCase() ));
      if (room.description) {
        let txt = 'Invalid move. Game already started!\n';
        txt += room.description;
        setDescription(txt);
        // addToHistory(txt);
        return false;
      } else {
        setRoom(start || {} as Room);
      }
      return true;
    } else {

      const res = await fetch(`/api/games?method=isValid&room=${JSON.stringify(room)}&move=${move}`);
      const r = await res.json();
      console.log('makeMove from context ~', r);

      const result = r.result.split(' ');

      const intent = result[0];
      const params = result.slice(1).join(' ');

      const f = game.rooms.find((r: Room) => r.name === params);
      if (f) setRoom(f);

      return true;
      

    }

    return false;
  }

  // const makeMove = (move) => {
  //   move = move.toLowerCase().split(' ');
    
  //   let res = '', valid = false;
  //   const cmd = move[0], obj = move[1], rest = move.slice(2);
    
  //   switch(cmd) {
  //     case 'help': res = help; valid = true; break;
  //     case 'start': break;
  //     default: res = 'Oh no, that command is not recognized. Type \'help\' to see the list of commands.';
  //   }
  //   setMoves([...moves, move]);
  //   setResponse([...response, res]);
  //   return valid;
  // }

  /** start: utility functions to execute various game mechanics */

  const startChat = async () => {
    // This starts a chat with an AI NPC
  }

  const endChat = async () => {
    // This ends a chat with an AI NPC
    // Also registers the conversation as an IP on Story
  }

  const endGame = async () => {
    // This ends the game
    // Also registers the game moves as an IP on Story
  }

  /** end: utility functions to execute various game mechanics */



  return (
    <GameContext.Provider
      value = {{
        description,
        textHistory,
        addToHistory,
        makeMove
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export const useGameProvider = () => useContext(GameContext);
