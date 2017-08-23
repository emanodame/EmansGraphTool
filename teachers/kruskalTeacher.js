function executeTeacher(idsOfMinSpanningTreeEdges) {

    const sortedEdgesOnGraph = returnSortedEdgesByWeight();

    console.log("Kruskal Algorithm");
    console.log("Start with the smallest weighted edge on the graph");
    console.log("This will be edge " + sortedEdgesOnGraph[0].label);
    console.log("Pick the next smallest.");

    let counter = 0;

    kruskalTeacher();

    function kruskalTeacher() {
        const currentEdge = sortedEdgesOnGraph[counter];
        console.log("the next smallest is edge " + currentEdge.label);

        if ($.inArray(currentEdge.id, idsOfMinSpanningTreeEdges) !== -1) {
            console.log(currentEdge.label + " will be added to min spanning tree");
            currentEdge.color = "#6e0db6";
        } else {
            console.log(currentEdge.label + " will not be added to min spanning tree as a cycle will occur");
            currentEdge.color = "#B6001E";
        }

        s.refresh();
        counter++;

        if (counter < sortedEdgesOnGraph.length) {
            startTimer(kruskalTeacher);
        }
    }
}

function returnSortedEdgesByWeight() {
    return s.graph.edges().sort(function (a, b) {
        return a.label - b.label;
    });
}