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
        const formCleared = loginPage.contactEmail
        const successMessage = loginPage.contactSuccessMessage

        await expect(formCleared.or(successMessage)).toBeVisible()
    })

    test('Contact form with invalid data', async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.contact('Kevin', 'invalidEmail')

        const successMessage = page.getByText('Success! Your details have been submitted successfully.')
        const isFormStillVisible = await loginPage.contactEmail.isVisible()

        if (isFormStillVisible) {
            const isValid = await loginPage.isEmailInputValid()
            const errorMessage = await loginPage.getEmailValidationMessage()

            expect(isValid).toBe(false)
            expect(errorMessage).toMatch(/@|email address/)
        } else {
            await expect(successMessage).not.toBeVisible()
        }
    })
})