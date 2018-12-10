// Import the Letter class and constructor
const Letter = require("./letter");

// Initialize the Word class and constructor function
class Word {
  constructor(word) {
    // Assign word to the object so we can reference it later
    this.word = word;
    // Split the word up into an array, this is so we can create Letter objects for every letter in the array
    this.wordArray = word.split("");
    // The empty array that the Letter objects will be pushed to
    this.array = [];
    // Call the assignLetters function when a new instance of Word is made.
    this.assignLetters();
  }

  // A method that loops through the array of letters and creates a new instance of Letter for each one
  assignLetters() {
    for (let letter in this.wordArray) {
      let letterObj = new Letter(this.wordArray[letter]);
      // Push the new Letter object into the array
      this.array.push(letterObj);
    }
  }

  // This method creates the word that is displayed to the user in the terminal, filled with _ or correctly guessed letters
  toString() {
    let string = "";
    // Loop through each letter object in the word array and cocatenate it with the empty string
    for (let i in this.array) {
      let LetterObj = this.array[i];
      // LetterObj will return an _ if the letter has not been guessed yet
      string += `${LetterObj} `;
    }
    // Display the built out string to the user
    console.log(string);
  }

  // When the user guesses a letter check every letter object to see if the guess matches one of them
  guessCharacter(x) {
    // A count is used to check if any letter was changed from guessed=false to guessed=true
    let count = 0;
    for (let i in this.array) {
      let LetterObj = this.array[i];
      // Calle the guessLetter function of the current letter we are looking at
      LetterObj.guessLetter(x);
      // If the current letter matches the user's guess then increase count
      if (LetterObj.letter.toLowerCase() == x) {
        count++;
      }
    }
    // If count was increased at all then this method returns true this is used to check if the user guesses the letter
    // correctly and if we need to lower how many guesses they have left
    if (count > 0) {
      return true;
    } else {
      return false;
    }
  }

  guessWord(word) {
    if (word.toLowerCase() === this.word.toLowerCase()) {
      for (let letter of this.array) {
        letter.guessed = true;
      }
      return true;
    } else {
      return false;
    }
  }

  // This method checks to see if any letter is still hidden or not, used to check if the user has guessed the word
  checkLettersForGuessed() {
    // Initialize a count
    let count = 0;
    for (let i in this.array) {
      let LetterObj = this.array[i];
      // If the letter hasn't been guessed yet increase count
      if (!LetterObj.guessed) {
        count++;
      }
    }
    // If there are still unguessed letters, return true. If all letters have been guessed return false.
    if (count > 0) {
      return true;
    } else {
      return false;
    }
  }
}

// Export the Word class
module.exports = Word;
