import { useState, useEffect } from 'react';
import './GameView.css';
import { Config } from '../Config';
import { TravelState } from './TravelState.enum';
import { GameService } from './Game.service';
import { Point } from '../_Core/Point';
import { isPointSame } from '../_Core/Geometry.utils';
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
let gameBattle: Battle;

export function GameView() {
  const [characters, setCharacters] = useState<Character[]>(game.characters);
  const [items, setItems] = useState<Item[]>(game.items);
  const [battle, setBattle] = useState<Battle>(gameBattle);
  const [audio] = useState<HTMLAudioElement>(game.audio);
  const [squares] = useState<Point[]>(game.squares);
  const [obstacles] = useState<Obstacle[]>(game.obstacles);
  const player: Character = gameService.getPlayer(characters);

  useEffect(() => {
    const timer = setInterval(() => { travel(); }, Config.appIntervalFrequencyMiliseconds);
    return () => { timer && clearInterval(timer); };
  });

  function startBattle(opponent: Character): void {
    if (!gameBattle?.player) {
      gameBattle = new Battle(player, opponent);  
      setBattle(gameBattle);
    }
  }

  function proccessBattle(battle: Battle): void {
    battle = battleService.proccess(battle);
    setBattle({ ...battle });
  }

  function closeBattle(): void {
    gameBattle = {} as Battle;
    setBattle(gameBattle);
  }

  function startTravel(destination: Point): void {
    Object.assign(player, gameService.startTravel(player, destination, squares, obstacles));
    setCharacters([...characters]);
  }

  function finishTravel(): void {
    Object.assign(player, gameService.finishTravel(player));
    setCharacters([...characters]);
  }

  function travel() {
    const {x, y}: Partial<Character> = gameService.travel(player);

    if (!x || !y) {
      return;
    }
    
    const itemFound: Item | undefined = gameService.isPlayerOnItem({x, y}, items);
    const enemyFound: Character | undefined = gameService.isPlayerOnEnemy(player, characters);

    if (itemFound) {
      Object.assign(itemFound, {
        ...(gameService.characterClaimItem(player, itemFound, items))
      });

      setItems([ ...items ]);
      setCharacters([ ...characters ]);
    }

    if (enemyFound) {
      startBattle(enemyFound);
    }

    if(isPointSame(player.destination, {x, y})) {
      if (player.state === TravelState.travel) {
        finishTravel();
      }
    } else {
      Object.assign(player, { x, y});
      setCharacters([...characters]);
    }
  }

  return (
    <div className='Game' onClick={ () => audio.play() }>
      <header>
        <h1>Hero Path</h1>
      </header>
        { battle?.player 
          ? <BattleView battle={battle} onAttack={() => proccessBattle(battle)} onClose={() => closeBattle()} ></BattleView>
          : <main>
            <PlayerInfoView player={player}></PlayerInfoView>
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
