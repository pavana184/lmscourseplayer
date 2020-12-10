const assert = require('assert');
const { Given, When, Then} = require('@cucumber/cucumber');
const { setDefaultTimeout } = require('@cucumber/cucumber');

const driver = require('../../core/build');
const lms = require('../../core/lms');

async function topicsHandler()
{
	try
	{
		let topics = await lms.getElement("//div[@class='progress_sec ng-binding']","xpath",20000);
		let topicsComplete = await topics.getText();
		//await console.log("Topics Completed : " + topicsComplete);
		var topicsSplit = topicsComplete.split("/");
		var totalTopics = topicsSplit[1];
		var totalTopicsComp = totalTopics.concat('/',totalTopics);
		return [topics,totalTopicsComp];
	}catch(err)
	{
		await console.log(err);
	}
}

async function courseCompletionStatus(topics,completedTopics)
{
	try
	{
		if(topics==completedTopics)
		{
			let completionPercent = await lms.getElement("//div[@class='progress_sec']/span","xpath",20000);
			let completionPercentText = await completionPercent.getText(); 
			if(completionPercentText=="100%")
			{
				await console.log("Course Completed");
				await driver.quit();
			}
			else
			{
				console.log("Course completion issue. " + completionPercentText + "% of completion is displaying");
			}
		}
	}catch(err)
	{
		console.log("courseCompletionStatus function issue : " + err);
	}
}

async function durationHandler(){
	try{
		let duration = await lms.getElement("//span[@class='duration ng-binding']","xpath",20000);
		let fileDuration = await duration.getText();
		return fileDuration;
	}catch(err)
	{
		await console.log("duration Handler error", err);
	}
}

async function verifyTiming(time)
{
	try{
		await console.log("verify")
		await driver.sleep(2000);
		let durationNextButton = await lms.getElement("//div[@id='tab_play_current']//div[@class='item_duration ng-binding']","xpath",20000);
		let durationNextButtonText = await durationNextButton.getText();
		//await console.log("duration next button text", durationNextButtonText);
		//await console.log("verify next")
		let fileTime = "   00:".concat(time);
		//await console.log(fileTime);
		if(fileTime!=durationNextButtonText)
		{
			let topicName = await lms.getElement("topic_name","className",20000);
			//.then(async function(el){
				let topicNameText = await topicName.getText();
				//return await el.getText();
				await console.log(topicNameText, ": ", fileTime, " != ", durationNextButtonText);
			//})
		}
		else{
			await console.log("file time ", fileTime , "= ", durationNextButtonText);
		}
	}catch(err){
		await console.log("verify file time error", err);
	}
}
//   00:02:58
const topicDetails={ topicsHandler,
courseCompletionStatus,
verifyTiming,
durationHandler,

};

module.exports=topicDetails;