
import { CharacterAttributesView } from '../../Character/CharacterAttributesView/CharacterAttributesView';
import { ImageService, ImageType } from '../../_Shared/image';
import { BattleService } from '../Battle.service';
import './BattleView.css';
import { BattleViewProps } from './BattleView.props';

const imageService: ImageService = new ImageService();
const battleService: BattleService = new BattleService();

export function BattleView({ battle, proccessBattle, closeBattle }: BattleViewProps) {
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
              <p className='ProceedRound' onClick={() => proccessBattle(battle)}>
                <img src={`${imageService.getPath(ImageType.action, 'attack.png')}`} alt="avatar" />
              </p>
            )
          } else {
            return (
              <p className='GoToMap' onClick={() => closeBattle()}>
                <img src={`${imageService.getPath(ImageType.action, 'map.png')}`} alt="avatar" />
              </p>
            )
          } 
        })()}
      </div>
    </div>
  );
};
