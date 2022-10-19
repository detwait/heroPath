import './CharacterAttributesView.css';
import 'react-tippy/dist/tippy.css'
import { imageService, ImageType } from '../../_Shared/image';
import { characterService } from '../Character.service';
import { CharacterAttributesViewProps } from './CharacterAttributesView.props';

export function CharacterAttributesView({ character }: CharacterAttributesViewProps) {
  return (
    <div className="CharacterAttributesInfo">
      <p>
        <img src={`${imageService.getPath(ImageType.avatar, character.avatar)}`} alt="avatar" />
      </p>
      <p>Name: {character.name}</p>
      <p>Level: {character.level}</p>
      <p>Strength: {characterService.getStrength(character)}</p>
      <p>Agility: {characterService.getAgility(character)}</p>
      <p>Health: {character.hp} / {character.maxHp}</p>
    </div>
  );
};
