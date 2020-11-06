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
				console.log("Course Completed");
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

const topicDetails={ topicsHandler,
courseCompletionStatus
};

module.exports=topicDetails;