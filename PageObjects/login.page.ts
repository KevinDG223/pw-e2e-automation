import { Page, Locator, expect } from '@playwright/test'

export class LoginPage {
    readonly page: Page
    readonly loginMenuButton: Locator
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly loginButton: Locator
    readonly logoutButton: Locator
    readonly loggedInText: Locator

    constructor(page: Page){
        this.page = page
        this.loginMenuButton = page.getByText('Signup / Login')
        this.emailInput = page.getByPlaceholder('Email Address').first()
        this.passwordInput = page.getByPlaceholder('Password')
        this.loginButton = page.getByRole('button', { name: 'Login' })
        this.logoutButton = page.getByText('Logout')
        this.loggedInText = page.getByText('Logged in as')
    }

    async goto() {
    await this.page.goto('http://automationexercise.com');
    }

    async login(email: string, pass: string) {
    await this.loginMenuButton.click()
    await this.emailInput.fill(email)
    await this.passwordInput.fill(pass)
    await this.loginButton.click()
    await expect(this.loggedInText).toBeVisible()
  }

  async logout() {
    await this.logoutButton.click()
  }
}