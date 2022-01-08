// Possible characters for password
const possibleChars = {
  special: ["!", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"],
  lowercase: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
  numeric: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  uppercase: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
};
//////////////////HELPER FUNCTIONS//////////////////
// RandomNumber 
const randomNumber = function (max) {
  let number = Math.floor(Math.random() * max);
  return number;
}
// Shuffle Array
const shuffle = function (array) {
  let currentIndex = array.length, randomIndex;
  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}
/////////////Password Class////////////////////
//Password Class
class PasswordObject {
  constructor() {
    this.pwLength = undefined;
    this.characterTypesPicked = [];
    this.password = [];
    this.mandatoryChars = [];
  }
  //Asks length from user
  askLength() {
    this.pwLength = prompt("How long do you want your password to be? Must be between 8 to 128 characters");
    this.pwLength = parseInt(this.pwLength);
    //Validate user input
    if (this.pwLength < 8 || this.pwLength > 128 || isNaN(this.pwLength)) {
      alert("input invalid. Please select a length ");
      this.askLength();
    }
  }
  //Asks character types from user
  characterTypes() {
    let lowercase = confirm("Would you like to include lowercase letters?");
    if (lowercase) {
      this.characterTypesPicked.push("lowercase");
    }
    let uppercase = confirm("Would you like to include uppercase letters?");
    if (uppercase) {
      this.characterTypesPicked.push("uppercase");
    }
    let numeric = confirm("Would you like to include numeric letters?");
    if (numeric) {
      this.characterTypesPicked.push("numeric");
    }
    let specialCharacters = confirm("Would you like to include special characters?");
    if (specialCharacters) {
      this.characterTypesPicked.push("special");
    }
    //Validate user input
    if (!lowercase && !uppercase && !numeric && !specialCharacters) {
      alert("You need to accept at least one type of character to include in your password.")
      this.characterTypes();
    }
  }
  //Create a random password with given character types
  randomPassword() {
    if (!this.characterTypesPicked.includes("lowercase")) {
      delete possibleChars.lowercase;
    } else {
      this.mandatoryChars.push(possibleChars.lowercase[Math.floor(Math.random() * possibleChars.lowercase.length)]);
    }
    if (!this.characterTypesPicked.includes("uppercase")) {
      delete possibleChars.uppercase;
    } else {
      this.mandatoryChars.push(possibleChars.uppercase[Math.floor(Math.random() * possibleChars.uppercase.length)])
    }
    if (!this.characterTypesPicked.includes("numeric")) {
      delete possibleChars.numeric;
    } else {
      this.mandatoryChars.push(possibleChars.numeric[Math.floor(Math.random() * possibleChars.numeric.length)])
    }
    if (!this.characterTypesPicked.includes("special")) {
      delete possibleChars.special;
    } else {
      this.mandatoryChars.push(possibleChars.special[Math.floor(Math.random() * possibleChars.special.length)])
    }
    //loop through the remaining arrays in possibleChars Object
    for (let i = 1; i <= this.pwLength; i++) {
      let keys = Object.keys(possibleChars);
      let chosenArray = keys[Math.floor(Math.random() * keys.length)];
      this.password.push(possibleChars[chosenArray][Math.floor(Math.random() * possibleChars[chosenArray].length)])
    }
    //Ensure at least one character of each type chosen is in password
    let temp = this.password.slice(this.mandatoryChars.length);
    this.password = [...temp, ...this.mandatoryChars];
    //randomize order of password
    shuffle(this.password)
    //display password
    this.password = this.password.join("");
  }
}
///////// Main Code Sequence /////////////////
const writePassword = function () {
  //Confirm they want to make a password
  let getStarted = confirm("Welcome to the password generator. If you wish to continue and create a secure password, please click 'ok'.")
  let password = new PasswordObject;
  //prompt user for length of password
  if (getStarted) {
    password.askLength();
    //prompt user for character types
    password.characterTypes();
    // debugger;
    password.randomPassword();
  }
  const paragraph = document.getElementById("password");
  paragraph.textContent += password.password;
}
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

