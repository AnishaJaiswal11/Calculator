window.onload = () => {
    Calc.initialise();
  }
  let Calc = {
    data : {       
        result : 0, //     result  prevOperator  currentOperand   currentOperator
        currentOperand : '',
        currentOperator : '',
        previousOperator : '',
    },
    initialise(){
        // Initialsie display to 0
        this.display = document.querySelector('.display');
        //Binding methods
        this.changeCurrentOperand = this.changeCurrentOperand.bind(this);
        this.changeCurrentOperator = this.changeCurrentOperator.bind(this);
        this.calculate = this.calculate.bind(this);
        this.displayOutput = this.displayOutput.bind(this);
        this.clearAll = this.clearAll.bind(this);
        this.equals = this.equals.bind(this);
        this.onType = this.onType.bind(this);
        this.displayOutput(this.data.result);
        // Selectors for number buttons
        const buttonOne = document.querySelector('.individual[value="1"]');
        const buttonTwo = document.querySelector('.individual[value="2"]');
        const buttonThree = document.querySelector('.individual[value="3"]');
        const buttonFour = document.querySelector('.individual[value="4"]');
        const buttonFive = document.querySelector('.individual[value="5"]');
        const buttonSix = document.querySelector('.individual[value="6"]');
        const buttonSeven = document.querySelector('.individual[value="7"]');
        const buttonEight = document.querySelector('.individual[value="8"]');
        const buttonNine = document.querySelector('.individual[value="9"]');
        const buttonZero = document.querySelector('.individual[value="0"]');
        const buttonDec = document.querySelector('.individual[value="."]')
        // Selectors for operators
        const buttonAdd = document.querySelector('.individual[value="+"]');
        const buttonSub = document.querySelector('.individual[value="-"]');
        const buttonMul = document.querySelector('.individual[value="*"]');
        const buttonDiv = document.querySelector('.individual[value="/"]');
        const buttonAC = document.querySelector('.individual[value="AC"]');
        const buttonEquals = document.querySelector('.equal[value="="]');
        //Adding Listeners
        buttonOne.addEventListener("click", (e) => this.changeCurrentOperand(e.target.value));
        buttonTwo.addEventListener("click", (e) => this.changeCurrentOperand(e.target.value));
        buttonThree.addEventListener("click", (e) => this.changeCurrentOperand(e.target.value));
        buttonFour.addEventListener("click", (e) => this.changeCurrentOperand(e.target.value));
        buttonFive.addEventListener("click", (e) => this.changeCurrentOperand(e.target.value));
        buttonSix.addEventListener("click", (e) => this.changeCurrentOperand(e.target.value));
        buttonSeven.addEventListener("click", (e) => this.changeCurrentOperand(e.target.value));
        buttonEight.addEventListener("click", (e) => this.changeCurrentOperand(e.target.value));
        buttonNine.addEventListener("click", (e) => this.changeCurrentOperand(e.target.value));
        buttonZero.addEventListener("click", (e) => this.changeCurrentOperand(e.target.value));
        buttonDec.addEventListener("click", (e) => this.changeCurrentOperand(e.target.value));
        buttonAdd.addEventListener("click", (e) => this.changeCurrentOperator(e.target.value));
        buttonSub.addEventListener("click", (e) => this.changeCurrentOperator(e.target.value));
        buttonMul.addEventListener("click", (e) => this.changeCurrentOperator(e.target.value));
        buttonDiv.addEventListener("click", (e) => this.changeCurrentOperator(e.target.value));
        buttonEquals.addEventListener("click", this.equals);
        buttonAC.addEventListener("click", this.clearAll);
        this.display.addEventListener("keypress", this.onType);
    },
    changeCurrentOperand(operandValue){
        if(this.data.previousOperator === ''){
          if(this.data.result.toString().includes('.') && operandValue==='.') return;
          this.data.currentOperand = '';
          this.data.result = (this.data.result) ? this.data.result + operandValue : operandValue;
          this.displayOutput(this.data.result);
        }
        else {
          if(this.data.currentOperand.toString().includes('.') && operandValue==='.') return;
          this.data.currentOperand += operandValue;   
          this.displayOutput(this.data.currentOperand);
        }
    },
    changeCurrentOperator(operatorValue){
      if(this.data.previousOperator === ''){
        this.data.previousOperator = operatorValue;
      }
      else {
        this.calculate();
        this.data.previousOperator = operatorValue;
        this.displayOutput(this.data.result);
      }
    },
    clearAll(){
        this.data.result = 0;
        this.data.currentOperand = '';
        this.data.currentOperator = '';
        this.data.previousOperator = '';
        this.displayOutput(this.data.result);
    },
    calculate(){
        this.data.result = this.useOperator(this.data.result, this.data.currentOperand, this.data.previousOperator);
        this.data.currentOperand = '';
    },
    useOperator(operand1, operand2, operator){
        switch(operator){
            case '+': return +operand1 + +operand2;
            case '-': return +operand1 - +operand2;
            case '*': return +operand1 * +operand2;
            case '/': return +operand1 / +operand2;
        }
    },
    displayOutput(value){
        this.display.value = value;
    },
    equals(){
        if(this.data.currentOperand) this.calculate();
        this.displayOutput(this.data.result);
    },
    onType(e){
        e.preventDefault();
        const keyValue = e.key;
        if(!isNaN(keyValue) || keyValue==='.'){
            this.changeCurrentOperand(keyValue);
        }
        else if(keyValue === '+' || keyValue === '-' || keyValue === '*' || keyValue === '/' ){
            this.changeCurrentOperator(keyValue);
            const currOutput = this.display.value + keyValue;
            this.displayOutput(currOutput);
        }
        else if(keyValue === 'Enter')
          this.equals();
        return;
    },
  }  