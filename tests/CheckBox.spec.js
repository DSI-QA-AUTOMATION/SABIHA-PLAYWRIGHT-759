import {test,expect} from '@playwright/test';


test('Check Box', async({page})=>{
    await page.goto('https://demoqa.com/checkbox');
    await page.waitForTimeout(5000);

    await page.locator("//span[normalize-space()='Check Box']").click();
    await page.locator("//label[@for='tree-node-home']//span[@class='rct-checkbox']//*[name()='svg']").check();
    const locCheckbox = await page.locator("//label[@for='tree-node-home']//span[@class='rct-checkbox']//*[name()='svg']");

    await expect(locCheckbox).toBeChecked();

})