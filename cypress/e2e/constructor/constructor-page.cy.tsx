

describe('Тестирование конструктора бургеров', function() {
    this.beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'}).as('getIngredients')
        cy.visit('http://localhost:4000')
        cy.wait('@getIngredients')
    })

    it('Моккирование запроса к серверу api/ingredients', function() {
        cy.get('[data-cy=Булки] li').should('have.length', 2)
        cy.get('[data-cy=Начинки] li').should('have.length', 9)
        cy.get('[data-cy=Соусы] li').should('have.length', 4)
    });

    it('Добавление булки в конструктор', function() {
        cy.get('[data-cy=constructor_bun-top]').should('not.exist')
        cy.get('[data-cy=constructor_bun-bottom]').should('not.exist')

        cy.get('[data-cy=643d69a5c3f7b9001cfa093d]')
            .find('button')
            .should('contain', 'Добавить')
            .click()
        
        cy.get('[data-cy=constructor_bun-top]')
            .should('exist')
            .find('span.constructor-element__text')
            .should('contain', 'Флюоресцентная булка R2-D3 (верх)')

        cy.get('[data-cy=constructor_bun-bottom]')
            .should('exist')
            .find('span.constructor-element__text')
            .should('contain', 'Флюоресцентная булка R2-D3 (низ)')
    });

    it('Добавление ингридиентов в конструктор', function() {
        cy.get('[data-cy=643d69a5c3f7b9001cfa0941]')
            .find('button')
            .should('contain', 'Добавить')
            .click()

        cy.get('[data-cy=643d69a5c3f7b9001cfa0942]')
            .find('button')
            .should('contain', 'Добавить')
            .click()

        cy.get('[data-cy=constructor_ingredients] li')
            .should('have.length', 2)
        cy.get('[data-cy=constructor_ingredients_0]')
            .find('span.constructor-element__text')
            .should('contain', 'Биокотлета из марсианской Магнолии')
        cy.get('[data-cy=constructor_ingredients_1]')
            .find('span.constructor-element__text')
            .should('contain', 'Соус Spicy-X')
    });
}); 

describe('Тестирование модального окон', function() {
    this.beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'}).as('getIngredients')
        cy.visit('http://localhost:4000')
        cy.wait('@getIngredients')
    })

    it('Тестирование открытия модального окна и закрытие через кнопку', function() {
        cy.get('[data-cy=modal]').should('not.exist')

        cy.get('[data-cy=643d69a5c3f7b9001cfa0941]')
            .find('a')
            .click()
        
        cy.url().should('include', '/ingredients/643d69a5c3f7b9001cfa0941')
        cy.get('[data-cy=modal]').should('exist')
        cy.get('[data-cy=modal]')
            .should('be.visible')
        cy.get('[data-cy=modal]')
            .get('[data-cy=modal-heading]')
            .should('contain', 'Детали ингредиента')
        cy.get('[data-cy=modal]')
            .get('[data-cy=modal_ingredient-name]')
            .should('contain', 'Биокотлета из марсианской Магнолии')

        cy.get('[data-cy=modal_close-button]')
            .click()

        cy.get('[data-cy=modal]').should('not.exist')
    });

    it('Тестирование открытия модального окна и закрытие через оверлей', function() {
        cy.get('[data-cy=modal]').should('not.exist')
        cy.get('[data-cy=643d69a5c3f7b9001cfa0941]')
            .find('a')
            .click()
        cy.url().should('include', '/ingredients/643d69a5c3f7b9001cfa0941')
        cy.get('[data-cy=modal]').should('exist')
        cy.get('[data-cy=modal]')
            .should('be.visible')
        cy.get('[data-cy=modal]')
            .get('[data-cy=modal-heading]')
            .should('contain', 'Детали ингредиента')
        cy.get('[data-cy=modal]')
            .get('[data-cy=modal_ingredient-name]')
            .should('contain', 'Биокотлета из марсианской Магнолии')

        cy.get('[data-cy=modal-overlay]')
            .click({force: true})
        
        cy.get('[data-cy=modal]').should('not.exist')
    });
}); 

describe('Тестирование заказа бургера', function() {
    this.beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'}).as('getIngredients')
        cy.intercept('GET', 'api/orders/all', {fixture: 'orders.json'}).as('getOrdersAll')
        cy.intercept('GET', '**/auth/user', {fixture: 'user.json'}).as('getUser')
        cy.intercept('GET', '**/orders', {fixture: 'orders.json'}).as('getUserOrders')
        cy.intercept('POST', '**/orders', {fixture: 'order.json'}).as('createOrder')
        cy.window().then((win) => {
            win.localStorage.setItem('refreshToken', '7ddf0dfa54761dc7a3833c5a14b21cb07a1b90cc7dd645434432e83552961cc5ac0dd05065e17a3d')
            cy.setCookie('accessToken', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MjFjMDMwYTY0MTc3MDAxYjMyMDIxMCIsImlhdCI6MTc3MTEwOTY0NywiZXhwIjoxNzcxMTEwODQ3fQ.StKZU0ixhiwQg3k3bTQw819mnW3HWg2hBsPFSuJ-Y6s')
        })
        cy.visit('http://localhost:4000')
        cy.wait('@getIngredients')
        cy.wait('@getOrdersAll')
        cy.wait('@getUser')
        cy.wait('@getUserOrders')
    })

    this.afterEach(() => {
        cy.window().then((win) => {
            win.localStorage.removeItem('refreshToken')
            cy.clearCookie('accessToken')
        })
    })

    it('Сборка бургера', function() {
        cy.get('[data-cy=constructor_bun-top]')
            .should('not.exist')
        cy.get('[data-cy=constructor_bun-bottom]')
            .should('not.exist')

        cy.get('[data-cy=643d69a5c3f7b9001cfa093d]')
            .find('button')
            .should('contain', 'Добавить')
            .click()
        
        cy.get('[data-cy=constructor_bun-top]')
            .should('exist')
            .find('span.constructor-element__text')
            .should('contain', 'Флюоресцентная булка R2-D3 (верх)')

        cy.get('[data-cy=constructor_bun-bottom]')
            .should('exist')
            .find('span.constructor-element__text')
            .should('contain', 'Флюоресцентная булка R2-D3 (низ)')

        cy.get('[data-cy=643d69a5c3f7b9001cfa0941]')
            .find('button')
            .should('contain', 'Добавить')
            .click()

        cy.get('[data-cy=643d69a5c3f7b9001cfa0942]')
            .find('button')
            .should('contain', 'Добавить')
            .click()

        cy.get('[data-cy=constructor_ingredients] li')
            .should('have.length', 2)
        cy.get('[data-cy=constructor_ingredients_0]')
            .find('span.constructor-element__text')
            .should('contain', 'Биокотлета из марсианской Магнолии')
        cy.get('[data-cy=constructor_ingredients_1]')
            .find('span.constructor-element__text')
            .should('contain', 'Соус Spicy-X')

        cy.get('[data-cy=order-button]')
            .should('contain', 'Оформить заказ')
            .click()

        cy.wait('@createOrder')
        
        cy.get('[data-cy=modal]')
            .should('be.visible')
            .get('[data-cy=order-number]')
            .should('contain', '100968')

        cy.get('[data-cy=constructor_bun-top]').should('not.exist')

        cy.get('[data-cy=constructor_bun-bottom]').should('not.exist')
        cy.get('[data-cy=constructor_ingredients] li')
            .should('have.length', 0)

        cy.get('[data-cy=modal_close-button]')
            .click()

        cy.get('[data-cy=modal]').should('not.exist')
    });

}); 
