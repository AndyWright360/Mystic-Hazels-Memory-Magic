//---------- CONSTANTS ----------//

// Card image data
const cardInfo = [
  {
    name: "clover",
    src: "assets/images/clover.png",
    alt: "A green potion with a clover inside on a card.",
  },
  {
    name: "crystal",
    src: "assets/images/crystal.png",
    alt: "A cluster of purple crystals on a card.",
  },
  {
    name: "feather",
    src: "assets/images/feather.png",
    alt: "A single crow feather on a card.",
  },
  {
    name: "frog",
    src: "assets/images/frog.png",
    alt: "A blue frog with a white underbelly on a card.",
  },
  {
    name: "moth",
    src: "assets/images/moth.png",
    alt: "A blush pink moth on a card.",
  },
  {
    name: "mushroom",
    src: "assets/images/mushroom.png",
    alt: "Four purple tipped mushrooms with blue stems on a card.",
  },
  {
    name: "pouch",
    src: "assets/images/pouch.png",
    alt: "A small green fabric pouch on a card.",
  },
  {
    name: "snake",
    src: "assets/images/snake.png",
    alt: "A brown snake inside a glass bottle on a card.",
  },
  {
    name: "spider",
    src: "assets/images/spider.png",
    alt: "A red spider on a card.",
  },
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
  turns: 0,
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
  threeStar: "assets/images/3star.png",
  twoStar: "assets/images/2star.png",
  oneStar: "assets/images/1star.png",
  zeroStar: "assets/images/0star.png",
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
  for (i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const temporyIndex = array[i];
    array[i] = array[randomIndex];
    array[randomIndex] = temporyIndex;
  }
  return array;
};

// Append card images to each card-container div
const addCards = () => {
  shuffleCards(cards);

  for (i = 0; i < cardContainers.length; i++) {
    // Create the card back image
    let cardBack = document.createElement("img");
    cardBack.setAttribute("class", "game-card");
    cardBack.setAttribute("src", "assets/images/card-back.png");
    cardBack.setAttribute(
      "alt",
      "A purple tarrot card back design with a cresent moon in the center."
    );
    cardContainers[i].appendChild(cardBack);

    // Create the card front image
    let cardFront = document.createElement("img");
    cardFront.setAttribute("class", "game-card front");
    cardFront.setAttribute("src", cards[i].src);
    cardFront.setAttribute("alt", cards[i].alt);
    cardContainers[i].appendChild(cardFront);
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
    if (pairsFound === 1) {
      displayScore();
      win.click();
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
  (playerData.score = playerScore.getAttribute("src")),
    (playerData.time = seconds),
    (playerData.turns = turnCount);

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

const addTopScore = (newScore) => {
  // Get current top scores from local storage
  retrieveStoredScores();

  let newHighScore = false;
  for (i = 0; i < topScores.length; i++) {
    // Compare new players score to top scores
    if (
      newScore.time > topScores[i].time ||
      (newScore.time === topScores[i].time &&
        newScore.turns < topScores[i].turns)
    ) {
      topScores.splice(i, 0, newScore);
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
};

// Display top player names on the High Scores page
const displayHighScores = () => {
  // Get the current top scores
  retrieveStoredScores();

  // Clear the existing topPlayers list
  topPlayers.innerHTML = "";

  // Add the top player names to the list
  for (i = 0; i < topScores.length; i++) {
    let player = document.createElement("li");
    player.textContent = topScores[i].name;
    topPlayers.appendChild(player);
  }
};

//---------- EVENT LISTENERS ----------//

// Record player stats on entry of player name
playerName.addEventListener("keypress", (event) => {
  // Submit name with 'Enter' key
  if (event.key === "Enter") {
    // Check if player name is empty
    if (playerName.value.length === 0) {
      nameLabel.textContent = "Please enter a valid name";
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

// Add event listeners to card containers
for (let i = 0; i < cardContainers.length; i++) {
  cardContainers[i].addEventListener("click", flipCard);
  cardContainers[i].addEventListener("mouseenter", floatCard);
  cardContainers[i].addEventListener("mouseleave", lowerCard);
}

addCards();
startTimer();
