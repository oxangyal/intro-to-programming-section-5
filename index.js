const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses'); //bug fixed num -> number 
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0; //fixed bug const
const maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  attempts = attempts + 1;

  hideAllMessages();

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = '';

    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  if (guess !== targetNumber) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = '';
    } else {
      tooHighMessage.style.display = ''; //fixed bug tooLowMessage -> tooHighMessage
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;

    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
  }

  if (attempts === maxNumberOfAttempts) { //fixed bug ==== -> ===
  
    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  guessInput.value = '';

  resetButton.style.display = '';
}

function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) { //fixed bug out of range index
    messages[elementIndex].style.display = 'none';
  }
}

function setup() { //fixed bug fuNction

  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  attempts = 0; //fixed bug maxNumberOfAttempts -> attempts

  // Enable the input and submit button
  submitButton.disabled = false; //fixed bug disabEld
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';
}
// Optional task
//  submit a guessed number should not be lower than 1 and higher than 99, you also cannot submit an emtpy string

function updateValue() {
  const guessStr = guessInput.value;
  if (guessStr === '') {
    submitButton.disabled = true;
    return;
  }

  const guess = parseInt(guessStr, 10);
  if (guess < 1 || guess > 99) {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
}

guessInput.addEventListener("input", updateValue);
submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();

submitButton.disabled = true;
