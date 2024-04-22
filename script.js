const display = document.getElementById("display");

function appendToDisplay(input) {
  display.value += input;
}

function clearDisplay() {
  display.value = "";
}

function handleKeyInput(event) {
  const key = event.key;
  if (key === "Enter") {
    calculate();
  } else if (key === "Backspace" || key === "Delete") {
    clearLastInput();
  } else if (isNumberOrOperator(key)) {
    appendToDisplay(key);
  }
}

function isNumberOrOperator(input) {
  return /[0-9√^%+\-*/]/.test(input);
}

function clearLastInput() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    let result;
    if (display.value.includes("√")) {
      const parts = display.value.split("√");
      if (parts.length === 2) {
        const base = parseFloat(parts[1]);
        if (!isNaN(base)) {
          result = Math.pow(base, 1 / parseFloat(parts[0]));
        }
      }
    } else if (display.value.includes("^")) {
      const parts = display.value.split("^");
      if (parts.length === 2) {
        const base = parseFloat(parts[0]);
        const exponent = parseFloat(parts[1]);
        if (!isNaN(base) && !isNaN(exponent)) {
          result = Math.pow(base, exponent);
        }
      }
    } else if (display.value.includes("%")) {
      const parts = display.value.split("%");
      if (parts.length === 2) {
        const percentage = parseFloat(parts[0]);
        const number = parseFloat(parts[1]);
        if (!isNaN(percentage) && !isNaN(number)) {
          result = (percentage / 100) * number;
        }
      }
    } else {
      result = eval(display.value);
    }

    if (result !== undefined) {
      display.value = result;
    } else {
      throw new Error("Invalid input");
    }
  } catch (error) {
    display.value = "ERR";
  }
}

// Event listeners
document.addEventListener("keydown", handleKeyInput);
