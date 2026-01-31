import { RequestStatus, TOrder } from '@utils-types';

export type ProfileOrdersUIProps = {
  orders: TOrder[];
  isLoadingUserOrders: RequestStatus
};
