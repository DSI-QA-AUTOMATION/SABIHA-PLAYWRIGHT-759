import {test,expect} from '@playwright/test';


test('Testing multiselect dropdown', async ({page})=>{


    await page.goto("https://demoqa.com/select-menu");

    //select multiple options from multiselect dropdown

    await page.selectOption("#cars", ["Saab", "Opel"]);

    await page.waitForTimeout(5000);

    const selectedOptions = await page.$eval('#cars', el => 
  Array.from(el.selectedOptions).map(opt => opt.value)
);
expect(selectedOptions).toEqual(['saab', 'opel']);

})