
document.addEventListener("DOMContentLoaded", function() {

// Create tiles array
const tilesArr = [
    {
        name: 'michael',
        img: 'michael.jpg'
    },
    {
        name: 'dwight',
        img: 'dwight.jpg'
    },
    {
        name: 'pam',
        img: 'pam.jpg'
    },
    {
        name: 'jim',
        img: 'jim.jpg'
    },
    {
        name: 'andy',
        img: 'andy.jpg'
    },
    {
        name: 'kevin',
        img: 'kevin.jpg'
    },
    {
        name: 'kelly',
        img: 'kelly.jpg'
    },
    {
        name: 'meredith',
        img: 'meredith.jpg'
    },
    {
        name: 'ryan',
        img: 'ryan.jpg'
    },
    {
        name: 'stanley',
        img: 'stanley.jpg'
    },
    {
        name: 'oscar',
        img: 'oscar.jpg'
    },
    {
        name: 'creed',
        img: 'creed.jpg'
    },
    {
        name: 'phyllis',
        img: 'phyllis.jpg'
    },
    {
        name: 'toby',
        img: 'toby.jpg'
    },
    {
        name: 'angela',
        img: 'angela.jpg'
    }
];

//Create game grid
var game = document.getElementById('game');
var grid = document.createElement('div');
grid.className = 'grid';
game.appendChild(grid);

//Double number of tiles
let gameGrid = tilesArr.concat(tilesArr);

//Randomly shuffle tiles
gameGrid = shuffle(gameGrid);
function shuffle(arr){
    let currentIndex = arr.length
    let randomIndex;
    let tempValue;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        tempValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = tempValue;
    }
    return arr
}

//Display tile grid
gameGrid.forEach(val => {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.classList.add('unselected');
    tile.dataset.name = val.name;
    tile.style.backgroundImage = `url(${val.img})`;
    grid.appendChild(tile);
})

//Initialize counters and guesses before adding click events
let firstGuess = '';
let secondGuess = '';
let count = 0;
let totalCount = 0;
let previousTarget = null;

//Main Menu Button
document.getElementById('main-menu').onclick = function(){
    window.open('index.html');
}


//Display current score and high score on top
let currentScore = document.querySelector('#current-score');
currentScore.innerHTML = totalCount;
let highScore = document.querySelector('#high-score');
if (JSON.parse(localStorage.getItem('score'))){
    highScore.innerHTML = "HIGH SCORE:" + JSON.parse(localStorage.getItem('score'));
} else {
    highScore.innerHTML = "HIGH SCORE: 0";
}


//Add event when you click a card
grid.addEventListener('click', select);

//Function for when you click a card
function select(e){
    let tileSelected = e.target;
    
    //If you click the grid and not the tile then nothing happens
    if (tileSelected.className === 'grid' || tileSelected.classList.contains('match')){ 
        return 
    };

    //If it's the first or second click then card will be revealed
    if (count < 2 && !tileSelected.classList.contains('match')) {
        if (tileSelected.className !== 'grid' && tileSelected !== previousTarget){
            totalCount++;
            // Add a count to the score
            currentScore.innerHTML = totalCount;
        }
        count++;

        // If first card selected, initialize previous selection and reveal card
        if (count === 1){
            previousTarget = tileSelected;
            firstGuess = tileSelected.dataset.name;
            tileSelected.classList.add('selected');
            tileSelected.classList.remove('unselected');
        } else {

            // If select previous card again, it doesn't count towards score.
            if (tileSelected === previousTarget) { 
                count = 1;
                return 
            };

            // Otherwise, reveal card and assign selection as second guess
            previousTarget = null;
            secondGuess = tileSelected.dataset.name;
            tileSelected.classList.add('selected');
            tileSelected.classList.remove('unselected');
            let selectedTiles = document.querySelectorAll('.selected')
            
            //If it matches, then add it to match class and keep it revealed
            if (firstGuess !== '' && secondGuess !== '' && firstGuess === secondGuess){
                match();
                count = 0;

                // If you've matched every tile, then prompt the winning message and display high score and new game button
                let gameCompleteTest = false; 
                for (let i=0; i < grid.children.length; i++){
                    if (!grid.children[i].classList.contains('match')){
                        return;
                    } 
                    gameCompleteTest = true;
                }

                if (gameCompleteTest){
                    win();
                }

            } else {

                //If you select the wrong tile, turn them back over after a second
                setTimeout(function(){
                    count = 0;
                    selectedTiles.forEach(val => {
                        val.classList.remove('selected');
                        val.classList.add('unselected');
                    });
                },1000)
            }
        }
    }
}  

function win(){
    //Remove grid
    grid.parentNode.removeChild(grid);
    let winner = document.createElement('div');
    let body = document.querySelector('#game-container');

    //Add "you won" message
    body.appendChild(winner);
    winner.id = 'win';
    winner.innerHTML = 'YOU WON!';

    //If score is a new high, update high score in localStorage and display 'new high' message
    if(!JSON.parse(localStorage.getItem('score')) || totalCount < JSON.parse(localStorage.getItem('score'))){
        //display 'new high score' message
        let newHigh = document.createElement('div');
        newHigh.id = 'new-high';
        body.appendChild(newHigh);
        newHigh.innerHTML = 'New High Score!'

        //update high score
        localStorage.setItem("score", JSON.stringify(totalCount));
    }

    //Display High Score
    let score = document.createElement('div');
    score.id = 'score'
    body.appendChild(score);
    score.innerHTML = "High Score:" + JSON.parse(localStorage.getItem('score'));;

    //Add New Game Button
    let newGameButton = document.createElement('button');
    newGameButton.id = 'play-button';
    newGameButton.type = 'submit';
    newGameButton.innerHTML = 'Play Again'
    body.appendChild(newGameButton);
    newGameButton.addEventListener("click", function(){
        window.open('memory-game.html');
    })

}

// Function for matching 2 tiles -- add 'match' class and keep them revealed
function match(){
    let matchedTiles = document.querySelectorAll('.selected');
    matchedTiles.forEach(val => {
        val.classList.add('match');
        val.classList.remove('selected');
    });
}

});
