import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import path from 'path';

import { Adventure, Exit, Room } from '@/types';

export async function GET(request: NextRequest) {

  const method = request.nextUrl.searchParams.get('method');
  console.log(method)
  
  const jsonDirectory = path.join(process.cwd(), '_json');

  switch (method) {
    case 'getOne':
      const gameId = request.nextUrl.searchParams.get('_id');
      console.log(gameId);
      const g = readFileSync(`${jsonDirectory}/${gameId}.json`, 'utf-8');
      return NextResponse.json(JSON.parse(g));

    case 'isValid':
      const r = request.nextUrl.searchParams.get('room') || '{}';
      const room = JSON.parse(r) as Room;
      const move = request.nextUrl.searchParams.get('move') || '';
      const words = move.split(' ');

      const cmd = words[0];
      const tgt = words[1];

      if (cmd.toLowerCase() !== 'go') {
        return NextResponse.json({ result: 'Bad method' }), 400;
      } else {
        const dst = room.exits.find((e: Exit) => e.direction === tgt);
        if (!dst) {
          return NextResponse.json({ result: 'Invalid direction' }), 400;
        }

        return NextResponse.json({ result: `move_to ${dst.room}` });
      }

    default:
      const games: Adventure[] = [];
    
      const game = readFileSync(`${jsonDirectory}/example-game-01.json`, 'utf-8');
      games.push(JSON.parse(game));
    
      return NextResponse.json(games);
  }
}
