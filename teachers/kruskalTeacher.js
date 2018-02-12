let kruskalTeacherCount = 0;
const kruskalEdgeStatesArray = [];
let ids = [];

function executeKruskalTeacher(idsOfMinSpanningTreeEdges) {
    ids = idsOfMinSpanningTreeEdges;
    const sortedEdgesOnGraph = returnSortedEdgesByWeight();

    document.getElementById("helper-text").innerText = "";

    kruskalTeacher();

    function kruskalTeacher() {
        const currentEdge = sortedEdgesOnGraph[kruskalTeacherCount];
        const helperText = document.getElementById("helper-text");
        const breakNode = document.createElement("br");

        const edgeStates = {
            count: kruskalTeacherCount,
            edges: jQuery.extend(true, {}, s.graph.edges())
        };

        kruskalEdgeStatesArray.push(edgeStates);

        if ($.inArray(currentEdge.id, idsOfMinSpanningTreeEdges) !== -1) {
            const textNode = document.createTextNode(currentEdge.label + " will be added to min spanning tree");

            helperText.appendChild(textNode);
            helperText.appendChild(breakNode);
            currentEdge.color = "#6e0db6";

        } else {
            const textNode = document.createTextNode(currentEdge.label + "  will not be added to min spanning tree as a cycle will occur");

            helperText.appendChild(textNode);
            helperText.appendChild(breakNode);
            currentEdge.color = "#B6001E";
        }

        s.refresh();
        kruskalTeacherCount++;

        if (kruskalTeacherCount < sortedEdgesOnGraph.length) {
            startTimer(kruskalTeacher);
        }

        if (kruskalTeacherCount === sortedEdgesOnGraph.length) {
            document.getElementById("pause-button").style.display = "none";
            document.getElementById("play-button").style.display = "inline";
        }

        executeKruskalTeacher.kruskalTeacher = kruskalTeacher;
    }
}

function rewindBack() {
    Object.values(kruskalEdgeStatesArray[kruskalTeacherCount - 1].edges).forEach(function (edge) {
        s.graph.edges(edge.id).color = edge.color;
        s.refresh();
    });

    kruskalTeacherCount--;
}

function forwardOne() {
    executeKruskalTeacher(ids).kruskalTeacher();
}
