import './Piece.css';
import { Config } from '../Config';

export default function Piece({params}) {
  const sideLength = Config.boardSideLength / Config.boardSideSquaresAmount;

  const styles = {
    width: `${sideLength}px`,
    height: `${sideLength}px`,
    top:  (params.y - 1) * sideLength + 'px',
    left: (params.x - 1) * sideLength + 'px',
  };

  return (
    <div className="Piece" style={styles}></div>
  );
}