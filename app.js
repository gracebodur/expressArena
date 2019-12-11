const express = require('express')
const app = express()

//to create a get route we use the .get() method where PATH is 
//the path on the server and HANDLER is a function to be executed 
//when the route is matched. The handler function must accept two parameters, 
//the first one is the Request object, 
//here named req and the second is the Response object, here named res.
app.get('/', (req, res) => {
    console.log('The root path was called')
    res.send('Hello Express!')
})

app.get('/burgers', (req, res) => {
    res.send('We have juicy cheese burgers!');
})

app.get('/pizza/pepperoni', (req, res) => {
    res.send('Your pizza is on the way!');
})

app.get('/pizza/pineapple', (req, res) => {
    res.send("We don't serve that here. Never call again!");
})

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!')
})

