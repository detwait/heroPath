import './CharacterView.css';

import { imageService, ImageType } from '../../_Shared/image';
import { Config } from '../../Config';
import { CharacterViewProps } from './CharacterView.props';

export function CharacterView({ entity, onClick }: CharacterViewProps): JSX.Element {
  const sideLength = Config.boardSideLength / Config.boardSideSquaresAmount;

  const styles: React.CSSProperties = {
    width: `${sideLength}px`,
    height: `${sideLength}px`,
    top: (entity.y - 1) * sideLength + 'px',
    left: (entity.x - 1) * sideLength + 'px',
    background: `url('${imageService.getPath(ImageType.skin, entity.skin)}')`,
  };

  return <div className="Character" style={styles} onClick={() => onClick(entity)}></div>;
}
