function executeDijkstraTeacher(path) {

    console.log("Dijkstra's Algorithm");

    let counter = 0;

    dijkstraTeacher();

    function dijkstraTeacher() {
        const node1 = path[counter];
        const node2 = path[counter + 1];

        node1.color = "#6e0db6";
        node2.color = "#6e0db6";

        const edge = s.graph.edges(node1.id + "|" + node2.id);

        if (edge) {
            edge.color = "#6e0db6";
        } else {
            s.graph.edges(node2.id + "|" + node1.id).color = "#6e0db6";
        }

        s.refresh();
        counter++;

        if (counter < path.length) {
            startTimer(dijkstraTeacher);
        }
    }
}