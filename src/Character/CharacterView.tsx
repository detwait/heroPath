import './CharacterView.css';
import { Config } from '../Config';
import { CharacterViewProps } from './CharacterView.props';

export function CharacterView({character}: CharacterViewProps): JSX.Element {
  const sideLength = Config.boardSideLength / Config.boardSideSquaresAmount;

  const styles = {
    width: `${sideLength}px`,
    height: `${sideLength}px`,
    top:  (character.y - 1) * sideLength + 'px',
    left: (character.x - 1) * sideLength + 'px',
    background: `url('${process.env.PUBLIC_URL}/images/skins/${character.skin}')`,
  };

  return (
    <div className="Character" style={styles}></div>
  );
}