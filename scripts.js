const display = document.getElementById("display");
const buttons = Array.from(document.getElementsByClassName("calculator-button"));

let currentNumber = "";
let previousNumber = "";
let currentOperator = null;

// Function to update the display
function updateDisplay() {
  display.textContent = currentNumber || "0";
}

// Function to handle number button clicks
function handleNumberClick(value) {
  if (value === "." && currentNumber.includes(".")) return; // Prevent multiple decimal points
  currentNumber += value;
  updateDisplay();
}

// Function to handle operator button clicks
function handleOperatorClick(operator) {
  if (currentOperator !== null) {
    // Perform calculation if an operator is already selected
    performCalculation();
  }
  previousNumber = currentNumber;
  currentNumber = "";
  currentOperator = operator;
}

// Function to perform calculation
function performCalculation() {
  if (currentOperator === null || previousNumber === "") return;
  switch (currentOperator) {
    case "+":
      currentNumber = (parseFloat(previousNumber) + parseFloat(currentNumber)).toString();
      break;
    case "-":
      currentNumber = (parseFloat(previousNumber) - parseFloat(currentNumber)).toString();
      break;
    case "*":
      currentNumber = (parseFloat(previousNumber) * parseFloat(currentNumber)).toString();
      break;
    case "/":
      currentNumber = (parseFloat(previousNumber) / parseFloat(currentNumber)).toString();
      break;
    default:
      return;
  }
  previousNumber = "";
  currentOperator = null;
  updateDisplay();
}

// Function to handle clear button click
function handleClearClick() {
  currentNumber = "";
  previousNumber = "";
  currentOperator = null;
  updateDisplay();
}

// Function to handle equals button click
function handleEqualsClick() {
  performCalculation();
}

// Add event listeners to buttons
buttons.forEach(button => {
  button.addEventListener("click", () => {
    if (button.classList.contains("operator")) {
      handleOperatorClick(button.value);
    } else if (button.id === "clear") {
      handleClearClick();
    } else if (button.id === "equals") {
      handleEqualsClick();
    } else {
      handleNumberClick(button.value);
    }
  });
});
