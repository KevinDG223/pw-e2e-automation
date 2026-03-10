import { Page, Locator, expect } from '@playwright/test'

export class CartPage{ 
    readonly page: Page
    readonly cartTable: Locator
    readonly productNames: Locator
    readonly cartRows: Locator
    readonly checkoutButton: Locator

    constructor(page: Page){
        this.page = page
        this.cartTable = page.locator('#cart_info_table')
        this.productNames = page.locator('#cart_info_table td.cart_description h4 a')
        this.cartRows = page.locator('#cart_info_table tbody tr')
        this.checkoutButton = page.locator('a.btn.btn-default.check_out')
    }
    async verifyCartIsVisible(){
        await expect(this.cartTable).toBeVisible()
    }
    async cleanCart() {
        await this.page.goto('http://automationexercise.com/view_cart')
        const deleteButtons = this.page.locator('.cart_quantity_delete')
        
        while (await deleteButtons.count() > 0) {
            await deleteButtons.first().click()
            await this.page.waitForTimeout(500)
        }
    }

    async validateProductsInCart(expectedProducts: string[]){
        const actualNames = await this.productNames.allTextContents()

        for (const name of expectedProducts){
            expect(actualNames).toContain(name)
        }
    }

    async validateCartRowCount(count: number) {
        await expect(this.cartRows).toHaveCount(count);
  }

    async proceedToCheckout(){
        await this.page.waitForTimeout(500)
        await this.checkoutButton.click({force: true})
    }
}