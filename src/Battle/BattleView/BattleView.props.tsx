import { Battle } from "../Battle";

export type BattleViewProps = {
  battle: Battle;
  onAttack: (args: any) => void;
  onClose: () => void;
  children?: React.ReactNode;
}