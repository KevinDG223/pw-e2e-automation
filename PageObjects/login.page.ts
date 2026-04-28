import { Page, Locator, expect } from '@playwright/test'

export class LoginPage {
  readonly page: Page
  readonly loginMenuButton: Locator
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator
  readonly logoutButton: Locator
  readonly loggedInText: Locator
  readonly invalidCredentialsError: Locator
  readonly contactUSButton: Locator
  readonly contactName: Locator
  readonly contactEmail: Locator
  readonly contactSubject: Locator
  readonly contactMessage: Locator
  readonly contactSubmit: Locator
  readonly contactSuccessMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.loginMenuButton = page.getByText('Signup / Login')
    this.emailInput = page.getByPlaceholder('Email Address').first()
    this.passwordInput = page.getByPlaceholder('Password')
    this.loginButton = page.getByRole('button', { name: 'Login' })
    this.logoutButton = page.getByText('Logout')
    this.loggedInText = page.getByText('Logged in as')
    this.invalidCredentialsError = page.getByText('Your email or password is incorrect!')

    this.contactUSButton = page.getByText('Contact us')
    this.contactName = page.getByPlaceholder('Name')
    this.contactEmail = page.locator('[name="email"]')
    this.contactSubject = page.getByPlaceholder('Subject')
    this.contactMessage = page.getByPlaceholder('Your Message Here')
    this.contactSubmit = page.locator('[name="submit"]')
    this.contactSuccessMessage = page.getByText('Success! Your details have been submitted successfully.').first()
  }

  async goto() {
    await this.page.goto('http://automationexercise.com')
  }

  async login(email: string, pass: string) {
    await this.loginMenuButton.click()
    await this.emailInput.fill(email)
    await this.passwordInput.fill(pass)
    await this.loginButton.click()
  }

  async contact(name: string, email: string) {
    await this.page.on('dialog', dialog => dialog.accept())

    await this.contactUSButton.click()
    await this.contactName.fill(name)
    await this.contactEmail.fill(email)
    await this.contactSubject.fill('Test')
    await this.contactMessage.fill('This is a test')
    await this.contactSubmit.click()
  }

  async getEmailValidationMessage() {
    return await this.contactEmail.evaluate((input: HTMLInputElement) => input.validationMessage);
  }

  async isEmailInputValid() {
    return await this.contactEmail.evaluate((input: HTMLInputElement) => input.checkValidity());
  }

  async logout() {
    await this.logoutButton.click()
  }
}