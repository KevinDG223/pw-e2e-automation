import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 60 * 1000,
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: [
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],
  use: {
    headless: !!process.env.CI,
    video: 'retain-on-failure',
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      dependencies: ['chromium'],  
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      dependencies: ['firefox'],
    },
  ],
})
