import {test,expect} from '@playwright/test';

test('InputBox', async({page})=>{

    await page.goto('https://demoqa.com/');
    await page.locator("//h5[normalize-space()='Elements']").click();
    await page.waitForTimeout(3000);

    //soft assertions
    const textbox = await page.locator("//span[normalize-space()='Text Box']");

    await expect.soft(textbox).toBeVisible();

    await page.locator("//span[normalize-space()='Text Box']").click();

    const locname= await page.getByPlaceholder("Full Name");
    await expect(locname).toBeEditable();
    await expect(locname).toBeEmpty();

    await page.getByPlaceholder("Full Name").fill("Sue Nayira");

    await page.waitForTimeout(3000);
})