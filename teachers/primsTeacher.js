function executePrimsTeacher(edgesOnGraph) {
    let primsCounter = 0;
    const primsEdgeStatesArray = [];

    const helperText = document.getElementById("helper-text");
    const breakNode = document.createElement("br");

    edgesOnGraph.forEach(function (edge) {
        edge.color = edge.inSpanningTree ? "#6e0db6" : "#CDAD00";

        const edgeStates = {
            currentEdge: edge,
            edges: jQuery.extend(true, {}, s.graph.edges())
        };

        primsEdgeStatesArray.push(edgeStates);
    });

    const task = new Task(start());

    function* start() {
        while (true) {

            if (primsCounter === path.length) {
                showPlayButton();
                break;
            }

            Object.values(primsEdgeStatesArray[primsCounter].edges).forEach(function (edge) {
                s.graph.edges(edge.id).color = edge.color;
            });

            if (primsEdgeStatesArray[primsCounter].currentEdge.inSpanningTree) {
                s.graph.edges(primsEdgeStatesArray[primsCounter].currentEdge.id).color = primsEdgeStatesArray[primsCounter].currentEdge.color;

                helperText.appendChild(document.createTextNode("Picking the smallest edge: " +
                    s.graph.nodes(primsEdgeStatesArray[primsCounter].currentEdge.source).label + " - " +
                    s.graph.nodes(primsEdgeStatesArray[primsCounter].currentEdge.target).label +
                    " this has weight " + primsEdgeStatesArray[primsCounter].currentEdge.label));
                helperText.appendChild(breakNode.cloneNode());
                helperText.appendChild(document.createTextNode("This will not form a cycle"));
                helperText.appendChild(breakNode.cloneNode());
                helperText.appendChild(breakNode.cloneNode());
            } else {
                helperText.appendChild(document.createTextNode("Picking the smallest edge: " +
                    s.graph.nodes(primsEdgeStatesArray[primsCounter].currentEdge.source).label + " - " +
                    s.graph.nodes(primsEdgeStatesArray[primsCounter].currentEdge.target).label +
                    " this has weight " + primsEdgeStatesArray[primsCounter].currentEdge.label));
                helperText.appendChild(breakNode.cloneNode());
                helperText.appendChild(document.createTextNode("This will form a cycle! So it is not added to spanning tree"));
                helperText.appendChild(breakNode.cloneNode());
                helperText.appendChild(breakNode.cloneNode());
            }
            s.refresh();
            yield primsCounter++;
        }
    }

    function pause() {
        task.pause();
    }

    function play(intervalTime) {
        task.resume(intervalTime);
    }

    function restart() {
        if (primsCounter > 2) {
            primsCounter = 0;
            task.step();
        }
    }

    function rewind() {
        if (primsCounter > 1) {
            if (primsCounter < 2) {
                primsCounter--;
            } else {
                primsCounter -= 2;
            }
            task.step();
        }
    }

    function forward() {
        if (primsCounter < edgesOnGraph.length) {
            task.step();
        }
    }

    function end() {
        if (primsCounter < edgesOnGraph.length) {
            primsCounter = edgesOnGraph.length - 1;
            task.step();
        }
    }

    executePrimsTeacher.restart = restart;
    executePrimsTeacher.pause = pause;
    executePrimsTeacher.play = play;
    executePrimsTeacher.rewind = rewind;
    executePrimsTeacher.forward = forward;
    executePrimsTeacher.end = end;
}