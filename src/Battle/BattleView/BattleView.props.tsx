import { Battle } from "../Battle";

export type BattleViewProps = {
  battle: Battle;
  proccessBattle: (args: any) => void;
  closeBattle: () => void;
  children?: React.ReactNode;
}