$(document).ready(function(){

    let count = 0;

    class Player {
        constructor(name, guess) {
            this.name = name;
            this.guess = guess;
        }
    }

    let returnedArray = [];

    $('.startContainer').hide();

    $('#startButton').on('click', function(){
        $('.setupContainer').hide();
        $('.startContainer').show();

        // example of ajax for Carter :)

        let maxValue = getMaxValue();

        function getMaxValue(){
            let maxValue = Number($('.max').val());
            return maxValue;
        }

        $.ajax({
            method: 'POST',
            url: '/maxnumber',
            data: { maxValue: maxValue },
        }).done(function(response){
            getMaxValue();
        }).fail(function(response){
            console.log(response);
        });
    
    }); // end startButton

    $('#submitButton').on('click', function(){
        count ++;
        $('.guessCounter').text('Total Guesses: ' + count + '');
        submitGuess();

        function submitGuess() {
            let playerArray = [];
        
            $('#player-list li').each(function() {
                let playerName = $(this).find('.player-name').text();
                let playerGuess = $(this).find('input').val();
                let newPlayer = new Player(playerName, playerGuess);
                playerArray.push(newPlayer);
        
            }); 


        $.ajax({
            method: 'POST',
            url: '/playerguesses',
            data: { playerArray: playerArray },
        }).done( function(response){
            getResults();
        }).fail( function(response){
            console.log(response);
        });

        function getResults() {
            $.ajax({
                method: 'GET',
                url: '/playerguesses',
            }).done( function(response){
                returnedArray = response;
                console.log(returnedArray);
                for(let i=0; i<returnedArray.length; i++){
                    $('.high-low').get(i).append(returnedArray[i].result)
                }


            })
        }






        } // end submitGuess

    }) // end submit button
    
    
    
        

})