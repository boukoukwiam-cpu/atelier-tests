const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './e2e',

    reporter: [
        ['list'],
        ['html', { open: 'never' }]
    ],

    use: {
        baseURL: 'http://localhost:3000'
    },

   webServer: {
    command: 'node src/server.js',
    url: 'http://127.0.0.1:3000/health',
    reuseExistingServer: false,
    timeout: 60000,
    stdout: 'pipe',
    stderr: 'pipe'
}
});