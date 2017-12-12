function executeDijkstraTeacher(path) {

    console.log("Dijkstra's Algorithm");

    const visitedNodes = new Set();
    let counter = 0;

    dijkstraTeacher();

    function dijkstraTeacher() {
        const currentEdge = path[counter];

        if (!(visitedNodes.has(currentEdge.source) && (visitedNodes.has(currentEdge.target)))) {
            visitedNodes.add(currentEdge.source);
            visitedNodes.add(currentEdge.target);
            currentEdge.color = "#6e0db6";

            console.log("Connecting nodes " +
                s.graph.nodes(currentEdge.source).label + " and "
                + s.graph.nodes(currentEdge.target).label);

            console.log("From Start node, this has weight " + currentEdge.weight);
        } else {
            console.log("This would be the next edge but the nodes have already been discovered!")
        }

        s.refresh();
        counter++;

        if (counter < path.length) {
            startTimer(dijkstraTeacher);
        }
    }
}