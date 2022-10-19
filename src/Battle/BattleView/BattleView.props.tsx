import { Battle } from '../Battle';

export type BattleViewProps = {
  battle: Battle;
  proccessBattle: (args: unknown) => void;
  closeBattle: () => void;
  children?: React.ReactNode;
};
