import {test,expect} from '@playwright/test';


test('Locator', async({page})=>{

    await page.goto('https://www.demoblaze.com/')


    //property
    await page.locator('id=login2').click();
    //locator--CSS
    await page.locator('#loginusername').fill("pavanol");
    await page.locator('#loginpassword').fill("test@123");
    await page.click("//button[normalize-space()='Log in']");
    const LogLink = await page.locator("//a[@id='logout2']")

    await expect(LogLink).toBeVisible();

    //await page.click(LogLink);

    await page.close()
})