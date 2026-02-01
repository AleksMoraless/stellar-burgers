import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';

import { RequestStatus, TTabMode } from '@utils-types';
import { Preloader } from '@ui';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';
import { useSelector, useDispatch } from '../../services/store';
import { INGREDIENTS_SLICE_NAME } from '../../services/slices/sliceNames';
import { Failure } from '../ui/failure-request';
import { ingredientsSelectors } from '../../services/slices/ingridientsSlice';

export const BurgerIngredients: FC = () => {
  const isLoading = useSelector(ingredientsSelectors.isLoadingSelector);
  const ingredients = useSelector(ingredientsSelectors.getIngredientsSelector);
  const error = useSelector(ingredientsSelectors.getError);
  const dispatch = useDispatch();

  /** TODO: взять переменные из стора */
  const buns = ingredients.filter(item => item.type === 'bun');
  const mains = ingredients.filter(item => item.type === 'main');
  const sauces = ingredients.filter(item => item.type === 'sauce');

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading === RequestStatus.Loading) {
    return <Preloader />;
  }

  if (isLoading === RequestStatus.Failed && error) {
    return <Failure message = {`Запрос завершился с ошибкой: ${error}`}/>
  }

  if (isLoading === RequestStatus.Success && ingredients.length === 0) {
    return <Failure message = 'No ingredients'/>
  }

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
