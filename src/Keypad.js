import {DigitButton} from "./DigitButton.js";
import {OperationButton} from "./OperationButton.js";

export class Keypad{
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
            if(store.getState().operand.toString().includes('.') && operandValue === '.') return;
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
            const {expression} = store.getState();
            expression.push(store.getState().result);     
            store.setState({expression }, "expression");
            store.setState({operator : operatorValue});
        }
        else{
            const {expression} = store.getState();
            expression.push(store.getState().operator);
            expression.push(store.getState().operand);
            store.setState({expression}, "expression");
            this.calculate(store);
            store.setState({operator : operatorValue}, "result");            
        }
    }
}
