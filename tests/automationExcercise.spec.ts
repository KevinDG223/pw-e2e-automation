import { test, expect } from './baseTest'
import { LoginPage } from '../PageObjects/login.page'
import { CatalogPage } from '../PageObjects/catalog.page'
import { CartPage } from '../PageObjects/cart.page'
import { CheckoutPage } from '../PageObjects/checkout.page'
import * as testData from '../data/testData.json'

test('E2E Buying Flow', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const catalogPage = new CatalogPage(page)
  const cartPage = new CartPage(page)
  const checkoutPage = new CheckoutPage(page)

  const allSelectedProducts: string[] = []

  await loginPage.goto()
  await loginPage.login('kevindg26@yopmail.com', 'Testeando369')
  
  await cartPage.cleanCart()
  await catalogPage.goToProducts()

  for (const category of testData.categories) {
    const selected = [...category.products]
      .sort(() => 0.5 - Math.random())
      .slice(0, 2)

  allSelectedProducts.push(...selected)
  await catalogPage.navigateAndAdd(category.id, category.sub, selected)
  }

  await catalogPage.goToCart()
  await cartPage.verifyCartIsVisible()

  await cartPage.validateProductsInCart(allSelectedProducts)
  await cartPage.validateCartRowCount(allSelectedProducts.length)

  await cartPage.proceedToCheckout()

  const myAddress = ['Kevin Testing', 'Testing@co', 'Evergreen terrace', 'United States', '101010']
  await checkoutPage.validateDeliveryAddress(myAddress)
  await checkoutPage.placeOrder('Hello World - E2E Test')

  await checkoutPage.fillPaymentDetails({
    name: 'Kevin Testing',
    number: '1234-5678-9012-3456',
    cvc: '777',
    month: '01',
    year: '30'
  })

  await checkoutPage.verifyOrderPlaced()
  await loginPage.logout()
})