import {expect, test} from "@playwright/test"

test('Sign In Test', async ({page}) => {

    const usernameField = page.locator('#username')
    const passwordField = page.locator('#password')
    const signInButton = page.locator('[type="submit"]')
    const cardTitles = page.locator('.card-body a')

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await usernameField.fill('Jayesh Domadiya')
    await passwordField.fill('Test@123')
    await page.locator('#terms').check()
    await signInButton.click()

    const errorMessage = await page.locator('[style*="block"]').textContent()

    await expect(errorMessage).toContain('Incorrect username/password.')
    await expect(page.locator('[style*="block"]')).toContainText('Incorrect')

    await usernameField.fill('')
    await usernameField.fill('rahulshettyacademy')
    await passwordField.fill('learning')
    await signInButton.click()

    await console.log(page.locator('.card-body a').first().textContent())
    await console.log(page.locator('.card-body a').nth(1).textContent())
    await console.log(page.locator('.card-body a').last().textContent())

    const allTitles = cardTitles.allTextContents()
    console.log(allTitles)

});