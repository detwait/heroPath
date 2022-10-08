import './CharacterView.css';
import { Config } from '../Config';

export default function CharacterView({params}: any): JSX.Element {
  const sideLength = Config.boardSideLength / Config.boardSideSquaresAmount;

  const styles = {
    width: `${sideLength}px`,
    height: `${sideLength}px`,
    top:  (params.y - 1) * sideLength + 'px',
    left: (params.x - 1) * sideLength + 'px',
    background: `url('${process.env.PUBLIC_URL}/images/${params.skin}')`,
  };

  console.log(styles);

  return (
    <div className="Character" style={styles}></div>
  );
}