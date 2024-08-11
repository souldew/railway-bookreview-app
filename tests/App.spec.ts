import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  const emailInput = page.locator("input[type='email']");
  // 異常系
  await emailInput.fill("invalid");
  const isInvalid = await emailInput.evaluate((e) => e.matches(":invalid"));
  expect(isInvalid).toBeTruthy();
  // 正常系
  emailInput.fill("correct@gmail");
  const isValid = await emailInput.evaluate((e) => e.matches(":valid"));
  expect(isValid).toBeTruthy();
});