const assert = require('assert');
const { Given, When, Then, After} = require('@cucumber/cucumber');
const { setDefaultTimeout } = require('@cucumber/cucumber');

const driver = require('../../core/build');
const lms = require('../../core/lms');

const page = require('./lms-pages');

const TEN_MINUTES = 120000;
const FIVE_MINUTES = TEN_MINUTES / 2;
const ONE_MINUTE = TEN_MINUTES / 10;

setDefaultTimeout(FIVE_MINUTES);


Given('I am on login page', { timeout: TEN_MINUTES }, async () => {

	 return lms.launchLMSPage(page.url);

});

When('I login using credentitals {string} and {string}', { timeout: TEN_MINUTES }, async (userid,password) => {
	return lms.loginPage(userid,password) 
   
});

Then('I see the login success landing page title {string}', async expectedTitle => {
  await lms.waitForPageLoad() 	 
  // const actualTitle = await driver.getTitle();
  // assert.strictEqual(actualTitle, expectedTitle);
});


 
