# 🧪 Playwright E2E Automation — AutomationExercise

![Playwright](https://img.shields.io/badge/Playwright-TypeScript-blue?logo=playwright)
![CI](https://img.shields.io/badge/CI-GitHub_Actions-green?logo=githubactions)
![Browsers](https://img.shields.io/badge/Browsers-Chromium%20%7C%20Firefox%20%7C%20WebKit-orange)
![Architecture](https://img.shields.io/badge/Architecture-POM-purple)
![Report](https://img.shields.io/badge/Report-Allure-yellow)

Automated E2E test suite built with **Playwright + TypeScript** covering the core functional areas of an e-commerce application: authentication, product catalog, cart management, checkout, and contact form validation.

---

## 📋 Documentation

| Document | Description |
|----------|-------------|
| [📄 Test Plan](docs/test-plan.pdf) | Scope, objectives, strategy, risk analysis |
| [📊 Test Cases](docs/test-cases.xlsx) | 30 test cases with expected results and execution status |

---

## ✅ Test Coverage

The suite is organized into **5 spec files** plus an end-to-end scenario, each targeting a specific functional area:

| Spec | Area | Scenarios |
|------|------|-----------|
| `auth.spec.ts` | Authentication | Registration, login/logout, invalid credentials, duplicate email, empty fields |
| `products.spec.ts` | Product Catalog | Search, filter by brand, filter by category, invalid search |
| `carts.spec.ts` | Cart Management | Add products, update quantity, remove products, cart persistence after re-login |
| `checkout.spec.ts` | Checkout | Full order placement, checkout without login, address validation, empty payment fields |
| `contact.spec.ts` | Contact Form | Valid submission, form validation errors |
| `e2e/buyingFlow.spec.ts` | End-to-End | Login → Catalog → Cart → Checkout → Order confirmation → Logout |

---

## 🧱 Project Architecture

The framework follows the **Page Object Model (POM)** design pattern to ensure maintainability and scalability.

```
project-root
│
├── tests/
│   ├── auth.spec.ts
│   ├── products.spec.ts
│   ├── carts.spec.ts
│   ├── checkout.spec.ts
│   ├── contact.spec.ts
│   └── e2e/
│       └── buyingFlow.spec.ts
│
├── PageObjects/
│   ├── login.page.ts
│   ├── register.page.ts
│   ├── catalog.page.ts
│   ├── cart.page.ts
│   ├── checkout.page.ts
│   └── contact.page.ts
│
├── utils/
│   └── baseTest.ts
│
├── data/
│   └── testData.json
│
├── docs/
│   ├── test-plan.pdf
│   └── test-cases.xlsx
│
├── playwright.config.ts
└── .github/workflows/
    └── playwright.yml
```

### Responsibilities

**Tests** — High-level business flows organized by feature. Each spec uses `test.describe` with independent, self-contained test cases and explicit assertions.

**Page Objects** — Encapsulate all UI interactions and selectors, keeping the spec layer clean and readable.

**Base Test / Fixtures** — Custom Playwright fixture that handles ad blocking and popup dismissal on every test, ensuring a stable environment across all specs.

**Test Data** — External JSON file for product searches and reusable values, keeping specs free of hardcoded data.

---

## ⚙️ Tech Stack

| Tool | Purpose |
|------|---------|
| TypeScript | Language |
| Playwright | Test framework |
| Page Object Model | Architecture pattern |
| GitHub Actions | CI/CD pipeline |
| Allure Report | Test reporting |
| JSON | Test data management |

---

## 🚀 Run Tests

```bash
npm install
npx playwright install
npx playwright test
```

Run a specific spec:

```bash
npx playwright test tests/auth.spec.ts
```

Run with UI mode:

```bash
npx playwright test --ui
```

Generate Allure report:

```bash
npx allure generate allure-results --clean && npx allure open
```

---

## 🔁 CI Integration

Tests run automatically on every push via **GitHub Actions** across three browsers: **Chromium, Firefox, and WebKit**.

Pipeline steps:
1. Install dependencies
2. Install Playwright browsers
3. Execute full test suite (headless)
4. Generate Allure results
5. Upload HTML report as artifact

<img width="1796" alt="GitHub Actions run" src="https://github.com/user-attachments/assets/8a32adb4-57eb-4656-92c6-4ef54d124d3f" />

---

## 🎬 Test Execution

Full E2E buying flow demo:

[E2E-BuyingFlow.webm](https://github.com/user-attachments/assets/75c5087d-694d-4529-a2d2-7a0480106a93)

---

## 🧠 Skills Demonstrated

- End-to-end test automation with Playwright + TypeScript
- Page Object Model for scalable, maintainable test architecture
- `test.describe` grouping with independent, self-contained test cases
- `beforeEach` hooks for DRY test setup and stable state management
- Explicit assertions on every test case
- Fixture-based approach for reusable cross-cutting concerns (ad/popup handling)
- Data-driven testing with external JSON
- Cross-browser testing across Chromium, Firefox, and WebKit
- CI/CD execution with GitHub Actions
- Allure Report integration for visual test reporting
- QA documentation: Test Plan and Test Cases
