import { Page, Locator, expect } from '@playwright/test'

export interface UserDetails {
    gender: 'Mr' | 'Mrs'
    password: string
    day: string
    month: string
    year: string
    newsletter: boolean
    firstName: string
    lastName: string
    company: string
    address: string
    country: string
    state: string
    city: string
    zipcode: string
    mobile: string
}

export class RegisterPage {
    readonly page: Page
    readonly signupMenuButton: Locator
    readonly nameInput: Locator
    readonly emailInput: Locator
    readonly signupButton: Locator
    readonly titleRadioButtons: Locator
    readonly passwordInput: Locator
    readonly daySelect: Locator
    readonly monthSelect: Locator
    readonly yearSelect: Locator
    readonly newsletterCheckbox: Locator
    readonly firstNameInput: Locator
    readonly lastNameInput: Locator
    readonly companyInput: Locator
    readonly address1Input: Locator
    readonly countrySelect: Locator
    readonly stateInput: Locator
    readonly cityInput: Locator
    readonly zipcodeInput: Locator
    readonly mobileNumberInput: Locator
    readonly createAccountButton: Locator
    readonly accountCreatedText: Locator
    readonly accountCreatedContinueButton: Locator
    readonly deleteAccountButton: Locator
    readonly accountDeletedText: Locator
    readonly deleteContinueButton: Locator
    readonly existingEmailError: Locator
    readonly emptyFieldsError: Locator

    constructor(page: Page) {
        this.page = page
        this.signupMenuButton = page.getByText('Signup / Login')
        this.nameInput = page.getByPlaceholder('Name')
        this.emailInput = page.locator('[data-qa="signup-email"]')
        this.signupButton = page.getByRole('button', { name: 'Signup' })
        this.titleRadioButtons = page.locator('input[name="title"]')
        this.passwordInput = page.locator('#password')
        this.daySelect = page.locator('#days')
        this.monthSelect = page.locator('#months')
        this.yearSelect = page.locator('#years')
        this.newsletterCheckbox = page.locator('#newsletter')
        this.firstNameInput = page.locator('#first_name')
        this.lastNameInput = page.locator('#last_name')
        this.companyInput = page.locator('#company')
        this.address1Input = page.locator('#address1')
        this.countrySelect = page.locator('#country')
        this.stateInput = page.locator('#state')
        this.cityInput = page.locator('#city')
        this.zipcodeInput = page.locator('#zipcode')
        this.mobileNumberInput = page.locator('#mobile_number')
        this.createAccountButton = page.getByRole('button', { name: 'Create Account' })
        this.accountCreatedText = page.getByText('Account Created!')
        this.accountCreatedContinueButton = page.getByRole('link', { name: 'Continue' })

        this.deleteAccountButton = page.getByRole('link', { name: 'Delete Account' })
        this.accountDeletedText = page.getByText('Account Deleted!')
        this.deleteContinueButton = page.getByRole('link', { name: 'Continue' })

        this.existingEmailError = page.getByText('Email Address already exist!')
        this.emptyFieldsError = page.getByText('New User Signup!')

    }

    async signUp(name: string, email: string) {
        await this.signupMenuButton.click()
        await this.nameInput.fill(name)
        await this.emailInput.fill(email)
        await this.signupButton.click()
    }
    get newnameInput() { return this.page.getByPlaceholder('Name') }
    async getNameValidationMessage() {
        // Esto extrae el mensaje que el navegador genera internamente
        return await this.newnameInput.evaluate((node: HTMLInputElement) => node.validationMessage)
    }

    async register(details: UserDetails) {
        const genderIndex = details.gender === 'Mr' ? 0 : 1
        await this.titleRadioButtons.nth(genderIndex).check()

        await this.passwordInput.fill(details.password)
        await this.daySelect.selectOption(details.day)
        await this.monthSelect.selectOption(details.month)
        await this.yearSelect.selectOption(details.year)

        if (details.newsletter) await this.newsletterCheckbox.check()

        await this.firstNameInput.fill(details.firstName)
        await this.lastNameInput.fill(details.lastName)
        await this.companyInput.fill(details.company)
        await this.address1Input.fill(details.address)
        await this.countrySelect.selectOption(details.country)
        await this.stateInput.fill(details.state)
        await this.cityInput.fill(details.city)
        await this.zipcodeInput.fill(details.zipcode)
        await this.mobileNumberInput.fill(details.mobile)
        await this.createAccountButton.click()
    }

    async continueAfterRegister() {
        await this.accountCreatedContinueButton.click()
    }

    async deleteAccount() {
        await this.deleteAccountButton.click()
    }

    async continueAfterDelete() {
        await this.deleteContinueButton.click()
    }
}