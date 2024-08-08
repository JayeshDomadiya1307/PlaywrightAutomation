import { expect, test } from "@playwright/test";

test("Handle child windows", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentLink = page.locator('[href*="documents-request"]');

  await expect(documentLink).toHaveAttribute("class", "blinkingText");
  /* const newPage = await Promise.all([context.waitForEvent('page'),
    documentLink.click()]) */

  // text = await newPage.locator('.im-para.red').textContent()
  // console.log(text)

  const pagePromise = context.waitForEvent("page");
  await documentLink.click();
  const newPage  = await pagePromise;
  await newPage.waitForLoadState()
  const text = await newPage.locator('.im-para.red').textContent()
  await expect(text).toContain('rahulshettyacademy')
  
});
