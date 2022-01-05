import { useState, useEffect  } from 'react';
import SquareView from '../Square/SquareView';
import './GameView.css';
import DirectPathFinderService from '../algorithms/AstarPathFinder/DirectPathFinder.service';
import AstarPathFinderService from '../algorithms/AstarPathFinder/AstarPathFinder.service';
import { Config } from '../Config';
import { Obstacle } from './Obstacle';
import { Square } from '../Core/Square';
import PieceView from '../Piece/PieceView';
import { TravelSquare } from '../Core/TravelSquare';
import { TravelState } from './TravelState.enum';

const pathFinderService = new AstarPathFinderService();

export default function GameView() {
  let timer: NodeJS.Timer;
  const squares: Square[] = [];

  const obstacles: Obstacle[] = [
    { x: 10, y: 10 },
    { x: 11, y: 10 },
    { x: 12, y: 10 },
    { x: 13, y: 10 },
    { x: 14, y: 10 },
    { x: 15, y: 10 },
  ];

  const styles: React.CSSProperties = {
    width: `${Config.boardSideLength}px`,
    height: `${Config.boardSideLength}px`,
  };

  for (let y = 1; y <= Config.boardSideSquaresAmount; y++) {
    for (let x = 1; x <= Config.boardSideSquaresAmount; x++) {
      squares.push({ 
        id: x + '_' + y,
        x,
        y,
        isObstacle: isObstacle({ x, y}),
      });
    }
  }

  const [piece, setPiece] = useState({
    x: 2,
    y: 2,
    state: TravelState.stay as TravelState,
    travelPath: [] as TravelSquare[],
    travelStartTime: 0,
    travelFinishTime: 0,
  });

  function isObstacle({ x, y }: Partial<Square>): boolean {
    return obstacles.some(i => i.x === x && i.y === y);
  }

  function startTravel({ x, y }: Partial<Square>) {
    if (x && y && (x !== piece.x || y !== piece.y) && piece.state === TravelState.stay) {
      const travelPath: TravelSquare[] = pathFinderService.findPath({ start: piece, end: { x, y }, commonGrid: squares });
      
      if (travelPath && travelPath.length > 0) {
        const travelStartTime: number = new Date().getTime();
        const travelFinishTime: number  = travelStartTime + travelPath.length * Config.milisecondsForSquareSpeed;
  
        setPiece({
          ...piece,
          travelPath,
          state: TravelState.travel,
          travelStartTime,
          travelFinishTime,
        });
      }
    }
  }

  function finishTravel(): void {
    const { x, y } = piece.travelPath[piece.travelPath.length - 1];

    setPiece({
      ...piece,
      x,
      y,
      state: TravelState.stay as TravelState,
      travelPath: [],
      travelStartTime: 0,
      travelFinishTime: 0,
    });
  }

  function travel(): void {
    if (piece.state === TravelState.travel) {
      const currentTime = new Date().getTime();
      if (currentTime > piece.travelFinishTime) {
        finishTravel();
      } else {
        const currectTravelSquareIndex = Math.floor(
          (piece.travelPath.length - 1) * (currentTime - piece.travelStartTime) / (piece.travelFinishTime - piece.travelStartTime)
        );

        const { x, y } = piece.travelPath[currectTravelSquareIndex];

        setPiece({
          ...piece,
          x,
          y,
        });
      }
    }
  }

  useEffect(() => {
    timer = setInterval(() => { travel(); }, Config.appIntervalFrequencyMiliseconds);
    return () => { clearInterval(timer); };
  });

  return (
    <div className="Board" style={styles}>
      { squares.map(square => <SquareView key={square.id} params={square} onClick={() => startTravel(square)} />) }
      <PieceView params={piece} />
    </div>
  );
};
