const BasePage = require('./base/BasePage');

class PracticeFormPage extends BasePage {
  constructor(page) {
    super(page);
    
    this.firstNameInput = '#firstName';
    this.lastNameInput = '#lastName';
    this.emailInput = '#userEmail';
    this.mobileInput = '#userNumber';
    this.dateOfBirthInput = '#dateOfBirthInput';
    this.subjectsInput = '#subjectsInput';
    this.currentAddressInput = '#currentAddress';
    this.submitButton = '#submit';
    
    this.genderMale = 'label[for="gender-radio-1"]';
    this.genderFemale = 'label[for="gender-radio-2"]';
    this.genderOther = 'label[for="gender-radio-3"]';
    
    this.hobbySports = 'label[for="hobbies-checkbox-1"]';
    this.hobbyReading = 'label[for="hobbies-checkbox-2"]';
    this.hobbyMusic = 'label[for="hobbies-checkbox-3"]';
    
    this.stateDropdown = '#state';
    this.cityDropdown = '#city';
    this.pictureUpload = '#uploadPicture';
    
    this.confirmationModal = '.modal-content';
    this.confirmationTitle = '#example-modal-sizes-title-lg';
    this.closeButton = '#closeLargeModal';
  }

  async open() {
    await this.navigate('https://demoqa.com/automation-practice-form');
    
  }

  async fillBasicInfo(formData) {
    await this.clearAndFill(this.firstNameInput, formData.firstName);
    await this.clearAndFill(this.lastNameInput, formData.lastName);
    await this.clearAndFill(this.emailInput, formData.email);
    await this.clearAndFill(this.mobileInput, formData.mobile);
  }

  async selectGender(gender) {
    const genderMap = {
      'Male': this.genderMale,
      'Female': this.genderFemale,
      'Other': this.genderOther
    };
    await this.click(genderMap[gender]);
    
  }

 
  

  async selectDateOfBirth(day, month, year) {
    await this.click(this.dateOfBirthInput);
    
    await this.page.selectOption('.react-datepicker__month-select', month);
    await this.page.selectOption('.react-datepicker__year-select', year);
    
    const daySelector = `.react-datepicker__day--0${day}:not(.react-datepicker__day--outside-month)`;
    await this.click(daySelector);
  }

  async addSubjects(subjects) {
    for (const subject of subjects) {
      await this.fill(this.subjectsInput, subject);
      await this.pressKey('Enter');
    }
  }

  async selectHobbies(hobbies) {
    const hobbyMap = {
      'Sports': this.hobbySports,
      'Reading': this.hobbyReading,
      'Music': this.hobbyMusic
    };
    
    for (const hobby of hobbies) {
      if (hobbyMap[hobby]) {
        await this.scrollToElement(hobbyMap[hobby]);
        await this.click(hobbyMap[hobby]);
      }
    }
  }

  

  async fillAddress(address) {
    await this.scrollToElement(this.currentAddressInput);
    await this.clearAndFill(this.currentAddressInput, address);
  }

  async selectStateAndCity(state, city) {
    await this.scrollToElement(this.stateDropdown);
    await this.click(this.stateDropdown);
    await this.page.click(`text=${state}`);
    
    await this.click(this.cityDropdown);
    await this.page.click(`text=${city}`);
  }

  async clickSubmit() {
    await this.scrollToElement(this.submitButton);
    await this.click(this.submitButton);
  }

  async submitCompleteForm(formData) {
    await this.fillBasicInfo(formData);
    await this.selectGender(formData.gender);
    await this.selectDateOfBirth(
      formData.dateOfBirth.day,
      formData.dateOfBirth.month,
      formData.dateOfBirth.year
    );
    await this.addSubjects(formData.subjects);
    await this.selectHobbies(formData.hobbies);
    await this.fillAddress(formData.currentAddress);
    await this.selectStateAndCity(formData.state, formData.city);
    await this.clickSubmit();
  }

  async isConfirmationModalVisible() {
    await this.waitForSelector(this.confirmationModal, { timeout: 5000 });
    return await this.isVisible(this.confirmationModal);
  }

  async getConfirmationTitle() {
    return await this.getText(this.confirmationTitle);
  }

  async closeConfirmationModal() {
    await this.click(this.closeButton);
  }

  async verifyFormSubmission() {
    const isVisible = await this.isConfirmationModalVisible();
    if (!isVisible) return false;
    
    const title = await this.getConfirmationTitle();
    return title === 'Thanks for submitting the form';
  }
}

module.exports = PracticeFormPage;