// Card data
const cardsArray = [
    { name: 'shell', img: 'image/blueshell.png' },
    { name: 'bomb', img: 'image/bobomb.png' },
    { name: 'bill', img: 'image/bulletbill.png' },
    { name: 'coin', img: 'image/coin.png' },
    { name: 'goom', img: 'image/goomba.png' },
    { name: 'logo', img: 'image/logo.png' },
    { name: 'luigi', img: 'image/luigi.png' },
    { name: 'mario', img: 'image/mario.png' },
    { name: 'mushroom', img: 'image/mushroom.png' },
    { name: 'peach', img: 'image/peach.png' },
    { name: 'star', img: 'image/star.png' },
    { name: 'thwomp', img: 'image/thwomp.png' }
];

// Duplicate cards
const gameGrid = cardsArray.concat(cardsArray);

// Shuffle cards
gameGrid.sort(() => 0.5 - Math.random());

// Grab the game area
const game = document.getElementById('game');

// Create the grid
const grid = document.createElement('section');
grid.classList.add('grid');

// Append grid to game
game.appendChild(grid);

// Create cards
gameGrid.forEach((item) => {
    const card = document.createElement('div');
    card.classList.add('card');
    
    // Store card name
    card.dataset.name = item.name;

    // Display image
    const front = document.createElement('div');
    front.classList.add('front')
    const back = document.createElement('div');
    back.classList.add('back')
    
    back.style.backgroundImage = `url(${item.img})`;
    // front.style.backgroundImage = `url(${})`
    // Add card to grid and front and back to card
    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
});

let count = 0;
let firstGuess = "";
let secondGuess = "";
let previousGuess = null;
let delay = 1000

//match function
  function match() {

    const selected = document.querySelectorAll('.selected');

    selected.forEach(function (card) {
        card.classList.add('match');
        card.style.transition= `all ease `
        // card.classList.remove('selected');
    });

    count = 0;
    firstGuess = '';
    secondGuess = '';
    previousGuess= null;
}

// reset function
const resetGuess = ()=>{
    setTimeout(() => {

            const selected = document.querySelectorAll('.selected');

            selected.forEach(function (card) {
                card.classList.remove('selected');
            });

            count = 0;
            firstGuess = "";
            secondGuess = "";
            previousGuess = null;

        }, 1000);
}


// Card click event
grid.addEventListener('click', function (event) {

    const clicked = event.target;

    // Ignore clicks on the grid
    if (clicked.nodeName === 'SECTION' || clicked===previousGuess) {
        return;
    }
    if (count < 2) {
    count++;

    if (count === 1) {
        firstGuess = clicked.parentNode.dataset.name;
        clicked.parentNode.classList.add('selected');

    } else if (count === 2) {
        secondGuess = clicked.parentNode.dataset.name;
        clicked.parentNode.classList.add('selected');
    }

    if (firstGuess !== '' && secondGuess !== '') {

        if (firstGuess === secondGuess) {
            // match();
            setTimeout(match, delay);
            setTimeout(resetGuess, delay); 
        }else{
            setTimeout(resetGuess, delay); 
        }
    }
    // set previous target
    previousGuess = clicked;
}
});
