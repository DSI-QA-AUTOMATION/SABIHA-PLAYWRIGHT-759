const BasePage = require('./base/BasePage');

class WebTablesPage extends BasePage {
  constructor(page) {
    super(page);
    
    this.addButton = '#addNewRecordButton';
    this.searchBox = '#searchBox';
    this.table = 'table';
    this.tableRows = 'tbody tr';
    
    this.registrationForm = '#registration-form-modal';
    this.firstNameInput = '#firstName';
    this.lastNameInput = '#lastName';
    this.emailInput = '#userEmail';
    this.ageInput = '#age';
    this.salaryInput = '#salary';
    this.departmentInput = '#department';
    this.submitButton = '#submit';
    
    this.editButton = '[title="Edit"]';
    this.deleteButton = '[title="Delete"]';
  }

  async open() {
    await this.navigate('https://demoqa.com/webtables');
    
  }

  async clickAdd() {
    await this.click(this.addButton);
    await this.waitForSelector(this.registrationForm);
  }

  async fillRegistrationForm(userData) {
    await this.clearAndFill(this.firstNameInput, userData.firstName);
    await this.clearAndFill(this.lastNameInput, userData.lastName);
    await this.clearAndFill(this.emailInput, userData.email);
    await this.clearAndFill(this.ageInput, userData.age);
    await this.clearAndFill(this.salaryInput, userData.salary);
    await this.clearAndFill(this.departmentInput, userData.department);
  }

  async clickSubmit() {
    await this.click(this.submitButton);
  }

  async addNewRecord(userData) {
    await this.clickAdd();
    await this.fillRegistrationForm(userData);
    await this.clickSubmit();
    await this.waitForTimeout(500);
  }

  async searchRecord(searchText) {
    await this.clearAndFill(this.searchBox, searchText);
    await this.waitForTimeout(500);
  }

  async getTableData() {
    const rows = await this.page.locator(this.tableRows).all();
    const data = [];
    
    for (const row of rows) {
      const cells = await row.locator('td').all();
      if (cells.length > 0) {
        const firstName = await cells[0].textContent();
        if (firstName && firstName.trim() !== '') {
          data.push({
            firstName: firstName.trim(),
            lastName: await cells[1].textContent(),
            age: await cells[2].textContent(),
            email: await cells[3].textContent(),
            salary: await cells[4].textContent(),
            department: await cells[5].textContent()
          });
        }
      }
    }
    
    return data;
  }

  async verifyRecordExists(userData) {
    const tableData = await this.getTableData();
    return tableData.some(row => 
      row.firstName.includes(userData.firstName) &&
      row.lastName.includes(userData.lastName) &&
      row.email.includes(userData.email)
    );
  }

  async editRecord(email, newData) {
    await this.searchRecord(email);
    await this.click(this.editButton);
    await this.fillRegistrationForm(newData);
    await this.clickSubmit();
  }

  async deleteRecord(email) {
    await this.searchRecord(email);
    await this.click(this.deleteButton);
    await this.clearTextBox(this.searchBox);
    
  }

  async getRowCount() {
    const data = await this.getTableData();
    return data.length;
  }
}

module.exports = WebTablesPage;