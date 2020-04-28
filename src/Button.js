export class Button{
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