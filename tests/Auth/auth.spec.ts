import { test, expect } from '../../utils/baseTest'
import { RegisterPage, UserDetails } from '../../PageObjects/register.page'
import { LoginPage } from '../../PageObjects/login.page'

const userDetails: UserDetails = {
    gender: 'Mr',
    password: 'Test1234',
    day: '10',
    month: 'May',
    year: '1990',
    newsletter: true,
    firstName: 'Kevin',
    lastName: 'Testing',
    company: 'Testing Co',
    address: 'Evergreen Terrace 123',
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    zipcode: '90001',
    mobile: '1234567890'
}
test.describe('User Registration and Deletion', () => {
    test('User registration', async ({ page }) => {
        const registerPage = new RegisterPage(page)
        const loginPage = new LoginPage(page)

        await loginPage.goto()
        await registerPage.signUp('Kevin Testing', 'kevin.testing@example.com')
        await registerPage.register(userDetails)
    })

    test('User deletion', async ({ page }) => {
        const registerPage = new RegisterPage(page)
        const loginPage = new LoginPage(page)

        await loginPage.goto()
        await loginPage.login('kevin.testing@example.com', 'Test1234')
        await registerPage.deleteAccount()
    })

    test('Login and logout with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.goto()
        await loginPage.login('kevin-pw@test.com', 'Test1234')
        await expect(loginPage.loggedInText).toBeVisible()
        await loginPage.logout()
    })

    test('User registration with existing email', async ({ page }) => {
        const registerPage = new RegisterPage(page)
        const loginPage = new LoginPage(page)

        await loginPage.goto()
        await registerPage.signUp('Kevin Testing', 'kevin-pw@test.com')
        await expect(registerPage.existingEmailError).toBeVisible()
    })

    test('Login with invalid password', async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.goto()
        await loginPage.login('kevin-pw@test.com', 'InvalidPassword')
        await expect(loginPage.invalidCredentialsError).toBeVisible()
    })

    test('Login with invalid email', async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.goto()
        await loginPage.login('invalid.email@test.com', 'InvalidPassword')
        await expect(loginPage.invalidCredentialsError).toBeVisible()
    })

    test('Register with empty fields', async ({ page }) => {
        const registerPage = new RegisterPage(page)
        const loginPage = new LoginPage(page)

        await loginPage.goto()
        await registerPage.signUp('', '')
        await expect(registerPage.emptyFieldsError).toBeVisible()
    })
})