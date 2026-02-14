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
    
    await practiceFormPage.fillBasicInfo(formData);
    await practiceFormPage.selectGender(formData.gender);
    await practiceFormPage.selectDateOfBirth(
      formData.dateOfBirth.day,
      formData.dateOfBirth.month,
      formData.dateOfBirth.year
    );

    console.log("hello there");
    await practiceFormPage.addSubjects(formData.subjects);
    await practiceFormPage.selectHobbies(formData.hobbies);
    await practiceFormPage.waitForTimeout(2000); // Wait to ensure all fields are filled before submission
    await practiceFormPage.fillAddress(formData.currentAddress);
    //await practiceFormPage.selectStateAndCity(formData.state, formData.city);
    await practiceFormPage.clickSubmit();
    
    const isSubmitted = await practiceFormPage.verifyFormSubmission();
    expect(isSubmitted).toBeTruthy();
  });

  

 
});