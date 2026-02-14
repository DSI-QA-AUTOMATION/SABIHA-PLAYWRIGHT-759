const { test } = require('../../fixtures/testFixtures')
const { expect } = require('@playwright/test');

test.describe('Text Box Tests', () => {
  test.beforeEach(async ({ textBoxPage }) => {
    await textBoxPage.open();
  });

  test('TC-02: Submit text box with valid data', async ({ textBoxPage, testData }) => {
    const userData = testData.users.validUser;
    
    await textBoxPage.submitForm(userData);
    
    const isOutputVisible = await textBoxPage.isOutputVisible();
    expect(isOutputVisible).toBeTruthy();
    
    const verification = await textBoxPage.verifyOutput(userData);
    expect(verification.nameMatches).toBeTruthy();
    expect(verification.emailMatches).toBeTruthy();
    expect(verification.currentAddressMatches).toBeTruthy();
    expect(verification.permanentAddressMatches).toBeTruthy();
  });

  

  
});