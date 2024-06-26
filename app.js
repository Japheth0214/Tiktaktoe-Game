const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");
const resetButton = document.querySelector("#reset");
const startCells = ["", "", "", "", "", "", "", "", ""];
let go = "circle";
infoDisplay.textContent = "Circle goes first";

function createBoard() {
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('square');
        cellElement.id = index;
        cellElement.addEventListener('click', addGo);
        gameBoard.append(cellElement);
    });
}

function addGo(e) {
    const goDisplay = document.createElement('div');
    goDisplay.classList.add(go);
    e.target.append(goDisplay);
    go = go === "circle" ? "cross" : "circle";
    infoDisplay.textContent = "It is now " + go + "'s go.";
    e.target.removeEventListener("click", addGo);
    checkScore();
}

function checkScore() {
    const allSquares = document.querySelectorAll(".square");
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    let circleWins = false;
    let crossWins = false;

    winningCombos.forEach(array => {
        const isCircleWin = array.every(cell =>
            allSquares[cell].firstChild?.classList.contains('circle')
        );

        if (isCircleWin) {
            circleWins = true;
            infoDisplay.textContent = "Circle Wins!";
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
            return;
        }
    });

    if (!circleWins) {
        winningCombos.forEach(array => {
            const isCrossWin = array.every(cell =>
                allSquares[cell].firstChild?.classList.contains('cross')
            );

            if (isCrossWin) {
                crossWins = true;
                infoDisplay.textContent = "Cross Wins!";
                allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
                return;
            }
        });
    }

    if (!circleWins && !crossWins) {
        const isTie = [...allSquares].every(square => square.firstChild);
        if (isTie) {
            infoDisplay.textContent = "It's a Tie!";
        }
    }
}

function resetGame() {
    gameBoard.innerHTML = '';
    infoDisplay.textContent = "Circle goes first";
    go = "circle";
    createBoard();
}

resetButton.addEventListener('click', resetGame);

createBoard();
