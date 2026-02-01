import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useParams, useLocation, useNavigate } from 'react-router-dom';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoute } from '../protected-route/protected-route';
import { getIngredientsApi } from '@api';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { getIngredientsThunk } from '../../services/thunks/getIngredientsThunk';
import { getPublicOrdersThunk } from '../../services/thunks/feedPublicOrdersThunk';
import { getUserThunk } from '../../services/thunks/getUserThunk';
import { userOrdersThunk } from '../../services/thunks/feedUserOrdersThunk';

const App = () => {
  const location = useLocation();
  const background = location?.state?.background;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getIngredientsThunk());
      dispatch(getPublicOrdersThunk());
      dispatch(getUserThunk());
      dispatch(userOrdersThunk());
    }, []);

  return (
  <div className={styles.app}>
    <AppHeader />
    <Routes location={ background || location }>

      <Route path='/' element={<ConstructorPage />} />
      <Route path="/ingredients/:id" element={<IngredientDetails />} />
      
      <Route path='/feed' element={<Feed />} /> 
      <Route path='/feed/:number' element={<OrderInfo />} /> 

      <Route path='/login' element={<ProtectedRoute onlyUnAuth><Login /></ProtectedRoute>} />
      <Route path='/register' element={<ProtectedRoute onlyUnAuth><Register /></ProtectedRoute>} />
      <Route path='/forgot-password' element={<ProtectedRoute onlyUnAuth><ForgotPassword /></ProtectedRoute>} />
      <Route path='/reset-password' element={<ProtectedRoute onlyUnAuth><ResetPassword /></ProtectedRoute>} />
      <Route path='/profile'>
        <Route index element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path='orders' element={<ProtectedRoute><ProfileOrders /></ProtectedRoute>} />
        <Route path='orders/:number' element={<ProtectedRoute><OrderInfo /></ProtectedRoute>} />
      </Route>
      <Route path='*' element={<NotFound404 />} />
    </Routes>

    {background && 
      <Routes>
        <Route path='/ingredients/:id' element={
          <Modal title='Детали ингредиента' onClose={() => {navigate(-1)}}>
            <IngredientDetails />
          </Modal>
        } />
        <Route path='/feed/:number' element={
            <Modal title='' onClose={() => {navigate(-1)}}>
              <OrderInfo />
            </Modal>
          } />
        <Route path='profile/orders/:number' element={
          <Modal title='' onClose={() => {navigate(-1)}}>
            <OrderInfo />
          </Modal>
        } />
    </Routes>
    }
  </div>
);
}

export default App;
