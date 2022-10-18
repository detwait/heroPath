import { GameStatus } from "../GameStatus.enum";

export type GameMessageViewProps = {
  gameStatus: GameStatus;
  startGame: () => void;
  children?: React.ReactNode;
}