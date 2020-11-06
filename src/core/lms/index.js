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

async function spinnerHandler()
{
	try
	{
		var spinner = await getElement("//div[@class='simple_spinner welcome_preloader ng-scope']","xpath",10000);
		do
		{
			var spinnerStatus = await spinner.isDisplayed();
			await console.log(await spinner.isDisplayed());
		}while(spinnerStatus);
	}catch(err)
	{
		await console.log("Spinner cannot be located: " + err);
	}
}
 
async function actionHandler()
{
	try{
		await driver.sleep(2000);
	await driver.actions().keyDown(Key.ALT).keyDown(Key.CONTROL).sendKeys("7").perform();
	
	//await console.log("action handler")

}catch(err)
{
	await console.log(err);
}
}

async function widgetHandler()
{
	try{
		let widgetIcon = await driver.findElements(By.xpath("//div[@class='cecuepoint ng-scope']"));
		if(widgetIcon.length>0)
		{
			for(i=0;i<widgetIcon.length;i++)
			{
				//await driver.sleep(3000)
				let offset = await widgetIcon[i].getRect();
				let x= await offset.x;
				let y = await offset.y;
				//await console.log("xoffset = ", x, " yoffset = ", y);
				const actions = driver.actions({async: true});
	   		 	await actions.move({x:parseInt(x)-20,y:parseInt(y)}).pause(1000).click().perform();
				let widgetWindow = await getElement("//div[@class='modal-dialog modal-widget']","xpath",120000);
	    		let widgetClose = await getElement("tab_close_widget","id",50000);
				await widgetClose.click();				
    		}
		 }
		
	}catch(err)
	{
		await console.log("drag handler error = ", err);
	}
}

async function dragToEnd()
{
	try{
		let progressBar = await driver.findElement(By.className("replay_btn"));
			let offset = await progressBar.getRect();
			let x = await offset.x;
			let y = await offset.y;
			//await console.log("xoffset = ", x, " yoffset = ", y);
			const actions = driver.actions({async: true});
   			await actions.move({x:parseInt(x)-20,y:parseInt(y)}).pause(1000).click().perform();
    	}catch(err)
    	{
    		await console.log("drag to end: ", err);
    	}
}

async function waitForNavigationPage()
{
	try{
		var navPage = await driver.findElement(By.className("navitem")).isDisplayed();
		//await console.log("nav item = ", navPage);

		while(navPage!=true)
		{
			navPage = await driver.findElement(By.className("navitem")).isDisplayed();
			//await console.log("false");
		}

		
	}catch(err)
	{
		await console.log("navigation page err ", err);
	}
}


async function congratulationsPage()
{
	try
	{
		let closeButton = await getElement("portlet-icon-close","className",20000);
		await closeButton.click(); 
	}catch(err)
	{
		await console.log("congratulation Page error : " + err);
	}
}

async function waitForVideoLoad()
{
	try{
		let timrBar = await driver.findElement(By.className("timeBar"));
	//await console.log(timrBar);
	while(await timrBar.getAttribute('style')=="width: 100%;")
	{
		console.log(await timrBar.getAttribute('style'));
	}
}catch(err)
{
	await console.log("wait for video load", err);
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
	getElement,
	spinnerHandler,
	actionHandler,
	widgetHandler,
	dragToEnd,
	waitForNavigationPage,
	congratulationsPage,
	waitForVideoLoad,
	test
}

module.exports = lmsObj