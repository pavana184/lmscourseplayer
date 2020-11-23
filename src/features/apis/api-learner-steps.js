const {Given, When, Then} = require('@cucumber/cucumber');
const assert = require('assert').strict
const infoapi = require('./api-info')
const restHelper = require('../../utils/helperest');

const cryptoJs = require("crypto-js");

let context = {}

Given('credentitals to login in lms {string} and {string}', async(userid, password) =>{

	let authStr = userid+ '^' + password + '^'+infoapi.clientId
    let encryptedStr = encryptData(authStr);

    const destination = infoapi.url+infoapi.destination.authUrl 
    const option = {'headers':{'Authorization':encryptedStr}}

    const response = await restHelper.getDataAuth(destination, option);

    context['auth'] = response.data.data;
    console.log('***** >> ',context)
    return ( response.data.status === 'success' ? true : false)
})

When('I send request to get learner information', async() => {
    	// console.log('-----------',context);

	if(context.auth.learner_token )	{
    	// console.log('-----------',context);
     	const destination = infoapi.url+infoapi.destination.userInfo+context.auth.user_Id
    	const option = {'headers':{'Authorization':context.auth.learner_token}}
    	const response = await restHelper.getDataAuth(destination, option);

    	// console.log(response.data.data)
    	const courses = response.data.data.courses;

    	courses.forEach(item =>{
    		console.log(item.course_Id+'  '+item.course_name)
    	})

		return true;
	}
	return false;
})

Then('I receive response on', async() => {
    console.log('-----------');
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


