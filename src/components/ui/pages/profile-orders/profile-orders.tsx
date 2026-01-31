import { FC } from 'react';

import styles from './profile-orders.module.css';

import { ProfileOrdersUIProps } from './type';
import { ProfileMenu, OrdersList } from '@components';
import { Preloader } from '../../preloader';
import { RequestStatus } from '@utils-types';

export const ProfileOrdersUI: FC<ProfileOrdersUIProps> = ({ orders, isLoadingUserOrders }) => (
  <main className={`${styles.main}`}>
    <div className={`mt-30 mr-15 ${styles.menu}`}>
      <ProfileMenu />
    </div>
    {isLoadingUserOrders === RequestStatus.Loading ? 
    <Preloader /> : 
    (<div className={`mt-10 ${styles.orders}`}>
      <OrdersList orders={orders} />
    </div>)}
    
  </main>
);
