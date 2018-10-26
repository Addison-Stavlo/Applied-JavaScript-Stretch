let time = 0;
let min25 = 25*60*1000;
let min5 = 5*60*1000;
let numBreak = 0;
let isPaused = false;
const alarmSound = new Audio('assets/alarmSound.mp3');

let counter;

const minuteTens = document.querySelector('#minuteTens');
const minuteOnes = document.querySelector('#minuteOnes');
const secondTens = document.querySelector('#secondTens');
const secondOnes = document.querySelector('#secondOnes');
const startButton = document.querySelector('.startButton');
const nextButton = document.querySelector('.nextButton');
const resetButton = document.querySelector('.resetButton');
const digits = document.querySelector('.digits');
const activity = document.querySelector('.activity');
const workDropdown = document.querySelector('#workDuration');
const breakDropdown = document.querySelector('#breakDuration');
const longBreakDropdown = document.querySelector('#longBreakDuration');

function minutesLeft(msTime) { //from ms to mins
    return msTime/60000;
}
function secondsLeft(msTime) {
    return (msTime%60000)/1000;
}

function displayTime() {
    time -= 1000;
    if( minutesLeft(time) > 10){
        minuteTens.textContent = minutesLeft(time).toString()[0];
        minuteOnes.textContent = minutesLeft(time).toString()[1];
    }
    else{
        minuteTens.textContent = '';
        minuteOnes.textContent = minutesLeft(time).toString()[0];
    }
    if( secondsLeft(time) >= 10){
        secondTens.textContent = secondsLeft(time).toString()[0];
        secondOnes.textContent = secondsLeft(time).toString()[1];
    }
    else{
        secondTens.textContent = '0';
        secondOnes.textContent = secondsLeft(time).toString()[0];
    }
    if(time <= 0){
        clearInterval(counter);
        minuteTens.textContent = '0';
        minuteOnes.textContent = '0';
        secondTens.textContent = '0';
        secondOnes.textcontent = '0';
        digits.style.color = 'red';
        alarmSound.play();
        // minuteTens.style.color = 'red';
        // minuteOnes.style.color = 'red';
        // secondTens.style.color = 'red';
        // secondOnes.style.color = 'red';
    }
}   
// add buttons! ------------------------------------
startButton.addEventListener("click",startTimer);
function startTimer(){
    alarmSound.pause();
    if(activity.classList.contains('break')){
        if(numBreak%4 === 0){
            time = Number(longBreakDropdown.value)*60*1000;
        }
        else{
            time = Number(breakDropdown.value)*60*1000;
        }

    }
    else {
        time = Number(workDropdown.value)*60*1000 ;
    }

    counter = setInterval( displayTime ,1000);
    startButton.disabled = true;
}

const pauseButton = document.querySelector('.pauseButton');
pauseButton.addEventListener('click',pause);
function pause(){
    alarmSound.pause();
    if(!isPaused){
        clearInterval(counter);
        isPaused = true;
    }
    else{
        counter = setInterval( displayTime, 1000);
        isPaused = false;
    }
}



nextButton.addEventListener("click",nextTimer);
function nextTimer(){
    alarmSound.pause();
    clearInterval(counter);
    time = 0;
    digits.style.color = 'black';
    secondOnes.textContent = '-';
    secondTens.textContent = '-';
    minuteOnes.textContent = '-';
    minuteTens.textContent = '-';
    startButton.disabled = false;
    activity.classList.toggle('break');
    if(activity.classList.contains('break')){
        numBreak++;
        activity.textContent = `Break Time! Session#${numBreak}`;
    }
    else{
        activity.textContent = `Work Time! Session#${numBreak+1}`;
    }
}

resetButton.addEventListener("click",resetTimer)
function resetTimer(){
    alarmSound.pause();
    clearInterval(counter);
    time = 0;
    digits.style.color = 'black';
    secondOnes.textContent = '-';
    secondTens.textContent = '-';
    minuteOnes.textContent = '-';
    minuteTens.textContent = '-';
    startButton.disabled = false;
}


// style goo --------------------------------------
// const body = document.querySelector('body');
// body.style.flexDirection = 'column';
// startButton.style.height = '40px';
// startButton.style.width = '80px';
// nextButton.style.height = '40px';
// nextButton.style.width = '80px';
// startButton.style.border = '1px solid black';
// nextButton.style.border = '1px solid black';
// startButton.style.borderRadius = '15px';
// nextButton.style.borderRadius = '15px';
// startButton.style.fontSize = '1.6rem';
// nextButton.style.fontSize = '1.6rem';

// const digitContainer = document.querySelector('body div');
// digitContainer.style.border = '2px solid black';
// digitContainer.style.borderRadius = '30px';
// digitContainer.style.marginBottom = '15px';