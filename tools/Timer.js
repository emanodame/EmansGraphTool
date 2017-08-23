let timeVar;
let savedFunctionCode;

function startTimer(code) {
    savedFunctionCode = code;
    timeVar = setTimeout(savedFunctionCode, 2000);
}

function resumeTimer() {
    setTimeout(savedFunctionCode, 2000);
}

function pauseTimer() {
    clearTimeout(timeVar);
}