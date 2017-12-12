function executeKruskalTeacher(idsOfMinSpanningTreeEdges) {

    const sortedEdgesOnGraph = returnSortedEdgesByWeight();

    console.log("Kruskal Algorithm");

    let counter = 0;

    kruskalTeacher();

    function kruskalTeacher() {
        const currentEdge = sortedEdgesOnGraph[counter];

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