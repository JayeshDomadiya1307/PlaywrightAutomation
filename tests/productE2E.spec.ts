import { expect, test } from "@playwright/test";

test.only("ECommerce End to End Flow of Purchase product", async ({ page }) => {
  const username = "jayeshdomadiya07@gmail.com";
  const password = "Job@1995";
  let orderId;

  const products = page.locator(".card-body");
  const productName = "ADIDAS ORIGINAL";
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill(username);
  await page.locator("#userPassword").fill(password);
  await page.locator("#login").click();
  await page.waitForLoadState("networkidle");

  await page.url().includes("dashboard/dash");

  const titles = await page.locator(".card-body b").allTextContents();
  const count = products.count();

  for (let i = 0; i < (await count); i++) {
    const searchProduct = products.nth(i).locator("b").textContent();
    if ((await searchProduct) === productName) {
      await products.nth(i).locator("text = Add To Cart").click();
      break;
    }
  }

  await page.locator('[routerlink*="cart"]').click();

  await page.locator("div li").first().waitFor();
  const bool = await page.locator('h3:has-text("ADIDAS ORIGINAL")').isVisible();
  expect(bool).toBeTruthy();

  await page.locator("text=Checkout").click();
  await page
    .locator('[placeholder*="Country"]')
    .pressSequentially("India", { delay: 100 });

  await page.waitForSelector(".ta-results");
  const elements = await page.$$(".ta-results");

  /* const dropdown = await page.locator(".ta-results");
  dropdown.waitFor();
    await page.waitForTimeout(5000);
    const optionsCount = await dropdown.locator("button").count();

    for (let i = 0; i < dropdown.length ; i++) {
      const searchResult = await dropdown.locator("button").nth(i).textContent();
      if (searchResult?.includes("India")) {
        await dropdown.locator("button").nth(i).click();
        break;
      }
    } */

  for (let i = 0; i < elements.length; i++) {
    const text = await elements[i].textContent();

    if (text?.includes("India")) {
      await elements[i].click();
      break;
    }
  }
  await expect(page.locator('.user__name [type="text"]').first()).toHaveText(
    username
  );
  await page.locator(".action__submit").click();
  await expect(page.locator(".hero-primary")).toHaveText(
    " Thankyou for the order. "
  );

  orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  // orderId = 666db51bae2afd4c0bffb3db
  console.log(orderId);

  await page.locator('[routerlink*="myorders"]').first().click();

  const tableRows = await page.locator("tbody tr");

  for (let i = 0; i < (await tableRows.count()); i++) {
    const searchOrderId = await tableRows.nth(i).locator("th").textContent();

    if (orderId?.includes(searchOrderId)) {
      await tableRows.nth(i).locator("button").first().click();
      break;
    }
  }

  const orderIdConfirm = await page.locator(".col-text").textContent();
  await expect(orderId).toContain(orderIdConfirm);
});
