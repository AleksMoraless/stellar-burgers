import { expect, test } from '@jest/globals';
import ingridientsSliceReducer from '../src/services/slices/ingridientsSlice';
import { configureStore } from '@reduxjs/toolkit';
import { getIngredientsThunk } from '../src/services/thunks/getIngredientsThunk';
import { TIngredientsResponse } from '../src/utils/burger-api';
import {  mockIngredientsData } from './mocks';

describe('Тесты асинхронных экшенов ингридиентов', () => {
    test('Загрузка ингредиентов - успешно', async () => {

      global.fetch = jest.fn(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            success: true,
            data: mockIngredientsData
          }),
        })
      ) as jest.Mock

      const store = configureStore({
        reducer: {ingridients: ingridientsSliceReducer}
      });

      await store.dispatch(getIngredientsThunk());

      const state = store.getState();

      expect(state.ingridients.data).toEqual(mockIngredientsData);
      expect(state.ingridients.requestStatus).toEqual("Success");
      expect(state.ingridients.error).toBeNull;
    })

    test('Загрузка ингредиентов - ошибка', async () => {

      global.fetch = jest.fn(() => 
        Promise.reject(new Error('Network error'))
      ) as jest.Mock

      const store = configureStore({
        reducer: {ingridients: ingridientsSliceReducer}
      });

      await store.dispatch(getIngredientsThunk());

      const state = store.getState();

      expect(state.ingridients.data).toEqual([]);
      expect(state.ingridients.requestStatus).toEqual("Failed");
      expect(state.ingridients.error).toBeDefined;
    })

    test('Загрузка ингредиентов - проверка pending', async () => {
    let resolvePromise: (value: TIngredientsResponse) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    global.fetch = jest.fn(() => 
      promise.then(() => ({
        ok: true,
        json: () => Promise.resolve({ 
          success: true,
          data: mockIngredientsData 
        })
      }))
    ) as jest.Mock;

    const store = configureStore({
      reducer: {
        ingredients: ingridientsSliceReducer
      }
    });
    const dispatchPromise = store.dispatch(getIngredientsThunk());

    let state = store.getState();
    expect(state.ingredients.requestStatus).toBe('Loading');
    expect(state.ingredients.error).toBeNull();

    resolvePromise!({ 
          success: true,
          data: mockIngredientsData 
        });
    await dispatchPromise;

    state = store.getState();
    expect(state.ingredients.requestStatus).toBe('Success');
    expect(state.ingredients.data).toEqual(mockIngredientsData);
  });
})
