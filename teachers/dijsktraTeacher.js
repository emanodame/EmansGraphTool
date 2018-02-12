let dijkstraCounter = 0;
const dijkstraEdgeStatesArray = [];

function executeDijkstraTeacher(path) {

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

        if (!(visitedNodes.has(currentEdge.source) && (visitedNodes.has(currentEdge.target)))) {
            visitedNodes.add(currentEdge.source);
            visitedNodes.add(currentEdge.target);

            const textNode = document.createTextNode("Connecting nodes " +
                s.graph.nodes(currentEdge.source).label + " and " +
                s.graph.nodes(currentEdge.target).label);

            helperText.appendChild(textNode);
            helperText.appendChild(breakNode);
            currentEdge.color = "#6e0db6";
        } else {
            const textNode = document.createTextNode("This would be the next edge but the nodes have already been discovered!");

            helperText.appendChild(textNode);
            helperText.appendChild(breakNode);
        }

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

function rewindBack() {
    Object.values(dijkstraEdgeStatesArray[dijkstraCounter - 1].edges).forEach(function (edge) {
        s.graph.edges(edge.id).color = edge.color;
        s.refresh();
    });

    dijkstraCounter--;
}

function forwardOne() {
    executeKruskalTeacher(ids).kruskalTeacher();
}