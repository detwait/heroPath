import { useState, useEffect } from 'react';
import './GameView.css';
import { Config } from '../Config';
import { GameService } from './Game.service';
import { Point } from '../_Core/Point';
import { Seed } from '../Seed';
import { Character } from '../Character';
import { Item } from '../Item';
import { Battle, BattleService, BattleView } from '../Battle';
import { PlayerInfoView } from './PlayerInfoView/PlayerInfoView';
import { GameLocationView } from './GameLocationView/GameLocationView';
import { Game } from './Game';
import { Obstacle } from '../Obstacle/Obstacle';
import { GameStatus } from './GameStatus.enum';
import { GameMessageView } from './GameMessageView/GameMessageView';

const gameService: GameService = new GameService();
const battleService: BattleService = new BattleService();
const game: Game = new Game({ ...Seed });

export function GameView() {
  const [gameStatus, setGameStatus] = useState<GameStatus>(game.status);
  const [characters, setCharacters] = useState<Character[]>(game.characters);
  const [items, setItems] = useState<Item[]>(game.items);
  const [battle, setBattle] = useState<Battle>(game.battle);
  const [audio] = useState<HTMLAudioElement>(game.audio);
  const [squares] = useState<Point[]>(game.squares);
  const [obstacles] = useState<Obstacle[]>(game.obstacles);
  const player: Character = gameService.getPlayer(characters);

  useEffect(() => {
    const timer = setInterval(() => { travel(); }, Config.appIntervalFrequencyMiliseconds);
    return () => { timer && clearInterval(timer); };
  });

  function startGame(): void {
    setGameStatus(GameStatus.running)
  }

  function proccessBattle(battle: Battle): void {
    battle = battleService.proccess(battle);
    setBattle({ ...battle });
  }

  function closeBattle(): void {
    battleService.close(battle);
    setBattle({ ...battle });

    if (gameService.isGameWon(characters)) {
      setGameStatus(GameStatus.won)
    } else if (gameService.isGamLost(characters)) {
      setGameStatus(GameStatus.lost)
    }
  }

  function startTravel(destination: Point): void {
    gameService.startTravel(player, destination, squares, obstacles);
    setCharacters([...characters]);
  }

  function travel() {
    const isUpdated: boolean = gameService.travel(player, characters, items, battle);

    if (isUpdated) {
      setItems([ ...items ]);
      setCharacters([ ...characters ]);
      setBattle({ ...battle });
    }
  }

  return (
    <div className='Game' onClick={ () => audio.play() }>
      <header>
        <h1>Hero Path</h1>
      </header>
      {(() => {
          if (gameStatus !== GameStatus.running) {
            return (
              <GameMessageView
                gameStatus={gameStatus}
                startGame={startGame}
              ></GameMessageView>
            )
          } else {
            return ( battle.isActive 
              ? <BattleView 
                  battle={battle}
                  proccessBattle={() => proccessBattle(battle)} 
                  closeBattle={closeBattle}
                ></BattleView>
              : <main>
                  <PlayerInfoView
                    player={player}
                  ></PlayerInfoView>
                  <GameLocationView
                    characters={characters}
                    items={items}
                    obstacles={obstacles}
                    squares={squares}
                    startTravel={startTravel}
                  ></GameLocationView>
                </main> )
          }
        })()}
  
      <footer>
      </footer>
    </div>
  );
};
