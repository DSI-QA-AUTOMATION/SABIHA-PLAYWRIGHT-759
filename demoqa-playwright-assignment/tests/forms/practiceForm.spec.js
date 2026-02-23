const { test } = require('../../fixtures/testFixtures');
const { expect } = require('@playwright/test');


test.describe.configure({ mode: 'serial' });

test.describe('Practice Form Tests', () => {
  test.beforeEach(async ({ practiceFormPage }) => {
    await practiceFormPage.open();
  });

  test('TC-09: Submit complete practice form', async ({ practiceFormPage, testData }) => {
    const formData = testData.formData.practiceForm;

    console.log('Form Data:', formData);
    
   await practiceFormPage.submitCompleteForm(formData);
    const isSubmitted = await practiceFormPage.verifyFormSubmission();
    expect(isSubmitted).toBeTruthy();
  });

  

 
});