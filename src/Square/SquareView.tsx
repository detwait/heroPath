import './SquareView.css';
import { Config } from '../Config';
import { SquareViewProps } from './SquareView.props';

export default function SquareView({square, isObstacle, onClick}: SquareViewProps) {
  const sideLength = Config.boardSideLength / Config.boardSideSquaresAmount;

  const styles = {
    width: `${sideLength}px`,
    height: `${sideLength}px`,
  };

  const squareColorClassName = isObstacle ? 'SquareBlack' : (square.x + square.y) % 2 === 0 ? 'SquareWhite' : 'SquareGray';
  const classNames = `Square ${squareColorClassName}`;

  return (
    <div 
      className={classNames}
      style={styles}
      onClick={() => onClick(square)} 
    />
  );
}