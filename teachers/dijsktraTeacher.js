function executeDijkstraTeacher(path) {

    console.log("Dijkstra's Algorithm");

    let counter = 0;

    dijkstraTeacher();

    function dijkstraTeacher() {

        const currentEdge = path[counter];
        currentEdge.color = "#6e0db6";

        s.refresh();
        counter++;

        if (counter < path.length) {
            startTimer(dijkstraTeacher);
        }
    }
}