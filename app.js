let currentInput = '';
let result = null; 
let operator = null; 

function manejarEntrada(value) {
    const resultado = document.getElementById('resultado');

    if (value === 'C') {
        currentInput = '';
        result = null;
        operator = null;
        resultado.value = '';
    } else if (value === '=') {
        if (currentInput !== '' && operator !== null) {
            const secondOperand = parseFloat(currentInput);
            result = calcular(result !== null ? result : secondOperand, secondOperand, operator);
            resultado.value = result;
            currentInput = '';
            operator = null; 
        }
    } else {
        if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput !== '') {
                const currentNum = parseFloat(currentInput);
                result = result !== null ? calcular(result, currentNum, operator) : currentNum;
                operator = value; 
                currentInput = '';
            } else if (result !== null) {
                operator = value; 
            }
        } else {
            currentInput += value;
        }
    }

    resultado.value = currentInput || result || '';
}

function calcular(first, second, operator) {
    switch (operator) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            return second !== 0 ? first / second : 'Error';
        default:
            return '';
    }
}

document.querySelectorAll('button[type="button"]').forEach(button => {
    button.addEventListener('click', function(event) {
        const value = event.target.value;
        manejarEntrada(value);
    });
});

document.querySelector('button[type="submit"]').addEventListener('click', function(event) {
    event.preventDefault();
    if (currentInput !== '' && operator !== null) {
        const secondOperand = parseFloat(currentInput);
        result = calcular(result !== null ? result : secondOperand, secondOperand, operator);
        document.getElementById('resultado').value = result;
        currentInput = '';
        operator = null;
    }
});

// Manejo de entrada por teclado
document.addEventListener('keydown', function(event) {
    const key = event.key;

    if ('0123456789+-*/'.includes(key)) {
        manejarEntrada(key);
    } else if (key === 'Enter') {
        event.preventDefault();
        manejarEntrada('=');
    } else if (key === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        document.getElementById('resultado').value = currentInput;
    } else if (key.toLowerCase() === 'c') {
        manejarEntrada('C');
    }
});
