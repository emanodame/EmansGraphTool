let dijkstraCounter = 0;
let pathLength = 0;
const dijkstraEdgeStatesArray = [];

function executeDijkstraTeacher(path) {
    pathLength = path.length;

    const visitedNodes = new Set();

    document.getElementById("helper-text").innerText = "";

    dijkstraTeacher();

    function dijkstraTeacher() {
        const currentEdge = path[dijkstraCounter];
        const helperText = document.getElementById("helper-text");
        const breakNode = document.createElement("br");

        const edgeStates = {
            count: dijkstraCounter,
            edges: jQuery.extend(true, {}, s.graph.edges())
        };

        dijkstraEdgeStatesArray.push(edgeStates);

            visitedNodes.add(currentEdge.source);
            visitedNodes.add(currentEdge.target);

            const textNode = document.createTextNode("Connecting nodes " +
                s.graph.nodes(currentEdge.source).label + " and " +
                s.graph.nodes(currentEdge.target).label);

            helperText.appendChild(textNode);
            helperText.appendChild(breakNode);
            currentEdge.color = "#6e0db6";

        s.refresh();
        dijkstraCounter++;

        if (dijkstraCounter < path.length) {
            startTimer(dijkstraTeacher);
        }

        if (dijkstraCounter === visitedNodes.size) {
            document.getElementById("pause-button").style.display = "none";
            document.getElementById("play-button").style.display = "inline";
        }
    }
}

function restart() {
    clearColoredNodesAndEdges();

    dijkstraCounter = 0;
}

function rewind() {
    Object.values(dijkstraEdgeStatesArray[dijkstraCounter - 1].edges).forEach(function (edge) {
        s.graph.edges(edge.id).color = edge.color;
        s.refresh();
    });

    dijkstraCounter--;
}

function forward() {
    executeKruskalTeacher(ids).kruskalTeacher();
}

function end() {
    dijkstraEdgeStatesArray.forEach(function (edge) {
        console.log(edge);
    });

}