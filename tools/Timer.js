let timeVar;
let savedFunctionCode;

const intervalTime = 2000;

function startTimer(code) {
    savedFunctionCode = code;
    timeVar = setTimeout(savedFunctionCode, intervalTime);
}

function resumeTimer() {
    setTimeout(savedFunctionCode, intervalTime);
}

function pauseTimer() {
    clearTimeout(timeVar);
}