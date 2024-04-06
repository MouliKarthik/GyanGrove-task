### Event Management System

This Restful app service helps to manage and query event data based on a user's geographical location and a specified date. This service ingests data from a provided CSV dataset and then offers an API to find events for users.

---

### Program Structure

1. The Restful app service first parses the CSV and uploads the parsed data into the database; otherwise, it skips the upload part.
2. Whenever a request is made to the endpoint `/events/find/` with the request body of latitude, longitude of the user's location, and also the current date, it returns a list of events based on the current date in a well-formatted way.

---

### How to Setup

#### 1. Clone the Repository

git clone https://github.com/MouliKarthik/GyanGrove-task.git
