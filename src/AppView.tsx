import './AppView.css';

import { GameView } from './Game/GameView/GameView';

export default function AppView(): JSX.Element {
  return (
    <div className="App">
      <header className="App-header">
        <GameView />
      </header>
    </div>
  );
}
