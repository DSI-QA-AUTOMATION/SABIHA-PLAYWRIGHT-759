import {test,expect} from '@playwright/test';

test('RadioButton', async({page})=>{

    await page.goto('https://demoqa.com/')
    await page.locator("//h5[normalize-space()='Elements']").click();
    await page.waitForTimeout(3000);

    

    await page.locator("//span[normalize-space()='Radio Button']").click();

     await page.locator("//label[normalize-space()='Yes']").check();

    const locRadio = await page.locator("//label[normalize-space()='Yes']")

    await expect(locRadio).toBeChecked();
})