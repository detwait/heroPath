import { Item } from '../Item';

export type ItemViewProps = {
  entity: Item;
  onClick: (args: unknown) => void;
  children?: React.ReactNode;
};
