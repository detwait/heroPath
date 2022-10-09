import { Tooltip } from 'react-tippy';
import './GameView.css';
import 'react-tippy/dist/tippy.css'
import { ImageService, ImageType } from '../_Shared/image';
import { GamePlayerInfoViewProps } from './GamePlayerInfoView.props';

const imageService: ImageService = new ImageService();

export function GamePlayerInfoView({ player, playerItems }: GamePlayerInfoViewProps) {
  return (
    <div className="Player">
      <p>
        <img src={`${imageService.getPath(ImageType.avatar, player.avatar)}`} alt="avatar" />
      </p>
      <p>Name: {player.name}</p>
      <p>Level: {player.level}</p>
      <p>Strength: {player.strength}</p>
      <p>Agility: {player.agility}</p>
      <p>Health: {player.hp} / {player.maxHp}</p>
      <div className="Inventar">
        { playerItems.map(item => 
        <Tooltip title={item.description} arrow={true}  key={'item_' + item.id}>
          <div className="InventarItem">
            <img src={`${imageService.getPath(ImageType.avatar, item.avatar)}`} alt="avatar" />
          </div>
        </Tooltip>
        )}
      </div>
    </div>
  );
};
