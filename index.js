document.addEventListener("DOMContentLoaded", function() {

    document.getElementById('play-button').onclick = function(){
        window.open('memory-game.html');
    }

    
    let scoreContainer = document.querySelector(".best-score");
    let bestScore = document.createElement('div');
    bestScore.id = "best-score";

    if (JSON.parse(localStorage.getItem('score'))){
        bestScore.innerHTML = "Best Score:" + localStorage.getItem('score');; 
    } else {
        bestScore.innerHTML = "Best Score: 0";
    }

    scoreContainer.appendChild(bestScore);

});