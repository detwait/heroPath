import './SquareView.css';
import { Config } from '../Config';
import { SquareViewProps } from './SquareView.props';

export default function SquareView({square, isObstacle, onClick}: SquareViewProps) {
  const sideLength = Config.boardSideLength / Config.boardSideSquaresAmount;

  const styles: any = {
    width: `${sideLength}px`,
    height: `${sideLength}px`,
  };

  // const squareColorClassName = isObstacle ? '' : (square.x + square.y) % 2 === 0 ? 'SquareWhite' : 'SquareGray';

  if (isObstacle) {
    styles.background = `url('${process.env.PUBLIC_URL}/images/rock.png')`;
  }
  
  const classNames = `Square`;

  return (
    <div 
      className={classNames}
      style={styles}
      onClick={() => onClick(square)} 
    />
  );
}