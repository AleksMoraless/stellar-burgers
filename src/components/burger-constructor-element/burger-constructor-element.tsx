import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useSelector, useDispatch } from '../../services/store';
import { BURGER_BUILDER_SLICE_NAME } from '../../services/slices/sliceNames';
import { constructorActions } from '../../services/slices/burgerBuilderSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(constructorActions.moveDownIngredient(index))
    };

    const handleMoveUp = () => {
      dispatch(constructorActions.moveUpIngredient(index))
    };

    const handleClose = () => {
      dispatch(constructorActions.deleteIngredient(index));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
