import {Keypad} from "./Keypad.js";
import {PubSub} from "./PubSub.js";

export class DisplayHistory{
    constructor(store, keypad){
        this.displayHistory = document.querySelector('.displayHistory');
        this.displayOutput = this.displayOutput.bind(this);
        PubSub.subscribe("ExpressionUpdated", this.displayOutput);
    }

    displayOutput(store, printThis){
        const {expression} = store.expression;
        this.displayHistory.value = store.expression.join("");
    }
}