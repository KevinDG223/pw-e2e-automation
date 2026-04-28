import { test, expect } from '../../utils/baseTest'
import { LoginPage } from '../../PageObjects/login.page'

test.describe('Contact us form validation', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.goto()
    })
    test('Contact form with valid data', async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.contact('Kevin', 'kevin@test.com')
        await expect(loginPage.contactEmail).toBeEmpty()
    })

    test('Contact form with invalid data', async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.contact('Kevin', 'invalidEmail')
        const isValid = await loginPage.isEmailInputValid()
        expect(isValid).toBe(false)
        const errorMessage = await loginPage.getEmailValidationMessage()
        expect(errorMessage).toContain('@')
    })
})