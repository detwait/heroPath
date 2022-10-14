import './PlayerInfoView.css';
import {  PlayerInfoViewProps } from './PlayerInfoView.props';
import { CharacterAttributesView } from '../../Character/CharacterAttributesView/CharacterAttributesView';
import { CharacterInventarView } from '../../Character/CharacterInventarView/CharacterInventarView';

export function PlayerInfoView({ player }: PlayerInfoViewProps) {
  return (
    <div className="PlayerInfo">
      <CharacterAttributesView character={player}></CharacterAttributesView>
      <CharacterInventarView character={player}></CharacterInventarView>
    </div>
  );
};
