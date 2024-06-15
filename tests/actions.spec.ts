import { expect, test } from "@playwright/test";

test("All Actions Tests", async ({ page }) => {
  const radioButton = page.locator(".radiotextsty");
  const dropDown = page.locator('[data-style="btn-info"]');
  const checkBox = page.locator("#terms");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.locator("#username").fill("rahulshettyacademy ");
  await page.locator("#password").fill("learning ");

  await radioButton.nth(1).click();
  await page.locator("#okayBtn").click();
  expect(await radioButton.nth(1)).toBeChecked();

  await dropDown.selectOption("Consultant");
  await checkBox.click();
  await checkBox.check();
  await checkBox.uncheck();
  expect(await checkBox.isChecked()).toBeFalsy();
});
