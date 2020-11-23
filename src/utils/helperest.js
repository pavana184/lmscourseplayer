const axios = require('axios');

const getData = (url) => {
    try {
        return axios.get(url );
    } catch (e) {
        console.error('Exception occurred while GET', e);
        throw e;
    }
}

const postData = (url, data) => {
    try {
        return axios.post(url, data);
    } catch (e) {
        console.error('Exception occurred while POST', e);
        throw e;
    }
}

const getDataAuth = (url,options) => {

    const request = {
        method: 'GET',
        headers: options.headers,
        data: options.data,
        url,
    };

    try {
        return axios(request);
    } catch (e) {
        console.error('Exception occurred while GET', e);
        throw e;
    }
}

 

module.exports = {
    getData,
    getDataAuth,
    postData,
}
