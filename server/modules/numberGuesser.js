let newPlayerArray = [];

function checkGuess(playerArray, randomNumber){
    
    for(let i=0; i<playerArray.length; i++){
        if (playerArray[i].guess == randomNumber){
            playerArray[i].result = 'win';
        }
        else if (playerArray[i].guess > randomNumber){
            playerArray[i].result = 'tooHigh';
        }
        else {
            playerArray[i].result = 'tooLow';
        }
    }

    for(let i=0; i<playerArray.length; i++){
        newPlayerArray.push(playerArray[i]);
    }

}


module.exports = {
    guess: checkGuess,
    playerArray: newPlayerArray,
}

