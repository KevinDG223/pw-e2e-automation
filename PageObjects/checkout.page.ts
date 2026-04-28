import { Page, Locator, expect } from '@playwright/test'

export class CheckoutPage {
  readonly page: Page
  readonly addressItems: Locator
  readonly commentInput: Locator
  readonly placeOrderButton: Locator
  readonly nameOnCardInput: Locator
  readonly cardNumberInput: Locator
  readonly cvcInput: Locator
  readonly expiryMonthInput: Locator
  readonly expiryYearInput: Locator
  readonly payButton: Locator
  readonly orderPlacedMessage: Locator
  readonly continueButton: Locator

  constructor(page: Page) {
    this.page = page
    this.addressItems = page.locator('#address_delivery li')
    this.commentInput = page.locator('.form-control')
    this.placeOrderButton = page.locator('.btn.btn-default.check_out')
    this.nameOnCardInput = page.locator('[data-qa="name-on-card"]')
    this.cardNumberInput = page.locator('[data-qa="card-number"]')
    this.cvcInput = page.locator('[data-qa="cvc"]')
    this.expiryMonthInput = page.locator('[data-qa="expiry-month"]')
    this.expiryYearInput = page.locator('[data-qa="expiry-year"]')
    this.payButton = page.locator('[data-qa="pay-button"]')
    this.orderPlacedMessage = page.locator('[data-qa="order-placed"]')
    this.continueButton = page.locator('[data-qa="continue-button"]')
  }

  async getDeliveryAddress() {
    const addressContainer = this.page.locator('#address_delivery')
    await addressContainer.waitFor({ state: 'visible', timeout: 7000 })
    return addressContainer
  }

  async validateDeliveryAddress(info: string[]) {
    const addressContainer = this.page.locator('#address_delivery')
    await addressContainer.waitFor({ state: 'visible', timeout: 7000 })

    for (const data of info) {
      await expect(addressContainer).toContainText(data)
    }
  }

  async placeOrder(comment: string) {
    await this.commentInput.fill(comment)
    await this.placeOrderButton.click()
  }

  async fillPaymentDetails(details: { name: string, number: string, cvc: string, month: string, year: string }) {
    await this.nameOnCardInput.fill(details.name)
    await this.cardNumberInput.fill(details.number)
    await this.cvcInput.fill(details.cvc)
    await this.expiryMonthInput.fill(details.month)
    await this.expiryYearInput.fill(details.year)
    await this.payButton.click()
  }

  async verifyOrderPlaced() {
    await expect(this.orderPlacedMessage).toHaveText('Order Placed!')
    await this.continueButton.click()
  }
}