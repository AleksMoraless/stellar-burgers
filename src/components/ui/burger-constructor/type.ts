import { TBurgerBuilder, TOrder } from '@utils-types';

export type BurgerConstructorUIProps = {
  constructorItems: TBurgerBuilder;
  orderRequest: boolean;
  price: number;
  orderModalData: TOrder | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
