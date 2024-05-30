document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', handleKeydown);
});

function clearDisplay() {
    document.getElementById("calculation").textContent = "";
    document.getElementById("result").value = "";
}

function deleteLast() {
    let calculation = document.getElementById("calculation").textContent;
    document.getElementById("calculation").textContent = calculation.slice(0, -1);
}

function appendNumber(number) {
    document.getElementById("calculation").textContent += number;
}

function appendOperator(operator) {
    let calculation = document.getElementById("calculation").textContent;
    if (calculation !== "" && !isOperator(calculation.slice(-1))) {
        document.getElementById("calculation").textContent += operator;
    }
}

function appendDot() {
    let calculation = document.getElementById("calculation").textContent;
    if (!calculation.includes(".") || isOperator(calculation.slice(-1))) {
        document.getElementById("calculation").textContent += ".";
    }
}

function appendPercentage() {
    let calculation = document.getElementById("calculation").textContent;
    if (calculation !== "" && !isOperator(calculation.slice(-1))) {
        document.getElementById("calculation").textContent += "/100";
        calculateResult();
    }
}

function isOperator(char) {
    return ["+", "-", "*", "/"].includes(char);
}

function calculateResult() {
    let calculation = document.getElementById("calculation").textContent;
    try {
        document.getElementById("result").value = eval(calculation);
    } catch {
        document.getElementById("result").value = "Error";
    }
}

function handleKeydown(event) {
    if ((event.key >= 0 && event.key <= 9) || event.key === ".") {
        appendNumber(event.key);
    } else if (["+", "-", "*", "/"].includes(event.key)) {
        appendOperator(event.key);
    } else if (event.key === "Enter") {
        event.preventDefault();
        calculateResult();
    } else if (event.key === "Backspace") {
        deleteLast();
    } else if (event.key === "Escape") {
        clearDisplay();
    } else if (event.key === "%") {
        appendPercentage();
    }
}
