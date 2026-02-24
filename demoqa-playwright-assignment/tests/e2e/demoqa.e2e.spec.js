const { test } = require('../../fixtures/testFixtures');
const { expect } = require('@playwright/test');
const TestUtils = require('../../utils/testUtils');

test.describe('End-to-End User Journey', () => {
  test('TC-15: Complete user journey through DemoQA', async ({ 
    page, 
    homePage, 
    textBoxPage, 
    checkBoxPage,
    radioButtonPage,
    webTablesPage,
    buttonsPage,
    linksPage,
    uploadDownloadPage,
    practiceFormPage,
    alertsPage,
    framesPage,
    widgetsPage,
    interactionsPage,
    testData 
  }) => {
    
    await homePage.open();
    const categories = await homePage.verifyAllCategoriesVisible();
    expect(categories.elements).toBeTruthy();
    expect(categories.forms).toBeTruthy();
    expect(categories.widgets).toBeTruthy();
    expect(categories.interactions).toBeTruthy();
    
    await textBoxPage.open();
    const userData = testData.users.validUser;
    await textBoxPage.submitForm(userData);
    const textBoxOutput = await textBoxPage.isOutputVisible();
    expect(textBoxOutput).toBeTruthy();
    
    await checkBoxPage.open();
    await checkBoxPage.expandAll();
    await checkBoxPage.selectMultipleCheckboxes(['Desktop', 'Documents']);
    const checkboxVerification = await checkBoxPage.verifyCheckboxSelected('Desktop');
    expect(checkboxVerification).toBeTruthy();
    
    await radioButtonPage.open();
    await radioButtonPage.selectYes();
    const radioVerification = await radioButtonPage.verifyYesSelected();
    expect(radioVerification).toBeTruthy();
    
    await webTablesPage.open();
    const tableUser = testData.users.tableUser;
    await webTablesPage.addNewRecord(tableUser);
    const recordExists = await webTablesPage.verifyRecordExists(tableUser);
    expect(recordExists).toBeTruthy();
    
    await buttonsPage.open();
    await buttonsPage.performAllClicks();
    const buttonVerification = await buttonsPage.verifyAllMessages();
    expect(buttonVerification.doubleClick).toBeTruthy();
    expect(buttonVerification.rightClick).toBeTruthy();
    expect(buttonVerification.dynamicClick).toBeTruthy();
    
    await linksPage.open();
    const newPage = await linksPage.clickHomeLink();
    const linkVerification = await linksPage.verifyNewTabOpened(newPage, 'demoqa.com');
    expect(linkVerification).toBeTruthy();
    
    
    await uploadDownloadPage.open();
    const downloadPath = await uploadDownloadPage.getDownloadPath();
    expect(downloadPath).toBeTruthy();
    const testFilePath = './demoqa-playwright-assignment/test-data/sample.txt';
    await uploadDownloadPage.uploadFile(testFilePath);
    const verified = await uploadDownloadPage.verifyFileUploaded('sample');
    expect(verified).toBeTruthy();
    
    await practiceFormPage.open();
    const formData = testData.formData.practiceForm;
    await practiceFormPage.fillBasicInfo(formData);
    await practiceFormPage.selectGender(formData.gender);
    await practiceFormPage.selectDateOfBirth(
      formData.dateOfBirth.day,
      formData.dateOfBirth.month,
      formData.dateOfBirth.year
    );
    await practiceFormPage.addSubjects(formData.subjects);
    await practiceFormPage.selectHobbies(formData.hobbies);
    await practiceFormPage.fillAddress(formData.currentAddress);
    await practiceFormPage.selectStateAndCity(formData.state, formData.city);
    await practiceFormPage.clickSubmit();
    const formSubmitted = await practiceFormPage.verifyFormSubmission();
    expect(formSubmitted).toBeTruthy();
    await practiceFormPage.closeConfirmationModal();
    
    await alertsPage.open();
    const alertMessage = await alertsPage.clickSimpleAlert();
    expect(alertMessage).toBeTruthy();
    await alertsPage.clickConfirmAlert(true);
    const confirmResult = await alertsPage.verifyConfirmResult(true);
    expect(confirmResult).toBeTruthy();
    
    await framesPage.open();
    const frame1Text = await framesPage.getFrame1Text();
    expect(frame1Text).toBe('This is a sample page');
    
    await widgetsPage.openTooltips();
    await widgetsPage.hoverTooltipButton();
    const tooltipDisplayed = await widgetsPage.verifyTooltipDisplayed('hover');
    expect(tooltipDisplayed).toBeTruthy();
    
    await widgetsPage.openDatePicker();
    await widgetsPage.selectDate('05/20/2024');
    const dateSelected = await widgetsPage.verifyDateSelected('05/20/2024');
    expect(dateSelected).toBeTruthy();
    
   
    
    console.log('✓ E2E test completed successfully - All features tested');
  });

 
});
