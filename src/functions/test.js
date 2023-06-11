const axios = require('axios');

export const getTest = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    // const apiUrl = 'http://localhost:8000';
    // // built-in fetch
    // const response = await fetch(apiUrl + '/test', {
    //     method: 'GET',
    //     headers: {
    //         Accept: 'application/json',
    //         "content-type": 'application/json',
    //     },
    // });

    // const data = await response.json();
    // return data;

    try {
        const response = await axios.get(apiUrl);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }

}