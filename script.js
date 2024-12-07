
const Gameboard = (() => {
    const board = Array(9).fill(null);
    return {board}
})();


const players = (name, marker) => {
    return {name, marker}
}

const getPlayersName = () => {
    startButton.addEventListener("click", (event) => {
        event.preventDefault();
        const player1Name = document.getElementById("player1");
        const player2Name = document.getElementById("player2");
        console.log(player1Name.value);
        console.log(player2Name.value)
    })
}

const Game = (() => {
    const startButton = document.querySelector(".start-btn");


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
            createCell.addEventListener("click", () => placeMark(index));
            boardContainer.appendChild(createCell);
            if(cell === "X") {
                const imgX = document.createElement("img");
                imgX.src = "./X.svg";
                imgX.classList.add("marker-img")
                createCell.appendChild(imgX)
            }else if (cell === "O"){
                const imgO = document.createElement("img");
                imgO.src = "./O.svg";
                imgO.classList.add("marker-img")
                createCell.appendChild(imgO)
            }
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
                gameState = false;
                console.log(`Ha ganado ${activePlayer.name}`) }
        } 
        console.log("running...") 
    };
    


    const getActivePlayer = () => activePlayer;

    addEventListener

    const checkTie = () => {
        if (Gameboard.board.every(cell => cell !== null)){
            console.log("empate")
        }
        else
        console.log("NO es empate")
    }



    const placeMark = (index) => {
        if(gameState === true){
            if(Gameboard.board[index] === null) {
                Gameboard.board[index] = activePlayer.marker;
                console.log(`Turno de ${activePlayer.name}`);
                console.log(Gameboard.board);
                checkWin();
                checkTie();
                createBoard();
                switchPlayer();
            } else console.log("posicion ocupada")
        }
        else if(gameState === false) {
            console.log("Partida terminada")
        }
        
    }
    return {switchPlayer, createBoard,checkWin, getActivePlayer, placeMark, checkTie}
}
)();


Game.createBoard()


