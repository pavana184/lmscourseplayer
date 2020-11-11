const { Given, When, Then} = require('@cucumber/cucumber');
const assert = require('assert');
const driver = require('../../core/build');
const lms = require('../../core/lms');   
const topics = require('./lms-topicshandler');
    
          
When('completion percent {string}', {timeout: 15*60000}, async (percent)=>{
	let completionPercent = await lms.getElement("//div[@class='progress-bar']//span","xpath",60000);
	let percentText = await completionPercent.getText();
	if(percentText==percent)
	{
		await console.log("course completed")
		await driver.quit();
	}
	else{
		await lms.coursePageHandler();
		await lms.spinnerHandler();
		let topic=await topics.topicsHandler();
		await lms.actionHandler();
		while(await topic[0].getText()!==topic[1])
		{
			await lms.waitForVideoLoad();
			await lms.widgetHandler();
			await lms.dragToEnd();
			await lms.waitForNavigationPage();
			if(await topic[0].getText()==topic[1]){
				await lms.congratulationsPage();
			}
			else{
			let nextFile = await lms.getElement("tab_play_next","id",10000);
			await nextFile.click();
			await driver.sleep(2000);
			}
		}
		await topics.courseCompletionStatus(await topic[0].getText(),topic[1]);
	}
});

