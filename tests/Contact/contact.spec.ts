import { test, expect } from '../../utils/baseTest'
import { RegisterPage, UserDetails } from '../../PageObjects/register.page'
import { LoginPage } from '../../PageObjects/login.page'

test.describe('Contact us form validation', () => {
    test('Contact form with valid data', async ({ page }) => {
        const loginPage = new LoginPage(page)

        await loginPage.goto()
        await loginPage.contact('Kevin', 'kevin@test.com')
    })

    test('Contact form with invalid data', async ({ page }) => {
        const loginPage = new LoginPage(page)

        await loginPage.goto()
        await loginPage.contact('Kevin', 'invalid@invalid.com')
    })
})