import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { RequestStatus, TOrder, TOrdersData } from '@utils-types';
import { FC, useEffect } from 'react';
import store, { useDispatch, useSelector } from '../../services/store';
import { getPublicOrdersThunk } from '../../services/thunks/feedPublicOrdersThunk';
import { feedSelectors } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const isLoading = useSelector(feedSelectors.isLoadingFeedSelector);
  const orders: TOrder[] = useSelector(feedSelectors.getOrdersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getPublicOrdersThunk());
    }, [])

  if (!orders.length) {
    return <Preloader />;
  }

  if (isLoading === RequestStatus.Loading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => {dispatch(getPublicOrdersThunk());}} />;
};
