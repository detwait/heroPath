import { Battle } from "../Battle";

export type BattleViewProps = {
  battle: Battle;
  onAttack: (args: any) => void;
  onClose: (args: any) => void;
  children?: React.ReactNode;
}