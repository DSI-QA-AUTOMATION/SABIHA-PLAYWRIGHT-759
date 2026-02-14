const { test } = require('../../fixtures/testFixtures');
const { expect } = require('@playwright/test');

test.describe.configure({ mode: 'serial' });

test.describe('Frames Tests', () => {
  test.beforeEach(async ({ framesPage }) => {
    await framesPage.open();
  });

  test('TC-11: Switch to iframe and verify content', async ({ framesPage }) => {
    const frame1Text = await framesPage.getFrame1Text();
    expect(frame1Text).toBe('This is a sample page');
    
    const frame2Text = await framesPage.getFrame2Text();
    expect(frame2Text).toBe('This is a sample page');
  });

  test('Verify frame 1 content', async ({ framesPage }) => {
    const isContentCorrect = await framesPage.verifyFrame1Content('This is a sample page');
    expect(isContentCorrect).toBeTruthy();
  });

  test('Verify frame 2 content', async ({ framesPage }) => {
    const isContentCorrect = await framesPage.verifyFrame2Content('This is a sample page');
    expect(isContentCorrect).toBeTruthy();
  });

  test('Verify both frames are visible', async ({ framesPage }) => {
    const isFrame1Visible = await framesPage.isFrame1Visible();
    expect(isFrame1Visible).toBeTruthy();
    
    const isFrame2Visible = await framesPage.isFrame2Visible();
    expect(isFrame2Visible).toBeTruthy();
  });

  test('Verify frame dimensions are different', async ({ framesPage }) => {
    const frame1Dims = await framesPage.getFrame1Dimensions();
    const frame2Dims = await framesPage.getFrame2Dimensions();
    
    expect(frame1Dims.width).toBeGreaterThan(0);
    expect(frame1Dims.height).toBeGreaterThan(0);
    expect(frame2Dims.width).toBeGreaterThan(0);
    expect(frame2Dims.height).toBeGreaterThan(0);
    
    const areDifferent = frame1Dims.width !== frame2Dims.width || 
                        frame1Dims.height !== frame2Dims.height;
    expect(areDifferent).toBeTruthy();
  });
});