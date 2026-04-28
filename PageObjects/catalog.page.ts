import { Page, Locator, expect } from '@playwright/test'

export class CatalogPage {
    readonly page: Page
    readonly productsMenuButton: Locator
    readonly continueShoppingButton: Locator
    readonly cartMenuButton: Locator
    readonly searchProductInput: Locator
    readonly searchButton: Locator
    readonly productList: Locator
    readonly brandFilterOptions: Locator
    readonly categoryFilterOptions: Locator
    readonly viewProductButton: Locator
    readonly productQuantityInput: Locator
    readonly addToCartButton: Locator

    constructor(page: Page) {
        this.page = page
        this.productsMenuButton = page.getByText('Products').first()
        this.continueShoppingButton = page.locator('.modal-footer').getByText('Continue Shopping')
        this.cartMenuButton = page.getByRole('link', { name: 'Cart' }).first()
        this.searchProductInput = page.getByPlaceholder('Search Product')
        this.searchButton = page.locator('#submit_search')
        this.productList = page.locator('.single-products')
        this.brandFilterOptions = page.locator('.brands-name')
        this.categoryFilterOptions = page.locator('#accordian')
        this.viewProductButton = page.getByText('View Product').first()
        this.productQuantityInput = page.locator('#quantity')
        this.addToCartButton = page.getByText('Add to cart')
    }

    async goToProducts() {
        await this.productsMenuButton.click()
    }

    async searchProduct(productName: string) {
        await this.searchProductInput.fill(productName)
        await this.searchButton.click()
        const results = this.page.locator('.single-products').filter({ hasText: productName })
        await expect(results).not.toHaveCount(0)
    }

    async detailedProductView(quantity: number) {
        await this.viewProductButton.click()
        await this.productQuantityInput.fill(quantity.toString())
        await this.addToCartButton.click()
        await this.continueShoppingButton.waitFor({ state: 'visible' })
        await this.continueShoppingButton.click()
        await this.continueShoppingButton.waitFor({ state: 'hidden' })
    }

    async searchAndAddMultipleProducts(productNames: string[]) {
        for (const name of productNames) {
            await this.searchProductInput.fill(name)
            await this.searchButton.click()

            const productCard = this.productList.filter({ hasText: name }).first()

            await expect(productCard).toBeVisible()

            await productCard.locator('.productinfo').getByText('Add to cart').click()

            await this.continueShoppingButton.waitFor({ state: 'visible' })
            await this.continueShoppingButton.click()

            await this.continueShoppingButton.waitFor({ state: 'hidden' })
        }
    }

    async searchInvalidProduct(productName: string) {
        await this.searchProductInput.fill(productName)
        await this.searchButton.click()
        const results = this.page.locator('.single-products').filter({ hasText: productName })
        await expect(results).toHaveCount(0)
    }

    async filterByBrand(brandName: string) {
        const brandToSelect = this.brandFilterOptions.getByRole('link', { name: new RegExp(brandName, 'i') })
        await brandToSelect.click()
        const brandProducts = this.productList.filter({ hasText: brandName })
        await expect(brandProducts).not.toHaveCount(0)
    }

    async filterByCategory(categoryName: string, subcategoryName: string) {
        const categoryParent = this.categoryFilterOptions.locator('div.panel-default', {
            has: this.page.getByRole('link', { name: categoryName })
        })

        const parentLink = categoryParent.getByRole('link', { name: categoryName })
        await parentLink.scrollIntoViewIfNeeded()
        await parentLink.click()

        const subcategoryLocator = categoryParent.getByRole('link', { name: subcategoryName })
        await subcategoryLocator.waitFor({ state: 'visible' })
        await subcategoryLocator.scrollIntoViewIfNeeded()
        await subcategoryLocator.click()

        const categoryProducts = this.productList.filter({ hasText: subcategoryName })
        await expect(categoryProducts).not.toHaveCount(0)
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

    async goToCart() {
        await this.cartMenuButton.click()
    }
}