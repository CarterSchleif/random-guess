const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use( bodyParser.urlencoded({ extended:true }) );
app.use( bodyParser.json());

const guessObject = require('./modules/numberGuesser');
const random = require('./modules/randomNumber');

app.use(express.static('server/public'));

let randomNumber = 0;

app.post('/maxnumber', function(request, response){
    randomNumber = random(request.body.maxValue);
    console.log(randomNumber);
    return randomNumber;
    response.sendStatus(201);
});

app.post('/playerguesses', function(request, response){
    guessObject.guess(request.body.playerArray, randomNumber);
    response.sendStatus(201);
});

app.get('/playerguesses', function(request, response){
    console.log(request);
    response.send(guessObject.playerArray);
});

const port = 5000;
app.listen(port, function() {
    console.log(`Server listening on port ${port}`);
})


