import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import store, { useDispatch, useSelector } from '../../services/store';
import { userLoginThunk } from '../../services/thunks/userLoginThunk';
import { userSelectors } from '../../services/slices/userSlice';
import { RequestStatus } from '@utils-types';
import { Preloader } from '@ui';
import { useLocation } from 'react-router-dom';
import { userOrdersThunk } from '../../services/thunks/feedUserOrdersThunk';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoading = useSelector(userSelectors.userIsLoadingSelect)

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(userLoginThunk({email, password}));
  };

  if (isLoading === RequestStatus.Loading) {
    return <Preloader/>;
  }

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
