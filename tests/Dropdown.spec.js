import {test, expect} from '@playwright/test';


test('DropDown', async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    //await page.locator('#country').selectOption({label:'Canada'}) //label
    
    await page.locator('#country').selectOption('Canada')
    await page.waitForTimeout(4000);

    //assertions in dropdown

    const locDrop = await page.$$(" //select[@id='country']//option")

     console.log(locDrop.length);

    //printing each options in console
    for(const opt of locDrop)
    {
        console.log(await opt.textContent())
    }


})