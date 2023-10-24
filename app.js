const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');
const progressBar = document.querySelector('.progressBar');


const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerHTML = generatePassword (
        hasLower,
        hasUpper, 
        hasNumber, 
        hasSymbol, 
        length);

       
});


// Generate password function
function generatePassword(lower, upper, number, symbol, length) {
    // 1. Init pw var. It  is gonna be a String that will continously build on to create the password.
    // 2. Filter out unchecked types; if we do not have uppercase checked, we do not want to include that.
    // 3. Loop over length; call generator function for each type
    // 4. Add final pw to the pw var and return
    
    let generatedPassword = '';

    
    // Counting how many options are checked
    const typesCount = lower + upper + number + symbol;

    
    // Creating an array of object that collects only options that are checked
    const typesArr = [{lower}, {upper}, {number}, {symbol}]
    .filter(item => Object.values(item)[0]);

    // console.log(typesArr);

    // If none of options are checked it will return an empty string, no password
    if(typesCount === 0){
        return '';
    };

    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            // console.log('funcName: ', funcName)

            generatedPassword += randomFunc[funcName]();
        })
    }

    const finalPassword = generatedPassword.slice(0, length);
    
    updateProgressBar(length);

    return shuffleArr(finalPassword);

    



   
   
}

// Create a function that shows how strong the password is the bar based on the legth of the password
function updateProgressBar(length) {
    if(length <= 5){
        progressBar.style.width = '25%';
        progressBar.style.backgroundColor = 'red';
    } else if(length >= 6 && length <= 10){
        progressBar.style.width = '50%';
        progressBar.style.backgroundColor = 'orange';
    } else if(length >= 11 && length <= 15){
        progressBar.style.width = '75%';
        progressBar.style.backgroundColor = 'yellow';
    } else if(length >= 16){
        progressBar.style.width = '100%';
        progressBar.style.backgroundColor = 'lightgreen';
    }
}

// Fisher Yates algorithm to shuffle generated password
function shuffleArr(array) {
    const strArray = array.split('');
    for (let i = strArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Generate a random index from 0 to i
        // Swap elements at i and j
        [strArray[i], strArray[j]] = [strArray[j], strArray[i]];
    }

    const joinedString = strArray.join('');
    
    return joinedString;
}


// Generator functions

// Generate a radom lowercase letter
function getRandomLower(){
    // Generate random number and multiply it by number of characters
    const random = Math.floor(Math.random() * 26);
    // Return a string CharCode table; 122 is the position where ther last lowercase character ends at the CharCode.
    return String.fromCharCode(122 - random)
}

// Generate a radom uppercase letter
function getRandomUpper(){
    // Generate random number and multiply it by number of characters
    const random = Math.floor(Math.random() * 26);
    // Return a string CharCode table; 65 is the position where ther first uppercase character begins at the CharCode.
    return String.fromCharCode(random + 65)
}

// Generate a random number 
function getRandomNumber(){
    // Generate random number and multiply it by number of characters
    const random = Math.floor(Math.random() * 10);
// Return a string CharCode table; 48 is the position where ther first uppercase character begins at the CharCode.
    return String.fromCharCode(random + 48)
}

// Generate a random symbol
function getRandomSymbol(){
    // Set a string of symbols we want to include in a password
    const symbols = '!@#$%^&*(){}?/';
    // Return a random symbol by generating random number and multiplying it by the length of the array.
    return symbols[Math.floor(Math.random() * symbols.length)]
    
}

// Function that copies generated pasword to clipboar; BTW quite old fashioned way
function copyToClipboard(){
    //  Set a variable that stores newly generated password
    const textToCopy = resultEl.innerHTML;
    // If there is no password generated, return the function
    if(!textToCopy){
        return
    }

    const newEl = document.createElement('textarea');
    

    newEl.value = textToCopy;

    document.body.appendChild(newEl);
    

    newEl.select();

    document.execCommand('copy');

    alert('Text has been copied to clipboard!');
    newEl.remove();
}

clipboardEl.addEventListener('click', copyToClipboard);


console.log(getRandomSymbol());
