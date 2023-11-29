//---------- CONSTANTS ----------//

// Card image data
const cardInfo = [
  {
    name: "clover",
    alt: "A green potion with a clover inside on a card.",
    src: "assets/images/clover.webp"
  },
  {
    name: "crystal",
    alt: "A cluster of purple crystals on a card.",
    src: "assets/images/crystal.webp"
  },
  {
    name: "feather",
    alt: "A single crow feather on a card.",
    src: "assets/images/feather.webp"
  },
  {
    name: "frog",
    alt: "A blue frog with a white underbelly on a card.",
    src: "assets/images/frog.webp"
  },
  {
    name: "moth",
    alt: "A blush pink moth on a card.",
    src: "assets/images/moth.webp"
  },
  {
    name: "mushroom",
    alt: "Four purple tipped mushrooms with blue stems on a card.",
    src: "assets/images/mushroom.webp"
  },
  {
    name: "pouch",
    alt: "A small green fabric pouch on a card.",
    src: "assets/images/pouch.webp"
  },
  {
    name: "snake",
    alt: "A brown snake inside a glass bottle on a card.",
    src: "assets/images/snake.webp"
  },
  {
    name: "spider",
    alt: "A red spider on a card.",
    src: "assets/images/spider.webp"
  }
];
// Array of all card images
const cards = [...cardInfo, ...cardInfo];
// All card containers
const cardContainers = document.getElementsByClassName("card-container");

// Player data storage
const playerData = {
  name: "",
  score: "",
  time: 0,
  turns: 0
};

// Player name input and label instructions
const playerName = document.getElementById("player-name");
const nameLabel = document.getElementsByTagName("label")[0];

// Players stats
const playerTime = document.getElementById("player-time");
const playerTurns = document.getElementById("player-turns");
const playerScore = document.getElementById("player-score");

// Turn count display
const turns = document.getElementById("turns");
let turnCount = 0;
turns.textContent = turnCount;

// Timer display
const timer = document.getElementById("timer");
let seconds = 120;
timer.textContent = seconds;

// Score display
const starCount = document.getElementById("star");

// Image data for score display
const score = {
  zeroStar: "assets/images/0star.webp",
  oneStar: "assets/images/1star.webp",
  twoStar: "assets/images/2star.webp",
  threeStar: "assets/images/3star.webp"
};

// Triggers for win/lose message
const win = document.getElementById("win-btn");
const lose = document.getElementById("lose-btn");

// High Scores players stats
const topPlayers = document.getElementById("top-players");
const recordedName = document.getElementById("recorded-name");
const recordedScore = document.getElementById("recorded-score");
const recordedTime = document.getElementById("recorded-time");
const recordedTurns = document.getElementById("recorded-turns");

// Page containers
const gameBoard = document.getElementById("game-board");
const homeBoard = document.getElementById("home-board");
const howBoard = document.getElementById("how-board");
const scoreBoard = document.getElementById("score-board");

// Navigation buttons
const homeButtons = document.getElementsByClassName("home");
const gameButtons = document.getElementsByClassName("game");
const scoreButtons = document.getElementsByClassName("high");
const howToPlayButtons = document.getElementsByClassName("how");

//---------- VARIABLES ----------//

// Card data
let pairsFound = 0;
let firstCard = null;
let secondCard = null;
let cardsToCheck = [];
let checkingCards = false;

// Array to store top 5 player scores
let topScores = [];

//Give variable global scope
let countDown;

//---------- FUNCTIONS ----------//

// Start timer countdown
const startTimer = () => {
  countDown = setInterval(() => {
    seconds--;
    timer.textContent = seconds;

    // Stop timer and trigger lose message if time runs out
    if (seconds === 0) {
      clearInterval(countDown);
      starCount.setAttribute("src", score.zeroStar);
      lose.click();

      // Flip cards back over and remove float
      for (let i = 0; i < cardContainers.length; i++) {
        cardContainers[i].classList.remove("flip");
        cardContainers[i].classList.remove("float");
      }
      // Update the player score display
    } else if (seconds < 30) {
      starCount.setAttribute("src", score.oneStar);
    } else if (seconds < 60) {
      starCount.setAttribute("src", score.twoStar);
    } else {
      starCount.setAttribute("src", score.threeStar);
    }
  }, 1000);
};

// Stop timer
const stopTimer = () => {
  clearInterval(countDown);
};

// Toggle flip class and pass card through the checkCards function
const flipCard = function (clicked) {
  // Prevents user from clicking cards while cards are checked for a match
  if (!checkingCards) {
    this.classList.toggle("flip");
    checkCards(clicked);
  }
};

// Add float class to cards
const floatCard = function () {
  this.classList.add("float");
};

// Remove float class from cards
const lowerCard = function () {
  this.classList.remove("float");
};

// Fisher-Yates algorithm modified from 'dev.to' to shuffle the cards array
const shuffleCards = (array) => {
  for (let j = array.length - 1; j > 0; j--) {
    const randomIndex = Math.floor(Math.random() * (j + 1));
    const temporyIndex = array[j];
    array[j] = array[randomIndex];
    array[randomIndex] = temporyIndex;
  }
  return array;
};

// Append card images to each card-container div
const addCards = () => {
  shuffleCards(cards);

  for (let k = 0; k < cardContainers.length; k++) {
    // Create the card back image
    let cardBack = document.createElement("img");
    cardBack.setAttribute("class", "game-card");
    cardBack.setAttribute("src", "assets/images/card-back.webp");
    cardBack.setAttribute(
      "alt",
      "A purple tarrot card back design with a cresent moon in the center."
    );
    cardContainers[k].appendChild(cardBack);

    // Create the card front image
    let cardFront = document.createElement("img");
    cardFront.setAttribute("class", "game-card front");
    cardFront.setAttribute("src", cards[k].src);
    cardFront.setAttribute("alt", cards[k].alt);
    cardContainers[k].appendChild(cardFront);
  }
};

// When pair of cards match
const cardsMatch = () => {
  setTimeout(function () {
    // Remove interactive elements from cards
    firstCard.parentElement.addEventListener("mouseleave", lowerCard);
    secondCard.parentElement.removeEventListener("click", flipCard);
    secondCard.parentElement.removeEventListener("mouseenter", floatCard);
    firstCard.parentElement.removeEventListener("mouseenter", floatCard);
    firstCard.style.cursor = "default";
    secondCard.style.cursor = "default";

    // Remove 'float' class if present on either card
    if (firstCard.parentElement.classList.contains("float")) {
      firstCard.parentElement.classList.remove("float");
    }
    if (secondCard.parentElement.classList.contains("float")) {
      secondCard.parentElement.classList.remove("float");
    }

    // Reset card data
    cardsToCheck = [];
    firstCard = null;
    secondCard = null;
    checkingCards = false;

    // Increment pairs found
    pairsFound++;

    // Check for win condtion
    if (pairsFound === 9) {
      displayScore();
      // Reset player name input field
      playerName.disabled = false;
      playerName.placeholder = "Player Name";
      nameLabel.textContent = "To submit your score please type your name and press Enter";
      // Display win modal
      win.click();

      // Flip cards back over and remove float
      for (let l = 0; l < cardContainers.length; l++) {
        cardContainers[l].classList.remove("flip");
        cardContainers[l].classList.remove("float");
      }
    }
  }, 1000);
};

// When pair of cards don't match
const noMatch = () => {
  setTimeout(function () {
    // Reset interactive elements on cards
    firstCard.parentElement.addEventListener("click", flipCard);
    firstCard.parentElement.addEventListener("mouseleave", lowerCard);
    firstCard.parentElement.classList.toggle("flip");
    secondCard.parentElement.classList.toggle("flip");
    secondCard.parentElement.addEventListener("mouseleave", lowerCard);

    // Remove 'float' class if present on either card
    if (firstCard.parentElement.classList.contains("float")) {
      firstCard.parentElement.classList.remove("float");
    }
    if (secondCard.parentElement.classList.contains("float")) {
      secondCard.parentElement.classList.remove("float");
    }

    // Reset card data
    cardsToCheck = [];
    firstCard = null;
    secondCard = null;
    checkingCards = false;
  }, 1000);
};

// Add two cards to the cardsToCheck array and check for matching pair
const checkCards = (event) => {
  const clickedCard = event.target.parentElement.lastElementChild;

  // Check if cards have data and store them in cardsToCheck array
  if (!firstCard) {
    firstCard = clickedCard;
    cardsToCheck.push(firstCard);
    firstCard.parentElement.removeEventListener("click", flipCard);
    firstCard.parentElement.removeEventListener("mouseleave", lowerCard);
  } else {
    secondCard = clickedCard;
    cardsToCheck.push(secondCard);
    secondCard.parentElement.removeEventListener("mouseleave", lowerCard);
  }

  // Check if the cards are a matching pair
  if (cardsToCheck.length === 2) {
    checkingCards = true;
    if (firstCard.getAttribute("src") === secondCard.getAttribute("src")) {
      cardsMatch();
      // Increment turn counter
      turnCount++;
      turns.textContent = turnCount;
    } else {
      noMatch();
      // Increment turn counter
      turnCount++;
      turns.textContent = turnCount;
    }
  }
};

// Display the players stats on the win message
const displayScore = () => {
  stopTimer();
  playerTime.textContent = seconds;
  playerTurns.textContent = turnCount;

  // Display relavant score based on time remaining
  if (seconds < 30) {
    playerScore.setAttribute("src", score.oneStar);
  } else if (seconds < 60) {
    playerScore.setAttribute("src", score.twoStar);
  } else {
    playerScore.setAttribute("src", score.threeStar);
  }
};

// Add player stats to playerData object
const submitScore = () => {
  playerData.name = playerName.value;
  playerData.score = playerScore.getAttribute("src");
  playerData.time = seconds;
  playerData.turns = turnCount;

  // Check players stats against leaderboard
  addTopScore(playerData);
};

// Retrieve existing top scores from local storage
const retrieveStoredScores = () => {
  let storedScores = localStorage.getItem("topScores");

  // Check if there are any scores stored
  if (storedScores) {
    // Convert to useable data
    topScores = JSON.parse(storedScores);
  } else {
    topScores = [];
  }
};

// Add bold font and pointer on mouseover
const growFont = function () {
  this.style.fontWeight = "bold";
  this.style.cursor = "pointer";
};

// Remove bold font and pointer on mouseleave
const shrinkFont = function () {
  this.style.fontWeight = "";
  this.style.cursor = "";
};

// Display clicked players score data
const showPlayerScore = (topPlayer) => {
  recordedName.textContent = topPlayer.name;
  recordedScore.setAttribute("src", topPlayer.score);
  recordedTime.textContent = topPlayer.time;
  recordedTurns.textContent = topPlayer.turns;
};

// Display top player names on the High Scores page
const displayHighScores = () => {
  // Get the current top scores
  retrieveStoredScores();

  // Clear the existing topPlayers list
  topPlayers.innerHTML = "";

  // Add the top player names to the list
  for (let m = 0; m < topScores.length; m++) {
    let player = document.createElement("li");
    player.textContent = topScores[m].name;

    // Add interactive elements to the list items
    player.addEventListener("mouseenter", growFont);
    player.addEventListener("mouseleave", shrinkFont);
    player.addEventListener("click", () => {
      showPlayerScore(topScores[m]);
    });
    topPlayers.appendChild(player);
  }
};

// Check newly submitted player stats against leaderboard
const addTopScore = (newScore) => {
  retrieveStoredScores();
  let newHighScore = false;

  for (let n = 0; n < topScores.length; n++) {
    // Compare new players score to top scores
    if (
      newScore.time > topScores[n].time ||
      (newScore.time === topScores[n].time &&
        newScore.turns < topScores[n].turns)
    ) {
      topScores.splice(n, 0, newScore);
      newHighScore = true;
      break;
    }
  }

  // If the leaderboard isn't full, add new players score
  if (!newHighScore && topScores.length < 5) {
    topScores.push(newScore);
  }

  // Ensure leaderboard is top 5 players only
  topScores = topScores.slice(0, 5);

  // Update scores in local storage
  localStorage.setItem("topScores", JSON.stringify(topScores));

  // Update High Scores leaderboard
  displayHighScores();
};

// Reset score board elements
const scoreReset = () => {
  seconds = 120;
  timer.textContent = seconds;
  turnCount = 0;
  turns.textContent = turnCount;
  starCount.setAttribute("src", score.zeroStar);
};

const loadGame = () => {
  // Display the game board
  gameBoard.classList.remove("d-none");
  homeBoard.classList.add("d-none");
  howBoard.classList.add("d-none");
  scoreBoard.classList.add("d-none");

  // Add interactive elements to card containers
  for (let p = 0; p < cardContainers.length; p++) {
    cardContainers[p].addEventListener("click", flipCard);
    cardContainers[p].addEventListener("mouseenter", floatCard);
    cardContainers[p].addEventListener("mouseleave", lowerCard);

    // Reset cards if they've been flipped or have float
    if (cardContainers[p].classList.contains("flip")) {
      cardContainers[p].classList.remove("flip");
    }
    if (cardContainers[p].classList.contains("float")) {
      cardContainers[p].classList.remove("float");  
    }
  }

  // Reset game stats
  seconds = 120;
  timer.textContent = seconds;
  turnCount = 0;
  turns.textContent = turnCount;
  pairsFound = 0;

  addCards();
  startTimer();
};

const loadHome = () => {
  // Display the home board
  homeBoard.classList.remove("d-none");
  gameBoard.classList.add("d-none");
  howBoard.classList.add("d-none");
  scoreBoard.classList.add("d-none");

  scoreReset();
};

const loadHowToPlay = () => {
  // Display the how to play board
  howBoard.classList.remove("d-none");
  homeBoard.classList.add("d-none");
  gameBoard.classList.add("d-none");
  scoreBoard.classList.add("d-none");

  scoreReset();
};

const loadScores = () => {
  // Display the high scores board
  scoreBoard.classList.remove("d-none");
  homeBoard.classList.add("d-none");
  howBoard.classList.add("d-none");
  gameBoard.classList.add("d-none");

  scoreReset();
  displayHighScores();
};

//---------- EVENT LISTENERS ----------//

// Record player stats on entry of player name
playerName.addEventListener("keypress", (event) => {
  // Submit name with 'Enter' key
  if (event.key === "Enter") {
    // Check if player name is empty
    if (playerName.value.length === 0) {
      nameLabel.textContent = "Please enter a valid name";
    // Prevent names longer than 10 characters  
    } else if (playerName.value.length > 10) {
      nameLabel.textContent = "Too many characters (10 maximum)";
    // Submit stats and disable player name input
    } else {
      nameLabel.textContent = "Your score has been submitted";
      submitScore();
      playerName.value = "";
      playerName.placeholder = "";
      playerName.disabled = true;
    }
  }
});

// Add navigation functions to all button
for (let q = 0; q < homeButtons.length; q++) {
  homeButtons[q].addEventListener("click", loadHome);
}

for (let r = 0; r < gameButtons.length; r++) {
  gameButtons[r].addEventListener("click", loadGame);
}

for (let s = 0; s < howToPlayButtons.length; s++) {
  howToPlayButtons[s].addEventListener("click", loadHowToPlay);
}

for (let t = 0; t < scoreButtons.length; t++) {
  scoreButtons[t].addEventListener("click", loadScores);
}

// Load the home page when loaded
document.addEventListener("DOMContentLoaded", loadHome);
