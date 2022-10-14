
import { CharacterAttributesView } from '../../Character/CharacterAttributesView/CharacterAttributesView';
import { ImageService, ImageType } from '../../_Shared/image';
import { BattleService } from '../Battle.service';
import './BattleView.css';
import { BattleViewProps } from './BattleView.props';

const imageService: ImageService = new ImageService();
const battleService: BattleService = new BattleService();

export function BattleView({ battle, onAttack, onClose }: BattleViewProps) {
  return (
    <div className='Battle'>
      <div className='BattleFighters'>
        <CharacterAttributesView character={battle.player}></CharacterAttributesView>
        <CharacterAttributesView character={battle.opponent}></CharacterAttributesView>
      </div>
      <div className='BattleInfo'>
        <div className='BattleLog'>
          { [...battle.log].reverse().slice(0, 14).map((record, index) => <p className='BattleLogLine' key={index}>{record}</p>) }
        </div>
      </div>
      <div className='BattleActions'>
        {(() => {
          if (!battleService.isBattleOver(battle)) {
            return (
              <button onClick={() => onAttack(battle)}>
                <img src={`${imageService.getPath(ImageType.action, 'attack.png')}`} alt="avatar" />
              </button>
            )
          } 
          if (battleService.isBattleWon(battle)) {
            return (
              <button onClick={() => onClose(battle)}>
                <img src={`${imageService.getPath(ImageType.action, 'map.png')}`} alt="avatar" />
              </button>
            )
          } 
        })()}
      </div>
    </div>
  );
};
