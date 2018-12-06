const Letter = require('./letter');

class Word {
    constructor(word) {
        this.wordArray = word.split("");
        this.array = [];
        this.assignLetters();
    }

    assignLetters() {
        for (let letter in this.wordArray) {
            let letterObj = new Letter(this.wordArray[letter]);
            this.array.push(letterObj);
            // console.log(this.array);
        }
    }

    toString() {
        let string = "";
        for (let i in this.array) {
            let LetterObj = this.array[i];
            string += `${LetterObj} `;
        }
        console.log(string);
    }

    guessCharacter(x) {
        for (let i in this.array) {
            let LetterObj = this.array[i];
            LetterObj.guessLetter(x);
        }
        this.toString();
    }
}