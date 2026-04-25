import { CartPage } from "../../PageObjects/cart.page"
import { LoginPage } from "../../PageObjects/login.page"
import { CatalogPage } from "../../PageObjects/catalog.page"
import { expect, test } from "../../utils/baseTest"
import { CheckoutPage } from "../../PageObjects/checkout.page"

test.describe('Checkout Functionality Tests', () => {
    test('Validate checkout process and order placement', async ({ page }) => {
        const loginPage = new LoginPage(page)
        const catalogPage = new CatalogPage(page)
        const cartPage = new CartPage(page)

        await loginPage.goto()
        await loginPage.login('kevin-pw@test.com', 'Test1234')
        await cartPage.cleanCart()
        await catalogPage.goToProducts()
        await catalogPage.searchAndAddMultipleProducts(['T-shirt', 'Jeans'])
        await cartPage.goToCart()
        await cartPage.proceedToCheckout()
    })

    test('validate checkout without login', async ({ page }) => {
        const catalogPage = new CatalogPage(page)
        const cartPage = new CartPage(page)
        const loginPage = new LoginPage(page)

        await loginPage.goto()

        await catalogPage.goToProducts()
        await catalogPage.searchAndAddMultipleProducts(['T-shirt', 'Jeans'])
        await cartPage.goToCart()
        await cartPage.proceedToCheckout()
        await expect(page.getByText('Register / Login account to proceed on checkout.')).toBeVisible()
    })

    test('Verify Delivery Address Consistency in Checkout', async ({ page }) => {
        const loginPage = new LoginPage(page)
        const catalogPage = new CatalogPage(page)
        const cartPage = new CartPage(page)
        const checkoutPage = new CheckoutPage(page)

        await loginPage.goto()
        await loginPage.login('kevin-pw@test.com', 'Test1234')
        await cartPage.cleanCart()
        await catalogPage.goToProducts()
        await catalogPage.searchAndAddMultipleProducts(['T-shirt', 'Jeans'])
        await cartPage.goToCart()
        await cartPage.proceedToCheckout()

        const myAddress = ['Mr. Kevin Playwright', 'Playwright', 'Evergreen terrace', 'United States', '1234645092434']
        await checkoutPage.validateDeliveryAddress(myAddress)
    })

    test('Validate order placement with empty payment details', async ({ page }) => {
        const loginPage = new LoginPage(page)
        const catalogPage = new CatalogPage(page)
        const cartPage = new CartPage(page)
        const checkoutPage = new CheckoutPage(page)

        await loginPage.goto()
        await loginPage.login('kevin-pw@test.com', 'Test1234')
        await cartPage.cleanCart()
        await catalogPage.goToProducts()
        await catalogPage.searchAndAddMultipleProducts(['T-shirt', 'Jeans'])
        await cartPage.goToCart()
        await cartPage.proceedToCheckout()
        await checkoutPage.placeOrder('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
        await checkoutPage.fillPaymentDetails({
            name: 'Kevin Testing',
            number: '',
            cvc: '',
            month: '',
            year: '' 
        })  
    })
})