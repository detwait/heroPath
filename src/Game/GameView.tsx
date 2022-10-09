import { useState, useEffect } from 'react';
import './GameView.css';
import 'react-tippy/dist/tippy.css'
import { Config } from '../Config';
import { TravelState } from './TravelState.enum';
import { GameService } from './Game.service';
import { Point } from '../_Core/Point';
import { isPointSame } from '../_Core/Geometry.utils';
import { Seed } from '../Seed';
import { SquareView } from '../Square';
import { ObstacleView } from '../Obstacle';
import { Character, CharacterView } from '../Character';
import { Item, ItemView } from '../Item';
import { GamePlayerInfoView } from './GamePlayerInfoView';

const gameService = new GameService({ ...Seed });

export function GameView() {
  const styles: React.CSSProperties = {
    width: `${Config.boardSideLength}px`,
    height: `${Config.boardSideLength}px`,
  };

  const [characters, setCharacters] = useState<Character[]>(gameService.characters);
  const [items, setItems] = useState<Item[]>(gameService.items);
  const player: Character = gameService.getPlayer(characters);
  const playerItems: Item[] = gameService.getCharacterItems(player, items);
  const groundItems: Item[] = gameService.getGroundItems(items);

  useEffect(() => {
    const timer = setInterval(() => { travel(); }, Config.appIntervalFrequencyMiliseconds);
    return () => { timer && clearInterval(timer); };
  });

  function startTravel(destination: Point): void {
    Object.assign(player, gameService.startTravel(player, destination));
    setCharacters([...characters]);
  }

  function finishTravel(): void {
    Object.assign(player, gameService.finishTravel(player));
    setCharacters([...characters]);
  }

  function travel() {
    const {x, y}: Partial<Character> = gameService.travel(player);

    if (!x || !y) {
      return;
    }
    
    const itemFound: Item | undefined = gameService.isCharacterOnItem({x, y});

    if (itemFound) {
      Object.assign(itemFound, {
        ...(gameService.characterClaimItem(player, itemFound))
      });

      setItems([ ...items ]);
    }

    if(isPointSame(player.destination, {x, y})) {
      if (player.state === TravelState.travel) {
        finishTravel();
      }
    } else {
      Object.assign(player, { x, y});
      setCharacters([...characters]);
    }
  }

  return (
    <div className='Game'>
      <header>
        <h1>Hero Path</h1>
      </header>
      <main>
        <GamePlayerInfoView
          player={player}
          playerItems={playerItems}>
        </GamePlayerInfoView>
        <div className="Board" style={styles}>
          { gameService.squares.map(entity => <SquareView 
            key={'square_' + entity.x + '_' + entity.y}
            entity={entity}
            isObstacle={gameService.isObstacle(entity)}
            onClick={ () => startTravel(entity)} 
          />) }
          { gameService.obstacles.map(entity => <ObstacleView 
            key={entity.id}
            entity={entity}
          />) }
          { groundItems.map(entity => <ItemView 
            key={entity.id}
            entity={entity}
            onClick={ () => startTravel(entity)} 
          />) }
          { characters.map(entity => <CharacterView 
            key={entity.id}
            entity={entity}
            onClick={ () => startTravel(entity)} 
          />) }
        </div>
      </main>
      <footer>
      </footer>
    </div>
  );
};
