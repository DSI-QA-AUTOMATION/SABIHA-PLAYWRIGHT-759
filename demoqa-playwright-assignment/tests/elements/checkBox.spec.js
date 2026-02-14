const { test } = require('../../fixtures/testFixtures');
const { expect } = require('@playwright/test');

test.describe.configure({ mode: 'serial' });

test.describe('Check Box Tests', () => {
  test.beforeEach(async ({ checkBoxPage }) => {
    await checkBoxPage.open();
  });

  test('TC-03: Select multiple checkboxes', async ({ checkBoxPage }) => {
    await checkBoxPage.expandAll();
    
    const checkboxes = ['Desktop', 'Documents', 'Downloads'];
    await checkBoxPage.selectMultipleCheckboxes(checkboxes);
    
    const verification = await checkBoxPage.verifyMultipleCheckboxesSelected(checkboxes);
    expect(verification.Desktop).toBeTruthy();
    expect(verification.Documents).toBeTruthy();
    expect(verification.Downloads).toBeTruthy();
  });

  test('Verify checkbox selection result is displayed', async ({ checkBoxPage }) => {
    await checkBoxPage.expandAll();
    await checkBoxPage.selectCheckboxByLabel('Notes');
    
    const result = await checkBoxPage.getResultText();
    expect(result).toContain('notes');
  });

  test('Verify expand and collapse functionality', async ({ checkBoxPage }) => {
    await checkBoxPage.expandAll();
    const expandedResult = await checkBoxPage.getResultText();
    
    await checkBoxPage.collapseAll();
    
    await checkBoxPage.expandAll();
    await checkBoxPage.selectCheckboxByLabel('Desktop');
    const selectionResult = await checkBoxPage.verifyCheckboxSelected('Desktop');
    expect(selectionResult).toBeTruthy();
  });

  test('Verify nested checkbox selection', async ({ checkBoxPage }) => {
    await checkBoxPage.expandAll();
    
    await checkBoxPage.selectCheckboxByLabel('WorkSpace');
    const workspaceSelected = await checkBoxPage.verifyCheckboxSelected('WorkSpace');
    expect(workspaceSelected).toBeTruthy();
  });
});