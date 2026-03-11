const { test } = require('../../fixtures/testFixtures');
const { expect } = require('@playwright/test');


test.describe.configure({ mode: 'serial' });

test.describe('Date Picker Tests', () => {
  test.beforeEach(async ({ widgetsPage }) => {
    await widgetsPage.openDatePicker();
  });

  test('TC-13: Select a date from date picker', async ({ widgetsPage, testData }) => {
    const dateData = testData.formData.datePickerData;
    
    await widgetsPage.selectDate(dateData.date);
    
    const selectedDate = await widgetsPage.getSelectedDate();
    expect(selectedDate).toBe(dateData.date);
  });

 
});