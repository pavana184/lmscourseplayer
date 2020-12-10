const {Given, When, Then} = require('@cucumber/cucumber');
const { Key, util, By } = require('selenium-webdriver');
const assert = require('assert').strict
const infoapi = require('./api-info')
const restHelper = require('../../utils/helperest');

const cryptoJs = require("crypto-js");
var parseString = require('xml2js').parseString;

let context = {};
let result = {};

Given('credentitals to login in lms1 {string} and {string}', async(userid, password) =>{

	let authStr = userid+ '^' + password + '^'+infoapi.clientId
    let encryptedStr = encryptData(authStr);
    //console.log(encryptedStr);
    const destination = infoapi.url+infoapi.destination.authUrl 
    const option = {'headers':{'Authorization':encryptedStr}}

    const response = await restHelper.getDataAuth(destination, option);

    context['auth'] = response.data.data;
    //console.log('***** >> ',context.auth.learner_token)
    return ( response.data.status === 'success' ? true : false)
})

When('I send the request to course player', async()=>{
	 
	const destination = infoapi.url+infoapi.destination.playerAuth
	const options = {'headers':{'Authorization':context.auth.learner_token}}
	const res = await restHelper.getDataAuth(destination,options);
	result['player'] = res.data;
	//console.log(player); 
});

Then('I get the player response', async ()=>{
	console.log("player",result.player);
})

When('I send request to get the notes,updates,vignettes {int}', async(course_id)=>{
	const destination = infoapi.url+infoapi.destination.updatesNotesPoster+course_id
	const option = {'headers':{'Authorization':context.auth.learner_token}}
	const response = await restHelper.getDataAuth(destination,option);
	result['notes'] = response.data.notes;
	result['updates'] = response.data.updates;
	result['vignettes'] = response.data.vignettes;
	
});

Then ('I get the updateNotesPoster by ID', async()=>{
	
	const updates = result.updates;
	const notes = result.notes;
	const vignettes = result.vignettes;
	console.log("Number of updates in the course = ", Object.keys(updates).length);
	notes.forEach(function(el){
		console.log("notes list :", el.name);
	});
	vignettes.forEach(el=>{
		console.log("vignettes list: ", el.title);
	})
	
})

When('I send the request to get the permawidget text {int}', async(widget_id)=>{
	const destination = infoapi.url+infoapi.destination.permawidgettext+widget_id
	const options = {'headers':{'Authorization':context.auth.learner_token}}
	const response = await restHelper.getDataAuth(destination,options);
	result.permawidget = response.data;
	//console.log(permawidget.data.permawidget);
});

Then('I get the response', async()=>{
	console.log(result.permawidget.data);
});

When('I send the request to get coursematrix {int}', async(cours_id)=>{
	let arr = [];
	const destination=infoapi.url+'api/playerv2/masterCourseConfig/'+cours_id
	const options = {'headers':{'Authorization':context.auth.learner_token}}
	const response = await restHelper.getDataAuth(destination,options);
	result['courseMatrix'] = response.data;
	
})

Then('Get the coursematrix strig', async()=>{
	//console.log("Course Matrix string: ", result.courseMatrix);

	await parseString(result.courseMatrix, async function(err,result){
		
		var courseMatrix = result.ceCourseFramework2018.courseContent[0].content;
		//console.log(result.ceCourseFramework2018.courseContent)
		console.log(courseMatrix);
		
		await restHelper.showAllItems(courseMatrix)
		})
})

When('I send the request to get the course configuration {int}', async(course_id)=>{
	const destination = infoapi.url+infoapi.destination.courseConfigUrl+course_id
	const options = {'headers':{'Authorization':context.auth.learner_token}}
	const response = await restHelper.getDataAuth(destination,options);
	result['courseConfig'] = response.data;
	//console.log(result.courseConfig.data)
	
})

Then('I get the course details', async()=>{
	parseString(result.courseConfig, async function(err,final){
		console.log("course Details: ", final.ceCourseConfig.languages[0].language);
	});
})


const encryptData = (authStr) =>{

	var iv = cryptoJs.enc.Utf8.parse(infoapi.ENCRYPT_IV)    //random number for encryption algorithm
	var key = cryptoJs.enc.Utf8.parse(infoapi.ENCRYPT_KEY); //secret key for encryption algorithm
	let encryptedValue = cryptoJs.AES.encrypt(authStr
	, key,
	{ iv: iv, mode: cryptoJs.mode.CBC, padding: cryptoJs.pad.Pkcs7 }
	)
	return encodeURIComponent(encryptedValue.toString());
}




 

