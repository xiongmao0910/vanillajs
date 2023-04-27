// Variables
let digitButtons = document.querySelectorAll("[data-digit]");
let operationButtons = document.querySelectorAll("[data-operation]");
let allClearBtn = document.querySelector("#allClearBtn");
let clearBtn = document.querySelector("#clearBtn");
let equalBtn = document.querySelector("#equalBtn");
let currentDOM = document.querySelector("[data-output='current']");
let currentNum = 0;
let prevDOM = document.querySelector("[data-output='prev']");
let prevNum = 0;
let prevOperation;

// Function
function evalution({ currentNum, prevNum, operation }) {
    const prev = parseFloat(prevNum);
    const current = parseFloat(currentNum);

    if (currentNum === 0 && prevNum === 0) return "Result is undified";

    let computation = "";

    switch (operation) {
        case "+":
            computation = prev + current;
            break;
        case "-":
            computation = prev - current;
            break;
        case "*":
            computation = prev * current;
            break;
        case "/":
            computation = prev / current;
            break;
    }

    return computation;
}

// Listen Event
digitButtons.forEach((digitButton) => {
    digitButton.addEventListener("click", function () {
        // Add digit on screen
        let digit = this.getAttribute("data-digit");
        currentDOM.innerText += digit;
        // Update current number value
        currentNum = parseFloat(currentDOM.innerText);
    });
});

operationButtons.forEach((operationButton) => {
    operationButton.addEventListener("click", function () {
        if (prevNum === 0) {
            prevNum = currentNum;
            currentDOM.innerText = "";
            currentNum = parseFloat(currentDOM.innerText) || 0;
            prevDOM.innerText = `${prevNum} ${this.getAttribute(
                "data-operation"
            )}`;
        }

        if (currentNum === 0) {
            prevDOM.innerText = `${prevNum} ${this.getAttribute(
                "data-operation"
            )}`;

            prevOperation = this.getAttribute("data-operation");
        }

        if (prevNum !== 0 && currentNum !== 0) {
            prevNum = evalution({
                currentNum,
                prevNum,
                operation: prevOperation,
            });

            currentDOM.innerText = "";
            currentNum = parseFloat(currentDOM.innerText) || 0;
            prevDOM.innerText = `${prevNum} ${this.getAttribute(
                "data-operation"
            )}`;

            prevOperation = this.getAttribute("data-operation");
        }
    });
});

allClearBtn.addEventListener("click", function () {
    currentNum = prevNum = 0;
    currentDOM.innerText = "";
    prevDOM.innerText = "";
});

equalBtn.addEventListener("click", function () {
    currentNum = evalution({
        currentNum,
        prevNum,
        operation: prevOperation,
    });

    prevNum = 0;
    prevDOM.innerText = "";
    currentDOM.innerText = currentNum;
});

clearBtn.addEventListener("click", function () {
    currentDOM.innerText = currentDOM.innerText.slice(0, -1);
    currentNum = parseFloat(currentDOM.innerText) || 0;
});
