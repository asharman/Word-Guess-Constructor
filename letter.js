// The class of Letter, every letter in the chosen word is an instance of this class.

class Letter {
    constructor(char) {
        // Assign this.letter to the letter that is passed in when instantiating the object
        this.letter = char;
        // This boolean is used to check whether the letter has been guessed by the user or not
        this.guessed = false;
    }

    // The toString method checks if the letter has been guessed, or is a special character that we don't
    // want the user to guess. If it is we're going to display it and set it's guessed property to true.
    // Otherwise that letter will be displayed as "_".
    toString() {
        if (this.guessed || this.letter === " " || this.letter === "'" || this.letter === ".") {
            this.guessed = true;
            return this.letter;
        } else {
            return "_"
        }
    }

    // The method takes in the user's guessed letter and compares it to the instance of letter
    guessLetter(x) {
        // If they match then set the object's guessed value to true and call the toString method.
        if (x == this.letter.toLowerCase()) {
            this.guessed = true;
            this.toString();
        }
    }
}

// Export the Letter class
module.exports = Letter;