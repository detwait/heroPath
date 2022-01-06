import { useState, useEffect  } from 'react';
import SquareView from '../Square/SquareView';
import './GameView.css';

import { Config } from '../Config';
import PieceView from '../Piece/PieceView';
import { TravelState } from './TravelState.enum';
import { Piece } from './Piece';
import { GameService } from './Game.service';

export default function GameView() {
  const styles: React.CSSProperties = {
    width: `${Config.boardSideLength}px`,
    height: `${Config.boardSideLength}px`,
  };

  const [piece, setPiece] = useState<Piece>({
    x: 2,
    y: 2,
    state: TravelState.stay,
    travelPath: [],
    travelStartTime: 0,
    travelFinishTime: 0,
  });

  let gameService = new GameService(piece, setPiece);
  useEffect(() => gameService.setTimer());

  return (
    <div className="Board" style={styles}>
      { gameService.squares.map(square => <SquareView key={square.id} params={square} onClick={() => gameService.startTravel(square)} />) }
      <PieceView params={piece} />
    </div>
  );
};
