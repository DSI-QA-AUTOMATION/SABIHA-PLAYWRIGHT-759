const { test } = require('../../fixtures/testFixtures');
const { expect } = require('@playwright/test');


test.describe.configure({ mode: 'serial' });

test.describe('Links Tests', () => {
  test.beforeEach(async ({ linksPage }) => {
    await linksPage.open();
  });

  test('TC-07: Verify Home link opens in new tab', async ({ linksPage }) => {
    const newPage = await linksPage.clickHomeLink();
    
    const isCorrectUrl = await linksPage.verifyNewTabOpened(newPage, 'demoqa.com');
    expect(isCorrectUrl).toBeTruthy();
  });

  test('Verify dynamic link opens in new tab', async ({ linksPage }) => {
    const newPage = await linksPage.clickDynamicHomeLink();
    
    const isCorrectUrl = await linksPage.verifyNewTabOpened(newPage, 'demoqa.com');
    expect(isCorrectUrl).toBeTruthy();
  });

  test('Verify Created API link response', async ({ linksPage }) => {
    await linksPage.clickCreatedLink();
    
    const responseVerified = await linksPage.verifyLinkResponse('201');
    expect(responseVerified).toBeTruthy();
  });

  test('Verify No Content API link response', async ({ linksPage }) => {
    await linksPage.clickNoContentLink();
    
    const responseVerified = await linksPage.verifyLinkResponse('204');
    expect(responseVerified).toBeTruthy();
  });

  test('Verify Bad Request API link response', async ({ linksPage }) => {
    await linksPage.clickBadRequestLink();
    
    const responseVerified = await linksPage.verifyLinkResponse('400');
    expect(responseVerified).toBeTruthy();
  });


});