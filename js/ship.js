//ship class
export class Ship {
    constructor(name, length) {
        this.name = name;
        this.length = length
        this.hit = 0;
        this.isSunk = false;
        this.coordinates = [];
    }

    //hit method
    hits() {
        this.hit++;
        this.checkIfSunk();
    }

    //check if ship is sunk
    checkIfSunk() {
        if (this.hit >= this.length) {
            this.isSunk = true;
        }
    }

    //sunk method
    sunked() {
        if (this.hit >= this.length) {
            this.isSunk = true;
        }
    }
}

