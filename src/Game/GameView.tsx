import { useState, useEffect } from 'react';
import './GameView.css';
import { Config } from '../Config';
import { TravelState } from './TravelState.enum';
import { GameService } from './Game.service';
import { Point } from '../_Core/Point';
import { isPointSame } from '../_Core/Geometry.utils';
import { Seed } from '../Seed';
import { SquareView } from '../Square';
import { ObstacleView } from '../Obstacle';
import { Character, CharacterService, CharacterView } from '../Character';
import { Item, ItemView } from '../Item';
import { Battle, BattleService, BattleView } from '../Battle';
import { PlayerInfoView } from './PlayerInfoView/PlayerInfoView';

const gameService: GameService = new GameService({ ...Seed });
const battleService: BattleService = new BattleService();
const characterService: CharacterService = new CharacterService();
let gameBattle: Battle;

export function GameView() {
  const styles: React.CSSProperties = {
    width: `${Config.boardSideLength}px`,
    height: `${Config.boardSideLength}px`,
  };

  const [characters, setCharacters] = useState<Character[]>(gameService.characters);
  const [items, setItems] = useState<Item[]>(gameService.items);
  const [battle, setBattle] = useState<Battle>(gameBattle);
  const [audio] = useState<HTMLAudioElement>(gameService.audio);
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
    Object.assign(player, gameService.startTravel(player, destination));
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
    
    const itemFound: Item | undefined = gameService.isPlayerOnItem({x, y});
    const enemyFound: Character | undefined = gameService.isPlayerOnEnemy(player);

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
            <PlayerInfoView
            player={player}
          ></PlayerInfoView>
            <div className="Board" style={styles}>
              { gameService.squares.map(entity => <SquareView 
                key={'square_' + entity.x + '_' + entity.y}
                entity={entity}
                isObstacle={gameService.isObstacle(entity)}
                onClick={ () => startTravel(entity)} 
              />) }
              { gameService.obstacles.map(entity => <ObstacleView 
                key={entity.id}
                entity={entity}
              />) }
              { items.map(entity => <ItemView 
                key={entity.id}
                entity={entity}
                onClick={ () => startTravel(entity)} 
              />) }
              { characters.filter((entity: Character) => !characterService.isDead(entity)).map(entity => <CharacterView 
                key={entity.id}
                entity={entity}
                onClick={ () => startTravel(entity)} 
              />) }
            </div>
          </main> 
        }
      <footer>
      </footer>
    </div>
  );
};
