import './GameMessageView.css';

import { imageService, ImageType } from '../../_Shared/image';
import { Config } from '../../Config';
import { GameStatus } from '../GameStatus.enum';
import { GameMessageViewProps } from './GameMessageView.props';

export function GameMessageView({ gameStatus, startGame }: GameMessageViewProps): JSX.Element {
  return (
    <div className="Message">
      <h3 dangerouslySetInnerHTML={{ __html: Config.gameMessage[gameStatus] }}></h3>
      {(() => {
        if (gameStatus === GameStatus.preview) {
          return (
            <p>
              <img
                className="StartGame"
                src={`${imageService.getPath(ImageType.action, 'start.png')}`}
                alt="start"
                onClick={() => startGame()}
              />
            </p>
          );
        }
      })()}
    </div>
  );
}
