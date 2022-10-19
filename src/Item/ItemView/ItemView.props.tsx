import { Item } from "../Item";

export type ItemViewProps = {
  entity: Item;
  onClick: (args: any) => void;
  children?: React.ReactNode;
}