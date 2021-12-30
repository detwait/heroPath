import { useState, useEffect  } from 'react';
import Square from '../Square/Square';
import Piece from '../Piece/Piece';
import './Game.css';
import DirectPathFinderService from '../shared/DirectPathFinder.service';
import AstarPathFinderService from '../shared/AstarPathFinder.service';
import { Config } from '../Config';

const pathFinderService = new AstarPathFinderService();

export default function Game() {
  let timer;
  const squares = [];

  const obstacles = [
    { x: 10, y: 10 },
    { x: 11, y: 10 },
    { x: 12, y: 10 },
    { x: 13, y: 10 },
    { x: 14, y: 10 },
    { x: 15, y: 10 },
  ];

  const styles = {
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

  function isObstacle({ x, y }) {
    return obstacles.some(i => i.x === x && i.y === y);
  }

  function startTravel({ x, y }) {
    if ((x !== piece.x || y !== piece.y) && piece.state === 'stay') {
      const travelPath = pathFinderService.findPath({ start: piece, end: {x, y}, commonGrid: squares });
      
      if (travelPath.length > 0) {
        const travelStartTime = new Date().getTime();
        const travelFinishTime = travelStartTime + travelPath.length * Config.milisecondsForSquareSpeed;
  
        setPiece({
          ...piece,
          travelPath,
          state: 'travel',
          travelStartTime,
          travelFinishTime,
        });
      }
    }
  }

  function finishTravel() {
    const { x, y } = piece.travelPath[piece.travelPath.length - 1];

    setPiece({
      ...piece,
      x,
      y,
      state: 'stay',
      travelPath: [],
      travelStartTime: 0,
      travelFinishTime: 0,
    });
  }

  function travel() {
    if (piece.state === 'travel') {
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

  const [piece, setPiece] = useState({
    x: 2,
    y: 2,
    state: 'stay',
    travelPath: [],
    travelStartTime: 0,
    travelFinishTime: 0,
  });

  useEffect(() => {
    timer = setInterval(() => { travel(); }, Config.appIntervalFrequencyMiliseconds);
    return () => { clearInterval(timer); };
  });

  return (
    <div className="Board" style={styles}>
      { squares.map(square => <Square key={square.id} params={square} onClick={() => startTravel(square)} />) }
      <Piece params={piece} />
    </div>
  );
};
