Hangman Game
This is a simple Hangman game implemented in JavaScript, HTML, and CSS. The game randomly selects a word from predefined categories and the player has to guess the word by selecting letters. The player has a limited number of incorrect guesses before they lose the game.

Features
Randomly selects a word from one of three categories: Animals, Fruits, and Countries.
Displays the word as a series of dashes and fills in the correct letters as they are guessed.
Tracks the number of incorrect guesses and displays parts of a hangman image accordingly.
Plays audio for correct and incorrect guesses.
Restarts the game upon winning or losing.
Game Structure
The game consists of the following components:

Words Object: Contains three categories (Animals, Fruits, Countries) with lists of words.
Hangman Parts: An array that holds the parts of the hangman to be displayed upon incorrect guesses.
Variables: Used to keep track of the game's state, including the remaining guesses, guessed letters, the current word, and its length.
Query Selectors: Selects HTML elements for manipulation.
Functions: Various functions to handle game logic, such as generating random words, attaching event listeners, starting the game, creating dashes, handling guesses, revealing characters and hangman parts, and checking for win/lose conditions.
Setup
Clone the repository:

sh
Copy code
git clone https://github.com/your-username/hangman-game.git
Navigate to the project directory:

sh
Copy code
cd hangman-game
Open index.html in your web browser to start the game.

How to Play
Click on the letters to guess the word.
If the guessed letter is in the word, it will be revealed in the correct position(s).
If the guessed letter is not in the word, a part of the hangman will be drawn.
The game ends when you guess all letters of the word correctly or the hangman is fully drawn.
Code Overview
JavaScript Functions
Generate_random_number(Number): Generates a random number.
Generate_random_word(Categories): Selects a random word from the specified category.
attachEventListeners(): Attaches click event listeners to the letter buttons.
Start_game(): Initializes the game.
Create_dashes(Word_length): Creates dashes for the word to be guessed.
Guess(letter, wordLength): Handles the guessing logic.
checker_character(char, word, wordLength): Checks if a guessed character is in the word.
reveal_character(guessedArray, word, wordLength): Reveals the guessed characters in the word.
reveal_hangman(remainingGuesses): Reveals parts of the hangman image.
Checker_win_lose(): Checks if the player has won or lost the game.
resetGame(): Resets the game state for a new round.
HTML Structure
A container to display the guessed word.
Buttons for each letter of the alphabet.
Elements representing parts of the hangman.
CSS
Styles for the game layout and hangman parts.
Styles for the letter buttons, including a pressed state.
Audio Files
The game uses the following audio files for feedback:

../Sounds/mixkit-correct-answer-tone-2870.wav: Played on a correct guess.
../Sounds/error-4-199275.mp3: Played on an incorrect guess.
../Sounds/wrong-answer-129254.mp3: Played when the player wins.
../Sounds/game-over-arcade-6435.mp3: Played when the player loses.
Contribution
Feel free to open issues or submit pull requests if you have any improvements or bug fixes.
