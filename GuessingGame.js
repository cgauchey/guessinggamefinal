var Game = function(){
    this.playersGuess = null;
    this.winningNumber = generateWinningNumber();
    this.pastGuesses = [];
}

function generateWinningNumber(){
    return Math.floor(Math.random() * 100 +1 );
}

function newGame(){
    return new Game();
}

Game.prototype.difference = function(){
    return Math.abs(this.playersGuess - this.winningNumber)
}

Game.prototype.isLower = function(){
    return this.playersGuess < this.winningNumber;
}

Game.prototype.playersGuessSubmission = function(guess){
    if(typeof guess !== 'number' || guess < 1 || guess > 100) {
        throw "That is an invalid guess.";
    }
    this.playersGuess = guess;
    return this.checkGuess();
}

Game.prototype.checkGuess = function() {
    if(this.playersGuess===this.winningNumber) {
        $('#hint, #submit').prop("disabled",true);
        $('#subtitle').text("Press the Reset button to play again!")
        return 'You Win!'
    }
    else {
        if(this.pastGuesses.indexOf(this.playersGuess) > -1) {
            return 'You have already guessed that number.';
        }
        else {
            this.pastGuesses.push(this.playersGuess);
            $('#guess-list li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);
            if(this.pastGuesses.length === 5) {
                $('#hint, #submit').prop("disabled",true);
                $('#subtitle').text("Press the Reset button to play again!")
                return 'You Lose.';
            }
            else {
                var diff = this.difference();
                if(this.isLower()) {
                    $('#subtitle').text("Guess Higher!")
                } else {
                    $('#subtitle').text("Guess Lower!")
                }
                if(diff < 10) return'You\'re burning up!';
                else if(diff < 25) return'You\'re lukewarm.';
                else if(diff < 50) return'You\'re a bit chilly.';
                else return'You\'re ice cold!';
            }
        }
    }
}

/*Game.prototype.checkGuess = function(){
    if (this.playersGuess === this.winningNumber){
        $('#hint, #submit').prop('disabled',true);
        $('#subtitle').text("Press the Reset button to play again!")
        return 'You Win!';
    };
    if (this.pastGuesses.indexOf(this.playersGuess) > -1){
        return 'You have already guessed that number.'
    };
    if (this.playersGuess !== this.winningNumber){
        this.pastGuesses.push(this.playersGuess);
        $('guess-list li:nth-child('+this.pastGuesses.length+')').text(this.playersGuess);
    };
    if (this.pastGuesses.length === 5){
        $('#hint, #submit').prop('disabled',true);
        $('#subtitle').text("Press the Reset button to play again!")
        return 'You Lose.'
    };
    if (this.playersGuess - this.winningNumber < 10){
        return "You're burning up!"
    }
    if (this.playersGuess - this.winningNumber < 25){
        return "You're lukewarm."
    };
    if (this.playersGuess - this.winningNumber < 50){
        return "You're a bit chilly."
    }
    if (this.playersGuess - this.winningNumber < 100){
        return "You're ice cold!"
    }
}*/

Game.prototype.provideHint = function (){
    var hintArray = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
    return shuffle(hintArray);
}

function shuffle(arr){
    for (var i = arr.length-1;i>0;i--){
        var randomIndex = Math.floor(Math.random()*(i+1));
        var temp = arr[i];
        arr[i] = arr[randomIndex];
        arr[randomIndex] = temp;
    }
    return arr;
}

/*$(document).ready(function(){
    $('#submit').click(function(e) {
      console.log ('Submit button has been clicked');
    })
  })*/

function makeAGuess(game){
    var guess = $('#player-input').val();
    $('#player-input').val("");
    var output = game.playersGuessSubmission(parseInt(guess,10));
    $('#title').text(output);
}

$(document).ready(function(){
    var game = new Game();

    $('#submit').click(function(e){
      makeAGuess(game);
    })

    $('#players-input').keypress(function(event){
      if (event.which == 13){
        makeAGuess(Game);
      }
    })

    $('#hint').click(function(){
        var hints = game.provideHint();
        $('#title').text('The winning number is '+hints[0]+', '+hints[1]+', or '+hints[2]);
    })

    $('#reset').click(function(){
        game = newGame();
        $('#title').text('Play the Guessing Game!');
        $('#subtitle').text('Guess a number between 1-100!')
        $('.guess').text('-');
        $('#hint,#submit').prop("disabled",false);
    })

  })