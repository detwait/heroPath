import './AppView.css';
import { GameView } from './Game/GameView/GameView';

export default function AppView() {
  return (
    <div className="App">
      <header className="App-header">
        <GameView />
      </header>
    </div>
  );
}
