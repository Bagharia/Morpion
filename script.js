const egaliter = document.getElementById('egaliter');
egaliter.style.display = 'none';

const win = document.getElementById('win');
win.style.display = 'none';

const game = document.getElementById('grille');
game.style.visibility = 'hidden';

const idJoueur1 = document.getElementById('joueur1');
const idJoueur2 = document.getElementById('joueur2');

idJoueur1.style.display = 'none';
idJoueur2.style.display = 'none';

let currentPlayer = 1;


function startGame() {
    const start = document.getElementById('start')
    start.addEventListener("click", function(e) {
        start.style.display = 'none';
        game.style.visibility = 'visible';
        idJoueur1.style.display = 'block'
        gamePlayer1();
    })
};

function gamePlayer1() {
    document.removeEventListener("click", gamePlayer2); 
    document.addEventListener("click", playHandler); 
};

function gamePlayer2() {
    document.removeEventListener("click", gamePlayer1); 
    document.addEventListener("click", playHandler);
};


function playHandler(e) {
    const clickDiv = e.target;
    if (clickDiv.textContent.trim().length > 0) {
        e.preventDefault();
        return;
    }

    if (e.target.id === "click") {
        if (currentPlayer === 1) {
            e.target.innerHTML = 'X';
            currentPlayer = 2;
            idJoueur2.style.display = 'block';
            idJoueur1.style.display = 'none';
            document.removeEventListener("click", playHandler); 
            gamePlayer2();
        } else {
            e.target.innerHTML = 'O';
            currentPlayer = 1;
            idJoueur2.style.display = 'none';
            idJoueur1.style.display = 'block';
            document.removeEventListener("click", playHandler); 
            gamePlayer1(); 
      
        }
    }
};


function finDePartie() {
    game.style.visibility = 'hidden';
    const casesGrille = document.querySelectorAll('#grille #click')
    casesGrille.forEach(function(caseGrille, index) {
        console.log("Case " + (index + 1) + ": " + caseGrille.textContent);
        
    })
};


startGame()








