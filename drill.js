const express = require('express')
const morgan = require ('morgan')

const drill = express()
drill.use(morgan('dev'))

//Drill 1 return sum of a and b

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


//Drill 2 - decipher a pangrams/text
//Create an endpoint /cipher. The handler function 
//should accept a query parameter named text and one named shift.

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

    const encrypt = text.split('').map(letter => {
        const code = letter.charCodeAt(0) + shift
        return String.fromCharCode(code)
    })
    res.send(encrypt.join(''))
})

//Drill 3
//Create a new endpoint /lotto that accepts an array of 6 distinct numbers 
//between 1 and 20 named numbers. 
//The function then randomly generates 6 numbers between 1 and 20. 
//Compare the numbers sent in the query with the randomly 
//generated numbers to determine how many match. 
//If fewer than 4 numbers match respond with the string "Sorry, you lose". 
//If 4 numbers match respond with the string "Congratulations, you win a free ticket",
// if 5 numbers match respond with "Congratulations! You win $100!". 
//If all 6 numbers match respond with "Wow! Unbelievable! You could have won the mega millions!".

drill.get('/lotto', (req, res) => {
    const { numbers } = req.query; 

    if(!numbers) {
    return res.status(200).send("numbers is required");
    }

    if(!Array.isArray(numbers)) {
    return res.status(200).send("numbers must be an array");
    }

    const guesses = numbers.map(n => parseInt(n)).filter(n => !Number.isNaN(n) && (n >= 1 && n <= 20));
    
    if(guesses.length != 6) {
    return res.status(400).send("numbers must contain 6 integers between 1 and 20");
    }      
    // 20 numbers to choose from
    const stockNumbers = Array(20).fill(1).map((_, i) => i + 1);
    //randomly choose 6
    const winningNumbers = [];

    for(let i = 0; i < 6; i++) {
    const random = Math.floor(Math.random() * stockNumbers.length);
    winningNumbers.push(stockNumbers[ran]);
    stockNumbers.splice(ran, 1);
    }

    //compare the guesses to the winning number
    let diff = winningNumbers.filter(n => !guesses.includes(n));

    // construct a response
    let responseText;
    switch(diff.length){
    case 0: 
        responseText = 'Wow! Unbelievable! You could have won the mega millions!';
        break;
    case 1:   
        responseText = 'Congratulations! You win $100!';
        break;
    case 2:
        responseText = 'Congratulations, you win a free ticket!';
        break;
    default:
        responseText = 'Sorry, you lose';  
    }

    res.send(responseText);
})


drill.listen(8000, () => {
    console.log('Express server is listening on port 8000!')
})