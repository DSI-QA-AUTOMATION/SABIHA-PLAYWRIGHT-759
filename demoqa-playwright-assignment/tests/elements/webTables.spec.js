const { test } = require('../../fixtures/testFixtures');
const { expect } = require('@playwright/test');


test.describe.configure({ mode: 'serial' });

test.describe('Web Tables Tests', () => {
  test.beforeEach(async ({ webTablesPage }) => {
    await webTablesPage.open();
  });

  test('TC-05: Add new record to table', async ({ webTablesPage, testData }) => {
    const userData = testData.users.tableUser;
    const initialCount = await webTablesPage.getRowCount();
    
    await webTablesPage.addNewRecord(userData);
    
    const recordExists = await webTablesPage.verifyRecordExists(userData);
    expect(recordExists).toBeTruthy();
    
    const newCount = await webTablesPage.getRowCount();
    expect(newCount).toBe(initialCount + 1);
  });

  test('Verify search functionality', async ({ webTablesPage, testData }) => {
    const userData = testData.users.tableUser;
    
    await webTablesPage.addNewRecord(userData);
    await webTablesPage.searchRecord(userData.email);
    
    const tableData = await webTablesPage.getTableData();
    expect(tableData.length).toBeGreaterThan(0);
    expect(tableData[0].email).toContain(userData.email);
  });

  test('Verify edit record functionality', async ({ webTablesPage, testData }) => {
    const originalData = testData.users.tableUser;
    await webTablesPage.addNewRecord(originalData);
    
    const updatedData = {
      firstName: 'Updated',
      lastName: 'User',
      email: originalData.email,
      age: '30',
      salary: '85000',
      department: 'IT'
    };
    
    await webTablesPage.editRecord(originalData.email, updatedData);
    
    const recordExists = await webTablesPage.verifyRecordExists(updatedData);
    expect(recordExists).toBeTruthy();
  });

  test('Verify delete record functionality', async ({ webTablesPage, testData }) => {
    const userData = testData.users.tableUser;
    
    await webTablesPage.addNewRecord(userData);
    const countAfterAdd = await webTablesPage.getRowCount();
    console.log('Count after adding record:', countAfterAdd);
    
    await webTablesPage.deleteRecord(userData.email);
    const countAfterDelete = await webTablesPage.getRowCount();
    console.log('Count after deleting record:', countAfterDelete);
    
    expect(countAfterDelete).toBe(countAfterAdd - 1);
  });
});