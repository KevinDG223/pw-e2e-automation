import { Page, Locator, expect} from '@playwright/test'

export class CatalogPage {
    readonly page: Page
    readonly productsMenuButton: Locator
    readonly continueShoppingButton: Locator
    readonly cartMenuButton: Locator



    constructor(page: Page){
        this.page = page
        this.productsMenuButton = page.getByText('Products').first()
        this.continueShoppingButton = page.locator('.modal-footer').getByText('Continue Shopping')
        this.cartMenuButton = page.getByRole('link', { name: 'Cart'}).first()
    }

    async goToProducts(){
        await this.productsMenuButton.click()
    }

    async navigateAndAdd(categoryId: string, subCategory: string, productNames: string[]) {
        const categoryLink = this.page.locator(`a[href="${categoryId}"]`)
        await categoryLink.scrollIntoViewIfNeeded()
        await categoryLink.click()
        
        const subCategoryLink = this.page.locator(categoryId).getByText(subCategory)
        await subCategoryLink.waitFor({ state: 'visible' })
        await subCategoryLink.click()

        for (const name of productNames) {
            const productCard = this.page.locator('.single-products').filter({ hasText: name })
            const addToCartBtn = productCard.locator('.productinfo .add-to-cart')
            await addToCartBtn.scrollIntoViewIfNeeded()
            await addToCartBtn.click({ force: true })
            const successModal = this.page.locator('#cartModal')
            try {
                await expect(successModal).toBeVisible({ timeout: 500 })
            } catch (e) {
                await addToCartBtn.click({ force: true })
                await expect(successModal).toBeVisible({ timeout: 500 })
            }

            await this.continueShoppingButton.click()
            await expect(successModal).toBeHidden()
        }
    }

    async goToCart(){
        await this.cartMenuButton.click()
    }
}