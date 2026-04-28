import { CartPage } from "../../PageObjects/cart.page"
import { LoginPage } from "../../PageObjects/login.page"
import { CatalogPage } from "../../PageObjects/catalog.page"
import { expect, test } from "../../utils/baseTest"
import { CheckoutPage } from "../../PageObjects/checkout.page"

test.describe('Checkout Functionality Tests', () => {
    test.describe.configure({ mode: 'serial' })
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        const catalogPage = new CatalogPage(page)
        const cartPage = new CartPage(page)

        await loginPage.goto()
        await loginPage.login('kevin-checkout@test.com', 'Test1234')
        await cartPage.cleanCart()
        await catalogPage.goToProducts()
        await catalogPage.searchAndAddMultipleProducts(['T-shirt', 'Jeans'])
        await cartPage.goToCart()

    })
    test('Validate checkout process and order placement', async ({ page }) => {
        const cartPage = new CartPage(page)
        await cartPage.proceedToCheckout()
        await expect(page.getByText('Address Details')).toBeVisible()
    })

    test('Verify Delivery Address Consistency in Checkout', async ({ page }) => {
        const cartPage = new CartPage(page)
        const checkoutPage = new CheckoutPage(page)

        await cartPage.proceedToCheckout()

        const myAddress = ['Mr. Kevin Testing', 'Testing Co', 'Evergreen Terrace', 'United States', '1234567890']
        const addressContainer = await checkoutPage.getDeliveryAddress()
        for (const data of myAddress) {
            await expect(addressContainer).toContainText(data)
        }
    })

    test('Validate order placement with empty payment details', async ({ page }) => {
        const cartPage = new CartPage(page)
        const checkoutPage = new CheckoutPage(page)

        await cartPage.proceedToCheckout()
        await checkoutPage.placeOrder('This is a Test!')
        await checkoutPage.fillPaymentDetails({
            name: 'Kevin Testing',
            number: '',
            cvc: '',
            month: '',
            year: ''
        })
        await expect(page.getByText('Name on Card')).toBeVisible()
    })
})

test.describe('Checkout - Guest user', () => {
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
})