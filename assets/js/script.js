const cards = document.querySelectorAll(".card-container");

cards.forEach(function(card) {
    card.addEventListener("click", function () {
        card.classList.toggle("flip");
    });
});