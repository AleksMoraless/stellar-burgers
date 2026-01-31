import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { INGREDIENTS_SLICE_NAME } from '../../services/slices/sliceNames';
import { useParams } from 'react-router-dom';
import { ingredientsSelectors } from '../../services/slices/ingridientsSlice';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const {id} = useParams();
  const ingredientData = useSelector((store) => ingredientsSelectors.getIngredientByIdSelector(store, id));

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
