const axios = require('axios');

const getData = (url) => {
    try {
        return axios.get(url);
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

 

module.exports = {
    getData,
    postData,
}
