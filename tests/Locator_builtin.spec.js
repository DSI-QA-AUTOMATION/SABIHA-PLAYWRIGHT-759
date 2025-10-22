import {test,expect} from '@playwright/test';
import { waitForDebugger } from 'inspector';


test('Built_in_Locators', async ({page})=>{


    await page.goto('https://demoqa.com');

    await page.waitForTimeout(3000);
    //altText
    const check = await page.getByAltText("Selenium Online Training");
    await expect(check).toBeVisible();
    

})

////h1[normalize-space()='Check Box']

test('Checking textboxes', async ({page})=>{


    await page.goto('https://demoqa.com/books');

    await page.waitForTimeout(2000);
    
    const check = await page.getByText("Git Pocket Guide");
    await expect.soft(check).toBeVisible();
    

})


test('Checking getByTitle', async ({page})=>{


    await page.goto('https://demoqa.com/text-box');

    await page.waitForTimeout(2000);
    
    const check = await page.getByTitle("Ad.Plus Advertising");
    await expect.soft(check).toBeVisible();
    

})


test('Checking Placeholder', async ({ page }) => {
        await page.goto('https://demoqa.com/text-box');
        const check =  page.getByPlaceholder('name@example.com');
        await expect(check).toBeVisible();
    });