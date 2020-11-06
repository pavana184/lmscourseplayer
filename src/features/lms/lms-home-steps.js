	const { Given, When, Then} = require('@cucumber/cucumber');
const driver = require('../../core/build');
const lms = require('../../core/lms');


      
Given('Opened Home page {string}', async (title) =>{
	await lms.waitForPageLoad();
	let actualTitle= await driver.getTitle();
	await console.log(actualTitle)
	if(title==actualTitle)
		return true;
	else
		return false;

});
Then('Closed quick tour', async () =>	{
	await lms.closeQuickTour();
});

When('I search the course name {string}', async (courseName) =>{
	await lms.searchCourse(courseName)
	await console.log(courseName)
});

Then('I see the course player loading', async ()=>{
	
		await console.log('I see the course player loading')
	//console.log(actualTitle)
});

