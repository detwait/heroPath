import { useState, useEffect  } from 'react';
import SquareView from '../Square/SquareView';
import './GameView.css';
import { Config } from '../Config';
import { TravelState } from './TravelState.enum';
import { GameService } from './Game.service';
import { Point } from '../Core/Point';
import { isPointSame } from '../Core/Geometry.utils';
import Character from '../Character/Character';
import CharacterView from '../Character/CharacterView';
import ObstacleView from '../Obstacle/ObstacleView';

const gameService = new GameService();

export default function GameView() {
  const styles: React.CSSProperties = {
    width: `${Config.boardSideLength}px`,
    height: `${Config.boardSideLength}px`,
  };

  const [player, setPlayer] = useState<Character>(gameService.getPlayer());

  useEffect(() => {
    const timer = setInterval(() => { travel(); }, Config.appIntervalFrequencyMiliseconds);
    return () => { timer && clearInterval(timer); };
  });

  function startTravel(destination: Point): void {
    setPlayer({
      ...player,
      ...gameService.startTravel(player, destination)
    });
  }

  function finishTravel(): void {
    setPlayer({
      ...player,
      ...gameService.finishTravel(player)
    });
  }

  function travel() {
    const {x, y}: Partial<Character> = gameService.travel(player);

    if (!x || !y) {
      return;
    }

    if(isPointSame(player.destination, {x, y})) {
      if (player.state === TravelState.travel) {
        finishTravel();
      }
    } else {
      setPlayer({
        ...player,
        x,
        y,
      });
    }
  }

  return (
    <div className='Game'>
      <header>
        <h1>Hero Path</h1>
      </header>
      <main>
        <div className="Player">
          <p>Name: {player.name}</p>
          <p>Level: {player.level}</p>
          <p>Strength: {player.strength}</p>
          <p>Agility: {player.agility}</p>
          <p>Health: {player.hp} / {player.maxHp}</p>
        </div>
        <div className="Board" style={styles}>
          { gameService.squares.map(square => <SquareView 
            key={'square' + square.x + '_' + square.y}
            square={square}
            isObstacle={gameService.isObstacle(square)}
            onClick={ () => startTravel(square)} 
          />) }
          { gameService.obstacles.map(obstacle => <ObstacleView 
            key={'obstacle_' + obstacle.x + '_' + obstacle.y}
            obstacle={obstacle}
          />) }
          <CharacterView player={player} />
        </div>
      </main>
      <footer>
      </footer>
    </div>
  );
};
