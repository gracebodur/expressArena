const express = require('express')
const morgan = require('morgan')

const app = express()
// This is middleware that requests pass through
// on their way to the final handler
app.use(morgan('dev'))

//This is the final request handler

//to create a get route we use the .get() method where PATH is 
//the path on the server and HANDLER is a function to be executed 
//when the route is matched. The handler function must accept two parameters, 
//the first one is the Request object, 
//here named req and the second is the Response object, here named res.
// app.get('/', (req, res) => {
//     console.log('The root path was called')
//     res.send('Hello Express!')
// })

// app.get('/burgers', (req, res) => {
//     res.send('We have juicy cheese burgers!');
// })

// app.get('/pizza/pepperoni', (req, res) => {
//     res.send('Your pizza is on the way!');
// })

// app.get('/pizza/pineapple', (req, res) => {
//     res.send("We don't serve that here. Never call again!");
// })

//REQUEST PARAMETERS
// app.get('/echo', (req, res) => {
//     const responseText = `Here are some details of your request:
//     Base URL: ${req.baseUrl}
//     Host: ${req.hostname}
//     Path: ${req.path}
//     `;
//     res.send(responseText);
// });

//QUERY OBJECT
// app.get('/queryViewer', (req, res) => {
//     console.log(req.query);
//     res.end(); //do not send any data back to the client
// });

app.get('/greetings', (req, res) => {
    //1. get values from the request
    const name = req.query.name;
    const race = req.query.race;
  
    //2. validate the values
    if(!name) {
      //3. name was not provided
      return res.status(400).send('Please provide a name');
    }
  
    if(!race) {
      //3. race was not provided
      return res.status(400).send('Please provide a race');
    }
  
    //4. and 5. both name and race are valid so do the processing.
    const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;
  
    //6. send the response 
    res.send(greeting);
  });

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!')
});

