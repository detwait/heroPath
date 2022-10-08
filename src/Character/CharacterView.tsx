import './CharacterView.css';
import { Config } from '../Config';
import { CharacterViewProps } from './CharacterView.props';

export default function CharacterView({player}: CharacterViewProps): JSX.Element {
  const sideLength = Config.boardSideLength / Config.boardSideSquaresAmount;

  const styles = {
    width: `${sideLength}px`,
    height: `${sideLength}px`,
    top:  (player.y - 1) * sideLength + 'px',
    left: (player.x - 1) * sideLength + 'px',
    background: `url('${process.env.PUBLIC_URL}/images/${player.skin}')`,
  };

  return (
    <div className="Character" style={styles}></div>
  );
}