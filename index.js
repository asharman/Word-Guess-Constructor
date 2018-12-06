const Word = require('./word');

let game = {
    wordBank = ["Charmander", "Bulbasaur", "Squirtle"],
    currentWord = "",

    selectWord: function(){
        let randomIndex = Math.floor(Math.random() * this.wordBank.length);
        this.currentWord = this.wordBank[randomIndex];
        this.wordBank.splice(randomIndex, 1);
    }
}