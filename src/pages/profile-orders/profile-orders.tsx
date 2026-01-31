import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { userSelectors } from '../../services/slices/userSlice';
import { feedSelectors } from '../../services/slices/feedSlice';
import { Preloader } from '@ui';
import { RequestStatus } from '@utils-types';
import { userOrdersThunk } from '../../services/thunks/feedUserOrdersThunk';
import { useLocation } from 'react-router-dom';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const location = useLocation();
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(feedSelectors.getUserOrdersSelect);
  const isLoadingUserOrders = useSelector(feedSelectors.isLoadingUserOrdersSelector);
  const isLoadingUser = useSelector(userSelectors.userIsLoadingSelect);

  useEffect(() => {
    dispatch(userOrdersThunk());
  }, [])

  if (isLoadingUser === RequestStatus.Loading) {
      return <Preloader/>;
    }

  return <ProfileOrdersUI orders={orders} isLoadingUserOrders={isLoadingUserOrders}/>;
};
