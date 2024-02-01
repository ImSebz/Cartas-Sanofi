'use strict';

let deck = [];
const types = ['C', 'D', 'H', 'S'],
    specials = ['A', 'J', 'Q', 'K'];

const containerCardTypes = {
    'a-container': 'A',
    'x-container': 'X',
    'b-container': 'B',
    'r-container': 'R',
    's-container': 'S'
};

const cardTypes = {
    'A': 2,
    'X': 6,
    'B': 7,
    'R': 2,
    'S': 3
};

const cardTexts = {
    '1A': 'Descubre y crece con nuestra plataforma de aprendizaje y desarrollo gratuita PAE',
    '1B': 'Contamos con apoyo emocional y programa de asesoramiento',
    '1R': 'Sabemos lo dificil que es la estabilidad, por eso te reconocemos por todo lo alto',
    '1S': 'Experimenta los beneficios de la salud con los medicamentos de Sanofi',
    '1X': 'Apoyo económico para la llegada de un nuevo hijo a tu familia.',
    '2A': 'Aprende más de 18 idiomas en una sola plataforma con nosotros',
    '2B': 'Nuestro programar Flex Time te ayudará a organizar tu agenda',
    '2R': 'Reconcerte a ti y a los demas es un trabajo difícil, la empatía es una gran virtud',
    '2S': 'Harás parte de nuestras campañas de vacunación para estar protegido como nunca antes',
    '2X': 'Porque tú nos importas, auxilio óptico para que veas brillar el mundo',
    '3B': 'En las fiestas de fin de año no se trabaja, descasarás la última semana',
    '3S': 'Polizas de salud privadas para ti y tu familia, invertimos en un futuro saludable',
    '3X': 'Te brindamos una mano amiga en tus momentos difíciles con un apoyo económico',
    '4B': '6 meses de licencia remunerada para que disfrutes esta nueva etapa de tu vida',
    '4X': 'Te ayudamos en el futuro de tus hijos con un apoyo para la matrícula',
    '5B': '¡El día de cumpleaños no se trabaja! SE FESTEJA',
    '5X': '¿Inicias una nueva familia? Te damos un empujón económico',
    '6B': 'Los viernes saldrás temprano, disfruta de tu tiempo libre',
    '6X': 'Porque tu salud es primero, tendrás un beneficio económico por problemas ortopédicos',
    '7B': 'Conéctate cuando lo necesites y organiza tu presencialidad semanalmente',
    '7X': 'Porque tu salud es primero, tendrás un beneficio económico por tomas de radiografías',
    '8B': 'Protege tu legado con nuestro seguro de vida',

};

// Referencias del HTML
const deckContainer = document.querySelector('.deck-container');
const containers = document.querySelectorAll('.a-container, .x-container, .b-container, .r-container, .s-container');

const createDeck = () => {
    deck = [];
    for (let cardType in cardTypes) {
        for (let i = 1; i <= cardTypes[cardType]; i++) {
            deck.push(i + cardType);
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
    cardElement.innerHTML = `<img src="assets/cartas/${cardId}.png" alt="card">`;

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

                // If the card ID exists in the cardTexts object, use the corresponding text
                if (cardTexts[lastCardInDeck.id]) {
                    cardsTextDiv.textContent = cardTexts[lastCardInDeck.id];
                }
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

if (shuffleDeck.length > 0 && cardTexts[shuffleDeck[shuffleDeck.length - 1]]) {
    cardsTextDiv.textContent = cardTexts[shuffleDeck[shuffleDeck.length - 1]];
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

        // Extract the type of the card
        let cardType = cardId.slice(-1);

        // Get the container's class
        let containerClass = container.className.split(' ')[0];

        // Check if the card's type matches the container's allowed type
        if (cardType !== containerCardTypes[containerClass]) {
            // If they don't match, prevent the drop and return
            alert('No puedes poner esa carta aquí');
            event.preventDefault();
            return;
        }

        event.preventDefault();
        container.append(card);
        adjustCardMargins();
    });
}

const adjustCardMargins = () => {

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
