import './SquareView.css';
import { Config } from '../Config';
import { SquareViewProps } from './SquareView.props';

export function SquareView({entity, onClick}: SquareViewProps) {
  const sideLength = Config.boardSideLength / Config.boardSideSquaresAmount;

  const styles: any = {
    width: `${sideLength}px`,
    height: `${sideLength}px`,
  };

  return (
    <div 
      className={`Square`}
      style={styles}
      onClick={() => onClick(entity)} 
    />
  );
}