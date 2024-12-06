// Generate a random number between 1 and 100
let randomNumber = parseInt(Math.random() * 100 + 1);

// Select the HTML elements needed for the game
const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

// Create a new paragraph element for the 'Start New Game' button
const p = document.createElement('p');

// Initialize variables for previous guesses and the number of guesses
let prevGuess = [];
let numGuess = 1;

// Flag to control the game state
let playGame = true;

// Event listener for the submit button, triggered when the game is active
if (playGame) {
  submit.addEventListener('click', function (e) {
    e.preventDefault(); // Prevents the form from submitting and refreshing the page
    const guess = parseInt(userInput.value); // Get the user's guess from the input field
    console.log(guess); // Log the guess to the console for debugging
    validateGuess(guess); // Validate and process the guess
  });
}

// Function to validate the user's guess
function validateGuess(guess) {
  if (isNaN(guess)) {
    alert('Please enter a valid number'); // Alert if the input is not a number
  } else if (guess < 1) {
    alert('Please enter a number more than 1'); // Alert if the guess is less than 1
  } else if (guess > 100) {
    alert('Please enter a number less than 100'); // Alert if the guess is greater than 100
  } else {
    prevGuess.push(guess); // Store the valid guess in the array of previous guesses
    if (numGuess === 11) { // Check if the maximum number of guesses (10) has been reached
      displayGuess(guess); // Display the final guess
      displayMessage(`Game Over. Random number was ${randomNumber}`); // Display game over message
      endGame(); // End the game
    } else {
      displayGuess(guess); // Display the guess
      checkGuess(guess); // Check the guess against the random number
    }
  }
}

// Function to check if the user's guess is correct, too high, or too low
function checkGuess(guess) {
  if (guess === randomNumber) {
    displayMessage(`You guessed it right`); // Notify the user if the guess is correct
    endGame(); // End the game
  } else if (guess < randomNumber) {
    displayMessage(`Number is TOO low`); // Notify the user if the guess is too low
  } else if (guess > randomNumber) {
    displayMessage(`Number is TOO High`); // Notify the user if the guess is too high
  }
}

// Function to display the user's guess and update the remaining guesses
function displayGuess(guess) {
  userInput.value = ''; // Clear the input field
  guessSlot.innerHTML += `${guess}, `; // Display the guess in the guesses area
  numGuess++; // Increment the number of guesses
  remaining.innerHTML = `${11 - numGuess} `; // Update the remaining guesses count
}

// Function to display messages to the user (e.g., too high, too low, correct)
function displayMessage(message) {
  lowOrHi.innerHTML = `<h2>${message}</h2>`; // Display the message in the lowOrHi element
}

// Function to end the game, disable the input field, and display the 'Start New Game' button
function endGame() {
  userInput.value = ''; // Clear the input field
  userInput.setAttribute('disabled', ''); // Disable the input field to prevent further guesses
  p.classList.add('button'); // Add a button class to the paragraph element
  p.innerHTML = `<h2 id="newGame">Start new Game</h2>`; // Set the inner HTML to create the new game button
  startOver.appendChild(p); // Append the button to the startOver element
  playGame = false; // Set playGame to false to indicate the game is over
  newGame(); // Set up the new game button to start a new game
}

// Function to set up a new game
function newGame() {
  const newGameButton = document.querySelector('#newGame'); // Select the new game button
  newGameButton.addEventListener('click', function (e) {
    randomNumber = parseInt(Math.random() * 100 + 1); // Generate a new random number
    prevGuess = []; // Reset the array of previous guesses
    numGuess = 1; // Reset the guess count
    guessSlot.innerHTML = ''; // Clear the guesses display
    remaining.innerHTML = `${11 - numGuess} `; // Reset the remaining guesses display
    userInput.removeAttribute('disabled'); // Re-enable the input field
    startOver.removeChild(p); // Remove the new game button
    playGame = true; // Set playGame to true to start a new game
  });
}
