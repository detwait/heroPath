import './ObstacleView.css';
import { Config } from '../Config';
import { ObstacleViewProps } from './ObstacleView.props';
import { ImageService, ImageType } from '../_Shared/image';

const imageService: ImageService = new ImageService();

export function ObstacleView({ entity }: ObstacleViewProps) {
  const sideLength = Config.boardSideLength / Config.boardSideSquaresAmount;

  const styles: React.CSSProperties = {
    width: `${sideLength}px`,
    height: `${sideLength}px`,
    top:  (entity.y - 1) * sideLength + 'px',
    left: (entity.x - 1) * sideLength + 'px',
    background: `url('${imageService.getPath(ImageType.skin, entity.skin)}')`,
  };

  return (
    <div className='Obstacle' style={styles} />
  );
}