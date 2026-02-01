import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { BURGER_BUILDER_SLICE_NAME, ORDER_SLICE_NAME } from '../../services/slices/sliceNames';
import { createOrderThunk } from '../../services/thunks/createOrderThunk';
import { useLocation, useNavigate } from 'react-router-dom';
import { burgerBuilderSelectors, constructorActions } from '../../services/slices/burgerBuilderSlice';
import { orderActions, orderSelectors } from '../../services/slices/orderSlice';
import { userSelectors } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const burger = useSelector(burgerBuilderSelectors.getBurger);
  const orderNewBurger = useSelector(orderSelectors.newOrderSelect);
  const orderNewRequest = useSelector(orderSelectors.newOrderRequestSelect);
  const user = useSelector(userSelectors.userSelect)
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = {
    bun: burger.bun,
    ingredients: burger.ingredients
  };
  const orderRequest = orderNewRequest;
  const orderModalData = orderNewBurger;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    
    if (!user) {
      navigate('/login', {
        state: {
          from: location.pathname,
        }
      });
      return;
    }
    dispatch(createOrderThunk([
      constructorItems.bun._id, 
      ...constructorItems.ingredients.map(item => item._id),
      constructorItems.bun._id
    ]))
  };
  const closeOrderModal = () => {
    dispatch(orderActions.clearNewOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
