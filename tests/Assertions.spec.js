import {test,expect} from '@playwright/test';


test('Assertions', async({page})=>{

    await page.goto('https://demo.nopcommerce.com/');

    await expect(page).toHaveURL('https://demo.nopcommerce.com/');

    await expect(page).toHaveTitle("nopCommerce demo store. Home page title");

    const altText = await page.getByAltText("nopCommerce demo store");

    await expect(altText).toBeVisible();

    //for radiobuttons we can assert toBeChecked()
    //toHaveAttribute
    //toHaveText
    //toContainText
    //toHaveValue
    //toHaveCount
    
})