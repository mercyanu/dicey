/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer, diceDOM, gameIsPlaying;

resetGame();
gameIsPlaying = true;

//generate the random no btw 1 and 6
dice = Math.floor(Math.random() * 6 + 1);

// document.querySelector('#current-' + activePlayer).textContent = dice;
// var y = document.querySelector('#current-0').innerHTML
// document.querySelector('.dice').style.borderRadius = '30px';
// document.querySelector('.dice').style.display = 'none';


document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gameIsPlaying) {
        var diceVal = Math.floor(Math.random() * 6 + 1);
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + diceVal + '.png';

        if (diceVal != 1) {
            //increment roundScore and display it on current score
            roundScore += diceVal;
            document.getElementById('current-' + activePlayer).textContent = roundScore;

        }
        else {
            //change to next player and reset round score
            nextPlayer();

        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gameIsPlaying) {
        //add round score to the total score
        scores[activePlayer] += roundScore;

        //update the UI with new total score
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check if total score is a winning value
        if (scores[activePlayer] >= 20) {
            gameIsPlaying = false;
            diceDOM.style.display = 'none';
            document.querySelector('#name-' + activePlayer).textContent = '!!!WINNER!!!';
            document.querySelector('#name-' + activePlayer).style.color = 'red';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            

            //reset the elements
            resetGame();
        }
        else {
            nextPlayer();
        }
    }


});

document.querySelector('.btn-new').addEventListener('click', function(){
    gameIsPlaying = true;
    resetGame();

});

function nextPlayer() {
    activePlayer = activePlayer === 0 ? 1 : 0;
    roundScore = 0;
    //change on UI aswell
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //toggle the active class when the current player changes
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    diceDOM.style.display = 'none';
}

function resetGame() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'none';

    //set all displayed values to 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

}