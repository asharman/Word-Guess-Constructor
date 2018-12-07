// Import Word and inquirer
const Word = require('./word');
const inquirer = require('inquirer');

// Initialize the game object
let game = {
    // The word bank that the game chooses from
    wordBank: [
        "Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetch'd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr. Mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew"
    ],
    // The initialized object that our word will become.
    currentWord: {},
    // The number of guesses remaining, used to break out of the recursive userPrompt method
    guessesRemaining: 10,
    // The initailized array that we push the user's guesses into. This is to prevent the user from guessing the same word twice.
    guessedLetters: [],

    // This method selects a random word from the and creates a new Word object.
    selectWord: function () {
        let randomIndex = Math.floor(Math.random() * this.wordBank.length);
        this.currentWord = new Word(this.wordBank[randomIndex]);
        // Remove the selected word from the word bank, that way the word won't repeat.
        this.wordBank.splice(randomIndex, 1);
    },

    // This method checks to see if all letters in the word have been guessed
    checkWin: function () {
        let thereAreStillFalse = this.currentWord.checkLettersForGuessed();
        // If there aren't any unguessed letters then return true
        if (!thereAreStillFalse) {
            return true;
        // If unguessed letters remain then return false
        } else {
            return false;
        }
    },

    // Reset and start game method
    start: function () {
        this.guessesRemaining = 10;
        this.guessedLetters = [];
        this.selectWord();
        this.promptUser();
    },

    // The main game method
    promptUser: function () {
        // If the user still has guesses left ask them the question
        if (this.guessesRemaining > 0) {
            console.log(`--------------------------------------------`);
            console.log(`Guesses remaining: ${this.guessesRemaining}`);
            
            // Display the current word with _ or correctly guessed letters
            this.currentWord.toString();
            // Call the prompt
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'userGuess',
                    message: 'What letter do you guess?',
                    // Used to sanitize the user input
                    validate: function (value) {
                        // Return an array if the letter guessed is a number or in the alphabet
                        let pass = value.match(/[A-Za-z0-9-]/);
                        // Check to make sure the user only types 1 letter
                        if (value.length === 1) {
                            // Check if the user hasn't already guessed this letter
                            if (game.guessedLetters.indexOf(value) == -1) {
                                // If the array holds any value then the user guess is good to go
                                if (pass) {
                                    return true;
                                // If the user guess isn't a number from 0-9 or a letter in the alphabet
                                } else {
                                    return "Please enter a valid character!";
                                };
                                // If the user has already guessed the letter
                            } else {
                                return "You've already guessed this letter!"
                            }
                            // If the user guess is not 1 character long
                        } else {
                            return "You can only guess one letter at a time!"
                        }
                    },
                }
            ]).then((res) => {
                // Assign the user guess to guess
                let guess = res.userGuess;
                // Push the guessed letter into the array of guessed lettrs
                this.guessedLetters.push(guess);
                // Check the guess to every letter in the word object, if something changed then return true;
                let guessBool = this.currentWord.guessCharacter(guess);
                // If you guessed correctly
                if (guessBool) {
                    // Check if the user has guessed all the letters
                    if (this.checkWin()) {
                        console.log(`--------------------------------------------`);
                        console.log(`You guessed correctly!`);
                        // Updates the word after the user guesses it correctly
                        this.currentWord.toString();
                        console.log(`Pokemon remaining: ${this.wordBank.length}`);
                        // If there are still words left to guess then ask if the user would like to keep playing
                        if (this.wordBank.length > 0) {
                            inquirer.prompt([
                                {
                                    type: 'confirm',
                                    name: 'playAgain',
                                    message: 'Keep Playing?',
                                    default: true,
                                }
                            ]).then((res) => {
                                // If they do, call the start method otherwise end the code
                                if (res.playAgain) {
                                    this.start();
                                } else {
                                    console.log('Okay Bye!');
                                }
                            });
                        // If there aren't any words left to guess then end the code
                        } else {
                            console.log(`You guessed 'em all!`);
                        }
                    // If the user has guessed correctly, but there are still more letters to guess then start the prompt over again
                    } else {
                        this.promptUser();
                    }
                // If the user guesses a letter incorrectly then subtract 1 from guesses reamaining and start the prompt again
                } else {
                    this.guessesRemaining--;
                    this.promptUser();
                };
            })
        // If the user is out of guesses, end the script and display what the correct word was
        } else {
            console.log(`Out of guesses! The currect word was "${this.currentWord.word}".`);
        }
    }
}

// The initial call to start the game
game.start();