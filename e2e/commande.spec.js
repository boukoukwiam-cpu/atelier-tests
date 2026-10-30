
const { test, expect } = require('@playwright/test');

test('verifier que le serveur est accessible', async ({ request }) => {
  const response = await request.get('http://localhost:3000/health');

  expect(response.status()).toBe(200);

  const data = await response.json();

  expect(data.status).toBe('OK');
});
