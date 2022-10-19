import { Tooltip } from 'react-tippy';
import './CharacterInventarView.css';
import 'react-tippy/dist/tippy.css';
import { imageService, ImageType } from '../../_Shared/image';
import { CharacterInventarViewProps } from './CharacterInventarView.props';

export function CharacterInventarView({ character }: CharacterInventarViewProps): JSX.Element {
  return (
    <div className="CharacterInventar">
      {character.items.map((item) => (
        <Tooltip title={item.description} arrow={true} key={'item_' + item.id}>
          <div className="CharacterInventarItem">
            <img src={`${imageService.getPath(ImageType.avatar, item.avatar)}`} alt="avatar" />
          </div>
        </Tooltip>
      ))}
    </div>
  );
}
