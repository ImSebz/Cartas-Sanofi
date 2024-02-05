'use strict';

const deck = [];

let draggedCard = null;
let draggedCardCopy = null;
let targetContainer = null;

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
    '1X': 'Apoyo económico para la llegada de un nuevo hijo a tu familia',
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
const closePopupButton = document.getElementById('closePopup');
const closePopupCarta = document.getElementById('closePopupCarta');

const createDeck = () => {
    for (let cardType in cardTypes) {
        for (let i = 1; i <= cardTypes[cardType]; i++) {
            deck.push(i + cardType);
        }
    }
}
createDeck();

const shuffleDeck = _.shuffle(deck);
const cardsTextDiv = document.querySelector('.cards-text');

for (let cardId of shuffleDeck) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.id = cardId;
    cardElement.innerHTML = `<img src="assets/cartas/${cardId}.png" alt="card">`;

    //Eventos Drag and Drop
    cardElement.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', cardElement.id);
        draggedCard = cardElement;

        // Crear una copia de la tarjeta y mover esa copia
        draggedCardCopy = cardElement.cloneNode(true);
        draggedCardCopy.style.position = 'absolute';
        draggedCardCopy.style.pointerEvents = 'none';
        document.body.appendChild(draggedCardCopy);
    });

    cardElement.addEventListener('drag', (event) => {
        event.preventDefault();

        // Mover la copia de la tarjeta a la posición del cursor
        draggedCardCopy.style.left = `${event.pageX - 100}px`;
        draggedCardCopy.style.top = `${event.pageY - 100}px`;
    });

    cardElement.addEventListener('dragend', () => {
        // Eliminar la copia de la tarjeta
        document.body.removeChild(draggedCardCopy);
        draggedCardCopy = null;

        // Actualizar el texto de la tarjeta
        setTimeout(() => {
            const cardsInDeck = deckContainer.querySelectorAll('.card');
            if (cardsInDeck.length > 0) {
                const lastCardInDeck = cardsInDeck[cardsInDeck.length - 1];
                if (cardTexts[lastCardInDeck.id]) {
                    cardsTextDiv.textContent = cardTexts[lastCardInDeck.id];
                }
            } else {
                cardsTextDiv.textContent = 'Sanofi';

                const popup = document.getElementById('popup');
                popup.style.display = 'block';
            }
        }, 0);
    });

    //Eventos Touch
    cardElement.addEventListener('touchstart', (event) => {

        console.log('touchstart card');

        if (cardElement.classList.contains('placed')) {
            event.preventDefault(); // Si la tarjeta tiene la clase 'placed', prevenir el evento de toque
        } else {
            event.preventDefault();
            const touch = event.changedTouches[0];
            draggedCard = cardElement;

            // Crear una copia de la tarjeta y mover esa copia
            draggedCardCopy = cardElement.cloneNode(true);
            draggedCardCopy.style.position = 'absolute';
            document.body.appendChild(draggedCardCopy);

            // Mover la copia de la tarjeta a la posición del toque
            draggedCardCopy.style.left = `${touch.pageX - 100}px`;
            draggedCardCopy.style.top = `${touch.pageY - 100}px`;
        }
    });

    cardElement.addEventListener('touchmove', (event) => {

        console.log('touchmove card');
        event.preventDefault();
        const touch = event.changedTouches[0];

        // Mueve la copia de la tarjeta a la posición del toque
        draggedCardCopy.style.left = `${touch.pageX - 100}px`;
        draggedCardCopy.style.top = `${touch.pageY - 100}px`;
    });

    cardElement.addEventListener('touchend', (event) => {
        console.log('touchend card');
    
        // Eliminal la copia de la tarjeta
        if (draggedCardCopy) {
            document.body.removeChild(draggedCardCopy);
            draggedCardCopy = null;
        }
    
        // Revise si la tarjeta arrastrada existe
        if (draggedCard) {
            // Traer las coordenadas de touchend
            const touch = event.changedTouches[0];
            const x = touch.clientX;
            const y = touch.clientY;
    
            // Revisa si las coordenadas de touchend están dentro de un contenedor
            containers.forEach(container => {
                const rect = container.getBoundingClientRect();
                if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                    // Si las coordenadas están dentro de un contenedor, mover la tarjeta al contenedor

                    // Traer el tipo de la tarjeta
                    const cardType = draggedCard.id.slice(-1);

                    // Traer el tipo del contenedor
                    const containerType = containerCardTypes[container.className];
    
                    if (cardType === containerType) {
                        // Eliminar la tarjeta del mazo
                        deckContainer.removeChild(draggedCard);
        
                        // Agregar la tarjeta al contenedor
                        container.appendChild(draggedCard);

                        // Agregar la clase 'placed' a la tarjeta
                        draggedCard.classList.add('placed');
        
                    } else {
                        // Muestra un mensaje de popup
                        popupCarta.style.display = 'block';
                    }

                    setTimeout(() => {
                        const cardsInDeck = deckContainer.querySelectorAll('.card');
                        if (cardsInDeck.length > 0) {
                            const lastCardInDeck = cardsInDeck[cardsInDeck.length - 1];
                            if (cardTexts[lastCardInDeck.id]) {
                                cardsTextDiv.textContent = cardTexts[lastCardInDeck.id];
                            }
                        } else {
                            cardsTextDiv.textContent = 'Sanofi';
                    
                            const popup = document.getElementById('popup');
                            popup.style.display = 'block';
                        }
                    }, 0);
    
                    // Ajustar los márgenes de las tarjetas
                    adjustCardMargins();
                }
            });
    
            // Limpiar la tarjeta arrastrada
            draggedCard = null;
        }
    });
    
    deckContainer.append(cardElement);
    
}

// Mostrar el texto de la última carta en el mazo
if (shuffleDeck.length > 0 && cardTexts[shuffleDeck[shuffleDeck.length - 1]]) {
    cardsTextDiv.textContent = cardTexts[shuffleDeck[shuffleDeck.length - 1]];
}

// Contenedores para drag and drop
for (let container of containers) {
    container.addEventListener('dragover', event => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    });

    container.addEventListener('drop', event => {
        event.preventDefault();

        // Extraer el ID de la tarjeta
        const cardId = event.dataTransfer.getData('text/plain');

        // Extraer el tipo de la tarjeta
        const cardType = cardId.slice(-1);

        // Obtener la clase del contenedor
        const containerClass = container.className.split(' ')[0];

        // Verificar si el tipo de tarjeta coincide con el tipo permitido del contenedor
        if (cardType !== containerCardTypes[containerClass]) {
            // Si no coinciden, prevenir la caída y retornar
            popupCarta.style.display = 'block';
            return;
        }

        // Si coinciden, mover la tarjeta al contenedor
        const card = document.getElementById(cardId);
        container.append(card);
        adjustCardMargins();
    });
}

const adjustCardMargins = () => {
    // Loop para cada contenedor
    containers.forEach(container => {
        // Select all cards in the current container
        const cards = container.querySelectorAll('.card');

        //Loop por cada carta
        cards.forEach((card, index) => {
            // Agregar un margen superior a cada carta
            if (index == 0) {
                card.style.marginTop = '0px';
                return;
            }
            card.style.marginTop = `${45 * (index + 1)}px`;
        });
    });
}
adjustCardMargins();


closePopupButton.addEventListener('click', () => {
    // Cerrar el popup
    const popup = document.getElementById('popup');
    popup.style.display = 'none';

    // Recargar la página
    setTimeout(() => {
        location.reload();
    }, 1000);
});

closePopupCarta.addEventListener('click', () => {
    // Cerrar el popup
    const popupCarta = document.getElementById('popupCarta');
    popupCarta.style.display = 'none';
});

let audio = new Audio('assets/music/Sanofi_music.mp3');

audio.onerror = function() {
    console.log('Error: ' + audio.error);
};

document.addEventListener('click', function () {
    audio.play();
});

