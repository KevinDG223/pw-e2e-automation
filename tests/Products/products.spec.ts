import { test } from '../../utils/baseTest'
import { CatalogPage } from '../../PageObjects/catalog.page'
import { LoginPage } from '../../PageObjects/login.page'

test.describe('Product Catalog Tests', () => {
    test.beforeEach(async ({ page }) => {
        const catalogPage = new CatalogPage(page)
        const loginPage = new LoginPage(page)

        await loginPage.goto()
        await catalogPage.goToProducts()
    })
    
    test('Search for a product', async ({ page }) => {
        const catalogPage = new CatalogPage(page)
        await catalogPage.searchProduct('T-shirt')       
    })

    test('Filter products by brand', async({ page }) =>{
        const catalogPage = new CatalogPage(page)
        await catalogPage.filterByBrand('Polo')
    })

    test('Filter products by category', async({ page }) =>{
        const catalogPage = new CatalogPage(page)
        await catalogPage.filterByCategory('Women', 'Dress')
    })

    test('Search for an invalid product', async ({ page }) => {
        const catalogPage = new CatalogPage(page)
        await catalogPage.searchInvalidProduct('XYZ123NonExistent')     
    })
})