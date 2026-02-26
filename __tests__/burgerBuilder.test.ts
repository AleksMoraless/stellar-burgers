import { expect, test } from '@jest/globals';
import burgerBuilderReducer, { constructorActions } from '../src/services/slices/burgerBuilderSlice';
import { mockBurgerBuilder, mockBurgerBuilderSorted, ingredient1, bun1, bun2} from './mocks';


describe('Тесты синхронных экшенов конструктора', () => {
    const initialBurgerBuilderState = mockBurgerBuilder;

    test('Добавление и замена булки', () => {
        const newState = burgerBuilderReducer(initialBurgerBuilderState, constructorActions.addIngredient(bun1));
        const bun_test = newState.data.bun;
        expect(bun_test).not.toBeNull();
        expect(bun_test).toMatchObject(bun1);
        
        const newState1 = burgerBuilderReducer(newState, constructorActions.addIngredient(bun2))
        const { bun } = newState1.data;
        expect(bun).toMatchObject(bun2);
    })

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
