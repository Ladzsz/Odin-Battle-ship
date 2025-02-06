const Ship = require('./ship');
const Gameboard = require('../js/gameboard');

//player class
class Player {
    constructor(name, isComputer = false) {
        this.name = name; 
        this.isComputer = isComputer; 
        this.gameboard = new Gameboard(); 
    }

    // Place a ship on the player's gameboard
    placeShip(name, x, y, length) {
        return this.gameboard.placeShip(name, x, y, length);
    }

    // Real player makes a move (input coordinates)
    takeTurn(targetPlayer, x, y) {
        const hit = targetPlayer.gameboard.receiveAttack([x, y]);
        return hit;
    }

    // AI makes a move (randomly selects coordinates)
    aiTurn(targetPlayer) {
        let x, y;
        do {
            x = Math.floor(Math.random() * this.gameboard.size);
            y = Math.floor(Math.random() * this.gameboard.size);
        } while (targetPlayer.gameboard.board[x][y] !== null); // Ensure the target is not empty
        return targetPlayer.takeTurn(this, x, y);
    }
}

module.exports = Player; 