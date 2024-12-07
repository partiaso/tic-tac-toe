
const Gameboard = (() => {
    const board = Array(9).fill(null);
    return {board}
})();


const players = (name, marker) => {
    return {name, marker}
}


const startButton = document.querySelector(".start-btn");
const resetButton = document.querySelector(".restart-btn");
const boardContainer = document.querySelector(".board-container");
const inputContainer = document.querySelector(".input-container");
const displayPlayer1 = document.getElementById("firstPlayer");
const displayPlayer2 = document.getElementById("secondPlayer");
const playersContainer = document.querySelector(".players-container");
const showWinner = document.getElementById("winner");
const modal = document.querySelector(".modal");

const startGame = () => {
    startButton.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("Game created");
        startButton.style.display = "none";
        resetButton.style.display = "block";
        inputContainer.style.display = "none";
        boardContainer.style.display = "grid";
        playersContainer.style.display = "flex";
        const start = Game();
        start.createBoard();
        start.resetGame();
        const jugadores = start.getActivePlayer();
        jugadores.player1Name === "" ? displayPlayer1.innerText = "Player 1" :
        displayPlayer1.innerText = jugadores.player1Name;
        jugadores.player2Name === "" ? displayPlayer2.innerText = "Player 2" :
        displayPlayer2.innerText = jugadores.player2Name; 
    }
)
}



const Game = () => {
    const firstPlayer = document.getElementById("player1");
    const secondPlayer = document.getElementById("player2");
    const player1Name = firstPlayer.value;
    const player2Name = secondPlayer.value;

    const player1 = players(player1Name, "X");
    const player2 = players(player2Name, "O");

    let activePlayer = player1;
    console.log(activePlayer)
    let gameState = true;


    
    const switchPlayer = () => {
        activePlayer = activePlayer === player1 ? player2 : player1
    }

    const resetGame = () => {
        resetButton.addEventListener("click", (event) => {
            event.preventDefault();
            Gameboard.board = Array(9).fill(null);
            console.log("Gameboard reset");
            activePlayer = player1;
            gameState = true;
            console.log(activePlayer);
            showWinner.innerText = "";
            modal.style.display = "none";
            createBoard();
            placeMark();
        })
    }

    const createBoard = () => {

        const getBoard = Gameboard.board;
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
                showWinner.innerText = activePlayer.name;
                modal.style.display = "flex";
                console.log(`${activePlayer.name} wins`) 
            }
                else console.log("Continue")
        }   
    };
    


    const getActivePlayer = () =>{
        return {player1Name, player2Name}
    }

    const checkTie = () => {
        if (Gameboard.board.every(cell => cell !== null)){
            showWinner.innerText = "Draw";
            modal.style.display = "flex";
            console.log("Showing modal")
        } else console.log("Not draw")
    }



    const placeMark = (index) => {
        if(gameState === true){
            if(Gameboard.board[index] === null) {
                Gameboard.board[index] = activePlayer.marker;
                console.log(`Active player -> ${activePlayer.name}`);
                console.log(Gameboard.board);
                checkWin();
                checkTie();
                createBoard();
                switchPlayer();
            } else console.log("Cell is not empty")
        }
        else if(gameState === false) {
            console.log("Game has end")
        }
        
    }
    return {switchPlayer, createBoard,checkWin, getActivePlayer, placeMark, checkTie, resetGame}
}
;



startGame()

