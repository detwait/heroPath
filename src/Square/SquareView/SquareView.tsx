import { Config } from '../../Config';
import './SquareView.css';
import { SquareViewProps } from './SquareView.props';

export function SquareView({entity, onClick}: SquareViewProps) {
  const sideLength = Config.boardSideLength / Config.boardSideSquaresAmount;

  const styles: React.CSSProperties = {
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