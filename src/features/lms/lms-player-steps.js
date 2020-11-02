const { Given, When, Then} = require('@cucumber/cucumber');
const driver = require('../../core/build');
const lms = require('../../core/lms');   
    
          

Given('Player home page loaded {string}', { timeout: 30000 }, async (expectedUrl)=>{


 await driver.wait(async () => {
      const url = await driver.getCurrentUrl();
      const windows = await driver.getAllWindowHandles()
      if(windows.length > 1)	{
      	await driver.switchTo().window(windows[1]);
      }
      console.log(windows.length, url, expectedUrl, url.indexOf(expectedUrl))

      if( url.indexOf(expectedUrl) > -1 )	{
      	
      	return true;
      }
      return false
    }, 30000);


})    
When('I start or resume the course', async ()=>{
	lms.iframeHandler();
	
})
Then('I see selected topic playing', async ()=>{
	lms.waitForPageLoad()
	lms.coursePageHandler()
	
})