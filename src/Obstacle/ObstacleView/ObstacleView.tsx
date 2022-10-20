import './ObstacleView.css';

import { imageService, ImageType } from '../../_Shared/image';
import { Config } from '../../Config';
import { ObstacleViewProps } from './ObstacleView.props';

export function ObstacleView({ entity }: ObstacleViewProps): JSX.Element {
  const sideLength = Config.boardSideLength / Config.boardSideSquaresAmount;

  const styles: React.CSSProperties = {
    width: `${sideLength}px`,
    height: `${sideLength}px`,
    top: (entity.y - 1) * sideLength + 'px',
    left: (entity.x - 1) * sideLength + 'px',
    background: `url('${imageService.getPath(ImageType.skin, entity.skin)}')`,
  };

  return <div className="Obstacle" style={styles} />;
}
