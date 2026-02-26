//INIT
export const mockIngredientsInit = {
    data: [],
    requestStatus: 'Idle',
    error: null
};

export const mockBurgerBuilderInit = {
    data: {
        bun: null,
        ingredients: []
    }
};

export const mockFeedInit = {
    feed: {
        orders: [],
        total: 0,
        totalToday: 0,
    },
    ordersAuth: [],
    requestStatus: 'Idle',
    requestUserOrdersStatus: 'Idle'
};

export const mockUserInit = {
    user: null,
    userChecked: false,
    requestStatus: 'Idle'
};

export const mockOrderInit = {
    newOrder: null,
    newOrderRequest: false,
    currentOrder: null,
    currentOrderLoading: false,
    requestStatus: 'Idle'
};

export const expectedInitialState = {
    ingredients: mockIngredientsInit,
    burgerBuilder: mockBurgerBuilderInit,
    feed: mockFeedInit,
    user: mockUserInit,
    order: mockOrderInit
};

//BurgerBuilder
export const mockBurgerBuilder = {
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
export const mockBurgerBuilderSorted = {
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
export const ingredient1 = {
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
export const bun1 = {
            "_id": "643d69a5c3f7b9001cfa093c",
            "name": "Краторная булка N-200i",
            "type": "bun",
            "proteins": 80,
            "fat": 24,
            "carbohydrates": 53,
            "calories": 420,
            "price": 1255,
            "image": "https://code.s3.yandex.net/react/code/bun-02.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
            "__v": 0,
        };
export const bun2 = {
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
            "__v": 0,
        };


// Feed

export const mockFeedData = {
    "success": true,
    "orders": [
        {
            "_id": "6923a075a64177001b320733",
            "ingredients": [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa093e",
                "643d69a5c3f7b9001cfa093d"
            ],
            "status": "done",
            "name": "Флюоресцентный люминесцентный бургер",
            "createdAt": "2025-11-24T00:01:57.970Z",
            "updatedAt": "2025-11-24T00:01:58.232Z",
            "number": 95259
        },
        {
            "_id": "6923a07ba64177001b320734",
            "ingredients": [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa093e",
                "643d69a5c3f7b9001cfa093d"
            ],
            "status": "done",
            "name": "Флюоресцентный люминесцентный бургер",
            "createdAt": "2025-11-24T00:02:03.044Z",
            "updatedAt": "2025-11-24T00:02:03.222Z",
            "number": 95260
        }
    ],
    "total": 24960,
    "totalToday": 2
};
export const mockUserFeedData = [
        {
            "_id": "6923a075a64177001b320733",
            "ingredients": [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa093e",
                "643d69a5c3f7b9001cfa093d"
            ],
            "status": "done",
            "name": "Флюоресцентный люминесцентный бургер",
            "createdAt": "2025-11-24T00:01:57.970Z",
            "updatedAt": "2025-11-24T00:01:58.232Z",
            "number": 95259
        },
    ];

//Ingredients
export const mockIngredientsData = [
        {
            "_id": "643d69a5c3f7b9001cfa093c",
            "name": "Краторная булка N-200i",
            "type": "bun",
            "proteins": 80,
            "fat": 24,
            "carbohydrates": 53,
            "calories": 420,
            "price": 1255,
            "image": "https://code.s3.yandex.net/react/code/bun-02.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
            "__v": 0
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
            "__v": 0
        },
        {
            "_id": "643d69a5c3f7b9001cfa0943",
            "name": "Соус фирменный Space Sauce",
            "type": "sauce",
            "proteins": 50,
            "fat": 22,
            "carbohydrates": 11,
            "calories": 14,
            "price": 80,
            "image": "https://code.s3.yandex.net/react/code/sauce-04.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/sauce-04-large.png",
            "__v": 0
        },
        {
            "_id": "643d69a5c3f7b9001cfa093f",
            "name": "Мясо бессмертных моллюсков Protostomia",
            "type": "main",
            "proteins": 433,
            "fat": 244,
            "carbohydrates": 33,
            "calories": 420,
            "price": 1337,
            "image": "https://code.s3.yandex.net/react/code/meat-02.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png",
            "__v": 0
        },
        {
            "_id": "643d69a5c3f7b9001cfa0940",
            "name": "Говяжий метеорит (отбивная)",
            "type": "main",
            "proteins": 800,
            "fat": 800,
            "carbohydrates": 300,
            "calories": 2674,
            "price": 3000,
            "image": "https://code.s3.yandex.net/react/code/meat-04.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
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
        },
        {
            "_id": "643d69a5c3f7b9001cfa0944",
            "name": "Соус традиционный галактический",
            "type": "sauce",
            "proteins": 42,
            "fat": 24,
            "carbohydrates": 42,
            "calories": 99,
            "price": 15,
            "image": "https://code.s3.yandex.net/react/code/sauce-03.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/sauce-03-large.png",
            "__v": 0
        },
        {
            "_id": "643d69a5c3f7b9001cfa0945",
            "name": "Соус с шипами Антарианского плоскоходца",
            "type": "sauce",
            "proteins": 101,
            "fat": 99,
            "carbohydrates": 100,
            "calories": 100,
            "price": 88,
            "image": "https://code.s3.yandex.net/react/code/sauce-01.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/sauce-01-large.png",
            "__v": 0
        },
        {
            "_id": "643d69a5c3f7b9001cfa0946",
            "name": "Хрустящие минеральные кольца",
            "type": "main",
            "proteins": 808,
            "fat": 689,
            "carbohydrates": 609,
            "calories": 986,
            "price": 300,
            "image": "https://code.s3.yandex.net/react/code/mineral_rings.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
            "__v": 0
        },
        {
            "_id": "643d69a5c3f7b9001cfa0947",
            "name": "Плоды Фалленианского дерева",
            "type": "main",
            "proteins": 20,
            "fat": 5,
            "carbohydrates": 55,
            "calories": 77,
            "price": 874,
            "image": "https://code.s3.yandex.net/react/code/sp_1.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/sp_1-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/sp_1-large.png",
            "__v": 0
        },
        {
            "_id": "643d69a5c3f7b9001cfa0948",
            "name": "Кристаллы марсианских альфа-сахаридов",
            "type": "main",
            "proteins": 234,
            "fat": 432,
            "carbohydrates": 111,
            "calories": 189,
            "price": 762,
            "image": "https://code.s3.yandex.net/react/code/core.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/core-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/core-large.png",
            "__v": 0
        },
        {
            "_id": "643d69a5c3f7b9001cfa0949",
            "name": "Мини-салат Экзо-Плантаго",
            "type": "main",
            "proteins": 1,
            "fat": 2,
            "carbohydrates": 3,
            "calories": 6,
            "price": 4400,
            "image": "https://code.s3.yandex.net/react/code/salad.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/salad-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/salad-large.png",
            "__v": 0
        },
        {
            "_id": "643d69a5c3f7b9001cfa094a",
            "name": "Сыр с астероидной плесенью",
            "type": "main",
            "proteins": 84,
            "fat": 48,
            "carbohydrates": 420,
            "calories": 3377,
            "price": 4142,
            "image": "https://code.s3.yandex.net/react/code/cheese.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/cheese-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/cheese-large.png",
            "__v": 0
        }
    ]


//Order

export const mockIngredients = ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa093d'];
export const mockCreateOrderData = {
  "success": true,
  "name": "Флюоресцентный люминесцентный бургер",

  "order": {
    "ingredients": ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa093d'],
    "_id": "699dfc8da64177001b32d586",
    "status": "done",
    "name": "Флюоресцентный люминесцентный бургер",
    "createdAt": "2026-02-24T19:31:25.136Z",
    "updatedAt": "2026-02-24T19:31:25.358Z",
    "number": 101709,
  }
};
export const mockOrderByNumberData = {
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

//User
export const mockUserData = { "success": true, "user": { "email": "sanekm1901@mail.ru", "name": "AlexMoraless" } };
export const serverLogoutResponse = { "success": true }
export const mockUserRegisterData = {
  "success": true,
  "refreshToken": "test-token",
  "accessToken": "test-access-token",
  "user": {
    "name": 'Alex John',
    "email": 'test@mail.ru'
  },
};
  export const mockUserDataMutation = {
    success: true,
    user: {
      name: 'Lexa Blaze',
      email: 'lexablazer@mail.ru'
    }
  }
