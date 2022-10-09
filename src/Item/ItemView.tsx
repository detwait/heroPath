import './ItemView.css';
import { Config } from '../Config';

import { ImageService, ImageType } from '../_Shared/image';
import { ItemViewProps } from '../Item/ItemView.props';

const imageService: ImageService = new ImageService();

export function ItemView({item}: ItemViewProps): JSX.Element {
    if (!item.ownerId && item.x && item.y) {
    const sideLength = Config.boardSideLength / Config.boardSideSquaresAmount;

    const styles = {
      width: `${sideLength}px`,
      height: `${sideLength}px`,
      top:  (item.y - 1) * sideLength + 'px',
      left: (item.x - 1) * sideLength + 'px',
      background: `url('${imageService.getPath(ImageType.skin, item.skin)}')`,
    };

    return (
      <div className="Character" style={styles}></div>
    );
  } else {
    return (<div></div>);
  }
}