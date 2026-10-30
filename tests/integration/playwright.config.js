
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './e2e',
  testMatch: '**/*.spec.js',
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000'
  }
});
