import {test,expect} from '@playwright/test';


test('MultipleElements',async({page})=>{

    await page.goto('https://www.demoblaze.com/');
    console.log("hello hello")

    //locating multiple elements

    const links = await page.$$("a");

    ////div[@id='tbodyid']//div//div//h4

    for(const link of links)
    {
        const pp = await link.textContent()
         console.log(pp);
         
    }
     
})