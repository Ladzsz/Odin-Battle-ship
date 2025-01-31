//ship class
class Ship {
    constructor(name, length) {
        this.name = name;
        this.length = length
        this.hit = 0;
        this.isSunk = false;
    }

    //hit method
    hits() {
        this.hit++;
    }

    //sunk method
    sunked() {
        if (this.hit >= this.length) {
            this.isSunk = true;
        }
    }
}

module.exports = Ship; 