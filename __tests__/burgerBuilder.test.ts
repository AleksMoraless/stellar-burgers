import { expect, test } from '@jest/globals';
import burgerBuilderReducer, { constructorActions } from '../src/services/slices/burgerBuilderSlice';

const mockBurgerBuilder = {
    data: {
        bun: null,
        ingredients: [
            {
                "_id": "643d69a5c3f7b9001cfa0941",
                "name": "Биокотлета из марсианской Магнолии",
                "type": "main",
                "proteins": 420,
                "fat": 142,
                "carbohydrates": 242,
                "calories": 4242,
                "price": 424,
                "image": "https://code.s3.yandex.net/react/code/meat-01.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
                "__v": 0,
                "id": '1'
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
                "__v": 0,
                "id": '2'
            }
        ]
    }
}
const mockBurgerBuilderSorted = {
    data: {
        bun: null,
        ingredients: [
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
                "__v": 0,
                "id": '2'
            },
            {
                "_id": "643d69a5c3f7b9001cfa0941",
                "name": "Биокотлета из марсианской Магнолии",
                "type": "main",
                "proteins": 420,
                "fat": 142,
                "carbohydrates": 242,
                "calories": 4242,
                "price": 424,
                "image": "https://code.s3.yandex.net/react/code/meat-01.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
                "__v": 0,
                "id": '1'
            }
        ]
    }
}
const ingredient1 = {
    "_id": "643d69a5c3f7b9001cfa0942",
    "name": "Соус Spicy-X",
    "type": "sauce",
    "proteins": 30,
    "fat": 20,
    "carbohydrates": 40,
    "calories": 30,
    "price": 90,
    "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
    "__v": 0,
    "id": '3'
};

describe('Тесты синхронных экшенов конструктора', () => {
    const initialBurgerBuilderState = mockBurgerBuilder;

    test('Добавление ингридиента', () => {
        const newState = burgerBuilderReducer(initialBurgerBuilderState, constructorActions.addIngredient(ingredient1));
        const { ingredients } = newState.data;
        expect(ingredients).toHaveLength(3);
    })
    test('Удаление ингридиента', () => {
        const newState = burgerBuilderReducer(initialBurgerBuilderState, constructorActions.deleteIngredient(0));
        const { ingredients } = newState.data;
        expect(ingredients).toEqual([{
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
            "__v": 0,
            "id": '2'
        }]);
        expect(ingredients).toHaveLength(1);
    })
    test('Перемещение ингридиента', () => {
        const newState = burgerBuilderReducer(initialBurgerBuilderState, constructorActions.moveUpIngredient(1));
        const { ingredients } = newState.data;
        expect(ingredients).toEqual(mockBurgerBuilderSorted.data.ingredients);
        expect(ingredients).toHaveLength(2);
    })
})
