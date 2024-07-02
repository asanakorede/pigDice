// Wait for the document to be ready before executing the script
$(document).ready(function () {
  // Selecting necessary elements using jQuery
  const score0Element = $('#score--0');
  const score1Element = $('#score--1');
  const playerZero = $('.player--0');
  const playerOne = $('.player--1');
  const playerZeroScores = $('#current--0');
  const playerOneScores = $('#current--1');

  const diceImg = $('.dice');
  const newGame = $('.btn--new');
  const rollDice = $('.btn--roll');
  const holdDice = $('.btn--hold');

  // Initialize game state variables
  let scores, currentScore, activePlayer, playing;

  // Function to initialize the game
  const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    // Reset scores and UI elements to initial values
    score0Element.text(0);
    score1Element.text(0);
    playerZeroScores.text(0);
    playerOneScores.text(0);
    diceImg.addClass('hidden');
    playerZero.removeClass('player--winner');
    playerOne.removeClass('player--winner');
    playerZero.addClass('player--active');
    playerOne.removeClass('player--active');
  };

  // Call the init function to set up the initial state of the game
  init();

  // Function to switch players
  const playerSwitching = function () {
    $(`#current--${activePlayer}`).text(0);
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    playerZero.toggleClass('player--active');
    playerOne.toggleClass('player--active');
  };  

  // Event listener for the "Roll Dice" button
  rollDice.on('click', function () {
    if (playing) {
      // Roll the dice and display the result
      const dice = Math.trunc(Math.random() * 6) + 1;
      diceImg.removeClass('hidden');
      diceImg.attr('src', `./img/dice-${dice}.png`);

      // Update current score based on the dice value
      if (dice !== 1) {
        currentScore += dice;
        $(`#current--${activePlayer}`).text(currentScore);
      } else {
        // Switch to the next player if a 1 is rolled
        playerSwitching();
      }
    }
  });

  // Event listener for the "Hold" button
  holdDice.on('click', function () {
    if (playing) {
      // Add current score to the player's total score
      scores[activePlayer] += currentScore;
      $(`#score--${activePlayer}`).text(scores[activePlayer]);

      // Check if the player has won
      if (scores[activePlayer] >= 100) {
        playing = false;
        // Add winner class and hide the dice if a player wins
        $(`.player--${activePlayer}`).addClass('player--winner');
        $(`.player--${activePlayer}`).removeClass('player--active');
        diceImg.addClass('hidden');
      } else {
        // Switch to the next player if no one has won yet
        playerSwitching();
      }
    }
  });

  // Event listener for the "New Game" button
  newGame.on('click', init);
});