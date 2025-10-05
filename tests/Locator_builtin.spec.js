import {test,expect} from '@playwright/test';
import { waitForDebugger } from 'inspector';


test('Built_in_Locators', async ({page})=>{


    await page.goto('https://opensource-demo.orangehrmlive.com');

    await page.waitForTimeout(5000);
    //altText
    const check = await page.getByAltText('orangehrm-logo');
    //await expect(check).toBeVisible();
    //placeholder
    await page.getByPlaceholder('Username').fill("Admin");
    await page.getByPlaceholder('Password').fill("admin123");

    //getByRole
    await page.getByRole('button',{type:'submit'}).click();


    //getByText checkpoint

    await expect(await page.getByText("Monika Srivastava")).toBeVisible();

    




})