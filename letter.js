class Letter {
    constructor(char) {
        this.letter = char;
        this.guessed = false;
    }

    revealLetter() {
        if (this.guessed) {
            return this.letter;
        } else {
            return "_"
        }
    }

    guessLetter(x) {
        if (x == this.letter) {
            this.guessed = true;
            this.revealLetter();
        }
    }
}