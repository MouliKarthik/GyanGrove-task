### Event management system

   <p> This Restful app service help to manages and and queries event data based on a user's geographical location and a specified date. This service 
  will ingest data from a provided CSV dataset and then offer an API to find events for users.</p>
<hr>

### Program Structure
1)This Restfull app service first parse the csv and upload the parsed data into database otherwise it skips the upload part.
2)Whenever the request is made in this endpoint <b>/events/find/<b> with the request body of latitude,longitude of the user's location and also the current date.
Then it will return list of events based on the current date in a well formatted way.

<hr>

### How to Run
## 1. Clone the Repository
git clone 

