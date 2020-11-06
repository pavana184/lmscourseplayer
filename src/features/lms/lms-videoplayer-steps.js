	const { Given, When, Then, After} = require('@cucumber/cucumber');
const driver = require('../../core/build');
const lms = require('../../core/lms');
const topics = require('./lms-topicshandler');

When('File begins to play', async ()=>{
	let topicName = await lms.getElement("topic_name","className",20000);
	console.log(await topicName.getText());
	await lms.spinnerHandler();

});

Then('Enable dragging to drag the file', async ()=>{
	//await console.log("scenario 4 step 2 executed")
	await lms.actionHandler();
});


Then('Wait until the course is completed',{timeout:15*60000}, async()=>{
	
		let topic=await topics.topicsHandler();
		//console.log(topic[1]);
		//console.log(await topic[0].getText())

		while(await topic[0].getText()!==topic[1])
		{
			await lms.waitForVideoLoad();
			await lms.widgetHandler();
			await lms.dragToEnd();
			await lms.waitForNavigationPage();
			if(await topic[0].getText()==topic[1])
				await lms.congratulationsPage();
			let nextFile = await lms.getElement("tab_play_next","id",10000);
			await nextFile.click();
			await driver.sleep(2000);
		}
		//await console.log("Course has been Completed");
});

Then('Check the completion percent', async()=>{
	let topic=await topics.topicsHandler();
	let noOfTopics = topic[1];
	let topicsCompleted = await topic[0].getText();
	await topics.courseCompletionStatus(noOfTopics,topicsCompleted);
})

// Then('Search for widget and close the widgets', async ()=>{
// 	await console.log("scenario 4 step 3 execution");
// 	await lms.dragHandler();
// });

// Then('Drag the file to end', async ()=>{
// 	await console.log("scenario 4 step 4 execution");
// 	await lms.dragToEnd();
// });

// Then('Wait for Navigation page and select next file', async function waitForNavigation(){
// 	await console.log("Scenario 4 step 5 execution");
// 	await lms.waitForNavigationPage();
// 	let nextFile = await lms.getElement("tab_play_next","id",10000);
// 				await nextFile.click();
// });


	
