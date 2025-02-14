//importing all classes
import { Gameboard } from "../js/gameboard.js";
import { Ship } from "../js/ship.js";
import { Player } from "../js/player.js";


document.getElementById('board').addEventListener("DOMContentLoaded", () => {
    console.log("Page loaded, creating board...");
    const game = new Gameboard(10);
});

