const {Given, When, Then} = require('@cucumber/cucumber');
const assert = require('assert').strict
const infoapi = require('./api-info')
const restHelper = require('../../utils/helperest');

let context = {}

Given('The userinfo with {int} exist', async(id) =>{
    context['id'] = id;
})

When('I send GET request to {string}', async(path) => {
	// let destination = (infoapi.url+infoapi.destination.userinfo++context['id'])
	let destination = (infoapi.dummy_url+infoapi.destination.dummy_post+context['id'])
    const response = await restHelper.getData(destination);
    context['response'] = response;
})

Then('I receive respose', async() => {
    console.log('-----------',context.response.data);
})