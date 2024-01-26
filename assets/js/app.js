'use strict';

let deck = [];
const types = ['C', 'D', 'H', 'S'],
    specials = ['A', 'J', 'Q', 'K'];

// Referencias del HTML
const deckContainer = document.querySelector('#deck-container');

const createDeck = () => {

    deck = [];
    for (let i = 2; i <= 10; i++) {
        for (let type of types) {
            deck.push(i + type);
        }
    }

    for (let type of types) {
        for (let sp of specials) {
            deck.push(sp + type);
        }
    }
}
createDeck();

let shuffleDeck = _.shuffle(deck);
console.log(shuffleDeck);

for (let card of shuffleDeck) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.innerHTML = `<img src="assets/cards/${card}.png" alt="card">`;

    deckContainer.append(cardElement);
}

deckContainer.addEventListener('click', () => {
    const cards = deckContainer.querySelectorAll('.card');
    if (cards.length > 0) {
        cards[cards.length - 1].remove();
        shuffleDeck.pop();
        console.log(shuffleDeck);
    }
});

