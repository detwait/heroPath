import './SquareView.css';

import { Config } from '../../Config';
import { SquareViewProps } from './SquareView.props';

export function SquareView({ entity, onClick }: SquareViewProps): JSX.Element {
  const sideLength = Config.boardSideLength / Config.boardSideSquaresAmount;

  const styles: React.CSSProperties = {
    width: `${sideLength}px`,
    height: `${sideLength}px`,
  };

  return <div className={`Square`} style={styles} onClick={() => onClick(entity)} />;
}
