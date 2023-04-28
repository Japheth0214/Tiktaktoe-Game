const gameBoard = document.querySelector('#gameboard')   
const infoDisplay = document.querySelector('#info')
const startCells = [
   "", "", "", "", "", "", "", "", ""
]

function createBoard() {
   startCells.forEach((_cell, index) => {
      const cellElement = document.createElement('div')
      cellElement.classList.add('square')
      cellElement.id = index
      cellElement.addEventListener('click', addGo)
      gameBoard.append(cellElement)
   })
}  
createBoard()

function addGo(e) {
   const goDisplay = document.createElement('div')
   goDisplay.classList.add('circle')
   e.target.append(goDisplay)
}