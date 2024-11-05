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
const board = ['', '', '', '', '', '', '', '', ''];

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
        const index = Array.from(game.children).indexOf(clickDiv);
        if (currentPlayer === 1) {
            e.target.innerHTML = 'X';
            board[index] = 'X'; 
            currentPlayer = 2;
            idJoueur2.style.display = 'block';
            idJoueur1.style.display = 'none';
        } else {
            e.target.innerHTML = 'O';
            board[index] = 'O'; 
            currentPlayer = 1;
            idJoueur2.style.display = 'none';
            idJoueur1.style.display = 'block';
        }
        if (checkWin()) {
            finDePartie();
            return;
        }

        if (checkDraw()) {
            showDraw();
            return;
        }
    }
};


function checkWin() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            win.querySelector('#winPlayer').textContent = `Joueur ${currentPlayer === 1 ? 2 : 1}`;
            win.style.display = 'block';
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return board.every(cell => cell !== '');
}

function showDraw() {
    egaliter.style.display = 'block';
}

function finDePartie() {
    game.style.visibility = 'hidden';
    const casesGrille = document.querySelectorAll('#grille #click');
    casesGrille.forEach(function(caseGrille, index) {
        console.log("Case " + (index + 1) + ": " + caseGrille.textContent);
    });
}

document.getElementById('restart').addEventListener('click', function() {
    location.reload(); 
});

startGame()








