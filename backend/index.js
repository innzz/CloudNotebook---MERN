//Importing the function which connects with data base
const connectToMongo = require('./db');
//Importing express router to use database with application
const express = require('express')

//Running thta function which connects with the data base
connectToMongo();
//Importing express in app
const app = express()
//Setting the port on which application will run
const port = 5000

//Express.json() to run thunderclient
app.use(express.json());

//This function will show data on this path '/api/auth' required from './routes/auth'
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

// app.get('/', (req, res) => 
//   res.send('Hello inzamam')
// ),


//This will show on which port our app is hosting
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})