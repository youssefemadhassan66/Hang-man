const words = {
    Animals: ["lion", "tiger", "elephant", "giraffe", "zebra", "kangaroo", "panda", "alligator", "dolphin", "penguin"],
    Fruits: ["apple", "banana", "cherry", "date", "fig", "grape", "kiwi", "lemon", "mango", "orange"],
    Countries: ["argentina", "brazil", "canada", "denmark", "egypt", "finland", "germany", "hungary", "india", "japan"]
};

let hangManParts = ['.rope', '.head', '.body', '.left-arm', '.right-arm', ".left-leg", ".right-leg"];
let gameArray = ['.word-draw-container','.number-guesses-left','.character-container'];
let selectedCategory = null;
let remainingGuesses;
let guessedLettersArray;
let word;
let wordLength;
let guessed_counter;
let gameStarted = false; // Flag to check if the game has started

let wordContainer = document.querySelector(".Guessed-word");
let characters = document.querySelectorAll(".key");

function Generate_random_number(Number) {
    return Math.floor(Math.random() * Number);
}

function Generate_random_word(categoryIndex) {
    let keys = Object.keys(words);
    let category = keys[categoryIndex];
    let selectedCategory = words[category];
    let randWord = selectedCategory[Generate_random_number(selectedCategory.length)];
    return randWord;
}

function attachEventListeners() {
    characters.forEach(character => {
        character.replaceWith(character.cloneNode(true));
    });

    characters = document.querySelectorAll(".key");
    characters.forEach(character => {
        const handleClick = function () {
            if (gameStarted) { // Check if the game has started before allowing guesses
                character.classList.add("pressed");
                character.removeEventListener('click', handleClick);
                Guess(character.textContent, wordLength);
            }
        };
        character.addEventListener('click', handleClick);
    });
}
function game_revel(){
    for(let i =0 ; i < gameArray.length;i++){
        $(gameArray[i]).fadeIn(3000).css('display', 'flex');
    }

}

function select_category() {
    let categories = document.querySelectorAll(".category-btn");
    categories.forEach(category => {
        category.addEventListener('click', function () {
            selectedCategory = category.value;
            Start_game();

        });
    });
}

select_category();



function Start_game() {
    if (selectedCategory === null) {
        alert("Please select a category first!");
        return;
    }
    resetGame();
    game_revel();
    guessed_counter = 0;
    remainingGuesses = 7;
    guessedLettersArray = [];
    word = Generate_random_word(selectedCategory);
    wordLength = word.length;
    Create_dashes(wordLength);
    attachEventListeners();
    gameStarted = true; 
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
        document.querySelector(".number-guesses-left").innerHTML = `<span>Number of Guesses left = ${remainingGuesses - 1}</span>`;
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
    } else if (remainingGuesses === 0) {
        var audio = new Audio('../Sounds/game-over-arcade-6435.mp3');
        audio.play();
        alert("Try again, You lost the game");
        resetGame();
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
    gameArray.forEach(index =>{
        document.querySelector(index).style.display = 'none';
    })
    wordContainer.innerHTML = '';
    gameStarted = false; 
}

document.addEventListener('DOMContentLoaded', (event) => {
    
});
