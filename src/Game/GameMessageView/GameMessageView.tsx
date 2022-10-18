import './GameMessageView.css';
import { GameMessageViewProps } from './GameMessageView.props';
import { Config } from '../../Config';
import { ImageService, ImageType } from '../../_Shared/image';

const imageService: ImageService = new ImageService();

export function GameMessageView({ gameStatus, startGame }: GameMessageViewProps) {
  return (
    <div className='Message'>
      <h2>
        { Config.gameMessage[gameStatus] }
      </h2>
      <p>
        <img 
          className='StartGame'
          src={`${imageService.getPath(ImageType.action, 'start.png')}`} 
          alt="start" 
          onClick={() => startGame()}
        />
      </p>
    </div>
  );
};
