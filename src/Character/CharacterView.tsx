import './CharacterView.css';
import { Config } from '../Config';
import { CharacterViewProps } from './CharacterView.props';
import { ImageService, ImageType } from '../_Shared/image';

const imageService: ImageService = new ImageService();

export function CharacterView({character}: CharacterViewProps): JSX.Element {
  const sideLength = Config.boardSideLength / Config.boardSideSquaresAmount;

  const styles = {
    width: `${sideLength}px`,
    height: `${sideLength}px`,
    top:  (character.y - 1) * sideLength + 'px',
    left: (character.x - 1) * sideLength + 'px',
    background: `url('${imageService.getPath(ImageType.skin, character.skin)}')`,
  };

  return (
    <div className="Character" style={styles}></div>
  );
}