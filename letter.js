class Letter {
    constructor(char) {
        this.letter = char;
        this.guessed = false;
    }

    toString() {
        if (this.guessed || this.letter === " " || this.letter === "'" || this.letter === ".") {
            this.guessed = true;
            return this.letter;
        } else {
            return "_"
        }
    }

    guessLetter(x) {
        if (x == this.letter.toLowerCase()) {
            this.guessed = true;
            this.toString();
        }
    }
}

module.exports = Letter;