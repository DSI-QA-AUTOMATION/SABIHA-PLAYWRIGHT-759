import {test,expect} from '@playwright/test';


test('MultipleElements',async({page})=>{

    await page.goto('https://www.demoblaze.com/');
   
    const links = await page.$$("a");

    for(const link of links)
    {
        const pp = await link.textContent()
         console.log(pp);
         
    }
     
})