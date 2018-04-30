function showPlayButton() {
    document.getElementById("pause-button").style.display = "none";
    document.getElementById("play-button").style.display = "inline";
}

function showPauseButton() {
    if (localStorage.getItem("algorithm")) {
        document.getElementById("play-button").style.display = "none";
        document.getElementById("pause-button").style.display = "inline";
    }
}

function restartAlgorithm() {
    showPlayButton();
    pauseAlgorithm();

    switch (localStorage.getItem("algorithm")) {
        case "dijkstra":
            executeDijkstraTeacher.restart();
            break;

        case "kruskal":
            executeKruskalTeacher.restart();
            break;

        case "prim":
            executePrimsTeacher.restart();
            break;
    }
}

function resumeAlgorithm(intervalTime) {
    switch (localStorage.getItem("algorithm")) {
        case "dijkstra":
            executeDijkstraTeacher.play(intervalTime);
            break;

        case "kruskal":
            executeKruskalTeacher.play(intervalTime);
            break;

        case "prim":
            executePrimsTeacher.play(intervalTime);
            break;
    }
}

function pauseAlgorithm() {
    switch (localStorage.getItem("algorithm")) {
        case "dijkstra":
            executeDijkstraTeacher.pause();
            break;

        case "kruskal":
            executeKruskalTeacher.pause();
            break;

        case "prim":
            executePrimsTeacher.pause();
            break;
    }
}

function rewindAlgorithm() {
    showPlayButton();
    pauseAlgorithm();

    switch (localStorage.getItem("algorithm")) {
        case "dijkstra":
            executeDijkstraTeacher.rewind();
            break;

        case "kruskal":
            executeKruskalTeacher.rewind();
            break;

        case "prim":
            executePrimsTeacher.rewind();
            break;
    }
}

function stepAlgorithm() {
    showPlayButton();
    pauseAlgorithm();

    switch (localStorage.getItem("algorithm")) {
        case "dijkstra":
            executeDijkstraTeacher.forward();
            break;

        case "kruskal":
            executeKruskalTeacher.forward();
            break;

        case "prim":
            executePrimsTeacher.forward();
            break;
    }
}

function endAlgorithm() {
    showPlayButton();
    pauseAlgorithm();

    switch (localStorage.getItem("algorithm")) {
        case "dijkstra":
            executeDijkstraTeacher.end();
            break;

        case "kruskal":
            executeKruskalTeacher.end();
            break;

        case "prim":
            executePrimsTeacher.end();
            break;
    }
}

document.onkeydown = function (e) {
    switch (e.keyCode) {
        case 37: //left key
            rewindAlgorithm();
            return;
        case 39: //right key
            stepAlgorithm();
            return;
    }
};