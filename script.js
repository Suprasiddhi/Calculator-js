// Basic Calculator Logic for Beginners (No data-action attributes)
// This code is intentionally simple and verbose for learning purposes

// Get references to display elements
var mainDisplay = document.getElementById('display-main');
var subDisplay = document.getElementById('display-sub');

// Variables to store calculator state
var currentInput = '';
var previousInput = '';
var operator = '';
var result = '';

// Get all buttons
var buttons = document.querySelectorAll('.btn, .btn-equals');

// Add click event to each button
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function() {
    var value = this.textContent;

    // Check for clear
    if (value === 'C') {
      currentInput = '';
      previousInput = '';
      operator = '';
      result = '';
      mainDisplay.textContent = '0';
      subDisplay.textContent = '';
    }
    // Check for sign change
    else if (value === '=/-') {
      if (currentInput) {
        if (currentInput.charAt(0) === '-') {
          currentInput = currentInput.slice(1);
        } else {
          currentInput = '-' + currentInput;
        }
        mainDisplay.textContent = currentInput;
      }
    }
    // Check for percent
    else if (value === '%') {
      if (currentInput) {
        currentInput = (parseFloat(currentInput) / 100).toString();
        mainDisplay.textContent = currentInput;
      }
    }
    // Check for operators
    else if (value === '+' || value === '−' || value === '×' || value === '÷') {
      if (currentInput === '' && result !== '') {
        previousInput = result;
      } else {
        previousInput = currentInput;
      }
      operator = value;
      currentInput = '';
      subDisplay.textContent = previousInput + ' ' + operator;
    }
    // Check for equals
    else if (value === '=') {
      if (previousInput !== '' && currentInput !== '' && operator !== '') {
        var num1 = parseFloat(previousInput);
        var num2 = parseFloat(currentInput);
        if (operator === '+') {
          result = (num1 + num2).toString();
        } else if (operator === '−') {
          result = (num1 - num2).toString();
        } else if (operator === '×') {
          result = (num1 * num2).toString();
        } else if (operator === '÷') {
          if (num2 === 0) {
            result = 'Error';
          } else {
            result = (num1 / num2).toString();
          }
        }
        mainDisplay.textContent = result;
        subDisplay.textContent = previousInput + ' ' + operator + ' ' + currentInput;
        // Reset for next calculation
        currentInput = '';
        previousInput = '';
        operator = '';
      }
    }
    // Check for decimal (prevent multiple decimals)
    else if (value === '.') {
      if (currentInput.indexOf('.') !== -1) {
        return;
      }
      currentInput += value;
      mainDisplay.textContent = currentInput;
    }
    // Otherwise, it's a number (including 00)
    else {
      currentInput += value;
      mainDisplay.textContent = currentInput;
    }
  });
}
