import { expect, test } from '@jest/globals';
import { rootReducer } from '../src/services/store';
import { UnknownAction } from '@reduxjs/toolkit';
import { mockIngredientsInit, mockBurgerBuilderInit, mockFeedInit, mockUserInit, mockOrderInit, expectedInitialState} from './mocks';

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
