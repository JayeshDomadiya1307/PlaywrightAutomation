import {expect, test} from "@playwright/test"

test('Browser Context Test', async ({browser}) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await expect(page).toHaveTitle('Practice Page')
});

test('Test without browser context', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/#/practice-project1')
    await expect(page).toHaveTitle('Selenium, API Testing, Software Testing & More QA Tutorials  | Rahul Shetty Academy')
});