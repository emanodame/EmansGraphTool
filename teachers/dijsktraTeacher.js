function executeDijkstraTeacher(path) {

    console.log("Dijkstra's Algorithm");

    let counter = 0;

    dijkstraTeacher();

    function dijkstraTeacher() {
        const currentNode = path[counter];

        currentNode.color = "#6e0db6";

        s.refresh();
        counter++;

        if (counter < path.length) {
            startTimer(dijkstraTeacher);
        }
    }
}