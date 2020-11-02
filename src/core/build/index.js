require('dotenv').config()
const { Builder } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
var edge = require('selenium-webdriver/edge');

let driver = null;


if(process.env.SELENIUM_BROWSER !== 'edge')	{
	driver = new Builder().forBrowser('chrome').build();
	console.log(process.env.SELENIUM_BROWSER)
}
else	{
var service = new edge.ServiceBuilder()
     .setPort(55555)
     .build();

 var options = new edge.Options();
 driver = edge.Driver.createSession(options, service);

}
 
module.exports = driver;