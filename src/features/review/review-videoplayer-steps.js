const { Given, When, Then} = require('@cucumber/cucumber');
const { Key, until, By } = require('selenium-webdriver');
const driver = require('../../core/build');
const lms = require('../../core/lms'); 
const topics = require('../lms/lms-topicshandler');

Given('The player', async()=>{
	await lms.spinnerHandler();
});

When('The progress bar is enabled', async()=>{
	await lms.actionHandler();
});

Then('Complete the course', {timeout: 15*60000}, async()=>{
	let topic=await topics.topicsHandler();
		
		while(await topic[0].getText()!==topic[1])
		{
			await lms.waitForVideoLoad();
			
			let video = await driver.findElement(By.xpath("//div[@id='videogular-container']//video")).getAttribute('src');
			await console.log(video);
			
			let topicDuration = await topics.durationHandler();
			await console.log(topicDuration);
			await lms.widgetHandler();
			await lms.dragToEnd();
			await lms.waitForNavigationPage();
			await topics.verifyTiming(topicDuration); //virify the file time
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
});