import { expect, test } from '@jest/globals';
import userSliceReducer, { TUserState } from '../src/services/slices/userSlice';
import { configureStore } from '@reduxjs/toolkit';
import { getUserThunk } from '../src/services/thunks/getUserThunk';
import { userLoginThunk } from '../src/services/thunks/userLoginThunk';
import { userLogoutThunk } from '../src/services/thunks/userLogoutThunk';
import { userRegisterThunk } from '../src/services/thunks/userRegisterThunk';
import { userUpdateThunk } from '../src/services/thunks/userUpdateThunk';
import { RequestStatus, TUser } from "../src/utils/types";

jest.mock('../src/utils/cookie', () => ({
  getCookie: jest.fn(),
  setCookie: jest.fn(),
  deleteCookie: jest.fn()
}));

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true
});

import { getCookie, setCookie, deleteCookie } from '../src/utils/cookie';

const mockUserData = { "success": true, "user": { "email": "sanekm1901@mail.ru", "name": "AlexMoraless" } };

describe('Тесты асинхронного экшена getUserThunk', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    (getCookie as jest.Mock).mockReturnValue('test-token');

    global.fetch = jest.fn();
  });

  afterAll(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  })

  test('Получение данных пользователя - успешно', async () => {

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUserData),
      })
    ) as jest.Mock

    const store = configureStore({
      reducer: { user: userSliceReducer }
    });

    await store.dispatch(getUserThunk());

    const state = store.getState();

    expect(state.user.user).toEqual(mockUserData.user);
    expect(state.user.requestStatus).toBe("Success");
  })

  test('Получение данных пользователя - ошибка', async () => {

    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Network error'))
    ) as jest.Mock

    const store = configureStore({
      reducer: { user: userSliceReducer }
    });

    await store.dispatch(getUserThunk());

    const state = store.getState();

    expect(state.user.user).toEqual(null);
    expect(state.user.requestStatus).toBe("Failed");
  })

  test('Получение данных пользователя - проверка pending', async () => {
    let resolvePromise: (value: any) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    global.fetch = jest.fn(() =>
      promise.then(() => ({
        ok: true,
        json: () => Promise.resolve(mockUserData)
      }))
    ) as jest.Mock;

    const store = configureStore({
      reducer: {
        user: userSliceReducer
      }
    });
    const dispatchPromise = store.dispatch(getUserThunk());

    let state = store.getState();
    expect(state.user.requestStatus).toBe("Loading");

    resolvePromise!({});
    await dispatchPromise;

    state = store.getState();
    expect(state.user.requestStatus).toBe("Success");
    expect(state.user.user).toEqual(mockUserData.user);
  });
})


const mockUserRegisterData = {
  "refreshToken": "test-token",
  "accessToken": "test-access-token",
  "user": {
    "name": 'Alex John',
    "email": 'test@mail.ru'
  },
};

describe('Тесты асинхронного экшена userRegisterThunk', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    (getCookie as jest.Mock).mockReturnValue('test-token');
    global.fetch = jest.fn();
  });

  afterAll(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  })

  test('Регистрация пользователя - успешно', async () => {

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          success: true,
          user: mockUserRegisterData,
        }),
      })
    ) as jest.Mock

    const store = configureStore({
      reducer: { user: userSliceReducer }
    });

    const result = await store.dispatch(userRegisterThunk({ name: 'Alex John', email: 'test@mail.ru', password: '1234' }));

    const state = store.getState();

    expect(state.user.user).toEqual(mockUserRegisterData);
    expect(state.user.requestStatus).toBe("Success");

  })

  test('Регистрация пользователя - ошибка', async () => {

    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Network error'))
    ) as jest.Mock

    const store = configureStore({
      reducer: { user: userSliceReducer }
    });

    const result = await store.dispatch(userRegisterThunk({ name: 'Alex John', email: 'test@mail.ru', password: '1234' }));

    const state = store.getState();

    expect(state.user.user).toEqual(null);
    expect(state.user.requestStatus).toBe("Failed");
  })

  test('Регистрация пользователя - проверка pending', async () => {
    let resolvePromise: (value: any) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    global.fetch = jest.fn(() =>
      promise.then(() => ({
        ok: true,
        json: () => Promise.resolve(mockUserData)
      }))
    ) as jest.Mock;

    const store = configureStore({
      reducer: {
        user: userSliceReducer
      }
    });
    const dispatchPromise = store.dispatch(userRegisterThunk({ name: 'Alex John', email: 'test@mail.ru', password: '1234' }));

    let state = store.getState();
    expect(state.user.requestStatus).toBe("Loading");

    resolvePromise!({});
    await dispatchPromise;

    state = store.getState();
    expect(state.user.requestStatus).toBe("Success");
    expect(state.user.user).toEqual(mockUserData.user);
  });
})

const mockUserLoginData = {
  "user": {
    "name": null,
    "email": 'test@mail.ru'
  },
};

describe('Тесты асинхронного экшена userLoginThunk', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    (getCookie as jest.Mock).mockReturnValue('test-token');
    global.fetch = jest.fn();
  });

  afterAll(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  })

  test('Логирование пользователя - успешно', async () => {

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          success: true,
          "refreshToken": "test-token",
          "accessToken": "test-access-token",
          user: mockUserLoginData,
        }),
      })
    ) as jest.Mock

    const store = configureStore({
      reducer: { user: userSliceReducer }
    });

    const result = await store.dispatch(userLoginThunk({ email: 'test@mail.ru', password: '1234' }));

    const state = store.getState();

    expect(state.user.user).toEqual(mockUserLoginData);
    expect(state.user.requestStatus).toBe("Success");

  })

  test('Логирование пользователя - ошибка', async () => {

    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Network error'))
    ) as jest.Mock

    const store = configureStore({
      reducer: { user: userSliceReducer }
    });

    const result = await store.dispatch(userLoginThunk({ email: 'test@mail.ru', password: '1234' }));

    const state = store.getState();

    expect(state.user.user).toEqual(null);
    expect(state.user.requestStatus).toBe("Failed");
  })

  test('Логирование пользователя - проверка pending', async () => {
    let resolvePromise: (value: any) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    global.fetch = jest.fn(() =>
      promise.then(() => ({
        ok: true,
        json: () => Promise.resolve(mockUserData)
      }))
    ) as jest.Mock;

    const store = configureStore({
      reducer: {
        user: userSliceReducer
      }
    });
    const dispatchPromise = store.dispatch(userLoginThunk({ email: 'test@mail.ru', password: '1234' }));

    let state = store.getState();
    expect(state.user.requestStatus).toBe("Loading");

    resolvePromise!({});
    await dispatchPromise;

    state = store.getState();
    expect(state.user.requestStatus).toBe("Success");
    expect(state.user.user).toEqual(mockUserData.user);
  });
})

describe('Тесты асинхронного экшена userLogoutThunk', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    localStorage.clear();
    global.fetch = jest.fn();
  });

  afterAll(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  })

  test('Выход пользователя - успешно', async () => {

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          success: true,
        }),
      })
    ) as jest.Mock
    const userInit: TUserState = {
      user: mockUserData.user,
      userChecked: true,
      requestStatus: RequestStatus.Success
    }
    const store = configureStore({
      reducer: { user: userSliceReducer },
      preloadedState: { user: userInit },
    });


    let state = store.getState();

    expect(state.user.user).toEqual(mockUserData.user);
    expect(state.user.requestStatus).toBe("Success");

    const result = await store.dispatch(userLogoutThunk());

    await new Promise(process.nextTick);

    state = store.getState();

    expect(state.user.user).toBeNull();
    expect(state.user.requestStatus).toBe("Success");
    expect(deleteCookie).toHaveBeenCalledWith('accessToken');
    expect(localStorage.removeItem).toHaveBeenCalledWith('refreshToken');
  })

  test('Выход пользователя - ошибка', async () => {

    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Network error'))
    ) as jest.Mock

    const userInit: TUserState = {
      user: mockUserData.user,
      userChecked: true,
      requestStatus: RequestStatus.Success
    }
    const store = configureStore({
      reducer: { user: userSliceReducer },
      preloadedState: { user: userInit },
    });

    await store.dispatch(userLogoutThunk());
    await new Promise(process.nextTick);

    const state = store.getState();

    expect(state.user.user).toEqual(mockUserData.user);
    expect(state.user.requestStatus).toBe("Failed");
  })

  test('Выход пользователя - проверка pending', async () => {
    let resolvePromise: (value: any) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    global.fetch = jest.fn(() =>
      promise.then(() => ({
        ok: true,
        json: () => Promise.resolve(mockUserData)
      }))
    ) as jest.Mock;

    const userInit: TUserState = {
      user: mockUserData.user,
      userChecked: true,
      requestStatus: RequestStatus.Success
    }
    const store = configureStore({
      reducer: { user: userSliceReducer },
      preloadedState: { user: userInit },
    });
    let state = store.getState();

    expect(state.user.user).toEqual(mockUserData.user);
    expect(state.user.requestStatus).toBe("Success");

    const dispatchPromise = store.dispatch(userLogoutThunk());

    state = store.getState();
    expect(state.user.requestStatus).toBe("Loading");

    resolvePromise!({});
    await dispatchPromise;

    state = store.getState();
    expect(state.user.user).toBeNull();
    expect(state.user.requestStatus).toBe("Success");
    expect(deleteCookie).toHaveBeenCalledWith('accessToken');
    expect(localStorage.removeItem).toHaveBeenCalledWith('refreshToken');
  });
})

describe('Тесты асинхронного экшена userUpdateThunk', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    localStorage.clear();

    (getCookie as jest.Mock).mockReturnValue('test-token');
    global.fetch = jest.fn();
  });

  afterAll(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  })

  const mockUserDataMutation = {
    name: 'Lexa Blaze',
    email: 'lexablazer@mail.ru'
  }

  test('Обновление данных пользователя - успешно', async () => {

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          success: true,
          user: mockUserDataMutation
        }),
      })
    ) as jest.Mock
    const userInit: TUserState = {
      user: mockUserData.user,
      userChecked: true,
      requestStatus: RequestStatus.Success
    }
    const store = configureStore({
      reducer: { user: userSliceReducer },
      preloadedState: { user: userInit },
    });


    let state = store.getState();

    expect(state.user.user).toEqual(mockUserData.user);
    expect(state.user.requestStatus).toBe("Success");

    const result = await store.dispatch(userUpdateThunk({
      name: 'Lexa Blaze',
      email: 'lexablazer@mail.ru',
      password: '1234'
    }));

    await new Promise(process.nextTick);

    state = store.getState();

    expect(state.user.user).toEqual(mockUserDataMutation);
    expect(state.user.requestStatus).toBe("Success");
  })

  test('Обновление данных пользователя - ошибка', async () => {

    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Network error'))
    ) as jest.Mock

    const userInit: TUserState = {
      user: mockUserData.user,
      userChecked: true,
      requestStatus: RequestStatus.Success
    }
    const store = configureStore({
      reducer: { user: userSliceReducer },
      preloadedState: { user: userInit },
    });

    await store.dispatch(userUpdateThunk({
      name: 'Lexa Blaze',
      email: 'lexablazer@mail.ru',
      password: '1234'
    }));
    await new Promise(process.nextTick);

    const state = store.getState();

    expect(state.user.user).toEqual(mockUserData.user);
    expect(state.user.requestStatus).toBe("Failed");
  })

  test('Обновление данных пользователя - проверка pending', async () => {
    let resolvePromise: (value: any) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    global.fetch = jest.fn(() =>
      promise.then(() => ({
        ok: true,
        json: () => Promise.resolve({
          success: true,
          user: mockUserDataMutation
        })
      }))
    ) as jest.Mock;

    const userInit: TUserState = {
      user: mockUserData.user,
      userChecked: true,
      requestStatus: RequestStatus.Success
    }
    const store = configureStore({
      reducer: { user: userSliceReducer },
      preloadedState: { user: userInit },
    });
    let state = store.getState();

    expect(state.user.user).toEqual(mockUserData.user);
    expect(state.user.requestStatus).toBe("Success");

    const dispatchPromise = store.dispatch(userUpdateThunk(
      {
        name: 'Lexa Blaze',
        email: 'lexablazer@mail.ru',
        password: '1234'
      }
    ));

    state = store.getState();
    expect(state.user.requestStatus).toBe("Loading");

    resolvePromise!({});
    await dispatchPromise;

    state = store.getState();
    expect(state.user.user).toEqual(mockUserDataMutation);
    expect(state.user.requestStatus).toBe("Success");
  });
})

