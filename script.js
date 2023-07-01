const sliderLength = document.querySelector('[data-slide-section]'); 
const sliderDisplay = document.querySelector('[data-length]');
const displayData = document.querySelector('[data-display]');
const copyData = document.querySelector('[data-copy-button]');
const copyMsg = document.querySelector('[data-copy-message]');
const upperCase = document.querySelector('#uppercase');
const lowerCase = document.querySelector('#lowercase');
const number = document.querySelector('#number');
const symbol = document.querySelector('#symbol');
const strength = document.querySelector('[data-indicator]');
const genButton = document.querySelector('.generatorButton');
const allCheckBox = document.querySelectorAll('input[type=checkbox]');

let password = "";
let passwordLength = 10;
let checkCount = 0;
let symbols = "@#$%^&*()_+{}|[]:';,./"
handleSlider();
function handleSlider(){
    sliderLength.value=passwordLength;
    sliderDisplay.innerText = passwordLength;
    const min = sliderLength.min;
    const max = sliderLength.max;
    const backSize = (passwordLength-min)*100/(max-min);
    str = `${backSize}% 100%`;
    console.log(str);
    sliderLength.style.backgroundSize =str;
}
handleSlider();
function setIndicator(color){
    strength.style.backgroundColor = color;
    strength.style.boxShadow = `0px 0px 20px${color}`
}
function getRandomInt(min,max){
    return (Math.floor(Math.random()*(max-min)))+min;
}
function getNumber(){
    return getRandomInt(0,9);
}
function getUpperCase(){
    return String.fromCharCode(getRandomInt(65,91));
}
function getLowerCase(){
    return String.fromCharCode(getRandomInt(97,123));
}
function getSymbol(){
    let rndNum = getNumber(0,symbols.length);
    return symbols[rndNum];
}
async function copyText(){
    try {
        await navigator.clipboard.writeText(displayData.value);
        copyMsg.innerText = "Copied";
    } catch (error) {
        copyMsg.innerText = "Failed";
    }
    copyMsg.classList.add('active');
    setTimeout(()=>{
        copyMsg.classList.remove('active');
    },2000)
}

sliderLength.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
  });


//our logic for slider
// setInterval(()=>{
// const val = document.querySelector('[data-slide-section]').value;
// document.querySelector('[data-length]').innerText = val;
// },0)

copyData.addEventListener('click',()=>{
    if(displayData.value){
        copyText();
    }
})
function handleChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    })
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}
allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleChange);
})
function shufflePassword(pass){
    for(let i =pass.length-1; i>=0;i--){
        var index = Math.floor(Math.random()*i+1);
        var temp = pass[i];
        pass[i] = pass[index];
        pass[index] = temp;
    }
    var str="";
    pass.forEach((e)=>{str=str+e});
    return str;
}
function calcStrngth(){
    let hasUpper,hasLower,hasNum,hasSym;
    if(upperCase.checked) hasUpper = true;
    if(lowerCase.checked) hasLower = true;
    if(number.checked) hasNum = true;
    if(symbol.checked) hasSym = true;
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("#0f0");
      }
      else if ((hasLower || hasUpper) &&(hasNum || hasSym) &&passwordLength >= 6){
        setIndicator("#ff0");
      } 
      else {
        setIndicator("#f00");
      }
}
genButton.addEventListener('click',()=>{
    if(checkCount == 0){return} 
    if(checkCount > passwordLength){
        passwordLength = checkCount;
        handleSlider();
    }
    password ="";
    let funArr = [];
    if(upperCase.checked) funArr.push(getUpperCase);
    if(lowerCase.checked) funArr.push(getLowerCase);
    if(number.checked) funArr.push(getNumber);
    if(symbol.checked) funArr.push(getSymbol);
    for(let i=0;i<funArr.length;i++){
        password += funArr[i]();
    }
    for(let i=0;i<passwordLength-funArr.length;i++){
        var index = getRandomInt(0,checkCount);
        password += funArr[index]();
    }
    password = shufflePassword(Array.from(password));
    displayData.value = password;
    calcStrngth();
})