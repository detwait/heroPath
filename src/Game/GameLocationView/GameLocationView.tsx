import './GameLocationView.css';

import { Character, characterService, CharacterView } from '../../Character';
import { Config } from '../../Config';
import { ItemView } from '../../Item';
import { ObstacleView } from '../../Obstacle';
import { SquareView } from '../../Square';
import { gameService } from '../Game.service';
import { GameLocationViewProps } from './GameLocationView.props';

export function GameLocationView({ squares, obstacles, items, characters, startTravel }: GameLocationViewProps): JSX.Element {
  const styles: React.CSSProperties = {
    width: `${Config.boardSideLength}px`,
    height: `${Config.boardSideLength}px`,
  };

  return (
    <div className="Location" style={styles}>
      {squares.map((entity) => (
        <SquareView
          key={'square_' + entity.x + '_' + entity.y}
          entity={entity}
          isObstacle={gameService.isObstacle(entity, obstacles)}
          onClick={() => startTravel(entity)}
        />
      ))}
      {obstacles.map((entity) => (
        <ObstacleView key={entity.id} entity={entity} />
      ))}
      {items.map((entity) => (
        <ItemView key={entity.id} entity={entity} onClick={() => startTravel(entity)} />
      ))}
      {characters
        .filter((entity: Character) => !characterService.isDead(entity))
        .map((entity) => (
          <CharacterView key={entity.id} entity={entity} onClick={() => startTravel(entity)} />
        ))}
    </div>
  );
}
