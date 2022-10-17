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
import { GameLocationView } from './GameLocation/GameLocationView';
import { Game } from './Game';
import { Obstacle } from '../Obstacle/Obstacle';

const gameService: GameService = new GameService();
const battleService: BattleService = new BattleService();
const game: Game = new Game({ ...Seed });

export function GameView() {
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

  function proccessBattle(battle: Battle): void {
    battle = battleService.proccess(battle);
    setBattle({ ...battle });
  }

  function closeBattle(): void {
    battleService.close(battle);
    setBattle({ ...battle });
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
        { battle.isActive 
          ? <BattleView 
              battle={battle}
              onAttack={() => proccessBattle(battle)} 
              onClose={closeBattle}>
            </BattleView>
          : <main>
              <PlayerInfoView
                player={player}>
              </PlayerInfoView>
              <GameLocationView
                characters={characters}
                items={items}
                obstacles={obstacles}
                squares={squares}
                startTravel={startTravel} >
              </GameLocationView>
            </main> 
        }
      <footer>
      </footer>
    </div>
  );
};
