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

  test('Verify date selection updates input field', async ({ widgetsPage }) => {
    const testDate = '04/20/2024';
    
    await widgetsPage.selectDate(testDate);
    
    const isSelected = await widgetsPage.verifyDateSelected(testDate);
    expect(isSelected).toBeTruthy();
  });

  test('Verify date can be changed', async ({ widgetsPage }) => {
    const firstDate = '01/15/2024';
    await widgetsPage.selectDate(firstDate);
    let selectedDate = await widgetsPage.getSelectedDate();
    expect(selectedDate).toBe(firstDate);
    
    const secondDate = '12/25/2024';
    await widgetsPage.selectDate(secondDate);
    selectedDate = await widgetsPage.getSelectedDate();
    expect(selectedDate).toBe(secondDate);
  });
});