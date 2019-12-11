const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello Grace!')
})

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!')
})