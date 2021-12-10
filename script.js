// Basic elements

const numbers = document.querySelectorAll('.numberButton')
const operators = document.querySelectorAll('.operatorButton')
const del = document.querySelector('.deleteButton')
const c = document.querySelector('.clearAllButton')
const dot = document.querySelector('.decimalButton')
const equals = document.querySelector('.equalsButton')
const pOperator = document.querySelector('#previousOperator')
const fOperator = document.querySelector('#followingOperator')

// Creating the class

class Calculator {
    constructor(pOperator, fOperator) {
        this.previousOperatorText = pOperator
        this.followingOperatorText = fOperator
        this.operation = ''
        this.clear()
    }

    clear() {
        // "Previous Operator" is to refer to the upper, smaller part of the display
        this.previousOperator = ''

        // "Following Operator" refers to the part of the display where things are actually written
        this.followingOperator = ''

        this.operation = ''
        this.update()
    }

    delete() {
        this.previousOperator = this.previousOperator.slice(0, -1)

        this.update()
    }

    writeChar(char) {
        if (char === '.' && this.followingOperator.includes('.')) return

        this.followingOperator += char
        this.update()
    }

    writeOperator(operator) {
        // Can't write an operator if the display is empty (rip negative numbers)
        if (this.followingOperator === '') return

        this.operation = operator
        this.previousOperator = this.followingOperator
        this.followingOperator = ''

        this.update(operator)
    }

    decimal() {
        // Only one . allowed

        if (!this.followingOperator.includes('.')) {
            this.followingOperator += '.'
            this.update()
        }
    }

    update(operation) {
        this.previousOperatorText.innerText = `${this.format(
            this.previousOperator
        )}${this.operation}`

        this.followingOperatorText.innerText = this.format(
            this.followingOperator
        )
    }

    format(number) {
        if (number === '') return number

        let integerPart = Number(number.split('.')[0])
        let decimalPart = number.split('.')[1]

        if (decimalPart === undefined) {
            return integerPart.toLocaleString('en')
        }

        return `${integerPart.toLocaleString('en')}.${decimalPart}`
    }

    compute() {
        // This is not cumulative
        let result = ''
        const previous = Number(this.previousOperator)
        const following = Number(this.followingOperator)
        switch (this.operation) {
            case '+':
                result = previous + following
                break

            case '-':
                result = previous - following

                break

            case '×':
                result = previous * following
                break

            case '÷':
                result = previous / following
                break

            default:
                this.clear()
        }

        this.followingOperator = result.toString()
        this.previousOperator = ''
        this.operation = ''
        this.update()
    }
}

calculator = new Calculator(pOperator, fOperator)

// Adding event listeners

numbers.forEach(number => {
    number.addEventListener('click', () => {
        calculator.writeChar(number.innerText)
    })
})

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        calculator.writeOperator(operator.innerText)
    })
})
