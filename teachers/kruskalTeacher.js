function executeTeacher(idsOfMinSpanningTreeEdges) {

    const sortedEdgesOnGraph = returnSortedEdgesByWeight();

    for (let i = 0; i < sortedEdgesOnGraph.length; i++) {

        (function (index) {
            setTimeout(function () {
                const currentEdge = sortedEdgesOnGraph[index];

                if ($.inArray(currentEdge.id, idsOfMinSpanningTreeEdges) !== -1) {
                    currentEdge.color = "#6e0db6";
                    s.refresh();
                } else {
                    currentEdge.color = "#B6001E";
                    s.refresh();
                }
            }, i * 2000)
        })(i);
    }
}

function returnSortedEdgesByWeight() {
    return s.graph.edges().sort(function (a, b) {
        return a.label - b.label;
    });
}