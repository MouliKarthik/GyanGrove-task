const axios = require('axios');
require('dotenv').config();

async function calculateDistance(latitude1, longitude1, latitude2, longitude2) {
    try {
        const response = await axios.get(`${process.env.DISTANCE_API_KEY}&latitude1=${latitude1}&longitude1=${longitude1}&latitude2=${latitude2}&longitude2=${longitude2}`);
        //console.log(response);
        // Extract distance from the response
        const distance = response.data.distance;
        //console.log(distance);
        return distance;
    } catch (error) {
        console.error('Error calculating distance:', error.response ? error.response.data : error.message);
        throw error; // Rethrow the error to handle it outside of this function
    }
}

module.exports = calculateDistance;