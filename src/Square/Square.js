import './Square.css';
import { Config } from '../Config';

export default function Square({params, onClick}) {
  const sideLength = Config.boardSideLength / Config.boardSideSquaresAmount;

  const styles = {
    width: `${sideLength}px`,
    height: `${sideLength}px`,
  };

  const squareColorClassName = params.isObstacle ? 'SquareBlack' : (params.x + params.y) % 2 === 0 ? 'SquareWhite' : 'SquareGray';
  const classNames = `Square ${squareColorClassName}`;

  return (
    <div 
      className={classNames}
      style={styles}
      onClick={() => onClick(params)} 
    />
  );
}