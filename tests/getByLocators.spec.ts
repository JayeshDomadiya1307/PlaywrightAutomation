import {expect, test} from "@playwright/test"

test('Get By Locators', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/')

    // await page.getByRole('textbox', {name: 'Name'}).fill('Textbox fill by automation')
    await page.getByPlaceholder('Password').fill('Placeholder text filled')

    await page.getByLabel('Gender').selectOption('Female')
    await page.getByLabel('Check me out if you Love IceCreams!').check()
    await page.getByLabel('Employed').click()
    // await page.getByText('Submit').click()
    await page.getByRole('button', {name: 'Submit'}).click()
    await page.getByText('Success! The Form has been submitted successfully!.').isVisible()

    await page.getByRole('link', {name: 'Shop'}).click()

    // Showing how to filter from multiple elements and choose based on getBy locators
    await page.locator('app-card').filter({hasText: 'Nokia Edge'}).getByRole('button').click()
});