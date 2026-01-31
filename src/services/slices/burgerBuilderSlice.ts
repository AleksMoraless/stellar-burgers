import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BURGER_BUILDER_SLICE_NAME, INGREDIENTS_SLICE_NAME } from "./sliceNames";
import { TConstructorIngredient, TIngredient, TOrder } from "@utils-types";
import { nanoid } from "@reduxjs/toolkit";

type TBurgerBuilderState = {
  data: {
    bun: null | TIngredient,
    ingredients: TConstructorIngredient[]
  }
}

const initialState: TBurgerBuilderState = {
  data: {
    bun: null,
    ingredients: []
  }
}

export const burgerBuilderSlice = createSlice({
  name: BURGER_BUILDER_SLICE_NAME,
  initialState,
  selectors: {
    getBurger: state => state.data,
  },
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.data.bun = action.payload;
        } else {
          state.data.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: {...ingredient, id } };
      }
    },
    deleteIngredient: (state, action: PayloadAction<number>) => {
      state.data.ingredients = state.data.ingredients.filter((_, index) => index != action.payload );
    },
    clearIngredients: (state) => {
      state.data.bun = null;
      state.data.ingredients.length = 0;
    },
    moveDownIngredient: (state, action: PayloadAction<number>) => {
      [state.data.ingredients[action.payload], state.data.ingredients[action.payload + 1]] = [state.data.ingredients[action.payload + 1], state.data.ingredients[action.payload]]
    },
    moveUpIngredient: (state, action: PayloadAction<number>) => {
      [state.data.ingredients[action.payload], state.data.ingredients[action.payload - 1]] = [state.data.ingredients[action.payload - 1], state.data.ingredients[action.payload]]
    },
  },
});

export const constructorActions = burgerBuilderSlice.actions;
export const burgerBuilderSelectors = burgerBuilderSlice.selectors;
