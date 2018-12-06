const Letter = require('./letter');

class Word {
    constructor(word) {
        this.word = word;
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
        let count = 0;
        for (let i in this.array) {
            let LetterObj = this.array[i];
            LetterObj.guessLetter(x);
            if (LetterObj.letter.toLowerCase() == x){ count++;}
        }
        // this.toString();
        if (count > 0) {return true;} else {return false;};
    }

    checkLettersForGuessed() {
        let count = 0;
        for (let i in this.array) {
            let LetterObj = this.array[i];
            if (!LetterObj.guessed) {
                count ++;
            }
        }
        if (count > 0) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = Word;