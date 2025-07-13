// Basic Calculator Logic for Multiple Operations (No eval, Beginner Friendly)
// This code allows entering full expressions (e.g., 2+3×4−5) and evaluates them on '='

// Get references to display elements
const mainDisplay = document.getElementById('display-main');
const subDisplay = document.getElementById('display-sub');

// Store the full expression as a string
let expression = '';
let result = '';

// Get all buttons
const buttons = document.querySelectorAll('.btn, .btn-equals');

function isOperator(value) {
  if(value === '+' || value === '−' || value === '×' || value === '÷' || value === '%') {
    return true;
  }
  return false
}

function calculateResult(expression) {
  let tokens = [];
  let num = '';

  for (let i = 0; i < expression.length; i++) {

    const character = expression[i];
    console.log("CHARACTER", character)

    if("0123456789.".includes(character)) {
      if(character==="." && num.includes(".")) continue;
      num += character;
    } else if(isOperator(character)) {
      console.log("NEGATIVE")
      tokens.push(num);
      tokens.push(character);
      num = '';
    }
  }

  tokens.push(num); // Push the last number

  console.log("Tokens:", tokens)

  let result = 0;

  // tokens: [ "2", "+", "4", "×", "2", "÷", "23" ]

  let i = 0;
  while(i < tokens.length) {
    if(tokens[i]==="%"){
      let firstNumber=parseFloat(tokens[i-1])
      let tempResult=0

      tempResult=firstNumber*0.01

      tokens.splice(i - 1, 2, tempResult)
      i--
    }
    else if(tokens[i] === "×" || tokens[i] === "÷") {
      // perform multiplication or division
      let firstNumer = parseFloat(tokens[i-1])
      let secondNumer = parseFloat(tokens[i+1])
      let tempResult = 0;

      if(tokens[i] === "÷") {
        if(secondNumer === "0") {
          return "Error: Division by zero";
        } else {
          tempResult = firstNumer / secondNumer;
        }
      } else {
        console.log("Multiplying", firstNumer, secondNumer)
        tempResult = firstNumer * secondNumer;
      }

      tokens.splice(i - 1, 3, tempResult)
      i--
    }

    else if(tokens[i]==="+" || tokens[i]==="−"){
      let firstNumber=parseFloat(tokens[i-1])
      let secondNumer=parseFloat(tokens[i+1])
      let tempResult=0

      if(tokens[i]==="+"){
        tempResult=firstNumber+secondNumer
      }else{
        tempResult=firstNumber-secondNumer
      }
      tokens.splice(i - 1, 3, tempResult)
      i--

    }
    else{
      i++
    }
  }


  i = 0;
  // add and subtract

  console.log("After Multiplication/Division:", tokens)

  // '.toFixed() is used to limit the decimal value to 3 eg. 1.222
  return parseFloat(parseFloat(tokens[0]).toFixed(3));
}


for (let i = 0; i < buttons.length; i++) {
  const button = buttons[i]
  button.addEventListener("click", function(event) {
    const value = this.textContent

    if(value==='C'){
      expression=''
      result=''
      mainDisplay.textContent='0'
      subDisplay.textContent=''
    }
    else if(isOperator(value)) {
      expression += value
      subDisplay.textContent = expression
    } else if(value === "=") {
      let result = calculateResult(expression) 
      mainDisplay.textContent = result;
    }
    else {
      expression += value;
      let lastNum = expression.match(/(\d+(\.\d+)?|\.\d+)$/);

      mainDisplay.textContent = lastNum ? lastNum[0] : value;

      subDisplay.textContent = expression;
    }
  })
}

// Helper: Check if a character is an operator