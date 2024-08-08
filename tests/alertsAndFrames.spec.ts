import {test, expect} from "@playwright/test"
import exp from "constants";

test('Alers and iFrames', async ({page}) => {
    await page.goto('https://google.com/')
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    

    await page.goBack()
    await page.goForward()

    await page.locator('#show-textbox').click()
    await expect(page.locator('#displayed-text')).toBeVisible()
    await page.locator('#hide-textbox').click()
    await expect(page.locator('#displayed-text')).toBeHidden()

    await page.on('dialog', dialog => dialog.accept())
    await page.locator('#alertbtn').click()
    await page.locator('#confirmbtn').click()
    await page.locator('#mousehover').hover()

    const frame =  page.frameLocator('#courses-iframe')
    await frame.locator('li a[href*="lifetime-access"]:visible').nth(1).click()
    const text = await page.locator('.text h2').textContent()

    console.log(text?.split(" ")[1])
    
});