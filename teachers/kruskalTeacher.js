function executeKruskalTeacher(idsOfMinSpanningTreeEdges) {
    const helperText = document.getElementById("helper-text");

    let kruskalCounter = 0;
    const kruskalEdgeStatesArray = [];
    const sortedEdgesOnGraph = returnSortedEdgesByWeight();

    let actionPosition = 0;
    const action = [];

    sortedEdgesOnGraph.forEach(function (edge) {
        edge.color = isEdgeInSpanningTree(edge.id) ? "#6e0db6" : "#CDAD00";

        const edgeStates = {
            currentEdge: edge,
            isEdgeInSpanningTree: isEdgeInSpanningTree(edge.id),
            edges: jQuery.extend(true, {}, s.graph.edges())
        };

        kruskalEdgeStatesArray.push(edgeStates);
        action.push(textAction);
        action.push(graphAction);
    });

    clearColoredNodesAndEdges();

    const task = new Task(actionExecutor());
    let freeFlow = false;

    task.step();

    function graphAction() {
        if (actionPosition === kruskalEdgeStatesArray.length) {
            showPlayButton();
        }

        Object.values(kruskalEdgeStatesArray[kruskalCounter].edges).forEach(function (edge) {
            s.graph.edges(edge.id).color = edge.color;
        });

        s.graph.edges(kruskalEdgeStatesArray[kruskalCounter].currentEdge.id).color = kruskalEdgeStatesArray[kruskalCounter].currentEdge.color;
        s.renderers[0].dispatchEvent('outEdge', {edge: s.graph.edges(kruskalEdgeStatesArray[kruskalCounter].currentEdge.id)});

        kruskalCounter++;
        s.refresh();

        if (!freeFlow) {
            task.pause();
        }
    }

    function textAction() {
        helperText.innerHTML = "Pick the next lowest edge on the graph. <br />" + displayConnectionInfo();
        makeTextScroll();
        s.renderers[0].dispatchEvent('overEdge', {edge: s.graph.edges(kruskalEdgeStatesArray[kruskalCounter].currentEdge.id)});
    }

    function* actionExecutor() {
        while (true) {
            if (kruskalCounter !== kruskalEdgeStatesArray.length) {
                if (freeFlow) {
                    actionPosition++;
                }
                action[actionPosition]();
            } else {
                showPlayButton();
            }
            yield;
        }
    }

    function displayConnectionInfo() {
        if (kruskalEdgeStatesArray[kruskalCounter].isEdgeInSpanningTree) {
            return "Picking the smallest edge: " +
                s.graph.nodes(kruskalEdgeStatesArray[kruskalCounter].currentEdge.source).label + " - " +
                s.graph.nodes(kruskalEdgeStatesArray[kruskalCounter].currentEdge.target).label +
                " this has weight " + kruskalEdgeStatesArray[kruskalCounter].currentEdge.label +
                ". </br> This will get added to Minimum Spanning Tree"
        } else {
            return "Picking the smallest edge: " +
                s.graph.nodes(kruskalEdgeStatesArray[kruskalCounter].currentEdge.source).label + " - " +
                s.graph.nodes(kruskalEdgeStatesArray[kruskalCounter].currentEdge.target).label +
                " this has weight " + kruskalEdgeStatesArray[kruskalCounter].currentEdge.label +
                ". </br> This will not get added to Minimum Spanning Tree as a cycle is formed"

        }
    }

    function makeTextScroll() {
        let pos = 0;
        const id = setInterval(frame, 5);

        function frame() {
            if (pos === 350) {
                clearInterval(id);
            } else {
                pos++;
                helperText.style.bottom = pos + 'px';
            }
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
        if (kruskalCounter > 2) {
            s.renderers[0].dispatchEvent('outEdge', {edge: s.graph.edges(kruskalEdgeStatesArray[kruskalCounter === sortedEdgesOnGraph.length ? kruskalCounter - 1 : kruskalCounter].currentEdge.id)});
            kruskalCounter = 0;
            actionPosition = 1;
            freeFlow = false;
            task.step();
        }
    }

    function rewind() {
        if (kruskalCounter > 0) {
            s.renderers[0].dispatchEvent('outEdge', {edge: s.graph.edges(kruskalEdgeStatesArray[kruskalCounter === sortedEdgesOnGraph.length ? kruskalCounter - 1 : kruskalCounter].currentEdge.id)});
            kruskalCounter -= 1;
            action[actionPosition].name === "graphAction" ? actionPosition -= 1 : actionPosition -= 1;
            freeFlow = false;
            task.step();
        }
    }

    function forward() {
        if (kruskalCounter < sortedEdgesOnGraph.length) {
            actionPosition++;
            freeFlow = false;
            task.step();
        }
    }

    function end() {
        if (kruskalCounter < sortedEdgesOnGraph.length) {
            s.renderers[0].dispatchEvent('outEdge', {edge: s.graph.edges(kruskalEdgeStatesArray[kruskalCounter === sortedEdgesOnGraph.length ? kruskalCounter - 1 : kruskalCounter].currentEdge.id)});
            kruskalCounter = sortedEdgesOnGraph.length - 1;
            actionPosition = action.length - 1;
            freeFlow = false;
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