const express = require('express')
const morgan = require ('morgan')

const drill = express()
drill.use(morgan('dev'))

drill.get('/sum', (req, res) => {

    const a = parseInt(req.query.a)
    const b = parseInt(req.query.b)
    const c = a + b

    if(Number.isNaN(a) || Number.isNaN(b)) {
        return res.status(400).send('Please provide a number');
    }
    if(!a) {
        return res.status(400).send('Please provide a');
    }
    if(!b) {
        return res.status(400).send('Please provide b');
    }

    const sum = `The sum of ${a} and ${b} is ${c}`;    
    res.send(sum)
})

drill.listen(8000, () => {
    console.log('Express server is listening on port 8000!')
})