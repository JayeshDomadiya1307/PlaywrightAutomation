import {expect, test} from "@playwright/test"

test('Login to client auth', async ({page}) => {
    
    await page.goto('https://rahulshettyacademy.com/client')
    await page.locator('#userEmail').fill('jayeshdomadiya07@gmail.com')
    await page.locator('#userPassword').fill('Job@1995')
    await page.locator('#login').click()

    await page.url().includes('https://rahulshettyacademy.com/client/dashboard/dash')
    await page.waitForLoadState('networkidle')

    // await page.locator('.card-body b ').first().waitFor()
    const cardTitles = await page.locator('.card-body b ').allTextContents()

    expect(cardTitles).toHaveLength(3)
    console.log(cardTitles)
});