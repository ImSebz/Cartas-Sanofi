'use strict';

let deck = [];
const types = ['C', 'D', 'H', 'S'],
    specials = ['A', 'J', 'Q', 'K'];

// Referencias del HTML
const deckContainer = document.querySelector('.deck-container');
const containers = document.querySelectorAll('.a-container, .b-container, .c-container, .d-container, .e-container');

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
const cardsTextDiv = document.querySelector('.cards-text');

for (let cardId of shuffleDeck) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.id = cardId;
    cardElement.innerHTML = `<img src="assets/cards/${cardId}.png" alt="card">`;

    cardsTextDiv.textContent = `Carta: ${cardId}`;

    cardElement.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', cardElement.id);
    });

    cardElement.addEventListener('dragend', () => {
        // Wait for the DOM updates to complete
        setTimeout(() => {
            // Get all the cards in the deck container
            const cardsInDeck = deckContainer.querySelectorAll('.card');
    
            // If there are cards left in the deck
            if (cardsInDeck.length > 0) {
                // Get the last card in the deck
                const lastCardInDeck = cardsInDeck[cardsInDeck.length - 1];
    
                // Update the cardsTextDiv content with the last card in the deck
                cardsTextDiv.textContent = `Carta: ${lastCardInDeck.id}`;
            } else {
                // If no cards are left in the deck, clear the text
                cardsTextDiv.textContent = 'Sanofi';
            }
        }, 0);
    });

    cardElement.addEventListener('click', () => {
        alert(`Carta: ${cardId}`);
    });

    deckContainer.append(cardElement);

}


for (let container of containers) {
    container.addEventListener('dragover', event => event.preventDefault());

    container.addEventListener('drop', event => {
        let cardId = event.dataTransfer.getData('text/plain');
        let card = document.getElementById(cardId);
        if (deckContainer.querySelectorAll('.card').length === 0) {
            // If not, prevent the drop and return
            event.preventDefault();
            return;
        }

        event.preventDefault();
        container.append(card);
        adjustCardMargins();
    });
}

const adjustCardMargins = () => {
    // Select all containers
    const containers = document.querySelectorAll('.a-container, .b-container, .c-container, .d-container, .e-container');

    // Loop through each container
    containers.forEach(container => {
        // Select all cards in the current container
        const cards = container.querySelectorAll('.card');

        // Loop through each card
        cards.forEach((card, index) => {
            // Add a top margin to the card, increasing with each new card

            if (index == 0) {
                card.style.marginTop = '0px';
                return;
            }
            card.style.marginTop = `${45 * (index + 1)}px`;
        });
    });
}

// Call the function initially
adjustCardMargins();
