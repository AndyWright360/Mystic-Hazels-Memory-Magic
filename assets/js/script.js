const cardContainers = document.getElementsByClassName("card-container");

// Initialise card data.
let firstCard = null;
let secondCard = null;
let cardsToCheck = [];
let checkingCards = false;

// Array of card attribute information.
const cardInfo = [
    {
        name: "clover",
        src: "assets/images/clover.png",
        alt: "A green potion with a clover inside on a card."
    },
    {
        name: "crystal",
        src: "assets/images/crystal.png",
        alt: "A cluster of purple crystals on a card."
    },
    {
        name: "feather",
        src: "assets/images/feather.png",
        alt: "A single crow feather on a card."
    },
    {
        name: "frog",
        src: "assets/images/frog.png",
        alt: "A blue frog with a white underbelly on a card."
    },
    {
        name: "moth",
        src: "assets/images/moth.png",
        alt: "A blush pink moth on a card."
    },
    {
        name: "mushroom",
        src: "assets/images/mushroom.png",
        alt: "Four purple tipped mushrooms with blue stems on a card."
    },
    {
        name: "pouch",
        src: "assets/images/pouch.png",
        alt: "A small green fabric pouch on a card."
    },
    {
        name: "snake",
        src: "assets/images/snake.png",
        alt: "A brown snake inside a glass bottle on a card."
    },
    {
        name: "spider",
        src: "assets/images/spider.png",
        alt: "A red spider on a card."
    }
];
const cards = [...cardInfo, ...cardInfo];

// Toggle flip class and pass card through the checkCards function.
const flipCard = function (clicked) {
    // Prevents user from clicking cards while cards are checked for a match.
    if (!checkingCards) {
        this.classList.toggle('flip');
        checkCards(clicked);
    };
};

// Add float class to cards.
const floatCard = function () {
    this.classList.add('float');
};

// Remove float class from cards.
const lowerCard = function () {
    this.classList.remove('float');
};

// Loop through each card-container div to add flip on click, and float on mouse hover.
for (let i = 0; i < cardContainers.length; i++) {
    cardContainers[i].addEventListener('click', flipCard);
    cardContainers[i].addEventListener('mouseenter', floatCard);
    cardContainers[i].addEventListener('mouseleave', lowerCard);
};

const cardsMatch = () => {
    // Remove interactive elements from cards.
    firstCard.parentElement.addEventListener('mouseleave', lowerCard);
    secondCard.parentElement.removeEventListener('click', flipCard);
    secondCard.parentElement.removeEventListener('mouseenter', floatCard);
    firstCard.parentElement.removeEventListener('mouseenter', floatCard);
    firstCard.style.cursor = 'default';
    secondCard.style.cursor = 'default';

    // Remove 'float' class if present on either card.
    if (firstCard.parentElement.classList.contains('float')) {
        firstCard.parentElement.classList.remove('float');
    }
    if (secondCard.parentElement.classList.contains('float')) {
        secondCard.parentElement.classList.remove('float');
    };

    // Reset card data.
    cardsToCheck = [];
    firstCard = null;
    secondCard = null;
    checkingCards = false;
};

const noMatch = () => {
    setTimeout(function () {
        // Reset interactive elements on cards.
        firstCard.parentElement.addEventListener('click', flipCard);
        firstCard.parentElement.addEventListener('mouseleave', lowerCard);
        firstCard.parentElement.classList.toggle('flip');
        secondCard.parentElement.classList.toggle('flip');
        secondCard.parentElement.addEventListener('mouseleave', lowerCard);

        // Remove 'float' class if present on either card
        if (firstCard.parentElement.classList.contains('float')) {
            firstCard.parentElement.classList.remove('float');
        };
        if (secondCard.parentElement.classList.contains('float')) {
            secondCard.parentElement.classList.remove('float');
        };

        // Reset card data.
        cardsToCheck = [];
        firstCard = null;
        secondCard = null;
        checkingCards = false;
    }, 1500);
};

// Add two cards to the cardsToCheck array and check for a matching pair.
const checkCards = event => {
    const clickedCard = event.target.parentElement.lastElementChild;

    // Check if firstCard and secondCard have data and store them in cardsToCheck array.
    if (!firstCard) {
        firstCard = clickedCard;
        cardsToCheck.push(firstCard);
        firstCard.parentElement.removeEventListener('click', flipCard);
        firstCard.parentElement.removeEventListener('mouseleave', lowerCard);
    } else {
        secondCard = clickedCard;
        cardsToCheck.push(secondCard);
        secondCard.parentElement.removeEventListener('mouseleave', lowerCard);
    };

    // Check to see if the cards are a matching pair.
    if (cardsToCheck.length === 2) {
        checkingCards = true;
        if (firstCard.getAttribute("src") === secondCard.getAttribute("src")) {
            cardsMatch();
        } else {
            noMatch();
        };
    };
};

// Fisher-Yates algorithm modified from 'dev.to' to shuffle an array.
function shuffleCards(array) {
    for (i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        const temporyIndex = array[i];
        array[i] = array[randomIndex];
        array[randomIndex] = temporyIndex;
    }
    return array;
}

// Append a card images to each card-container div.
const addCards = () => {
    shuffleCards(cards);

    for (i = 0; i < cardContainers.length; i++) {
        // Create the card back image.
        let cardBack = document.createElement("img");
        cardBack.setAttribute("class", "game-card");
        cardBack.setAttribute("src", "assets/images/card-back.png");
        cardBack.setAttribute("alt", "A purple tarrot card back design with a cresent moon in the center.");
        cardContainers[i].appendChild(cardBack);

        // Create the card front image.
        let cardFront = document.createElement("img");
        cardFront.setAttribute("class", "game-card front");
        cardFront.setAttribute("src", cards[i].src);
        cardFront.setAttribute("alt", cards[i].alt);
        cardContainers[i].appendChild(cardFront);
    };
};

addCards();