/**
 * Modern Interactive Calculator - Logic Implementation
 * Pure Vanilla JavaScript
 */

class Calculator {
    constructor() {
        this.currentInput = '0';
        this.history = '';
        this.operator = null;
        this.previousInput = null;
        this.shouldResetScreen = false;
        
        // DOM Elements
        this.currentInputEl = document.getElementById('current-input');
        this.historyEl = document.getElementById('history');
        this.keysEl = document.querySelector('.calculator-keys');
        
        this.bindEvents();
        this.updateDisplay();
    }

    /**
     * Bind click and keyboard events
     */
    bindEvents() {
        // Click events for calculator buttons
        this.keysEl.addEventListener('click', (e) => {
            const target = e.target;
            if (!target.matches('button')) return;

            const action = target.dataset.action;

            if (target.classList.contains('number')) {
                this.inputNumber(action);
            } else if (target.classList.contains('operator')) {
                this.handleOperator(action);
            } else if (target.classList.contains('utility')) {
                this.handleUtility(action);
            } else if (target.classList.contains('equals')) {
                this.calculate();
            }
            
            this.updateDisplay();
        });

        // Keyboard events
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardInput(e.key);
            this.updateDisplay();
        });
    }

    /**
     * Handle keyboard inputs mapping them to calculator functions
     */
    handleKeyboardInput(key) {
        if (/[0-9]/.test(key)) {
            this.inputNumber(key);
        } else if (key === '.') {
            this.inputNumber('.');
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            const operatorMap = { '+': 'add', '-': 'subtract', '*': 'multiply', '/': 'divide' };
            this.handleOperator(operatorMap[key]);
        } else if (key === 'Enter' || key === '=') {
            e.preventDefault(); // Prevent form submission if inside a form
            this.calculate();
        } else if (key === 'Backspace') {
            this.deleteLast();
        } else if (key === 'Escape') {
            this.clearAll();
        }
    }

    /**
     * Handle number inputs including decimals
     */
    inputNumber(num) {
        if (this.currentInputEl.classList.contains('error')) this.clearAll();
        
        if (this.shouldResetScreen) {
            this.currentInput = '';
            this.shouldResetScreen = false;
        }

        // Handle decimal point
        if (num === '.') {
            if (!this.currentInput.includes('.')) {
                if (this.currentInput === '') this.currentInput = '0';
                this.currentInput += '.';
            }
            return;
        }

        // Prevent leading zeros (e.g., 007 -> 7)
        if (this.currentInput === '0' && num !== '.') {
            this.currentInput = num;
        } else {
            this.currentInput += num;
        }
    }

    /**
     * Format numbers to handle large numbers and precision
     */
    formatNumber(numStr) {
        if (numStr === '' || numStr === 'Error') return numStr;
        const num = parseFloat(numStr);
        if (isNaN(num)) return 'Error';
        
        // Limit length and prevent floating point inaccuracies
        if (numStr.length > 12) {
            return parseFloat(num.toPrecision(12)).toString();
        }
        return numStr;
    }

    /**
     * Handle arithmetic operators
     */
    handleOperator(nextOperator) {
        if (this.currentInputEl.classList.contains('error')) this.clearAll();

        const inputValue = this.currentInput;
        
        // If operator is pressed twice in a row, just update the operator
        if (this.shouldResetScreen && this.previousInput !== null) {
            this.operator = nextOperator;
            this.history = `${this.formatNumber(this.previousInput)} ${this.getOperatorSymbol(nextOperator)}`;
            return;
        }

        if (this.previousInput === null) {
            this.previousInput = inputValue;
        } else if (this.operator) {
            const result = this.compute(this.previousInput, inputValue, this.operator);
            this.currentInput = String(result);
            this.previousInput = String(result);
        }

        this.operator = nextOperator;
        this.shouldResetScreen = true;
        this.history = `${this.formatNumber(this.previousInput)} ${this.getOperatorSymbol(nextOperator)}`;
    }

    /**
     * Get symbol for display
     */
    getOperatorSymbol(operator) {
        const symbols = {
            'add': '+',
            'subtract': '-',
            'multiply': '×',
            'divide': '÷'
        };
        return symbols[operator] || '';
    }

    /**
     * Perform the mathematical calculation
     */
    compute(a, b, operator) {
        a = parseFloat(a);
        b = parseFloat(b);
        
        if (isNaN(a) || isNaN(b)) return 0;

        switch (operator) {
            case 'add': return a + b;
            case 'subtract': return a - b;
            case 'multiply': return a * b;
            case 'divide': 
                if (b === 0) return 'Error';
                return a / b;
            default: return b;
        }
    }

    /**
     * Handle equal button press
     */
    calculate() {
        if (this.operator === null || this.shouldResetScreen) return;
        if (this.currentInputEl.classList.contains('error')) return;

        const result = this.compute(this.previousInput, this.currentInput, this.operator);
        
        if (result === 'Error') {
            this.showError();
            return;
        }

        this.history = `${this.formatNumber(this.previousInput)} ${this.getOperatorSymbol(this.operator)} ${this.formatNumber(this.currentInput)} =`;
        this.currentInput = String(result);
        this.operator = null;
        this.previousInput = null;
        this.shouldResetScreen = true;
    }

    /**
     * Handle utility buttons (AC, DEL, %)
     */
    handleUtility(action) {
        switch (action) {
            case 'clear':
                this.clearAll();
                break;
            case 'delete':
                this.deleteLast();
                break;
            case 'percent':
                this.handlePercent();
                break;
        }
    }

    /**
     * Clear all calculator state
     */
    clearAll() {
        this.currentInput = '0';
        this.history = '';
        this.operator = null;
        this.previousInput = null;
        this.shouldResetScreen = false;
        this.currentInputEl.classList.remove('error');
    }

    /**
     * Delete last entered character
     */
    deleteLast() {
        if (this.currentInputEl.classList.contains('error')) {
            this.clearAll();
            return;
        }
        if (this.shouldResetScreen) return;
        
        this.currentInput = this.currentInput.slice(0, -1);
        if (this.currentInput === '') this.currentInput = '0';
    }

    /**
     * Handle percentage calculation
     */
    handlePercent() {
        if (this.currentInput === '0' || this.currentInputEl.classList.contains('error')) return;
        
        const current = parseFloat(this.currentInput);
        if (this.previousInput !== null && this.operator) {
            // Calculate percentage of the previous number (e.g., 100 + 10% = 110)
            const prev = parseFloat(this.previousInput);
            const percentVal = (prev * current) / 100;
            this.currentInput = String(percentVal);
        } else {
            // Simple percentage (e.g., 50% = 0.5)
            this.currentInput = String(current / 100);
        }
    }

    /**
     * Show error state
     */
    showError() {
        this.currentInput = 'Error';
        this.history = '';
        this.currentInputEl.classList.add('error');
        this.operator = null;
        this.previousInput = null;
        this.shouldResetScreen = true;
    }

    /**
     * Update the DOM display
     */
    updateDisplay() {
        this.currentInputEl.textContent = this.formatNumber(this.currentInput);
        this.historyEl.textContent = this.history;
    }
}

// Initialize the Calculator on DOM load
document.addEventListener('DOMContentLoaded', () => {
    const calculator = new Calculator();
});