const { Given, When, Then} = require('@cucumber/cucumber');
const driver = require('../../core/build');
const lms = require('../../core/lms');   
    
          

Given('Player home page loaded {string}', { timeout: 30000 }, async (expectedUrl)=>{


 await driver.wait(async () => {
      const url = await driver.getCurrentUrl();
      const windows = await driver.getAllWindowHandles()

      if(windows.length > 2)	{
      	await driver.switchTo().window(windows[2]);
      }
      await console.log(windows.length, url, expectedUrl, url.indexOf(expectedUrl))

      if( url.indexOf(expectedUrl) > -1 )	{
      	
      	return true;
      }
      return false
    }, 30000);


})    
When('I start or resume the course', async ()=>{
	await lms.iframeHandler();
	
})
Then('I see selected course loaded', async ()=>{
	await lms.waitForPageLoad()
	//await lms.coursePageHandler()
	
})