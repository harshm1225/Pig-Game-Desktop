'use strict';
// SELECTING ELEMENTS
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
let current0El = document.getElementById('current--0');
let current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// STARTING CONDITIONS
let scores, currentScore, activePlayer, playing;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('.player--active');
};

// INITIALIZING THE DEFAULT VALUES
init();

// SWITCHING THE PLAYER
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// ROLLING DIE FUNCTIONALITY
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1 . GENERATING A RANDOM DICE ROLL
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2 . DISPLAY DICE
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3 . CHECK FOR ROLLED ONE:
    if (dice !== 1) {
      // ADD DICE TO CURRENT SCORE
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // SWITCH TO OTHER PLAYER
      switchPlayer();
    }
  }
});

// HOLDING BUTTON FUNCTIONALITY
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1 . ADD CURRENT SCORE TO ACTIVE PLAYER's SCORE
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2 . CHECK IF PLAYER'S SCORE >= 100
    if (scores[activePlayer] >= 100) {
      // FINISH THE GAME
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 3 . SWITCH TO NEXT PLAYER
      switchPlayer();
    }
  }
});

// RESET GAME FUNCTIONALITY
btnNew.addEventListener('click', init);
