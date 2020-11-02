const { Given, When, Then} = require('@cucumber/cucumber');
const driver = require('../../core/build');
const lms = require('../../core/lms');


      
Given('Opened Home page', async () =>{
	lms.waitForPageLoad()

})
Then('Closed quick tour', async () =>	{
	lms.closeQuickTour();
})
When('I search the course name {string}', async (courseName) =>{
	lms.searchCourse(courseName)
	console.log(courseName)

})
Then('I see the course player loading', async ()=>{
	console.log('I see the course player loading')
})