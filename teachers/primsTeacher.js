function executePrimsTeacher(edgesOnGraph) {

    const sortedEdgesOnGraph = returnSortedEdgesByWeight();

    console.log("Prim's Algorithm");

    let counter = 0;

    primsTeacher();

    function primsTeacher() {
        const currentEdge = edgesOnGraph[counter];

        if (currentEdge.inSpanningTree) {
            console.log(currentEdge.label + " will be added to min spanning tree");
            currentEdge.color = "#6e0db6";
        } else {
            console.log(currentEdge.label + " will not be added to min spanning tree as a cycle will occur");
            currentEdge.color = "#B6001E";
        }

        s.refresh();
        counter++;

        if (counter < sortedEdgesOnGraph.length) {
            startTimer(primsTeacher);
        }
    }
}