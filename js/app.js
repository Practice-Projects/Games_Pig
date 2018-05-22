// declare variables
var scores, roundScore, activePlayer, gamePlaying, prevRoll, targetScore;
// call function to initialize game
init();

// event listener for Roll Dice button
document.getElementsByClassName("btn-roll")[0].addEventListener("click", function() {
    if (gamePlaying) {

        // generate random number between 1 and 6
        var dice_1 = Math.floor(Math.random() * 6) + 1;
        var dice_2 = Math.floor(Math.random() * 6) + 1;

        // make the dice img visible
        document.getElementById("dice-1").style.display = 'block';
        document.getElementById("dice-2").style.display = 'block';

        // change the dice img to match the roll
        document.getElementById("dice-1").src = 'images/dice-' + dice_1 + '.png';
        document.getElementById("dice-2").src = 'images/dice-' + dice_2 + '.png';


        // if player rolls a six on consecutive rolls, player loses entire score
        if (dice_1 === 6 || dice_2 === 6) {
            if (prevRoll === 6) {
                // rolled 2 sixes - lose all score
                // update the UI
                document.getElementById('score-' + activePlayer).textContent = 0;
                // set global score to 0;
                scores[activePlayer] = 0;               
                prevRoll=0;
                nextPlayer();              
            } else {
                // player rolled a six
                prevRoll=6;
            }          
        } else {
            // set previous roll to 0 since rules only care about 2 consecutive sixes
            prevRoll=0;
        }

        // if either dice is one, player loses current score
        if (dice_1 !== 1 && dice_2 !== 1) {
            // increment round score
            roundScore += (dice_1 + dice_2);
            // add roll to current score in DOM 
            document.getElementById('current-' + activePlayer).textContent=roundScore;
        } else {
            // next player
            prevRoll=0;
            nextPlayer();      
        }      
    } 
});

// event listener for Hold button
document.getElementsByClassName('btn-hold')[0].addEventListener('click',function(){
    if (gamePlaying) {
        // add round score to global score
        scores[activePlayer] += roundScore;
        // update score in DOM
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
     
        // check if player won game
        if(scores[activePlayer] >= targetScore) {
            // set player label to Winner!
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            // add and remove classes
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    
            // deactivate game functions
            gamePlaying = false;
        } else {
            nextPlayer();       
        }
    }
});

// event listener for New Game button
document.getElementsByClassName('btn-new')[0].addEventListener('click', init);

// event listener for target score text box
document.getElementsByClassName('final-score')[0].addEventListener('change', function(){
    targetScore = document.getElementsByClassName('final-score')[0].value;
})

// function to set next player
function nextPlayer() {
    // set previous player's current score to 0 in the UI
    document.getElementById('current-' + activePlayer).textContent=0;
    // reset the round score and previous roll
    roundScore = 0;
    // toggle the active player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    // toggle active class for players
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active'); 
};

// function to initialize game
function init() {
    // reset variables
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    prevRoll = 0;
  
    // set target score
    if(targetScore) {
        targetScore = document.getElementsByClassName('final-score')[0].value;
    } else {
        targetScore = 100;
    }

    // update the UI
    for(i=0;i <= 1; i++){
        // reset scores to 0
        document.getElementById('current-' + i).textContent=0;
        document.getElementById('score-' + i).textContent = 0;
        // remove winner class
        document.querySelector('.player-' + i + '-panel').classList.remove('winner');
        // remove active class
        document.querySelector('.player-' + i + '-panel').classList.remove('active');
        // reset player labels
        document.getElementById('name-' + i).textContent = 'Player ' + i;
    }

    // re-set player 0 to active
    document.querySelector('.player-0-panel').classList.add('active');

    // hide the dice
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    // enable buttons
    document.querySelector('.btn-hold').disabled = false;
    document.querySelector('.btn-roll').disabled = false;
};