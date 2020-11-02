const { Key, until, By } = require('selenium-webdriver');
const driver = require('../build');

const TIMEOUT = 1000; // milliseconds


async function launchLMSPage(url)
{
	try
	{
		await driver.manage().window().maximize();
		await driver.get(url);
		var parent = await driver.getWindowHandle();
		await waitForPageLoad();
	}catch(err)
	{
		await console.log("launchLMSPage error" + err);
	}
}


async function loginPage(username, password)
{
	try
	{
		
		let emailField = await getElement("username","id",10000);
		await emailField.sendKeys(username);
		let pwd = await getElement("password","id",10000);
		await pwd.sendKeys(password);
		let loginBtn = await getElement("btn","className",10000);
		loginBtn.click();
		await waitForPageLoad();
	}catch(err)
	{
		await console.log("unable to login"+ err)
	}
}

async function closeQuickTour()
{
	try
	{
		let Endbtn = await getElement("//button[@class='mat-button']/span[@class='mat-button-wrapper']","xpath",10000);
			
		await Endbtn.click();
	}catch(err)
	{
		await console.log("quicktour error : " + err);
	}
}



async function searchCourse(coureName)
{
	try
	{
		await waitForPageLoad();
		let search = await getElement("//input[@type='text']", "xpath", 10000);
		await search.sendKeys(coureName);
		let courseList = await driver.findElements(By.xpath("//h5[@class='truncate']"));
		for(var i of courseList)
			{
				var courseNames = await i.getText();
				//await console.log("list of courses: " + courseNames);
			}
		await courseList[0].click();
		let resumeCourse = await getElement("//b[@class='blue-color ng-star-inserted']","xpath",10000);
		await resumeCourse.click();
		

		// await coursePageHandler();
		//await visitedTopicHandler();

	}catch(err)
	{
		await console.log("error in homepage : " + err);
	}
}

 


/**
** getElement
**/
async function getElement(locator, type, timeout)
{
	try
	{
		if(type=="id")
		{
			var classname = await driver.wait(until.elementLocated(By.id(locator)),timeout);
			return await driver.wait(until.elementIsVisible(classname),timeout);
		}
		else if(type=="className")
		{
			var classname = await driver.wait(until.elementLocated(By.className(locator)),timeout);
			return await driver.wait(until.elementIsVisible(classname),timeout);
		}
		else if(type=="xpath")
		{
			var xpaths = await driver.wait(until.elementLocated(By.xpath(locator)),timeout);
			return await driver.wait(until.elementIsVisible(xpaths),timeout);
		}
		else
		{
			await console.log("Could not find element: "+ type + " : " + locator);
		}
	}catch(err)
	{
		
		await console.log(err);
	}
}


async function waitForPageLoad()
{
	do 
        {
            pageLoadStatus = await driver.executeScript("return document.readyState").toString();
            
        } while ( !pageLoadStatus == "complete"){
            return pageLoadStatus;
        }
}


 

async function iframeHandler()
{
	try
	{
		//var frames = await driver.wait(until.elementLocated(By.id("the_iframe")),30000);
		var frames = await getElement("the_iframe","id",50000);
		await driver.switchTo().frame(frames);

	}catch(err)
	{
		await console.log("iframe Handlers error : " + err);
	}
}

async function coursePageHandler()
{
	try
	{
			
		let resume = await getElement("//span[@class='startresume_text ng-binding']","xpath",20000);
		await resume.click();
	}catch(err)
	{
		await console.log("course page error : " + err);
	}
}


 

function test()	{console.log('my test')}


const lmsObj = {
	launchLMSPage,
	loginPage,
	closeQuickTour,
	waitForPageLoad,
	searchCourse,
	iframeHandler,
	coursePageHandler,
	test
}

module.exports = lmsObj