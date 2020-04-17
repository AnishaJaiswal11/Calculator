window.onload = () => {
    Calc.initialise();
}

let Calc = {

    data : {
        result : 0,
        expression : [],
        currentOperand : '',
        currentOperator : '',
    },

    initialise(){
        // Initialsie display to 0
        this.display = document.querySelector('.display');
        this.display.value = 0 ;

        //Binding methods
        this.changeCurrentOperand = this.changeCurrentOperand.bind(this);
        this.changeCurrentOperator = this.changeCurrentOperator.bind(this);
        this.calculate = this.calculate.bind(this);
        this.displayOutput = this.displayOutput.bind(this);
        this.clearAll = this.clearAll.bind(this);
       // this.onType = this.onType.bind(this);

        // Selectors for number buttons
        const buttonOne = document.querySelector('.individual[value="1"]');
        const buttonTwo = document.querySelector('.individual[value="2"]');
        const buttonThree = document.querySelector('.individual[value="3"]');
        const buttonFour = document.querySelector('.individual[value="4"]');
        const buttonFive = document.querySelector('.individual[value="5"]');
        const buttonSix = document.querySelector('.individual[value="6"]');
        const buttonSeven = document.querySelector('.individual[value="7"]');
        const buttonEight = document.querySelector('.individual[value="8"]');
        const buttonNine = document.querySelector('.individual[value="9"]');
        const buttonZero = document.querySelector('.individual[value="0"]');
        const buttonDec = document.querySelector('.individual[value="."]')

        // Selectors for operators
        const buttonAdd = document.querySelector('.individual[value="+"]');
        const buttonSub = document.querySelector('.individual[value="-"]');
        const buttonMul = document.querySelector('.individual[value="*"]');
        const buttonDiv = document.querySelector('.individual[value="/"]');

        const buttonAC = document.querySelector('.individual[value="AC"]');
        const buttonEquals = document.querySelector('.equal[value="="]');


        //Adding Listeners
        buttonOne.addEventListener("click", this.changeCurrentOperand);
        
        buttonTwo.addEventListener("click", this.changeCurrentOperand);
        buttonThree.addEventListener("click", this.changeCurrentOperand);
        buttonFour.addEventListener("click", this.changeCurrentOperand);
        buttonFive.addEventListener("click", this.changeCurrentOperand);
        buttonSix.addEventListener("click", this.changeCurrentOperand);
        buttonSeven.addEventListener("click", this.changeCurrentOperand);
        buttonEight.addEventListener("click", this.changeCurrentOperand);
        buttonNine.addEventListener("click", this.changeCurrentOperand);
        buttonZero.addEventListener("click", this.changeCurrentOperand);
        buttonDec.addEventListener("click", this.changeCurrentOperand);

        buttonAdd.addEventListener("click", this.changeCurrentOperator);
        buttonSub.addEventListener("click", this.changeCurrentOperator);
        buttonMul.addEventListener("click", this.changeCurrentOperator);
        buttonDiv.addEventListener("click", this.changeCurrentOperator);

        buttonEquals.addEventListener("click", this.calculate);

        buttonAC.addEventListener("click", this.clearAll);

        buttonOne.addEventListener("click", this.displayOutput);
        buttonTwo.addEventListener("click", this.displayOutput);
        buttonThree.addEventListener("click", this.displayOutput);
        buttonFour.addEventListener("click", this.displayOutput);
        buttonFive.addEventListener("click", this.displayOutput);
        buttonSix.addEventListener("click", this.displayOutput);
        buttonSeven.addEventListener("click", this.displayOutput);
        buttonEight.addEventListener("click", this.displayOutput);
        buttonNine.addEventListener("click", this.displayOutput);
        buttonZero.addEventListener("click", this.displayOutput);
        buttonAdd.addEventListener("click", this.displayOutput);
        buttonSub.addEventListener("click", this.displayOutput);
        buttonMul.addEventListener("click", this.displayOutput);
        buttonDiv.addEventListener("click", this.displayOutput);
        buttonDec.addEventListener("click", this.displayOutput);

        this.display.addEventListener("keydown", this.onType);
    },

    // onType(e){
    //     //console.log(e.key);
    //     if(!isNaN(e.key)){
    //         this.changeCurrentOperand(e);
    //     }
    //     else if(e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/' ){
    //         this.changeCurrentOperator(e);
    //     }
    // },

    changeCurrentOperand(e){        
        if(e.target.value === '.'){
            if(this.data.currentOperand.includes('.')){
                return;
            }
        }
        this.data.currentOperand += e.target.value;
        //this.displayOutput(this.data.currentOperand, 'changeCurrentOperator');
    },

    changeCurrentOperator(e){        
        this.data.currentOperator = e.target.value;
        if(!this.data.currentOperand == ''){
            this.data.expression.push(this.data.currentOperand);
            this.data.currentOperand = '';
        }  
        if(['+', '-', '*', '/'].includes(this.data.expression[this.data.expression.length - 1])){
          return;
        } 
        this.data.expression.push(this.data.currentOperator); 
        
        //this.displayOutput(this.data.changeCurrentOperator, 'changeCurrentOperator');
    },

    clearAll(){
        this.display.value = 0;
        this.data.currentOperand = '';
        this.data.currentOperator = '';
        this.data.expression = [];
    },

    calculate(){
        this.data.expression.push(this.data.currentOperand);
        this.data.currentOperand = '';
        let res = 0;
        if(this.data.expression.length === 1){
            res = +this.data.expression[0];
        }        
        let operand1 = +this.data.expression[0];

        for(let i=1; i <= this.data.expression.length-2; i+=2){ 
            operand2 = this.data.expression[i+1];
            operator = this.data.expression[i];
            res = this.useOperator(+operand1, +operand2, operator);
            operand1 = res;
        }
        console.log(res);  
        this.data.expression = []; 
        this.display.value = res;
    },

    useOperator(a,b,op){ 
        switch(op){ 
            case '+': return a + b; 
            case '-': return a - b; 
            case '*': return a * b; 
            case '/': return a / b;
        } 
      },

    displayOutput(e){
        if(this.display.value === '0'){
            this.display.value = '';
        }
        this.display.value += e.target.value;
    }
}

