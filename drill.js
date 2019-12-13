const express = require('express')
const morgan = require ('morgan')

const drill = express()
drill.use(morgan('dev'))

//Drill 1 return sum of a and b

drill.get('/sum', (req, res) => {

    const a = parseInt(req.query.a)
    const b = parseInt(req.query.b)
    

    if(Number.isNaN(a) || Number.isNaN(b)) {
        return res.status(400).send('Please only provide numbers');
    }

    if(!a) {
        return res.status(400).send('a is required');
    }

    if(!b) {
        return res.status(400).send('b is required');
    }

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
    if(!shift || isNaN(shift)) {
        return res.status(400).send('shift must be a number')
    }

    const textArray = text.split('')
    const newArray = textArray.map(letter => {
        const letterCode = letter.charCodeAt(0)
        if(letterCode == 122 || letter === 90 ){
            const newLetter = String.fromCharCode((letterCode - 25) + shift)
            return newLetter
        } else {
            const newLetter = String.fromCharCode(letterCode + shift)
            return newLetter
        }

    })
    const newText = newArray.join('')
    res.send(newText)
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
    const numbers = req.query.numbers

    if(!numbers || numbers.length < 6) {
        return res.status(400).send('Please provide 6 numbers')
    }

let randomNumbers =[]

for(let i = 0; i <= 6; i++) {
    randomNumbers.push(Math.floor(Math.random() * 20))
}

let counter = 0;

for(let i = 0; i <= 6; i++) {
    const newNumber = Number(randomNumbers[i])
    if(randomNumbers.indexOf(newNumber) >= 0) {
        counter++
    }

}
// randomNumbers = randomNumbers.from({length: 20}, () => Math.floor(Math.random() * 20));

if(counter < 4) {
    res.send('Sorry you loose')
} else if(counter === 4) {
    res.send('Congratulations, you win a free ticket')
} else if (counter === 5) {
    res.send(' Congratulations! You win $100!')
} else if (counter === 6) {
    res.send('Wow! Unbelievable! You could have won the mega millions!')
}

})

drill.listen(8000, () => {
    console.log('Express server is listening on port 8000!')
})