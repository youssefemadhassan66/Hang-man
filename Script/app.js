
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

//Variables //

let Guessed_letters_array = [];

let Guessed_wrong_letters_array =[];

let category = 0;

let remaining_guesses = 6;

let word = Generate_random_word(category);

let word_length = word.length;

// Query selectors // 

let word_container =document.querySelector(".Guessed-word");

let numberGuessesLeft = document.querySelector(".number-guesses-left").innerHTML = 
`<span> Number of guesses left  ${remaining_guesses} </span>`;




// Functions // 


function Generate_random_number(Number){
    return Math.floor(Math.random() * Number);
}


function Generate_random_word(Categories){

    //gets the keys of word object // 
    var keys = Object.keys(words);

    var category = keys[Categories]; 
    
    var Selected_category = words[category];
    
    var  Rand_word = Selected_category[Generate_random_number(Selected_category.length)];
    
    return Rand_word;    
}   


document.addEventListener('DOMContentLoaded', (event) => {

  

    function Create_dashes(Word_length){
    
        for (let i = 0; i < Word_length; i++) {
            const dash = document.createElement("span");
            dash.textContent = "_";
            word_container.appendChild(dash).classList.add("char");
        }
    
    }

    function Pressed(){
        let Characters = document.querySelectorAll(".key");
        Characters.forEach(Character => {
            const handleClick = function() {
                Character.classList.add("pressed");
                Character.removeEventListener('click', handleClick);
                Guess(Character.textContent);
            };
            Character.addEventListener('click', handleClick);
        });
    }
    
    function Guess(letter){


         letter = letter.toLowerCase();
    
        if(checker(letter)){
            
        Guessed_letters_array.push(letter);
        revel_character(Guessed_letters_array);

        }
    
    }
    
    function checker(char){
        for(let i = 0; i < word_length;i++){
            if(word[i] === char){
                return true;
            }
        }
        return false;
        }
    function revel_character(guessed_array){ 
        for(let i=0 ; i < word_length; i++){
                if(guessed_array.includes(word[i])){
                    document.querySelectorAll(".char")[i].textContent = word[i];
            }

        }
    }


    Pressed();
    Create_dashes(word_length);
  


});


