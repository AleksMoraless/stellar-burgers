import { expect, test } from '@jest/globals';
import orderSliceReducer from '../src/services/slices/orderSlice';
import { configureStore } from '@reduxjs/toolkit';
import { createOrderThunk } from '../src/services/thunks/createOrderThunk';
import { fetchOrderByNumberThunk } from '../src/services/thunks/fetchOrderByNumber';
jest.mock('../src/utils/cookie', () => ({
  getCookie: jest.fn()
}));
import { getCookie } from '../src/utils/cookie';

const mockIngredients = ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa093d'];
const mockCreateOrderData = {
    "success": true,
    "name": "Флюоресцентный люминесцентный бургер",

    "order": {
        "ingredients": [
            {
                "_id": "643d69a5c3f7b9001cfa093d",
                "name": "Флюоресцентная булка R2-D3",
                "type": "bun",
                "proteins": 44,
                "fat": 26,
                "carbohydrates": 85,
                "calories": 643,
                "price": 988,
                "image": "https://code.s3.yandex.net/react/code/bun-01.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
                "__v": 0
            },
            {
                "_id": "643d69a5c3f7b9001cfa093e",
                "name": "Филе Люминесцентного тетраодонтимформа",
                "type": "main",
                "proteins": 44,
                "fat": 26,
                "carbohydrates": 85,
                "calories": 643,
                "price": 988,
                "image": "https://code.s3.yandex.net/react/code/meat-03.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
                "__v": 0
            },
            {
                "_id": "643d69a5c3f7b9001cfa093d",
                "name": "Флюоресцентная булка R2-D3",
                "type": "bun",
                "proteins": 44,
                "fat": 26,
                "carbohydrates": 85,
                "calories": 643,
                "price": 988,
                "image": "https://code.s3.yandex.net/react/code/bun-01.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
                "__v": 0
            }
        ],
        "_id": "699dfc8da64177001b32d586",
        "owner": {
            "name": "AlexMoraless",
            "email": "sanekm1901@mail.ru",
            "createdAt": "2025-11-22T13:52:48.376Z",
            "updatedAt": "2025-11-23T23:04:59.219Z"
        },
        "status": "done",
        "name": "Флюоресцентный люминесцентный бургер",
        "createdAt": "2026-02-24T19:31:25.136Z",
        "updatedAt": "2026-02-24T19:31:25.358Z",
        "number": 101709,
        "price": 2964
    }
};
const mockOrderByNumberData = {
    "success": true,
    "orders": [
        {
            "_id": "699e04e7a64177001b32d59f",
            "ingredients": [
                "643d69a5c3f7b9001cfa093c",
                "643d69a5c3f7b9001cfa0942",
                "643d69a5c3f7b9001cfa0943",
                "643d69a5c3f7b9001cfa093c"
            ],
            "owner": "6942eef4a64177001b323e69",
            "status": "done",
            "name": "Space spicy краторный бургер",
            "createdAt": "2026-02-24T20:07:03.878Z",
            "updatedAt": "2026-02-24T20:07:04.095Z",
            "number": 101718,
            "__v": 0
        }
    ]
};


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
        reducer: {order: orderSliceReducer}
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
        reducer: {order: orderSliceReducer}
      });

      await store.dispatch(createOrderThunk(mockIngredients));

      const state = store.getState();

      expect(state.order.newOrder).toEqual(null);
      expect(state.order.newOrderRequest).toEqual(false);
      expect(state.order.requestStatus).toBe("Failed");
    })

    test('Загрузка всех заказов - проверка pending', async () => {
    let resolvePromise: (value: any) => void;
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

    resolvePromise!({});
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
        reducer: {order: orderSliceReducer}
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
        reducer: {order: orderSliceReducer}
      });

      await store.dispatch(fetchOrderByNumberThunk(101718));

      const state = store.getState();

      expect(state.order.currentOrder).toEqual(null);
      expect(state.order.currentOrderLoading).toEqual(false);
      expect(state.order.requestStatus).toBe("Failed");
    })

    test('Загрузка всех заказов - проверка pending', async () => {
    let resolvePromise: (value: any) => void;
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

    resolvePromise!({});
    await dispatchPromise;

    state = store.getState();
    expect(state.order.currentOrderLoading).toBe(false);
    expect(state.order.requestStatus).toBe("Success");
    expect(state.order.currentOrder).toEqual(mockOrderByNumberData.orders[0]);
  });
})

