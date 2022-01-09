import './PlayerView.css';
import { Config } from '../Config';

export default function PlayerView({params}: any): JSX.Element {
  const sideLength = Config.boardSideLength / Config.boardSideSquaresAmount;

  const styles = {
    width: `${sideLength}px`,
    height: `${sideLength}px`,
    top:  (params.y - 1) * sideLength + 'px',
    left: (params.x - 1) * sideLength + 'px',
  };

  return (
    <div className="Player" style={styles}></div>
  );
}