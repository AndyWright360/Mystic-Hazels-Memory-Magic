const cardContainers = document.getElementsByClassName("card-container");
const cards = ["clover", "crystal", "feather", "frog", "moth", "mushroom", "pouch", "snake", "spider"];
const allCards = [...cards, ...cards];

// loop through each card-container div to toggle the flip class on click.
for (let i = 0; i < cardContainers.length; i++) {
    cardContainers[i].addEventListener('click', function() {
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

// append a new front card image inside each card-container div.
const addCards = () => {
    shuffleCards(allCards);

    for (i = 0; i < cardContainers.length; i++) {
        let cardFront = document.createElement("img");
        cardFront.setAttribute("class", "game-card front");
        cardFront.setAttribute("src", `assets/images/${allCards[i]}.png`);
        cardContainers[i].appendChild(cardFront);
    };
};

addCards();