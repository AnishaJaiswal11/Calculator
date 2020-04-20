class CalculatorFrame{
    
}

class Store{
    constructor(initState){
        if(this.state){
            this.state = initState;
        }
        else{
            this.state = {};
        }        
    }
    
    getState(){
        return this.state;
    }

    setState(partialState){
        this.state = { ...this.state, ...partialState };
    }
}

class Display{

}

class Keypad{
    constructor(){
        const buttonOne = new DigitButton("1",this.handleDigitButtonClick);
        const buttonTwo = new DigitButton("2",this.handleDigitButtonClick);
        const buttonThree = new DigitButton("3",this.handleDigitButtonClick);
        const buttonFour = new DigitButton("4",this.handleDigitButtonClick);
        const buttonFive = new DigitButton("5",this.handleDigitButtonClick);
        const buttonSix = new DigitButton("6",this.handleDigitButtonClick);
        const buttonSeven = new DigitButton("7",this.handleDigitButtonClick);
        const buttonEight = new DigitButton("8",this.handleDigitButtonClick);
        const buttonNine = new DigitButton("9",this.handleDigitButtonClick);
        const buttonZero = new DigitButton("0",this.handleDigitButtonClick);
        const buttonDec = new DigitButton(".",this.handleDigitButtonClick);

        const buttonAdd = new OperationButton("+", this.handleOperationButtonClick);
        const buttonSub = new OperationButton("-", this.handleOperationButtonClick);
        const buttonMult = new OperationButton("*", this.handleOperationButtonClick);
        const buttonDiv = new OperationButton("/", this.handleOperationButtonClick);
        const buttonEquals = new OperationButton("=", this.handleOperationButtonClick);
        const buttonAC = new OperationButton("AC", this.handleOperationButtonClick);
    }

    handleDigitButtonClick(e){
        
    }

    handleOperationButtonClick(e){
        
    }


}

class Button{
    constructor(value, handler, buttonType){
        this.button = document.querySelector(`.individual[value= "${value}" ]`);
        this.attachEventListener(handler, buttonType);
    }
   
    attachEventListener(handler, buttonType){
        this.button.addEventListener("click", (e) => handler(e.target.value));
    }
}

class DigitButton extends Button{
    constructor(value, handler){
        super(value, handler, "digitButton");
    }
}

class OperationButton extends Button{
    constructor(value, handler){
        super(value, handler, "operationButton");
    }
}