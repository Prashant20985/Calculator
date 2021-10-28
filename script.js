class Calculator{
    constructor(previousOperandText,currentOperandText){
        this.previousOperandText=previousOperandText;
        this.currentOperandText=currentOperandText;
        this.allClear();
    }
    allClear(){
        this.previousOperand=''
        this.currentOperand=''
        this.operation=undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)

    }

    appendNum(number){ 
        if(number==='.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.currentOperand==='') return
        if(this.previousOperand !== '' ){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return

        switch(this.operation){
            case '+':
                computation = prev+current
                break
             case '-':
                computation = prev-current
                break
             case '*':
                computation = prev*current
                break
             case '/':
                computation = prev/current
                break

            default:
            return   
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    updateDisplay(){
        this.currentOperandText.innerText = this.currentOperand
        if(this.operation != null){
            this.previousOperandText.innerText = `${this.previousOperand} ${this.operation}`
        }
    }
}



const numButton = document.querySelectorAll('[data-num]');
const operationButton = document.querySelectorAll('[data-oper]');
const equalsButton = document.querySelector('[data-equals]');
const delButton = document.querySelector('[data-del]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandText,currentOperandText);

numButton.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.appendNum(button.innerText)
        calculator.updateDisplay()
    })
})

operationButton.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', ()=>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', ()=>{
    calculator.allClear()
    calculator.updateDisplay()
})

delButton.addEventListener('click', ()=>{
    calculator.delete();
    calculator.updateDisplay()
})