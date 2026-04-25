import { Page, Locator, expect } from '@playwright/test'

export class CartPage {
    readonly page: Page
    readonly cartTable: Locator
    readonly productNames: Locator
    readonly cartRows: Locator
    readonly checkoutButton: Locator
    readonly cartButton: Locator
    readonly cartQuantity: Locator

    constructor(page: Page) {
        this.page = page
        this.cartButton = page.getByRole('link', { name: 'Cart' }).first()
        this.cartTable = page.locator('#cart_info_table')
        this.productNames = page.locator('#cart_info_table td.cart_description h4 a')
        this.cartRows = page.locator('#cart_info_table tbody tr')
        this.checkoutButton = page.locator('a.btn.btn-default.check_out')
        this.cartQuantity = page.locator('.cart_quantity')
    }
    async verifyCartIsVisible() {
        await expect(this.cartTable).toBeVisible()
    }

    async goToCart() {
        await this.cartButton.click()
    }
    async cleanCart() {
        await this.goToCart()
        const deleteButtons = this.page.locator('.cart_quantity_delete')

        while (await deleteButtons.count() > 0) {
            await deleteButtons.first().click()
            await this.page.waitForTimeout(500)
        }
    }

    async validateCartIsEmpty() {
        await expect(this.cartTable).not.toBeVisible()
    }

    async validateProductsInCart(expectedProducts: string[]) {
        for (const name of expectedProducts) {
            await expect(this.productNames.filter({ hasText: name }).first()).toBeVisible();
        }
    }

    async validateCartRowCount(count: number) {
        await expect(this.cartRows).toHaveCount(count);
    }

    async validateProductQuantity(expectedQuantity: string ) {
        await expect(this.cartQuantity).toHaveText(expectedQuantity)
    }

    async proceedToCheckout() {
        await this.page.waitForTimeout(500)
        await this.checkoutButton.click({ force: true })
    }
}