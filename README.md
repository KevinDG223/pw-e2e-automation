Playwright | TypeScript | GitHub Actions | E2E Testing

🧪 Playwright E2E Automation – Buying Flow

Automated End-to-End test suite built with Playwright + TypeScript that validates a complete e-commerce purchasing flow.

This project demonstrates QA Automation best practices including:
- Page Object Model (POM)
- Test data separation
- Reusable fixtures
- Robust locators
- Handling unstable UI elements (ads/popups)
- CI execution with GitHub Actions

The test simulates a real user purchasing products from multiple categories and completing the checkout process.

📌 Test Scenario

The automated test covers the following E2E flow:
1. Navigate to the application
2. Login with valid credentials
3. Clean the cart to ensure a stable test state
4. Navigate through multiple product categories
5. Randomly select products from each category
6. Add products to the cart
7. Validate cart contents
8. Validate number of items
9. Proceed to checkout
10. Validate delivery address
11. Fill payment information
12. Place the order
13. Verify successful order confirmation
14. Logout

This ensures that the core purchasing workflow works correctly from start to finish.

🧱 Project Architecture

The framework follows the Page Object Model (POM) design pattern to improve maintainability and scalability.
```
project-root
│
├── tests
│   └── AutomationExercise.spec.ts
│
├── PageObjects
│   ├── login.page.ts
│   ├── catalog.page.ts
│   ├── cart.page.ts
│   └── checkout.page.ts
│
├── data
│   └── testData.json
│
├── baseTest.ts
├── playwright.config.ts
│
└── .github/workflows
    └── playwright.yml
```


### Responsibilities

**Tests**
- Contains high-level business flows

**Page Objects**
- Encapsulate UI interactions
- Improve readability and reusability

**Test Data**
- External JSON file for product categories and selections

**Base Test**
- Custom Playwright fixture
- Handles ad blocking and popup handling

⚙️ Tech Stack

- Language: TypeScript
- Framework: Playwright
- Architecture: Page Object Model
- CI/CD: GitHub Actions
- Test Data: JSON
- Assertions: Playwright Test Assertions

## Run Tests

npm install
npx playwright install
npx playwright test

🔁 CI Integration

The project includes GitHub Actions to run automated tests on every push.

Pipeline steps include:

- Install dependencies
- Install Playwright browsers
- Execute test suite
- Generate test results

This ensures tests can run automatically in a CI environment.

<img width="1796" height="538" alt="image" src="https://github.com/user-attachments/assets/8a32adb4-57eb-4656-92c6-4ef54d124d3f" />


## Test Execution

Example of the automated E2E buying flow:

[E2E-BuyingFlow.webm](https://github.com/user-attachments/assets/75c5087d-694d-4529-a2d2-7a0480106a93)

## 🧠 Skills Demonstrated

- End-to-End test automation with Playwright
- Page Object Model architecture
- Data-driven testing with JSON
- Handling unstable UI elements and ads
- Writing reusable test components
- CI execution with GitHub Actions
