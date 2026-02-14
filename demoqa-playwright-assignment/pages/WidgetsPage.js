const BasePage = require('./base/BasePage');

class WidgetsPage extends BasePage {
  constructor(page) {
    super(page);
    
    this.tooltipButton = '#toolTipButton';
    this.tooltipTextField = '#toolTipTextField';
    this.tooltipText = '.tooltip-inner';
    
    this.datePickerInput = '#datePickerMonthYearInput';
    this.dateTimePickerInput = '#dateAndTimePickerInput';
  }

  async openTooltips() {
    await this.navigate('https://demoqa.com/tool-tips');
    //await this.closeAds();
  }

  async openDatePicker() {
    await this.navigate('https://demoqa.com/date-picker');
    //await this.closeAds();
  }

  async hoverTooltipButton() {
    await this.hover(this.tooltipButton);
    await this.waitForTimeout(500);
  }

  async hoverTooltipTextField() {
    await this.hover(this.tooltipTextField);
    await this.waitForTimeout(500);
  }

  async getTooltipText() {
    const isVisible = await this.isVisible(this.tooltipText);
    if (!isVisible) return '';
    return await this.getText(this.tooltipText);
  }

  async verifyTooltipDisplayed(expectedText) {
    await this.waitForSelector(this.tooltipText, { timeout: 5000 });
    const tooltipText = await this.getTooltipText();
    return tooltipText.includes(expectedText);
  }

  async selectDate(date) {
    await this.clearAndFill(this.datePickerInput, date);
    await this.pressKey('Enter');
  }

  async selectDateTime(dateTime) {
    await this.click(this.dateTimePickerInput);
    
    const parts = dateTime.split(' ');
    const datePart = parts[0] + ' ' + parts[1] + ' ' + parts[2];
    const timePart = parts[3] + ' ' + parts[4];
    
    await this.page.click(`text=${datePart}`);
    await this.page.click(`text=${timePart}`);
  }

  async getSelectedDate() {
    return await this.getAttributeValue(this.datePickerInput, 'value');
  }

  async getSelectedDateTime() {
    return await this.getAttributeValue(this.dateTimePickerInput, 'value');
  }

  async verifyDateSelected(expectedDate) {
    const selectedDate = await this.getSelectedDate();
    return selectedDate === expectedDate;
  }

  async verifyDateTimeSelected(expectedDateTime) {
    const selectedDateTime = await this.getSelectedDateTime();
    return selectedDateTime.includes(expectedDateTime);
  }
}

module.exports = WidgetsPage;