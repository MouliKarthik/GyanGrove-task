#### HOST-LINK:https://gyangrove-task-1.onrender.com/

---


### Event Management System

This Restful app service helps to manage and query event data based on a user's geographical location and a specified date. This service ingests data from a provided CSV dataset and then offers an API to find events for users.

---

### Program Structure

1. The Restful app service first parses the CSV and uploads the parsed data into the database; otherwise, it skips the upload part.
2. Whenever a request is made to the endpoint `/events/find/` with the request body of latitude, longitude of the user's location, and also the current date, it returns a list of events based on the current date in a well-formatted way.

---

### How to Setup

#### 1. Clone the Repository

`git clone https://github.com/MouliKarthik/GyanGrove-task.git`


#### 2. Install Necessary Packages

`npm install`


#### 3. Setting up the Database Connection

Create a `.env` file.

In the `.env` file, set the MongoDB URI. For example:

`MONGODB_URI=mongodb+srv://username:password@cluster0.aionf9x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`


---

#### NOTE

Make sure the csv filename is dataset.csv

---
### How to Run

After setting up, run this command:

`node app.js`

---
### How to make a request
Open the postman, enter this url: `localhost:5000/events/find`


And give the request body in the format of json. For example

`{
    "latitude": "40.7128",
    "longitude": "-74.0060",
    "date": "2024-03-15"
}`


