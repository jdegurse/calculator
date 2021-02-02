////////        GLOBAL VARIABLES        ////////

// Display element
const calc_display = document.getElementById('calc-display');

// Max digits for display
const max_digits = 10;

// Memory and operator
let memory = operator = null;

// Operated tells numberClick() to clear the display when a new
//     number has been input after an operator has been clicked.
let operated = false;

// Number entered tells equalsClick that a number has been entered since an
//     operator function has been called, so as not to execute on the first
//     operand and the display, which is still the first operand.
let number_entered = false;



////////        EVENT FUNCTIONS        ////////

function createEventListeners() {
    // Creates event listeners for all buttons and supplies the function to be
    // run when the event is triggered.

    // Clear Keys
    document.getElementById('calc-c').addEventListener('click', cClick);
    document.getElementById('calc-ac').addEventListener('click', acClick);

    // Number Keys
    document.getElementById('calc-0').addEventListener('click', numberClick);
    document.getElementById('calc-1').addEventListener('click', numberClick);
    document.getElementById('calc-2').addEventListener('click', numberClick);
    document.getElementById('calc-3').addEventListener('click', numberClick);
    document.getElementById('calc-4').addEventListener('click', numberClick);
    document.getElementById('calc-5').addEventListener('click', numberClick);
    document.getElementById('calc-6').addEventListener('click', numberClick);
    document.getElementById('calc-7').addEventListener('click', numberClick);
    document.getElementById('calc-8').addEventListener('click', numberClick);
    document.getElementById('calc-9').addEventListener('click', numberClick);

    // Function Keys
    document.getElementById('calc-decimal')
        .addEventListener('click', decimalClick);
    document.getElementById('calc-negative')
        .addEventListener('click', negativeClick);

    // Operator Keys
    document.getElementById('calc-add').addEventListener('click', addClick);
    document.getElementById('calc-subtract')
        .addEventListener('click', subtractClick);
    document.getElementById('calc-multiply')
        .addEventListener('click', multiplyClick);
    document.getElementById('calc-divide')
        .addEventListener('click', divideClick);

    // Equals Key
    document.getElementById('calc-equals')
        .addEventListener('click', equalsClick);
}

function cClick() {
    calc_display.textContent = '';
}

function acClick() {
    memory = operator = null;
    calc_display.textContent = '';
}

function numberClick() {
    // Checks that the length of digits on the display is less than or equal to
    //     10. If true, adds the clicked number to the display textContent.

    if (operated) {
        calc_display.textContent = '';
        operated = false;
        number_entered = true;
    }
    if (calc_display.textContent.replace(/[^0-9]/g, '').length < max_digits) {
        calc_display.textContent += this.textContent;
        number_entered = true;
    }
}

function decimalClick() {
    if (!calc_display.textContent.includes('.')) {
        calc_display.textContent += '.';
    }
}

function negativeClick() {
    if (calc_display.textContent.includes('-')) {
        calc_display.textContent = calc_display.textContent.substring(1);
    }
    else {
        calc_display.textContent = '-' + calc_display.textContent;
    }
}

function addClick() {
    equalsClick();
    memory = calc_display.textContent;
    operator = '+';
    operated = true;
    number_entered = false;
}

function subtractClick() {
    equalsClick()
    memory = calc_display.textContent;
    operator = '-';
    operated = true;
    number_entered = false;
}

function multiplyClick() {
    equalsClick();
    memory = calc_display.textContent;
    operator = '*';
    operated = true;
    number_entered = false;
}

function divideClick() {
    equalsClick();
    memory = calc_display.textContent;
    operator = '/';
    operated = true;
    number_entered = false;
}

function equalsClick() {
    if (!memory || !operator || !number_entered) {
        return
    }
    calc_display.textContent = operate(
        Number(memory), Number(calc_display.textContent), operator
    );
    operator = null;
}



////////        MATH FUNCTIONS        ////////

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) return 'n/0 error!'
    return a / b;
}

function operate(a, b, operator) {
    if (operator === '+') return add(a, b);
    if (operator === '-') return subtract(a, b);
    if (operator === '*') return multiply(a, b);
    if (operator === '/') return divide(a, b);
    return 'operate() error'
}



////////        ROUNDING FUNCTIONS        ////////

function fitDigits(ans) {
    // Fits digits to the calculator and accounts for some floating point math
    //     errors.

    // Rule 1: always reduce decimals in a +/- operation to that of the operand
    //     with the largest number of decimal places
    if (
        (operator === '+' || operator === '-')
        && (ans.toString().includes('.'))
    ) {
        ans = sumRound(ans);
    }


    if (ans.toString().length > max_digits) {
        //do the reducing based on rules, if L > 4 e first then round
        //otherwise just round it to fit
        if (ans.includes('.')) {
            return;
        }
    }


    return ans;
}

function intDecLengths(num) {
    // Takes a decimal number and returns an array listing the lengths of the
    //     whole integer ahead of the decimal, and the decimal to compare for
    //     rounding.

    return (num.toString().split('.')).map(i => {
        return i.length;
    });
}

function sumRound(ans) {
    // Compares the length of decimal places for both operands, and rounds to
    //     the larger of the two.

    let decs_a = intDecLengths(memory)[1];
    let decs_b = intDecLengths(calc_display.textContent)[1];
    if (decs_a > decs_b) {
        return ans.toFixed(decs_a);
    }
    else {
        return ans.toFixed(decs_b);
    }
}



////////        ON LOAD        ////////

createEventListeners();