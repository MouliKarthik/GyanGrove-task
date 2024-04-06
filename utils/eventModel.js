const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
        event_name: {type:String,required:true},
        city_name: {type:String,required:true},
        date: {type:Date,required:true},
        time: {type:String,required:true},
        latitude: {type:String,required:true},
        longitude: {type:String,required:true},
});

module.exports = mongoose.model('Event',eventSchema);