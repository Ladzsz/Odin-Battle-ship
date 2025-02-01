const Gameboard = require('../js/gameboard'); // Import Gameboard class
const Ship = require('../js/ship'); // Import Ship class

describe("Gameboard Class", () => {
    let board;

    beforeEach(() => {
        board = new Gameboard(); 
    });

    
    test("should initialize a 10x10 board", () => {
        expect(board.board.length).toBe(10);
        expect(board.board[0].length).toBe(10);
    });

    
    test("should place a ship correctly", () => {
        board.placeShip("Destroyer", 2, 3, 3);
        expect(board.board[2][3]).not.toBe(null);
        expect(board.board[2][4]).not.toBe(null);
        expect(board.board[2][5]).not.toBe(null);
    });

   
    test("should not place a ship out of bounds", () => {
        expect(board.placeShip("Battleship", 5, 8, 4)).toBe(false);
    });

    
    test("should not place a ship if it overlaps another", () => {
        board.placeShip("Cruiser", 4, 4, 3);
        expect(board.placeShip("Submarine", 4, 5, 3)).toBe(false);
    });

    
    test("should detect a ship at a given coordinate", () => {
        board.placeShip("Destroyer", 2, 3, 3);
        const ship = board.checkShipAt(2, 3);
        expect(ship).toBeInstanceOf(Ship);
        expect(ship.name).toBe("Destroyer");
    });

   
    test("should return null if no ship at coordinate", () => {
        expect(board.checkShipAt(5, 5)).toBe(null);
    });

   
    test("should register a hit when attacked at ship's location", () => {
        board.placeShip("Destroyer", 2, 3, 3);
        expect(board.receiveAttack([2, 3])).toBe(true);
    });

    test("should register a miss when attacked at empty location", () => {
        expect(board.receiveAttack([5, 5])).toBe(false);
        expect(board.board[5][5]).toBe("miss");
    });

    test("should increment the ship’s hit count on hit", () => {
        const destroyer = new Ship("Destroyer", 3);
        destroyer.hits(); // Simulating a hit
        expect(destroyer.hit).toBe(1);
    });

    test("should track misses", () => {
        board.receiveAttack([1, 1]);
        board.receiveAttack([2, 2]);
        expect(board.misses).toBe(2);
    });

    test("should detect when all ships have sunk", () => {
        board.placeShip("Destroyer", 2, 3, 3);
        const destroyer = board.checkShipAt(2, 3);
        destroyer.hits();
        destroyer.hits();
        destroyer.hits();
        expect(board.checkWaters()).toBe("All ships have sunk!");
    });
});
