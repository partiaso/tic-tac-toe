


const Gameboard = (() => {
    const board = Array(9).fill(null);
    return {board}
})();

console.log(Gameboard.board)



const players = (name, marker) => {
    return {name, marker}
}


const Game = (() => {
    const player1 = players("John", "X");
    const player2 = players("Dash", "O");

    let activePlayer = player1;
    let gameState = true;

    const switchPlayer = () => {
        activePlayer = activePlayer === player1 ? player2 : player1
    }
    const createBoard = () => {
        const getBoard = Gameboard.board;
        const boardContainer = document.querySelector(".board-container");
        boardContainer.innerHTML = "";
        getBoard.forEach((cell, index) => {
            const createCell = document.createElement("div");
            createCell.classList.add("cell");
            createCell.textContent = cell;
            createCell.addEventListener("click", () => placeMark(index));
            boardContainer.appendChild(createCell);
        })
    }; 
    const checkWin = () => {
        const tablero = Gameboard.board;
        const patterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for(const combination of patterns) {
            const [a, b, c] = combination;
            if(tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]){
                console.log(`Ha ganado ${activePlayer.name}`)}
        }
    };
    
    const getActivePlayer = () => activePlayer;

    const placeMark = (index) => {
        if(Gameboard.board[index] === null) {
            Gameboard.board[index] = activePlayer.marker;
            console.log(`Turno de ${activePlayer.name}`);
            console.log(Gameboard.board);
            checkWin();
            createBoard();
            switchPlayer();
        } else console.log("posicion ocupada")
    }
    return {switchPlayer, createBoard,checkWin, getActivePlayer, placeMark}
}
)();


Game.createBoard()













const prueba = 
[
    [[0],[1],[2]],
    [[3],[4],[5]],
    [[6],[7],[8]]]


