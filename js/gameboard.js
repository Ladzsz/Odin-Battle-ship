//imporitng ship
import { Ship } from "./ship.js"; 

//gameboard class
export class Gameboard {
    constructor(size = 10) {
        this.size = size;
        this.board = Array(size).fill(null).map(() => Array(size).fill(null));
        this.ships = [];
        this.misses = 0;
        this.createBoard();
    }

    createBoard() {
        const boardElement = document.getElementById("board");
        boardElement.innerHTML = ""; 

        console.log("testing inside")
        boardElement.style.display = "grid";
        boardElement.style.gridTemplateColumns = `repeat(${this.size}, 40px)`;
        boardElement.style.gridTemplateRows = `repeat(${this.size}, 40px)`;
        boardElement.style.gap = "2px";

        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = row;
                cell.dataset.col = col;
                boardElement.appendChild(cell);
            }
        }
    }

    //placeship funciton
    placeShip(name, x, y, length) {
        if (!this.isValidPlacement(x, y, length)) {
            return false;
        }

        // Create a new ship instance
        const newShip = new Ship(name, length); 
    
        // Place ship horizontally
        for (let i = 0; i < length; i++) {
            this.board[x][y + i] = newShip; 
            newShip.coordinates.push([x, y + i]);
        }

        this.ships.push(newShip);
        return true;
    }

    isValidPlacement(x, y, length) {
        // Check if the ship fits
        if (y + length > this.size) return false; 

        // Ensure no overlap
        for (let i = 0; i < length; i++) {
            if (this.board[x][y + i] !== null) return false; 
        }

        return true;
    }

    checkShipAt(x, y) {
        return this.ships.find(ship =>
            ship.coordinates.some(coord => coord[0] === x && coord[1] === y)
        ) || null;
    }

    //receive attack function
    receiveAttack([x, y]) {
        const ship = this.checkShipAt(x, y);
        if (ship) {
            // Call the hit function from Ship class
            ship.hits(); 
            return true;
        } else {
            // Mark missed attack
            this.board[x][y] = "miss"; 
            this.misses++;
            return false;
        }
    }

    //function to check if all ships have been sunk
    checkWaters() {
        const allSunk = this.ships.every(ship => ship.sunked); 
        return allSunk ? "All ships have sunk!" : "Ships are still afloat!";
    }
}

 