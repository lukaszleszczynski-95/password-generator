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

    console.log(typesArr);

    // If none of options are checked it will return an empty string, no password
    if(typesCount === 0){
        return '';
    };

// Looping over lentgh of the password; increase the index by the amout of checked options
    for(let i = 0; i < length; i += typesCount) {
        // Looping over typesArr (array of objects)
        typesArr.forEach(type => {
            // Set a variable that stores key from every object
            const funcName = Object.keys(type)[0];
            console.log('funcName: ', funcName)

            // Updating generatedPassword string
            generatedPassword += randomFunc[funcName]();
        })
    }



    const finalPassword = generatedPassword.slice(0, length);
    
    updateProgressBar(length);

    return shuffleArr(finalPassword);

    

   
   
}

// Trying to update it in an easier way using styles
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

function getRandomLower(){
    const random = Math.floor(Math.random() * 26);

    return String.fromCharCode(122 - random)
}
function getRandomUpper(){
    const random = Math.floor(Math.random() * 26);

    return String.fromCharCode(random + 65)
}

function getRandomNumber(){
    const random = Math.floor(Math.random() * 10);

    return String.fromCharCode(random + 48)
}
function getRandomSymbol(){
    const symbols = '!@#$%^&*(){}?/';

    return symbols[Math.floor(Math.random() * symbols.length)]
    
}

function copyToClipboard(){
    const textToCopy = resultEl.innerHTML;

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
