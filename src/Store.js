import {PubSub} from "./PubSub.js";

export class Store{
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
        if(printThis === 'expression'){
            PubSub.publish("ExpressionUpdated", this.state, "expression");
        }
        document.querySelector('.display').focus();
    }
}