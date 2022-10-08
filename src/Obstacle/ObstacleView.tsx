import './ObstacleView.css';
import { Config } from '../Config';
import { ObstacleViewProps } from './ObstacleView.props';

export default function ObstacleView({obstacle}: ObstacleViewProps) {
  const sideLength = Config.boardSideLength / Config.boardSideSquaresAmount;

  const styles: any = {
    width: `${sideLength}px`,
    height: `${sideLength}px`,
    top:  (obstacle.y - 1) * sideLength + 'px',
    left: (obstacle.x - 1) * sideLength + 'px',
    background: `url('${process.env.PUBLIC_URL}/images/rock.png')`,
  };

  return (
    <div className='Obstacle' style={styles} />
  );
}