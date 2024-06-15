import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  reporter: "html",
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },

  use: {
    trace: "on-first-retry",
    screenshot: "on",
    headless: false,
    browserName: 'chromium'
  },

  /* Configure projects for major browsers */
  /* projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

   {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }, 
  ],*/
});
