import { test, expect, request } from "@playwright/test";

const loginPayload = {
  userEmail: "jayeshdomadiya07@gmail.com",
  userPassword: "Job@1995",
};
const orderPayload = {
  orders: [{ country: "Cuba", productOrderedId: "6581ca979fd99c85e8ee7faf" }],
};

let token;
let orderId;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: loginPayload,
    }
  );

  expect((await loginResponse).ok()).toBeTruthy();

  const loginResponseJson = await loginResponse.json();
  token = loginResponseJson.token;
  console.log(token);

  const orderResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
      data: orderPayload,
      headers: {
        Authentication: token,
        "Content-Type": "application/json",
      },
    }
  );

  const orderResponseJson = await orderResponse.json();
  orderId = orderResponseJson.orders[0];
});

test("Place the order using API", async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  await page.goto("https://rahulshettyacademy.com/client");
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
