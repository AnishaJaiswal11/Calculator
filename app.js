class CalculatorFrame{
    constructor(){
        this.store = new Store({
            result : 0,
            operand : '',
            operator : '',
        });
        
        this.keypad = new Keypad(this.store, this.calculate);        
        this.display = new Display();
    }

    useOperator(operand1, operand2, operator){
        switch(operator){
            case '+': return +operand1 + +operand2;
            case '-': return +operand1 - +operand2;
            case '*': return +operand1 * +operand2;
            case '/': return +operand1 / +operand2;
        }
    }

    calculate = (store) => {
        store.setState({result : this.useOperator(store.getState().result, store.getState().operand, store.getState().operator)});
        store.setState({operand : ''});
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
    constructor(){
        this.display = document.querySelector('.display');
        this.displayOutput = this.displayOutput.bind(this);
        PubSub.subscribe("StateChange", this.displayOutput);
    }

    displayOutput(store, printThis){
        if(printThis === 'result')
            this.display.value = store.result;
        else
            this.display.value = store.operand;
    }
}

class Keypad{
    constructor(store, calculate){

        this.calculate = calculate;

        const digitButtonsList = [...Array.from(Array(10).keys()), '.'];
        this.digitButtons = digitButtonsList.map(buttonKey => new DigitButton(buttonKey.toString(), () => this.handleDigitButtonClick(buttonKey.toString(), store)));

        const operationButtonsList = ["+", "-", "*", "/", "=", "AC"];
        this.operationButtons = operationButtonsList.reduce((acc, item) => (
            {
                ...acc,
                [item] : new OperationButton(item, () => this.handleOperationButtonClick(item, store)),
            } 
        ) ,
         {});
    }

    handleDigitButtonClick(operandValue, store){
        if(store.getState().operator === ""){
            if(store.getState().result.toString().includes('.') && operandValue === '.') return;
            store.setState({operand : ''});
            store.setState({result : ((store.getState().result) ? store.getState().result + operandValue : operandValue)}, "result");
        }
        else{
            if(store.getState().operand.toString().includes('.') && operandValue==='.') return;
            store.setState({operand : store.getState().operand + operandValue}, "operand");
        }
    }

    handleOperationButtonClick(operatorValue, store){
        if(operatorValue === '='){
            if(store.getState().operand){
                this.calculate(store);
            }
            store.setState({}, "result");
            return;
        }
        if(operatorValue === 'AC'){
            store.setState({result : 0, operand : '', operator : ''}, "result");
            return;
        }
        if(store.getState().operator === ''){
            store.setState({operator : operatorValue});
        }
        else{
            this.calculate(store);
            store.setState({operator : operatorValue}, "result");
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