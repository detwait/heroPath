import './PlayerInfoView.css';

import { CharacterAttributesView } from '../../Character/CharacterAttributesView/CharacterAttributesView';
import { CharacterInventarView } from '../../Character/CharacterInventarView/CharacterInventarView';
import { PlayerInfoViewProps } from './PlayerInfoView.props';

export function PlayerInfoView({ player }: PlayerInfoViewProps): JSX.Element {
  return (
    <div className="PlayerInfo">
      <CharacterAttributesView character={player}></CharacterAttributesView>
      <CharacterInventarView character={player}></CharacterInventarView>
    </div>
  );
}
