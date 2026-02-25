import { expect, test } from '@jest/globals';
import { rootReducer } from '../src/services/store';
import { UnknownAction } from '@reduxjs/toolkit';

const mockIngredientsInit = {
    data: [],
    requestStatus: 'Idle',
    error: null
};

const mockBurgerBuilderInit = {
    data: {
        bun: null,
        ingredients: []
    }
};

const mockFeedInit = {
    feed: {
        orders: [],
        total: 0,
        totalToday: 0,
    },
    ordersAuth: [],
    requestStatus: 'Idle',
    requestUserOrdersStatus: 'Idle'
};

const mockUserInit = {
    user: null,
    userChecked: false,
    requestStatus: 'Idle'
};

const mockOrderInit = {
    newOrder: null,
    newOrderRequest: false,
    currentOrder: null,
    currentOrderLoading: false,
    requestStatus: 'Idle'
};

const expectedInitialState = {
    ingredients: mockIngredientsInit,
    burgerBuilder: mockBurgerBuilderInit,
    feed: mockFeedInit,
    user: mockUserInit,
    order: mockOrderInit
};

describe('rootReducer инициализация', () => {
    test('rootReducer с undefined', () => {
        const unknownAction: UnknownAction = { type: 'UNKNOWN_ACTION' };
        const state = rootReducer(undefined, unknownAction);

        expect(state).toEqual(expectedInitialState);
    });

    test('Проверка инициализации слайсов', () => {
        const unknownAction: UnknownAction = { type: 'UNKNOWN_ACTION' };
        const state = rootReducer(undefined, unknownAction);

        expect(state).toHaveProperty('ingredients');
        expect(state).toHaveProperty('burgerBuilder');
        expect(state).toHaveProperty('feed');
        expect(state).toHaveProperty('user');
        expect(state).toHaveProperty('order');

        expect(state.ingredients).toEqual(mockIngredientsInit);
        expect(state.burgerBuilder).toEqual(mockBurgerBuilderInit);
        expect(state.feed).toEqual(mockFeedInit);
        expect(state.user).toEqual(mockUserInit);
        expect(state.order).toEqual(mockOrderInit);
    });
});
