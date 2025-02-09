const Gameboard = require('../js/gameboard'); // Import Gameboard class
const Ship = require('../js/ship'); // Import Ship class
const Player = require('../js/player') // Import Player Class

describe('Player Class', () => {
    let player;
    let opponent;

    beforeEach(() => {
        // Create instances of players for each test
        player = new Player('Player1');
        opponent = new Player('Player2');
    });

    test('should place a ship on the board', () => {
        // Player places a ship on their gameboard
        const success = player.placeShip('Battleship', 0, 0, 4);
        expect(success).toBe(true);
        expect(player.gameboard.board[0][0]).not.toBeNull(); // Ship should be placed at (0, 0)
    });

    test('should return false if ship placement is invalid', () => {
        // Attempt to place a ship out of bounds
        const success = player.placeShip('Battleship', 0, 7, 4); // 4-length ship can't fit starting at (0, 7)
        expect(success).toBe(false);
    });

    test('should handle a real player attack (hit)', () => {
        // Place a ship on the opponent's board
        opponent.placeShip('Destroyer', 2, 2, 3);

        // Player attacks the opponent at (2, 2)
        const hit = player.takeTurn(opponent, 2, 2);
        expect(hit).toBe(true); // Should be a hit
    });

    test('should handle a real player attack (miss)', () => {
        // Place a ship on the opponent's board
        opponent.placeShip('Destroyer', 2, 2, 3);

        // Player attacks an empty spot (5, 5)
        const miss = player.takeTurn(opponent, 5, 5);
        expect(miss).toBe(false); // Should be a miss
    });

    test('should handle an AI attack (hit)', () => {
        /// Place a ship on the opponent's board at (4,4)
        opponent.placeShip('Battleship', 4, 4, 4);

        // Force AI to attack (4,4)
        const aiHit = opponent.gameboard.receiveAttack([4, 4]); 

        expect(aiHit).toBe(true); // Should be a hit
    });

    test('should handle an AI attack (miss)', () => {
        // Place a ship on the opponent's board
        opponent.placeShip('Battleship', 4, 4, 4);

        // AI attacks a missed spot (0, 0)
        // In this case, we can simulate a miss by testing the coordinates
        const aiMiss = player.aiTurn(opponent);
        expect(aiMiss).toBe(false); // Should be a miss
    });

    test('AI should select random coordinates', () => {
        // Place a ship on the opponent's board
        opponent.placeShip('Battleship', 4, 4, 4);

        // Mock the random selection to avoid deterministic results
        jest.spyOn(Math, 'random').mockReturnValue(0.3); // This would make x = 3, y = 3 for example

        const aiAttack = player.aiTurn(opponent);
        expect(aiAttack).toBe(false); // It should miss because (3, 3) is an empty spot

        // Clean up the mock
        Math.random.mockRestore();
    });
});