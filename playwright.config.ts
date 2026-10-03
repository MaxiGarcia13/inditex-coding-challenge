import process, { loadEnvFile } from 'node:process';
import { defineConfig, devices } from '@playwright/test';

loadEnvFile('.env');

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  retries: 2,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: process.env.APP_URL!,
    testIdAttribute: 'data-test-id',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: process.env.APP_URL!,
    reuseExistingServer: !process.env.CI,
  },
});
