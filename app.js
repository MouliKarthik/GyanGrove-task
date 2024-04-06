const fs = require('fs');

const csv = require('csv-parser');
const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();

const event = require('./utils/eventModel'); 

const getWeather = require('./utils/weather');
const calculateDistance = require('./utils/distance');
const responsesInPages = require('./utils/responseInPages');


const app = express();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST'); 
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next(); 
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Read the dataset and store it in the database
const results = [];
fs.createReadStream('dataset.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("Database connection established");
      const count = await event.countDocuments();
      /*If the count of the database is equal to zero 
        then the db is empty so we need to insert the documents 
        otherwise we don't need to
      */
      if (count === 0) {
        await event.insertMany(results);
        console.log("CSV data inserted into the database");
      } else {
        console.log("Database already contains data, skipping insertion"); 
      }
    } catch (error) {
      console.error("Error connecting to database:", error);
    }
  });




app.get('/events/find', async (req,res) =>{
  try{
    // get the latitute, longitude and date from the request body and calculate the end date which is after 14 days

    const {latitude,longitude,date} = req.body;
    const currentDate = new Date(date);
    const endDate = new Date(currentDate.getTime() + (14 * 24 * 60 * 60 * 1000));

    /*1)get the response from mongodb server where the date is greater than or equal to the current date 
      and less than end date, and then sort the date in ascending order..
      2)then pass the user's latitude,longitude and event's latitude and longitude to calculateDistance func in which we make api calls 
      which give response of distance between the user and the event
      3)then pass the city_name and event date to getWeather in which we make api call to get the weather of particular city in that date
      4) finally format the response and pass it to responsesInPages which return the response in well formatted way..
    */

    const events = await event.find({date: {$gte: currentDate, $lte: endDate}}).sort({date:1});
    const response = await Promise.all(events.map(async(event) => {
      let distance_km;
      let weather;
      let date = event.date.toISOString().split('T')[0];
      try{
        distance_km = await calculateDistance(latitude, longitude,event.latitude,event.longitude)
        weather = await getWeather(event.city_name,event.date)
      }catch(err){
        throw new Error(err)
      }
      return {event_name: event.event_name,city_name:event.city_name,date,distance_km,weather}
    }))
    let responses = responsesInPages(response)
    res.status(200).send(responses)


  }catch(err){
    res.status(500).json({message: err.message});
  }
})





app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

