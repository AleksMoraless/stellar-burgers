import React, { FC, useState } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, NavLink, useLocation } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation();
  const comparator = location.pathname;

  return (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <>
          <NavLink to={'/'} className={comparator === '/' ? `${styles.link_active} ${styles.link }`: styles.link}>
            <BurgerIcon type={comparator === '/' ? 'primary' : 'secondary'} />
            <p className='text text_type_main-default ml-2 mr-10'>Конструктор</p>
          </NavLink>
        </>
        <>
          <NavLink to={'/feed'} className={comparator === '/feed' ? `${styles.link_active} ${styles.link }`: styles.link}>
            <ListIcon type={comparator === '/feed' ? 'primary' : 'secondary'} />
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </NavLink>
        </>
      </div>
      <div className={styles.logo}>
        <Logo className='' />
      </div>
      <div className={styles.link_position_last}>
        <NavLink to={'/profile'} className={comparator?.startsWith('/profile') ? `${styles.link_active} ${styles.link }`: styles.link}>
          <ProfileIcon type={comparator?.startsWith('/profile') ? 'primary' : 'secondary'} />
          <p className='text text_type_main-default ml-2'>
            {userName || 'Личный кабинет'}
          </p>
        </NavLink>
      </div>
    </nav>
  </header>
);
}
