import {Keypad} from "./Keypad.js";
import {PubSub} from "./PubSub.js";

export class Display{
    constructor(store, keypad){
        this.display = document.querySelector('.display');
        this.displayOutput = this.displayOutput.bind(this);
        PubSub.subscribe("StateChange", this.displayOutput);
        this.display.addEventListener("keypress", (e) => this.onType(e, store, keypad));
    }

    onType(e, store, keypad){
        e.preventDefault();
        const keyValue = e.key;
        if(!isNaN(keyValue) || keyValue === '.'){
            keypad.handleDigitButtonClick(keyValue, store);
        }
        else if(keyValue === '+' || keyValue === '-' || keyValue === '*' || keyValue === '/' ){
            keypad.handleOperationButtonClick(keyValue, store);
        }
        else if(keyValue === 'Enter'){
            keypad.handleOperationButtonClick("=", store);
        }
        return;
    }

    displayOutput(store, printThis){
        if(printThis === 'result')
            this.display.value = store.result;
        else
            this.display.value = store.operand;
    }
}