const numbers = [...document.querySelectorAll(".numbers")];
const specials = [...document.querySelectorAll(".specials")];
const operations = [...document.querySelectorAll(".operations")];
const parenthesis = document.querySelector(".parenthesis");
const dot = document.querySelector(".dot");

const equal = document.querySelector(".equal");
const display = document.querySelector(".display");
const messageBox = document.querySelector(".message-box");

const operationsList = ["+", '-', '*', '/'];
const numbersList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

let answerState = false;

equal.addEventListener("click", ()=>{
    if(display.value.length == 0) return

    if(!operationsList.some(operation =>{
        return display.value.includes(operation)
    })){
        return
    }

    try{
        let result = eval(display.value);
        console.log("this line", result, display.value)
        if (result == undefined || result == Infinity){
            showError();
        }
        else{
            display.value = result;
            answerState = true;
        }
    }
    catch(error){
        showError();
    }
})

numbers.forEach(btn =>{
    btn.addEventListener("click", ()=>{
        if(answerState){
            display.value = btn.textContent;
        }
        else{
            display.value += btn.textContent;
        }
    })
})

operations.forEach(btn =>{
    btn.addEventListener("click", ()=>{
        const lastChar = display.value[display.value.length-1];
        
        if(lastChar === '.'){
            display.value += '0'+ btn.textContent;
            return
        }
        else if(lastChar === "(" || display.value.length === 0){
            return
        }
        else if(operationsList.includes(lastChar)){
            backspace();
        }
        else if(numbersList.includes(lastChar)){

        }

        display.value += btn.textContent;
        
    })
})

dot.addEventListener("click", ()=>{
    const lastChar = display.value[display.value.length-1];
    if (lastChar == ".") return

    if(numbersList.includes(lastChar)){
        for(let i = display.value.length-1; i >= 0; i--){
            let char = display.value[i]
            if(char == '.')
                return
        }
        display.value += '.';
    }
    else{
        display.value += "0."
    }
})

specials.forEach(btn =>{
    btn.addEventListener("click", ()=>{
        if(btn.classList.contains('clear')){
            display.value = "";
        }
        else if(btn.classList.contains("del")){
            if(answerState){
                display.value = "";
            }
            else{
                backspace();
            }
        }
    })
})

let unclosedParenthesis = 0;

parenthesis.addEventListener("click", ()=>{
    const lastChar = display.value[display.value.length-1];

    if(answerState){
        display.value += "*(";
        unclosedParenthesis += 1;
        return;
    }    
    
    const leng = display.value.length;
    if(leng == 0 || 
        operationsList.includes(display.value[leng-1]) || 
        display.value[leng-1] == "(" ||
        unclosedParenthesis == 0)
        {
        if(numbersList.includes(lastChar)){
            display.value += "*(";
        }
        else{
            display.value += "(";
        }
        unclosedParenthesis += 1;
    }
    else{
        display.value += ")";
        unclosedParenthesis -= 1;
    }
})

const backspace = ()=>{
    display.value = display.value.slice(0, -1);
}

const showError = ()=>{
    messageBox.innerHTML = "Invalid Expression";
    setTimeout(()=>{
        messageBox.innerHTML = "";
    }, 1000)
}

operations.concat(numbers).concat(specials).concat([parenthesis, dot]).forEach(btn =>
    addEventListener("click", ()=>{
        setTimeout(()=>{
            if(answerState)
                answerState = false;
        }, 100)
    })
)