import { Config } from '../../Config';
import { imageService, ImageType } from '../../_Shared/image';
import './ItemView.css';
import { ItemViewProps } from './ItemView.props';

export function ItemView({ entity, onClick }: ItemViewProps): JSX.Element {
  const sideLength = Config.boardSideLength / Config.boardSideSquaresAmount;

  const styles: React.CSSProperties = {
    width: `${sideLength}px`,
    height: `${sideLength}px`,
    top:  (entity.y - 1) * sideLength + 'px',
    left: (entity.x - 1) * sideLength + 'px',
    background: `url('${imageService.getPath(ImageType.skin, entity.skin)}')`,
  };

  return (
    <div
      className="Item"
      onClick={() => onClick(entity)} 
      style={styles}>
    </div>
  );
}