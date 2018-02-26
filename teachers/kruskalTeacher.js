function executeKruskalTeacher(idsOfMinSpanningTreeEdges) {
    let kruskalCounter = 0;
    const sortedEdgesOnGraph = returnSortedEdgesByWeight();
    const kruskalEdgeStatesArray = [];

    const helperText = document.getElementById("helper-text");
    const breakNode = document.createElement("br");

    sortedEdgesOnGraph.forEach(function (edge) {
        edge.color = isEdgeInSpanningTree(edge.id) ? "#6e0db6" : "#CDAD00";

        const edgeStates = {
            currentEdge: edge,
            isEdgeInSpanningTree: isEdgeInSpanningTree(edge.id),
            edges: jQuery.extend(true, {}, s.graph.edges())
        };

        kruskalEdgeStatesArray.push(edgeStates);
    });

    const task = new Task(start());

    function* start() {
        while (true) {

            if (kruskalCounter === kruskalEdgeStatesArray.length) {
                showPlayButton();
                break;
            }

            Object.values(kruskalEdgeStatesArray[kruskalCounter].edges).forEach(function (edge) {
                s.graph.edges(edge.id).color = edge.color;
            });

            if (kruskalEdgeStatesArray[kruskalCounter].isEdgeInSpanningTree) {
                s.graph.edges(kruskalEdgeStatesArray[kruskalCounter].currentEdge.id).color = kruskalEdgeStatesArray[kruskalCounter].currentEdge.color;

                helperText.appendChild(document.createTextNode("Picking the smallest edge: " +
                    s.graph.nodes(kruskalEdgeStatesArray[kruskalCounter].currentEdge.source).label + " - " +
                    s.graph.nodes(kruskalEdgeStatesArray[kruskalCounter].currentEdge.target).label +
                    " this has weight " + kruskalEdgeStatesArray[kruskalCounter].currentEdge.label));
                helperText.appendChild(breakNode.cloneNode());
                helperText.appendChild(document.createTextNode("This will not form a cycle"));
                helperText.appendChild(breakNode.cloneNode());
                helperText.appendChild(breakNode.cloneNode());

            } else {
                helperText.appendChild(document.createTextNode("Picking the smallest edge: " +
                    s.graph.nodes(kruskalEdgeStatesArray[kruskalCounter].currentEdge.source).label + " - " +
                    s.graph.nodes(kruskalEdgeStatesArray[kruskalCounter].currentEdge.target).label +
                    " this has weight " + kruskalEdgeStatesArray[kruskalCounter].currentEdge.label));
                helperText.appendChild(breakNode.cloneNode());
                helperText.appendChild(document.createTextNode("This will form a cycle! So it is not added to spanning tree"));
                helperText.appendChild(breakNode.cloneNode());
                helperText.appendChild(breakNode.cloneNode());
            }

            s.refresh();
            yield kruskalCounter++;
        }
    }

    function pause() {
        task.pause();
    }

    function play(intervalTime) {
        task.resume(intervalTime);
    }

    function restart() {
        if (kruskalCounter > 2) {
            kruskalCounter = 0;
            task.step();
        }
    }

    function rewind() {
        if (kruskalCounter > 1) {
            if (kruskalCounter < 2) {
                kruskalCounter--;
            } else {
                kruskalCounter -= 2;
            }
            task.step();
        }
    }

    function forward() {
        if (kruskalCounter < sortedEdgesOnGraph.length) {
            task.step();
        }
    }

    function end() {
        if (kruskalCounter < sortedEdgesOnGraph.length) {
            kruskalCounter = idsOfMinSpanningTreeEdges.length - 1;
            task.step();
        }
    }

    function isEdgeInSpanningTree(edgeId) {
        return $.inArray(edgeId, idsOfMinSpanningTreeEdges) !== -1;
    }

    executeKruskalTeacher.restart = restart;
    executeKruskalTeacher.pause = pause;
    executeKruskalTeacher.play = play;
    executeKruskalTeacher.rewind = rewind;
    executeKruskalTeacher.forward = forward;
    executeKruskalTeacher.end = end;
}