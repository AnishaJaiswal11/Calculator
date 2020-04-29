import css from './style.css';
import {Store} from "./Store.js";
import {Keypad} from "./Keypad.js";
import {Display} from "./Display.js";
import {DisplayHistory} from "./DisplayHistory";

class CalculatorFrame{
    constructor(){
        this.store = new Store({
            result : 0,
            operand : '',
            operator : '',
            expression : [],
        });
        
        this.keypad = new Keypad(this.store, this.calculate);        
        this.display = new Display(this.store, this.keypad);
        this.displayHistory = new DisplayHistory(this.store, this.keypad);
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
window.onload = () => {
    // const head = document.getElementsByTagName('head')[0];
    // const link = document.createElement('link'); 
    // link.rel  = 'stylesheet';
    // link.type = 'text/css';
    // link.href = '../src/style.css';
    // head.appendChild(link);
    let calc1 = new CalculatorFrame();
}