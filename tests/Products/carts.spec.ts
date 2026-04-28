import { CartPage } from "../../PageObjects/cart.page"
import { LoginPage } from "../../PageObjects/login.page"
import { CatalogPage } from "../../PageObjects/catalog.page"
import { test } from "../../utils/baseTest"

test.describe('Cart Functionality Tests', () => {
    test.describe.configure({ mode: 'serial' })
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        const cartPage = new CartPage(page)
        const catalogPage = new CatalogPage(page)

        await loginPage.goto()
        await loginPage.login('kevin-cart@test.com', 'Test1234')
        await cartPage.cleanCart()
        await catalogPage.goToProducts()
    })

    test('Add products to cart and validate', async ({ page }) => {
        const catalogPage = new CatalogPage(page)
        const cartPage = new CartPage(page)

        const expectedProducts = ['T-shirt', 'Jeans']
        await catalogPage.searchAndAddMultipleProducts(expectedProducts)
        await cartPage.goToCart()
        await cartPage.validateProductsInCart(expectedProducts)
        await cartPage.validateCartRowCount(expectedProducts.length)
    })

    test('Remove products from cart and validate empty cart', async ({ page }) => {
        const catalogPage = new CatalogPage(page)
        const cartPage = new CartPage(page)

        const expectedProducts = ['T-shirt', 'Jeans']
        await catalogPage.searchAndAddMultipleProducts(expectedProducts)
        await cartPage.goToCart()
        await cartPage.cleanCart()
        await cartPage.validateCartIsEmpty()
    })

    test('Update product quantity in cart', async ({ page }) => {
        const catalogPage = new CatalogPage(page)
        const cartPage = new CartPage(page)
        
        await catalogPage.searchProduct('Fancy Green Top')
        await catalogPage.detailedProductView(4)
        await cartPage.goToCart()
        await cartPage.validateCartRowCount(1)
        await cartPage.validateProductQuantity('4')
    })

    test('Persistance of cart contents after logout and login', async ({ page }) => {
        const loginPage = new LoginPage(page)
        const catalogPage = new CatalogPage(page)
        const cartPage = new CartPage(page)

        const expectedProducts = ['T-shirt', 'Jeans']
        await catalogPage.searchAndAddMultipleProducts(expectedProducts)
        await cartPage.goToCart()
        await loginPage.logout()
        await loginPage.login('kevin-pw@test.com', 'Test1234')
        await cartPage.goToCart()
        await cartPage.validateProductsInCart(expectedProducts)
    })
})