const words = {
    Animals: [
        "lion",
        "tiger",
        "elephant",
        "giraffe",
        "zebra",
        "kangaroo",
        "panda",
        "alligator",
        "dolphin",
        "penguin"
    ],
    Fruits: [
        "apple",
        "banana",
        "cherry",
        "date",
        "fig",
        "grape",
        "kiwi",
        "lemon",
        "mango",
        "orange"
    ],
    Countries: [
        "argentina",
        "brazil",
        "canada",
        "denmark",
        "egypt",
        "finland",
        "germany",
        "hungary",
        "india",
        "japan"
    ]
};

let hangManParts = ['.rope', '.head', '.body', '.left-arm', '.right-arm', ".left-leg", ".right-leg"];

// Variables
let remainingGuesses;
let guessedLettersArray;
let word;
let wordLength;
let guessed_counter;
// Query selectors
let wordContainer = document.querySelector(".Guessed-word");
let characters = document.querySelectorAll(".key");

// Functions
function Generate_random_number(Number) {
    return Math.floor(Math.random() * Number);
}

function Generate_random_word(Categories) {
    var keys = Object.keys(words);
    var category = keys[Categories];
    var selectedCategory = words[category];
    var randWord = selectedCategory[Generate_random_number(selectedCategory.length)];
    return randWord;
}

function attachEventListeners() {
    characters.forEach(character => {
        // Remove any existing event listeners before adding a new one
        character.replaceWith(character.cloneNode(true));
    });

    characters = document.querySelectorAll(".key"); // Re-query the elements to attach fresh event listeners

    characters.forEach(character => {
        const handleClick = function () {
            character.classList.add("pressed");
            character.removeEventListener('click', handleClick);
            Guess(character.textContent, wordLength);
        };
        character.addEventListener('click', handleClick);
    });
}

function Start_game() {
    resetGame();
    let category = 1;
    guessed_counter = 0;
    remainingGuesses = 7;
    guessedLettersArray = [];
    word = Generate_random_word(category);
    wordLength = word.length;
    Create_dashes(wordLength);
    attachEventListeners();
}

function Create_dashes(Word_length) {
    wordContainer.innerHTML = ''; // Clear previous dashes
    for (let i = 0; i < Word_length; i++) {
        const dash = document.createElement("span");
        dash.textContent = "_";
        wordContainer.appendChild(dash).classList.add("char");
    }
}

function Guess(letter, wordLength) {
    letter = letter.toLowerCase();
    console.log(word);
    if (checker_character(letter, word, wordLength)) {
        var audio = new Audio('../Sounds/mixkit-correct-answer-tone-2870.wav');
        audio.play();
        if (!guessedLettersArray.includes(letter)) {
            guessedLettersArray.push(letter);
            reveal_character(letter, word);
        }
        Checker_win_lose();
    } else {
        remainingGuesses -= 1;
        reveal_hangman(remainingGuesses);
        var audio = new Audio('../Sounds/error-4-199275.mp3');
        audio.play();
        Checker_win_lose();
    }
}

function checker_character(char, word) {
    return word.includes(char);
}

function reveal_character(letter, word) {
    let newCorrectGuess = false;
    for (let i = 0; i < word.length; i++) {
        if (word[i] === letter && document.querySelectorAll(".char")[i].textContent === "_") {
            document.querySelectorAll(".char")[i].textContent = letter;
            guessed_counter++;
            newCorrectGuess = true;
        }
    }
    return newCorrectGuess;
}

function reveal_hangman(remainingGuesses) {
    let partIndex = (remainingGuesses - 6) * -1;
    if (partIndex < hangManParts.length) {
        document.querySelector(hangManParts[partIndex]).style.display = 'block';
    }
}

function Checker_win_lose() {
    if (guessed_counter === wordLength) {
        var audio = new Audio('../Sounds/wrong-answer-129254.mp3');
        audio.play();
        alert("Congratulations, you won!");
        resetGame();
        Start_game();
    } else if (remainingGuesses === 0) {
        var audio = new Audio('../Sounds/game-over-arcade-6435.mp3');
        audio.play();
        alert("Try again, You lost the game");
        resetGame();
        Start_game();
    }
}

function resetGame() {
    remainingGuesses = 7;
    guessedLettersArray = [];
    guessed_counter = 0;
    hangManParts.forEach(part => {
        document.querySelector(part).style.display = 'none';
    });
    characters.forEach(character => {
        character.classList.remove("pressed");
    });
    wordContainer.innerHTML = '';
}

document.addEventListener('DOMContentLoaded', (event) => {
    Start_game();
});
