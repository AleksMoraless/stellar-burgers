import { expect, test } from '@jest/globals';
import feedSliceReducer from '../src/services/slices/feedSlice';
import { configureStore } from '@reduxjs/toolkit';
import { getPublicOrdersThunk } from '../src/services/thunks/feedPublicOrdersThunk';
import { userOrdersThunk } from '../src/services/thunks/feedUserOrdersThunk';
import { TFeedsResponse } from '../src/utils/burger-api';
import { mockFeedData, mockUserFeedData } from './mocks';

jest.mock('../src/utils/cookie', () => ({
  getCookie: jest.fn()
}));
import { getCookie } from '../src/utils/cookie';

describe('Тесты асинхронного экшена getPublicOrdersThunk', () => {
    test('Загрузка всех заказов - успешно', async () => {

      global.fetch = jest.fn(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockFeedData),
        })
      ) as jest.Mock

      const store = configureStore({
        reducer: {feed: feedSliceReducer}
      });

      await store.dispatch(getPublicOrdersThunk());

      const state = store.getState();

      expect(state.feed.feed).toEqual(mockFeedData);
      expect(state.feed.requestStatus).toEqual("Success");
    })

    test('Загрузка всех заказов - ошибка', async () => {

      global.fetch = jest.fn(() => 
        Promise.reject(new Error('Network error'))
      ) as jest.Mock

      const store = configureStore({
        reducer: {feed: feedSliceReducer}
      });

      await store.dispatch(getPublicOrdersThunk());

      const state = store.getState();

      expect(state.feed.feed.orders).toEqual([]);
      expect(state.feed.requestStatus).toEqual("Failed");
    })

    test('Загрузка всех заказов - проверка pending', async () => {
    let resolvePromise: (value: TFeedsResponse) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    global.fetch = jest.fn(() => 
      promise.then(() => ({
        ok: true,
        json: () => Promise.resolve(mockFeedData)
      }))
    ) as jest.Mock;

    const store = configureStore({
      reducer: {
        feed: feedSliceReducer
      }
    });
    const dispatchPromise = store.dispatch(getPublicOrdersThunk());

    let state = store.getState();
    expect(state.feed.requestStatus).toBe('Loading');

    resolvePromise!(mockFeedData);
    await dispatchPromise;

    state = store.getState();
    expect(state.feed.requestStatus).toBe('Success');
    expect(state.feed.feed).toEqual(mockFeedData);
  });
})


describe('Тесты асинхронного экшена userOrdersThunk', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (getCookie as jest.Mock).mockReturnValue('test-token');
    global.fetch = jest.fn();
  });

  test('Загрузка пользовательских заказов - успешно', async () => {
    (global.fetch as jest.Mock).mockImplementation(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          success: true,
          orders: mockUserFeedData
        })
      })
    );

    const store = configureStore({
      reducer: { feed: feedSliceReducer }
    });

    await store.dispatch(userOrdersThunk());

    const state = store.getState();
    
    expect(state.feed.ordersAuth).toEqual(mockUserFeedData);
    expect(state.feed.requestUserOrdersStatus).toEqual("Success");
    expect(getCookie).toHaveBeenCalledWith('accessToken');
  });
  test('Загрузка пользовательских заказов - ошибка', async () => {
    (global.fetch as jest.Mock).mockImplementation(() => 
      Promise.reject(new Error('Network error'))
    );

    const store = configureStore({
      reducer: { feed: feedSliceReducer }
    });

    await store.dispatch(userOrdersThunk());

    const state = store.getState();
    
    expect(state.feed.ordersAuth).toEqual([]);
    expect(state.feed.requestUserOrdersStatus).toEqual("Failed");
  });

  test('Загрузка пользовательских заказов - проверка pending', async () => {
    let resolvePromise: (value: TFeedsResponse) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    (global.fetch as jest.Mock).mockImplementation(() => 
      promise.then(() => ({
        ok: true,
        json: () => Promise.resolve({
          success: true,
          orders: mockUserFeedData
        })
      }))
    );

    const store = configureStore({
      reducer: { feed: feedSliceReducer }
    });

    const dispatchPromise = store.dispatch(userOrdersThunk());

    let state = store.getState();
    expect(state.feed.requestUserOrdersStatus).toBe('Loading');

    resolvePromise!(mockFeedData);
    await dispatchPromise;

    state = store.getState();
    expect(state.feed.requestUserOrdersStatus).toBe('Success');
    expect(state.feed.ordersAuth).toEqual(mockUserFeedData);
  });
});

