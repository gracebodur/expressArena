const express = require('express')
const morgan = require ('morgan')

const drill = express()
drill.use(morgan('dev'))

//Drill 1

drill.get('/sum', (req, res) => {

    const a = parseInt(req.query.a)
    const b = parseInt(req.query.b)
    

    if(Number.isNaN(a) && Number.isNaN(b)) {
        return res.status(400).send('Please provide a number');
    }

    // if(!a) {
    //     return res.status(400).send('a is required');
    // }

    // if(!b) {
    //     return res.status(400).send('b is required');
    // }

    const c = a + b
    
    res.send(`The sum of ${a} and ${b} is ${c}`)
})


//Drill 2

drill.get('/cipher',(req, res) => {
    const text = (req.query.text)
    const shift = parseInt(req.query.shift)

    if(!text) {
        return res.status(400).send('text is required')
    }

    if(!shift) {
        return res.status(400).send('shift is required')
    }

    if(Number.isNaN(shift)) {
        return res.status(400).send('A number is required for shift')
    }

    const encrypt = text
    .split('')
    .map(letter => {
        const code = letter.charCodeAt(0) + shift
        return String.fromCharCode(code)
    })
    res.send(encrypt.join(''))
})

drill.listen(8000, () => {
    console.log('Express server is listening on port 8000!')
})