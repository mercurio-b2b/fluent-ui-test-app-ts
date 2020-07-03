### Fluent UI example for NCASA App

This project assumes that the users view is available on MySQL on a local server

We split the proyect on the React frontend and the NodeJS backend.

## Backend

Database configuration is on models/db.js

From terminal, we can enter the backend folder

cd backend

Install dependencies via npm:

npm install

And then start the project with Node or Forever 
(note that if started with node it will require a second terminal window)

node app.js

forever start app.js

This starts the backend server on port 3333

## Frontend

Once the Backend is running, can go back to the main folder and install dependencies on it via npm:

npm install

Then can start the project with npm:

npm start

Frontend server runs on port 8080
