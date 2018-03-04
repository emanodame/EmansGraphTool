function executePrimsTeacher(edgesOnGraph) {
    let maxCount = 0;
    let primsCounter = 0;
    const primsEdgeStates = [];

    let actionPosition = 0;
    const action = [];

    edgesOnGraph.forEach(function (edge) {
        edge.color = edge.inSpanningTree ? "#6e0db6" : "#CDAD00";

        const edgeStates = {
            currentEdge: edge,
            edges: jQuery.extend(true, {}, s.graph.edges())
        };

        primsEdgeStates.push(edgeStates);
        action.push(textAction);
        action.push(graphAction);
    });

    clearColoredNodesAndEdges();
    const task = new Task(actionExecutor(), speed);
    let freeFlow = false;

    task.step();

    function graphAction() {
        Object.values(primsEdgeStates[primsCounter].edges).forEach(function (edge) {
            s.graph.edges(edge.id).color = edge.color;
        });

        s.graph.edges(primsEdgeStates[primsCounter].currentEdge.id).color = primsEdgeStates[primsCounter].currentEdge.color;
        s.renderers[0].dispatchEvent('outEdge', {edge: s.graph.edges(primsEdgeStates[primsCounter].currentEdge.id)});

        primsCounter++;
        s.refresh();

        if (!freeFlow) {
            task.pause();
        }
    }

    function textAction() {
        if (maxCount === actionPosition) {
            helperText.insertAdjacentHTML("beforeend", "<br/> </br> Pick the next lowest edge on the graph. <br />" + displayConnectionInfo());
            document.getElementById("helper-text-container").scrollTop = document.getElementById("helper-text-container").scrollHeight;
        }
        s.renderers[0].dispatchEvent('overEdge', {edge: s.graph.edges(primsEdgeStates[primsCounter].currentEdge.id)});
    }

    function* actionExecutor() {
        while (true) {
            if (primsCounter !== primsEdgeStates.length) {
                if (freeFlow) {
                    actionPosition++;
                }
                maxCount = actionPosition > maxCount ? actionPosition : maxCount;
                action[actionPosition]();
            } else {
                showPlayButton();
            }
            yield;
        }
    }

    function displayConnectionInfo() {
        if (primsEdgeStates[primsCounter].currentEdge.inSpanningTree) {
            return "Picking the smallest edge: " +
                s.graph.nodes(primsEdgeStates[primsCounter].currentEdge.source).label + " - " +
                s.graph.nodes(primsEdgeStates[primsCounter].currentEdge.target).label +
                " this has weight " + primsEdgeStates[primsCounter].currentEdge.label +
                ". </br> This will get added to Minimum Spanning Tree"
        } else {
            return "Picking the smallest edge: " +
                s.graph.nodes(primsEdgeStates[primsCounter].currentEdge.source).label + " - " +
                s.graph.nodes(primsEdgeStates[primsCounter].currentEdge.target).label +
                " this has weight " + primsEdgeStates[primsCounter].currentEdge.label +
                ". </br> This will not get added to Minimum Spanning Tree as a cycle is formed"

        }
    }

    function play(intervalTime) {
        freeFlow = true;
        task.resume(intervalTime);
    }

    function pause() {
        freeFlow = false;
        task.pause();
    }

    function restart() {
        if (primsCounter > 2) {
            s.renderers[0].dispatchEvent('outEdge', {edge: s.graph.edges(primsEdgeStates[primsCounter === edgesOnGraph.length ? primsCounter - 1 : primsCounter].currentEdge.id)});
            primsCounter = 0;
            actionPosition = 1;
            maxCount = actionPosition;
            freeFlow = false;
            task.step();
        }
    }

    function rewind() {
        if (primsCounter > 0) {
            s.renderers[0].dispatchEvent('outEdge', {edge: s.graph.edges(primsEdgeStates[primsCounter === edgesOnGraph.length ? primsCounter - 1 : primsCounter].currentEdge.id)});
            primsCounter -= 1;
            actionPosition -= 1;
            freeFlow = false;
            task.step();
        }
    }

    function forward() {
        if (primsCounter < edgesOnGraph.length) {
            actionPosition++;
            freeFlow = false;
            task.step();
        }
    }

    function end() {
        if (primsCounter < edgesOnGraph.length) {
            s.renderers[0].dispatchEvent('outEdge', {edge: s.graph.edges(primsEdgeStates[primsCounter === edgesOnGraph.length ? primsCounter - 1 : primsCounter].currentEdge.id)});
            primsCounter = edgesOnGraph.length - 1;
            actionPosition = action.length - 1;
            maxCount = actionPosition;
            freeFlow = false;
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