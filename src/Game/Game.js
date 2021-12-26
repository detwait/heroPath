import { useState, useEffect  } from 'react';
import Square from '../Square/Square';
import Piece from '../Piece/Piece';
import './Game.css';
import PathFinderService from '../shared/PathFinder.service';
import { Config } from '../Config';

const pathFinderService = new PathFinderService();

export default function Game() {
  let timer;
  const squares = [];

  const styles = {
    width: `${Config.boardSideLength}px`,
    height: `${Config.boardSideLength}px`,
  };

  for (let y = 1; y <= Config.boardSideSquaresAmount; y++) {
    for (let x = 1; x <= Config.boardSideSquaresAmount; x++) {
      squares.push({ id: x + '_' + y, x, y });
    }
  }

  function startTravel({ x, y }) {
    if ((x !== piece.x || y !== piece.y) && piece.state === 'stay') {
      const travelPath = pathFinderService.findDirectPath(piece, {x, y});
      const travelDeltaTime = travelPath.length * Config.milisecondsForSquareSpeed;
      const travelStartTime = new Date().getTime();
      const travelFinishTime = travelStartTime + travelDeltaTime;

      setPiece({
        ...piece,
        travelPath,
        state: 'travel',
        travelStartTime,
        travelFinishTime,
      });
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

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <div className="Board" style={styles}>
      { squares.map(square => <Square key={square.id} params={square} onClick={() => startTravel(square)} />) }
      <Piece params={piece} />
    </div>
  );
};
