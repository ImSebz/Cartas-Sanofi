'use strict';

let deck = [];
const types = ['C', 'D', 'H', 'S'],
    specials = ['A', 'J', 'Q', 'K'];

// Referencias del HTML
const deckContainer = document.querySelector('.deck-container');

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
// console.log(shuffleDeck);

for (let card of shuffleDeck) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.id = card;
    cardElement.draggable = true;
    cardElement.innerHTML = `<img src="assets/cards/${card}.png" alt="card">`;

    cardElement.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', cardElement.id);
    });

    cardElement.addEventListener('click', () => {
        alert(`Carta: ${card}`); 
    });

    deckContainer.append(cardElement);


}

let containers = document.querySelectorAll('.a-container, .b-container, .c-container, .d-container, .e-container');

for (let container of containers) {
    container.addEventListener('dragover', (event) => {
        event.preventDefault(); // Prevent the default to allow drop
    });

    container.addEventListener('drop', (event) => {
        event.preventDefault();
        let cardId = event.dataTransfer.getData('text/plain');
        let card = document.getElementById(cardId);
        container.append(card);
    });
}




deckContainer.addEventListener('click', () => {
    const cards = deckContainer.querySelectorAll('.card');  

        if (cards.length > 0) {
            let newCard = shuffleDeck.pop();
            console.log(newCard);
            // console.log(shuffleDeck);
        }

        //TODO:: Agregar información al dar click en cada carta
    
});

