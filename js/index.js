import { Gameboard } from "./gameboard.js";
import { Player } from "../js/player.js";

document.addEventListener("DOMContentLoaded", () => {
    const player = new Player("Human");
    const aiPlayer = new Player("Computer", true);
    const boardElement = document.getElementById("board");
    const statusElement = document.getElementById("status");
    let placingShips = true;  // Flag for ship placement mode

    // Ships to place manually (example ships)
    const shipsToPlace = [
        { name: "Destroyer", length: 2 },
        { name: "Submarine", length: 3 },
        { name: "Battleship", length: 4 }
    ];
    let currentShipIndex = 0;

    function renderBoard() {
        boardElement.innerHTML = "";
        boardElement.style.display = "grid";
        boardElement.style.gridTemplateColumns = `repeat(10, 40px)`;
        boardElement.style.gridTemplateRows = `repeat(10, 40px)`;
        boardElement.style.gap = "2px";

        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = row;
                cell.dataset.col = col;
                boardElement.appendChild(cell);
            }
        }
    }

    function placeAiShips() {
        const shipLengths = [2, 3, 4];  
        shipLengths.forEach(length => {
            let placed = false;
            while (!placed) {
                const x = Math.floor(Math.random() * 10);
                const y = Math.floor(Math.random() * (10 - length));
                placed = aiPlayer.placeShip(`AI Ship ${length}`, x, y, length);
            }
        });
    }

    boardElement.addEventListener("click", (event) => {
        if (!event.target.classList.contains("cell")) return;

        const x = parseInt(event.target.dataset.row);
        const y = parseInt(event.target.dataset.col);

        if (placingShips) {
            // Place ships first before allowing attacks
            if (currentShipIndex < shipsToPlace.length) {
                const ship = shipsToPlace[currentShipIndex];
                if (player.placeShip(ship.name, x, y, ship.length)) {
                    for (let i = 0; i < ship.length; i++) {
                        document.querySelector(`[data-row='${x}'][data-col='${y + i}']`).classList.add("ship");
                    }
                    currentShipIndex++;
                    if (currentShipIndex === shipsToPlace.length) {
                        placingShips = false;
                        statusElement.textContent = "Ships placed! Click on enemy board to attack.";
                        placeAiShips(); 
                    }
                } else {
                    alert("Invalid placement! Try again.");
                }
            }
        } else {
            // Attack mode
            const hit = aiPlayer.gameboard.receiveAttack([x, y]);
            statusElement.textContent = hit ? "Hit!" : "Miss!";

            if (aiPlayer.gameboard.checkWaters() === "All ships have sunk!") {
                alert("You win! All AI ships are destroyed.");
                return;
            }

            // AI takes a turn
            setTimeout(() => {
                const aiHit = aiPlayer.aiTurn(player);
                if (player.gameboard.checkWaters() === "All ships have sunk!") {
                    alert("AI wins! All your ships are destroyed.");
                }
            }, 1000);
        }
    });

    document.getElementById("start-game").addEventListener("click", () => {
        renderBoard();
        statusElement.textContent = "Place your ships on the board.";
        placingShips = true;
        currentShipIndex = 0;
    });

    renderBoard();
});
