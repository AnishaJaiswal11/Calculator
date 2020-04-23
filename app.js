class CalculatorFrame{
    constructor(){
        this.data = new Store({
            result : 0,
            operand : '',
            operator : '',
        });
        
        let keypad = new Keypad(this.data);        
        let display = new Display(this.data);
    }
}

const PubSub = {
    subscribers : {},

    subscribe : function(event, callback){
        if (!this.subscribers[event]) {
            this.subscribers[event] = [];
        }
        this.subscribers[event].push(callback);
    },

    publish : function(event, data, printThis){
        if (!this.subscribers[event]) return;
        this.subscribers[event].forEach(subscriberCallback => subscriberCallback(data, printThis));
    },
};

class Store{
    constructor(initState) 
    { 
        this.state = initState || {};
    }
    
    getState(){
        return this.state;
    }

    setState(partialState, printThis){
        this.state = { ...this.state, ...partialState };
        if(printThis === 'result'){
            PubSub.publish("StateChange", this.state, "result" );
        }
        if(printThis === 'operand'){
            PubSub.publish("StateChange", this.state, "operand" );
        }
    }
}

class Display{
    constructor(data){
        this.display = document.querySelector('.display');
        this.displayOutput = this.displayOutput.bind(this);
        PubSub.subscribe("StateChange", this.displayOutput);
    }

    displayOutput(data, printThis){
       // debugger;
        if(printThis === 'result')
            this.display.value = data.result;
        else
            this.display.value = data.operand;
    }
}

class Keypad{
    constructor(data){
       // console.log(data.getState().result);
        this.digitButtons = [
          new DigitButton("0", (e) => this.handleDigitButtonClick("0", data)),
          new DigitButton("1", (e) => this.handleDigitButtonClick("1", data)),
          new DigitButton("2", (e) => this.handleDigitButtonClick("2",data)),
          new DigitButton("3", (e) => this.handleDigitButtonClick("3", data)),
          new DigitButton("4", (e) => this.handleDigitButtonClick("4", data)),
          new DigitButton("5", (e) => this.handleDigitButtonClick("5", data)),
          new DigitButton("6", (e) => this.handleDigitButtonClick("6", data)),
          new DigitButton("7", (e) => this.handleDigitButtonClick("7", data)),
          new DigitButton("8", (e) => this.handleDigitButtonClick("8", data)),
          new DigitButton("9", (e) => this.handleDigitButtonClick("9", data)),
          new DigitButton(".", (e) => this.handleDigitButtonClick(".", data))];

        this.operationButtons = {
            "+" : new OperationButton("+", (e) => this.handleOperationButtonClick("+", data)),
            "-" : new OperationButton("-", (e) => this.handleOperationButtonClick("-", data)),
            "*" : new OperationButton("*", (e) => this.handleOperationButtonClick("*", data)),
            "/" : new OperationButton("/", (e) => this.handleOperationButtonClick("/", data)),
            "=" : new OperationButton("=", (e) => this.handleOperationButtonClick("=", data)),
            "AC" : new OperationButton("AC", (e) => this.handleOperationButtonClick("AC", data)),
        }
    }

    handleDigitButtonClick(operandValue, data){
        if(data.getState().operator === ""){
            if(data.getState().result.toString().includes('.') && operandValue === '.') return;
            data.setState({operand : ''});
            data.setState({result : ((data.getState().result) ? data.getState().result + operandValue : operandValue)}, "result");
           // this.displayOutput(this.data.result);
        }
        else{
            if(data.getState().operand.toString().includes('.') && operandValue==='.') return;
            data.setState({operand : data.getState().operand + operandValue}, "operand");
            // this.displayOutput(this.data.operand);
        }
    }

    handleOperationButtonClick(operatorValue, data){
        if(data.getState().operator === ''){
            data.setState({operator : operatorValue});
        }
        else{
            this.calculate(data);
            data.setState({operator : operatorValue}, "result");
           // this.displayOutput(this.data.result);
        }
    }

    calculate(data){
        // const decDigitsInResult = this.data.result.toString().substring(this.data.result.toString().indexOf('.') + 1).length;
        // const decDigitsInCurrentOperand = this.data.currentOperand.toString().substring(this.data.currentOperand.toString().indexOf('.') + 1).length;
        // const precision = decDigitsInResult > decDigitsInCurrentOperand ? decDigitsInResult : decDigitsInCurrentOperand;
        data.setState({result : this.useOperator(data.getState().result, data.getState().operand, data.getState().operator)});  
        // this.data.result = +this.data.result.toFixed(precision);
        data.setState({operand : ''});
        console.log(data.getState());
    }

    useOperator(operand1, operand2, operator){
        switch(operator){
            case '+': return +operand1 + +operand2;
            case '-': return +operand1 - +operand2;
            case '*': return +operand1 * +operand2;
            case '/': return +operand1 / +operand2;
        }
    }
}

class Button{
    constructor(value, handler){
        if(value === '='){
            this.button = document.querySelector(`.equal[value= "${value}" ]`);
        }
        else{
            this.button = document.querySelector(`.individual[value= "${value}" ]`);
        }        
        this.attachEventListener(handler);
    }
   
    attachEventListener(handler){
        this.button.addEventListener("click", (e) => handler(e.target.value));
    }
}

class DigitButton extends Button{
    constructor(value, handler){
        super(value, handler);
    }
}

class OperationButton extends Button{
    constructor(value, handler){
        super(value, handler);
    }
}

window.onload = () => {
    let calc1 = new CalculatorFrame();
}