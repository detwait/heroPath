import { useState, useEffect  } from 'react';
import Square from '../Square/Square';
import Piece from '../Piece/Piece';
import './Game.css';

export default function Game() {
  let timer;
  const squares = [];

  function startTravel(x, y) {
    console.log('start ' + x + '_' + y);
    if ((x !== piece.x || y !== piece.y) && piece.state === 'stay') {
      let xOffset = x - piece.x > 0 ? 1 : -1;
      let yOffset = y - piece.y > 0 ? 1 : -1;
      let startX = piece.x;
      let startY = piece.y;
      let travelPath = [];

      travelPath.push({ x: piece.x, y: piece.y });

      if (x !== piece.x) {
        for (let i = (startX + xOffset); i !== x; i += xOffset) {
          travelPath.push({ x: i, y: startY });
        }
  
        travelPath.push({ x, y: startY });
      }

      if (y !== piece.y) {
        for (let j = (startY + yOffset); j !== y; j += yOffset) {
          travelPath.push({ x, y: j });
        }
  
        travelPath.push({ x, y });
      }


      let travelDeltaTime = travelPath.length * 50;
      let travelStartTime = new Date().getTime();
      let travelFinishTime = travelStartTime + travelDeltaTime;

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
      let currentTime = new Date().getTime();
      if (currentTime > piece.travelFinishTime) {
        finishTravel();
      } else {
        let currectTravelSquareIndex = Math.floor(
          (piece.travelPath.length - 1) * (currentTime - piece.travelStartTime) / (piece.travelFinishTime - piece.travelStartTime)
        );

        let x = piece.travelPath[currectTravelSquareIndex].x;
        let y = piece.travelPath[currectTravelSquareIndex].y;

        setPiece({
          ...piece,
          x,
          y,
        });
      }
    }
  }

  function squareClick({ x, y }) {
    startTravel(x, y);
  }

  for (let y = 1; y <= 32; y++) {
    for (let x = 1; x <= 32; x++) {
      squares.push({ id: x + '_' + y, x, y });
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
    timer = setInterval(() => {
      travel()
    }, 50);

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <div className="Board">
      { squares.map(square => <Square key={square.id} params={square} onClick={() => squareClick(square)} />) }
      <Piece params={piece} />
    </div>
  );
};
