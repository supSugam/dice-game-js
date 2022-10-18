"use strict";

//Score and dice elements
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const diceImgEl = document.querySelector(".dice");

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

//Button elements
const newBtn = document.querySelector(".btn--new");
const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");

//Starting defaults
score0El.textContent = 0;
score1El.textContent = 0;
diceImgEl.classList.add("hidden");
let playing = true;

//Roling Dice

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

function changeActivePlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--active");
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");
}

rollBtn.addEventListener("click", function () {
  if (playing) {
    const diceScore = Math.trunc(Math.random() * 6) + 1;

    diceImgEl.classList.remove("hidden");
    diceImgEl.src = `dice-${diceScore}.png`;

    if (diceScore !== 1) {
      currentScore += diceScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      changeActivePlayer();
    }
  }
});

holdBtn.addEventListener("click", function () {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  if (scores[activePlayer] >= 111) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    let winnerScore = document.getElementById(`score--${activePlayer}`);
    winnerScore.classList.add("winner");
    winnerScore.textContent = "111 ❤";
    playing = false;
  }
  changeActivePlayer();
});

newBtn.addEventListener("click", function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  document.getElementById("score--0").textContent = 0;
  document.getElementById("score--1").textContent = 0;
  diceImgEl.classList.add("hidden");
  playing = true;
});
