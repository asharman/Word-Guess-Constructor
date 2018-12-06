const Word = require('./word');
const inquirer = require('inquirer');

let game = {
    wordBank: [
        "Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetch'd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr. Mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew"
    ],
    currentWord: {},
    guessesRemaining: 10,
    guessedLetters: [],

    selectWord: function () {
        let randomIndex = Math.floor(Math.random() * this.wordBank.length);
        this.currentWord = new Word(this.wordBank[randomIndex]);
        this.wordBank.splice(randomIndex, 1);
    },

    checkWin: function () {
        let thereAreStillFalse = this.currentWord.checkLettersForGuessed();
        if (!thereAreStillFalse) {
            return true;
        } else {
            return false;
        }
    },

    start: function () {
        this.guessesRemaining = 10;
        this.guessedLetters = [];
        this.selectWord();
        this.promptUser();
    },

    promptUser: function () {
        if (this.guessesRemaining > 0) {
            console.log(`Guesses remaining: ${this.guessesRemaining}`);

            this.currentWord.toString();
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'userGuess',
                    message: 'What letter do you guess?',
                    validate: function (value) {
                        let pass = value.match(/[A-Za-z0-9-]/);
                        if (value.length === 1) {
                            if (game.guessedLetters.indexOf(value) == -1) {
                                if (pass) {
                                    return true;
                                } else {
                                    return "Please enter a valid character!";
                                };
                            } else {
                                return "You've already guessed this letter!"
                            }
                        } else {
                            return "You can only guess one letter at a time!"
                        }
                    },
                }
            ]).then((res) => {
                let guess = res.userGuess;
                this.guessedLetters.push(guess);
                let guessBool = this.currentWord.guessCharacter(guess);
                if (guessBool) {
                    if (this.checkWin()) {
                        console.log(`You guessed correctly!`);
                        console.log(`Pokemon remaining: ${this.wordBank.length}`);
                        if (this.wordBank.length > 0) {
                            inquirer.prompt([
                                {
                                    type: 'confirm',
                                    name: 'playAgain',
                                    message: 'Play Again?',
                                    default: true,
                                }
                            ]).then((res) => {
                                if (res.playAgain) {
                                    this.start();
                                } else {
                                    console.log('Okay Bye!');
                                }
                            });
                        } else {
                            console.log(`You guessed 'em all!`);
                        }
                    } else {
                        this.promptUser();
                    }
                } else {
                    this.guessesRemaining--;
                    this.promptUser();
                };
            })
        } else {
            console.log(`Out of guesses! The currect word was "${this.currentWord.word}".`);
        }
    }
}

game.start();