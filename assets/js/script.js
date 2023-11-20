const cardContainers = document.getElementsByClassName("card-container");

// Initialise card data.
let firstCard = null;
let secondCard = null;
let cardsToCheck = [];

// Array of card attribute information.
const cards = [
    {
        id: "clover-1",
        src: "assets/images/clover.png",
        alt: "A green potion with a clover inside on a card."
    },
    {
        id: "crystal-1",
        src: "assets/images/crystal.png",
        alt: "A cluster of purple crystals on a card."
    },
    {
        id: "feather-1",
        src: "assets/images/feather.png",
        alt: "A single crow feather on a card."
    },
    {
        id: "frog-1",
        src: "assets/images/frog.png",
        alt: "A blue frog with a white underbelly on a card."
    },
    {
        id: "moth-1",
        src: "assets/images/moth.png",
        alt: "A blush pink moth on a card."
    },
    {
        id: "mushroom-1",
        src: "assets/images/mushroom.png",
        alt: "Four purple tipped mushrooms with blue stems on a card."
    },
    {
        id: "pouch-1",
        src: "assets/images/pouch.png",
        alt: "A small green fabric pouch on a card."
    },
    {
        id: "snake-1",
        src: "assets/images/snake.png",
        alt: "A brown snake inside a glass bottle on a card."
    },
    {
        id: "spider-1",
        src: "assets/images/spider.png",
        alt: "A red spider on a card."
    },
    {
        id: "clover-2",
        src: "assets/images/clover.png",
        alt: "A green potion with a clover inside on a card."
    },
    {
        id: "crystal-2",
        src: "assets/images/crystal.png",
        alt: "A cluster of purple crystals on a card."
    },
    {
        id: "feather-2",
        src: "assets/images/feather.png",
        alt: "A single crow feather on a card."
    },
    {
        id: "frog-2",
        src: "assets/images/frog.png",
        alt: "A blue frog with a white underbelly on a card."
    },
    {
        id: "moth-2",
        src: "assets/images/moth.png",
        alt: "A blush pink moth on a card."
    },
    {
        id: "mushroom-2",
        src: "assets/images/mushroom.png",
        alt: "Four purple tipped mushrooms with blue stems on a card."
    },
    {
        id: "pouch-2",
        src: "assets/images/pouch.png",
        alt: "A small green fabric pouch on a card."
    },
    {
        id: "snake-2",
        src: "assets/images/snake.png",
        alt: "A brown snake inside a glass bottle on a card."
    },
    {
        id: "spider-2",
        src: "assets/images/spider.png",
        alt: "A red spider on a card."
    }
];

// Loop through each card-container div to toggle the flip class on click.
for (let i = 0; i < cardContainers.length; i++) {
    cardContainers[i].addEventListener('click', function () {
        this.classList.toggle('flip');
    });
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

const checkCards = event => {
    const clickedCard = event.target.parentElement.lastElementChild;
    // Check if firstCard and secondCard have data and store them in cardsToCheck array.
    if (!firstCard) {
        firstCard = clickedCard;
        cardsToCheck.push(firstCard);
    } else {
        secondCard = clickedCard;
        cardsToCheck.push(secondCard);
    };

    // Check to see if the cards are a matching pair.
    if (cardsToCheck.length === 2) {
        if (firstCard.getAttribute("src") === secondCard.getAttribute("src") && firstCard.getAttribute("id") !== secondCard.getAttribute("id")) {
            // Match found.
            console.log("It's a match!");
            cardsToCheck = [];
            firstCard = null;
            secondCard = null;
        } else {
            // Not a match.
            console.log("Not a match.");
            cardsToCheck = [];
            firstCard = null;
            secondCard = null;
        };
    };
};

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
        cardFront.setAttribute("id", cards[i].id);
        cardFront.setAttribute("src", cards[i].src);
        cardFront.setAttribute("alt", cards[i].alt);
        cardContainers[i].appendChild(cardFront);
    };
};

addCards();