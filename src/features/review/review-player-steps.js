const { Given, When, Then} = require('@cucumber/cucumber');
const driver = require('../../core/build');
const lms = require('../../core/lms');   
    
          

Given('Opened the url {string}',{ timeout: 120000 }, async (reviewUrl)=>{
       return lms.launchLMSPage(reviewUrl);
})   

When('I click resume or start the course', async ()=>{

      await lms.waitForPageLoad()
      await driver.sleep(2000);
      await lms.coursePageHandler();
      
      
	
})
Then('I see the review player loading', async ()=>{
      await lms.waitForPageLoad();
      console.log("______");
})





