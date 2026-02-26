import { expect, test } from '@jest/globals';
import orderSliceReducer from '../src/services/slices/orderSlice';
import { configureStore } from '@reduxjs/toolkit';
import { createOrderThunk } from '../src/services/thunks/createOrderThunk';
import { fetchOrderByNumberThunk } from '../src/services/thunks/fetchOrderByNumber';
import { TNewOrderResponse, TOrderResponse } from '../src/utils/burger-api';
import { mockIngredients, mockCreateOrderData, mockOrderByNumberData } from './mocks';

jest.mock('../src/utils/cookie', () => ({
  getCookie: jest.fn()
}));
import { getCookie } from '../src/utils/cookie';

describe('Тесты асинхронного экшена создания заказа', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    (getCookie as jest.Mock).mockReturnValue('test-token');

    global.fetch = jest.fn();
  });
  afterAll(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  })

  test('Создание заказа - успешно', async () => {

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCreateOrderData),
      })
    ) as jest.Mock

    const store = configureStore({
      reducer: { order: orderSliceReducer }
    });

    await store.dispatch(createOrderThunk(mockIngredients));

    const state = store.getState();

    expect(state.order.newOrder).toEqual(mockCreateOrderData.order);
    expect(state.order.newOrderRequest).toEqual(false);
    expect(state.order.requestStatus).toBe("Success");
  })

  test('Создание заказа - ошибка', async () => {

    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Network error'))
    ) as jest.Mock

    const store = configureStore({
      reducer: { order: orderSliceReducer }
    });

    await store.dispatch(createOrderThunk(mockIngredients));

    const state = store.getState();

    expect(state.order.newOrder).toEqual(null);
    expect(state.order.newOrderRequest).toEqual(false);
    expect(state.order.requestStatus).toBe("Failed");
  })

  test('Загрузка всех заказов - проверка pending', async () => {
    let resolvePromise: (value: TNewOrderResponse) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    global.fetch = jest.fn(() =>
      promise.then(() => ({
        ok: true,
        json: () => Promise.resolve(mockCreateOrderData)
      }))
    ) as jest.Mock;

    const store = configureStore({
      reducer: {
        order: orderSliceReducer
      }
    });
    const dispatchPromise = store.dispatch(createOrderThunk(mockIngredients));

    let state = store.getState();
    expect(state.order.newOrderRequest).toBe(true);
    expect(state.order.requestStatus).toBe("Loading");

    resolvePromise!(mockCreateOrderData);
    await dispatchPromise;

    state = store.getState();
    expect(state.order.newOrderRequest).toBe(false);
    expect(state.order.requestStatus).toBe("Success");
    expect(state.order.newOrder).toEqual(mockCreateOrderData.order);
  });
})

describe('Тесты асинхронного экшена загрузки заказа по номеру', () => {
  test('Загрузка заказа - успешно', async () => {

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockOrderByNumberData),
      })
    ) as jest.Mock

    const store = configureStore({
      reducer: { order: orderSliceReducer }
    });

    await store.dispatch(fetchOrderByNumberThunk(101718));

    const state = store.getState();

    expect(state.order.currentOrder).toEqual(mockOrderByNumberData.orders[0]);
    expect(state.order.currentOrderLoading).toEqual(false);
    expect(state.order.requestStatus).toBe("Success");
  })

  test('Создание заказа - ошибка', async () => {

    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Network error'))
    ) as jest.Mock

    const store = configureStore({
      reducer: { order: orderSliceReducer }
    });

    await store.dispatch(fetchOrderByNumberThunk(101718));

    const state = store.getState();

    expect(state.order.currentOrder).toEqual(null);
    expect(state.order.currentOrderLoading).toEqual(false);
    expect(state.order.requestStatus).toBe("Failed");
  })

  test('Загрузка всех заказов - проверка pending', async () => {
    let resolvePromise: (value: TOrderResponse) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    global.fetch = jest.fn(() =>
      promise.then(() => ({
        ok: true,
        json: () => Promise.resolve(mockOrderByNumberData)
      }))
    ) as jest.Mock;

    const store = configureStore({
      reducer: {
        order: orderSliceReducer
      }
    });
    const dispatchPromise = store.dispatch(fetchOrderByNumberThunk(101718));

    let state = store.getState();
    expect(state.order.currentOrderLoading).toBe(true);
    expect(state.order.requestStatus).toBe("Loading");

    resolvePromise!(mockOrderByNumberData);
    await dispatchPromise;

    state = store.getState();
    expect(state.order.currentOrderLoading).toBe(false);
    expect(state.order.requestStatus).toBe("Success");
    expect(state.order.currentOrder).toEqual(mockOrderByNumberData.orders[0]);
  });
})

