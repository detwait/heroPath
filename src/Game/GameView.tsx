import { useState, useEffect  } from 'react';
import SquareView from '../Square/SquareView';
import './GameView.css';

import { Config } from '../Config';
import PlayerView from '../Player/PlayerView';
import { TravelState } from './TravelState.enum';
import { Player } from './Player';
import { GameService } from './Game.service';
import { Point } from '../Core/Point';
import { isPointSame } from '../Core/Geometry.utils';

const gameService = new GameService();

export default function GameView() {
  const styles: React.CSSProperties = {
    width: `${Config.boardSideLength}px`,
    height: `${Config.boardSideLength}px`,
  };

  const [squares] = useState<Point[]>(gameService.generateSquares(Config.boardSideSquaresAmount, Config.boardSideSquaresAmount));
  const [player, setPlayer] = useState<Player>(gameService.generatePlayer());
  const [obstacles, setObstacles] = useState(gameService.generateObstacles(player, Config.boardSideSquaresAmount, Config.boardSideSquaresAmount));

  useEffect(() => {
    const timer = setInterval(() => { travel(); }, Config.appIntervalFrequencyMiliseconds);
    return () => { timer && clearInterval(timer); };
  });

  function regenerateObstacles(): void {
    setObstacles(gameService.generateObstacles(player, Config.boardSideSquaresAmount, Config.boardSideSquaresAmount)); 
  }

  function startTravel(destination: Point): void {
    setPlayer({
      ...player,
      ...gameService.startTravel(player, squares, obstacles, destination)
    });
  }

  function finishTravel(): void {
    setPlayer({
      ...player,
      ...gameService.finishTravel(player)
    });
  }

  function travel() {
    const {x, y}: Partial<Player> = gameService.travel(player);

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
    <div>
      <button onClick={() => regenerateObstacles()}>New obstacles</button>
      <div className="Board" style={styles}>
        { squares.map(square => <SquareView 
          key={square.x + '_' + square.y}
          square={square}
          isObstacle={gameService.isObstacle(obstacles, square)}
          onClick={ () => startTravel(square)} 
        />) }
        <PlayerView params={player} />
      </div>
    </div>
  );
};
