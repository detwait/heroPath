import './ItemView.css';
import { Config } from '../Config';

import { ImageService, ImageType } from '../_Shared/image';
import { ItemViewProps } from '../Item/ItemView.props';

const imageService: ImageService = new ImageService();

export function ItemView({ entity, onClick }: ItemViewProps): JSX.Element {
    if (!entity.ownerId) {
    const sideLength = Config.boardSideLength / Config.boardSideSquaresAmount;

    const styles = {
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
  } else {
    return (<div></div>);
  }
}