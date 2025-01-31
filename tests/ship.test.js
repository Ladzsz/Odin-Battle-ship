//imporitng ship
const Ship = require('../js/ship'); 

//testing the class creation
test('Ship creation and properties', () => {
  const ship = new Ship("Battleship", 3);
  
  expect(ship.name).toBe("Battleship");
  expect(ship.length).toBe(3);
  expect(ship.hit).toBe(0);
  expect(ship.isSunk).toBe(false);
});

//testing the hit method
test('hit method increments hit count', () => {
    const ship = new Ship("Battleship", 3);
    
    ship.hits();
    ship.hits();
    
    expect(ship.hit).toBe(2);
});

//testing if ship sinks when limit is reached/surpassed.
test('sunk method marks ship as sunk when hits the length or above', () => {
    const ship = new Ship("Battleship", 3);
    
    ship.hits();
    ship.hits();
    ship.hits();
    
    ship.sunked();
    
    expect(ship.isSunk).toBe(true);
});

//testing if ship is still false.
test('sunk method does not mark ship as sunk before hitting all sections', () => {
    const ship = new Ship("Battleship", 3);
    
    ship.hits();
    
    ship.sunked();
    
    expect(ship.isSunk).toBe(false);
});