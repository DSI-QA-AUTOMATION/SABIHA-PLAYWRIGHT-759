import {test,expect} from '@playwright/test';


test('Assertions', async({page})=>{

    await page.goto('https://demoqa.com/');

    await expect(page).toHaveURL('https://demoqa.com/');

    await expect(page).toHaveTitle("DEMOQA");

    const altText = await page.getByAltText("Selenium Online Training");

    await expect(altText).toBeVisible();

    
    const attribute = await page.locator("//div[4]//div[1]//div[2]//*[name()='svg']");
    await expect(attribute).toHaveAttribute('width',{timeout:5000});
    //toHaveText
    //toContainText
    const textattr = await page.locator("//h5[normalize-space()='Alerts, Frame & Windows']");
    await expect(textattr).toContainText("Alerts",{timeout:5000});
   
    
})