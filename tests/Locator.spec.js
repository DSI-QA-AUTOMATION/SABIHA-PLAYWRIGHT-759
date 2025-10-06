import {test,expect} from '@playwright/test';


test('Locator', async({page})=>{

    await page.goto('https://demoqa.com/text-box')


    //property
    await page.locator('id=userName').fill("Harry Potter");
    //locator--CSS
    await page.locator('#userEmail').fill("demo@gmail.com");
    await page.locator('#currentAddress').fill("Atlanta,USA");
   
   await page.waitForTimeout(4000);

    await page.close()
})