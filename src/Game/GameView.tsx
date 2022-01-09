import { useState, useEffect  } from 'react';
import SquareView from '../Square/SquareView';
import './GameView.css';

import { Config } from '../Config';
import PieceView from '../Piece/PieceView';
import { TravelState } from './TravelState.enum';
import { Piece } from './Piece';
import { GameService } from './Game.service';

const gameService = new GameService();

export default function GameView() {
  const styles: React.CSSProperties = {
    width: `${Config.boardSideLength}px`,
    height: `${Config.boardSideLength}px`,
  };

  const [piece, setPiece] = useState<Piece>({
    ...gameService.pieceStartPoint,
    state: TravelState.stay,
    travelPath: [],
    travelStartTime: 0,
    travelFinishTime: 0,
  });

  useEffect(() => gameService.setTimer(piece, setPiece), [piece]);

  return (
    <div className="Board" style={styles}>
      { gameService.squares.map(square => <SquareView 
        key={square.id}
        square={square}
        isObstacle={gameService.isObstacle(square)}
        onClick={ () => gameService.startTravel(piece, setPiece, square)} 
      />) }
      <PieceView params={piece} />
    </div>
  );
};
