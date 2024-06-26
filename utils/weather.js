const axios = require('axios');
require('dotenv').config();

async function getWeather(city, date) {
    try {
        const response = await axios.get(`https://gg-backend-assignment.azurewebsites.net/api/Weather?code=KfQnTWHJbg1giyB_Q9Ih3Xu3L9QOBDTuU5zwqVikZepCAzFut3rqsg==&city=${encodeURIComponent(city)}&date=${date}`);
        //console.log(response);
        // Extract weather data from the response
        const weatherData = response.data.weather;
        // console.log(weatherData);
        return weatherData;
    } catch (error) {
        console.error('Error fetching weather data:', error.response ? error.response.data : error.message);
        throw error; // Rethrow the error to handle it outside of this function
    }
}

module.exports = getWeather;