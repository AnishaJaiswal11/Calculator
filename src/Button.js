export class Button{
    constructor(value, handler){
        if(value === '='){
            this.button = document.querySelector(`.equal[value= "${value}" ]`);
        }
        else{
            const buttonClass = value === 'AC' ? 'ACButton' : 'individual';
            this.button = document.querySelector(`.${buttonClass}[value= "${value}" ]`);
        }        
        this.attachEventListener(handler);
    }
   
    attachEventListener(handler){
        this.button.addEventListener("click", (e) => handler(e.target.value));
    }
}