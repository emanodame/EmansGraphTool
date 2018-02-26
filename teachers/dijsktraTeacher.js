function executeDijkstraTeacher(path) {
    const helperText = document.getElementById("helper-text");

    const dijkstraNodeStateArray = [];
    const dijkstraEdgeStatesArray = [];
    const action = [];
    const nodeDiscoveryStatus = new Set();

    let algoCounter = 0;
    let actionPosition = 0;

    path.forEach(function (edge) {
        s.graph.nodes(edge.source).color = "#CDAD00";
        s.graph.nodes(edge.target).color = "#CDAD00";
        edge.color = "#6e0db6";

        const nodeStates = {
            sourceNode: edge.source,
            targetNode: edge.target,
            nodes: jQuery.extend(true, {}, s.graph.nodes()),
        };

        const edgeStates = {
            edges: jQuery.extend(true, {}, s.graph.edges()),
            currentEdge: edge,
            actionDescription: document.createTextNode("Connecting nodes  " +
                s.graph.nodes(edge.source).label + " and " +
                s.graph.nodes(edge.target).label),
        };

        dijkstraNodeStateArray.push(nodeStates);
        dijkstraEdgeStatesArray.push(edgeStates);
    });

    clearColoredNodesAndEdges();
    displayFirstEdgeInfo();

    path.forEach(function () {
        action.push(textAction);
        action.push(graphAction);
    });

    const task = new Task(actionExecutor());
    let freeFlow = false;

    function* actionExecutor() {
        while (true) {
            if (algoCounter !== path.length) {
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

    function displayFirstEdgeInfo() {
        helperText.innerHTML = "Starting node is " + $("#src-node").val() + "<br /> Pick the shortest path to an undiscovered node from the source node. " + "</br>" + displayConnectionInfo();
        s.renderers[0].dispatchEvent('overEdge', {edge: s.graph.edges(dijkstraEdgeStatesArray[algoCounter].currentEdge.id)});
        nodeDiscoveryStatus.add(s.graph.nodes(getNodeIdFromLabel($("#src-node").val())).id);
        makeTextScroll();
    }

    function graphAction() {
        if (algoCounter === path.length) {
            showPlayButton();
        }

        Object.values(dijkstraNodeStateArray[algoCounter].nodes).forEach(function (node) {
            s.graph.nodes(node.id).color = node.color;
        });

        Object.values(dijkstraEdgeStatesArray[algoCounter].edges).forEach(function (edge) {
            s.graph.edges(edge.id).color = edge.color;
        });

        s.graph.edges(dijkstraEdgeStatesArray[algoCounter].currentEdge.id).color = dijkstraEdgeStatesArray[algoCounter].currentEdge.color;
        s.renderers[0].dispatchEvent('outEdge', {edge: s.graph.edges(dijkstraEdgeStatesArray[algoCounter].currentEdge.id)});

        s.refresh();
        nodeDiscoveryStatus.add(dijkstraEdgeStatesArray[algoCounter].currentEdge.source).add(dijkstraEdgeStatesArray[algoCounter].currentEdge.target);
        algoCounter++;

        if (!freeFlow) {
            task.pause();
        }
    }

    function textAction() {
        helperText.innerHTML = "Pick the shortest path to an undiscovered node from the source node. <br />" + displayConnectionInfo();
        makeTextScroll();
        s.renderers[0].dispatchEvent('overEdge', {edge: s.graph.edges(dijkstraEdgeStatesArray[algoCounter].currentEdge.id)});
    }

    function displayConnectionInfo() {
        if (!nodeDiscoveryStatus.has(dijkstraNodeStateArray[algoCounter].sourceNode)) {
            return " This would go to Node " + s.graph.nodes(dijkstraNodeStateArray[algoCounter].sourceNode).label
                + " from Node " + s.graph.nodes(dijkstraNodeStateArray[algoCounter].targetNode).label
                + " using Edge " + dijkstraEdgeStatesArray[algoCounter].currentEdge.label;
        } else {
            return " This would go to Node " + s.graph.nodes(dijkstraNodeStateArray[algoCounter].targetNode).label
                + " from Node " + s.graph.nodes(dijkstraNodeStateArray[algoCounter].sourceNode).label
                + " using Edge " + dijkstraEdgeStatesArray[algoCounter].currentEdge.label;
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
        if (algoCounter > 2) {
            s.renderers[0].dispatchEvent('outEdge', {edge: s.graph.edges(dijkstraEdgeStatesArray[algoCounter === path.length ? algoCounter - 1 : algoCounter].currentEdge.id)});
            algoCounter = 0;
            actionPosition = 1;
            freeFlow = false;
            task.step();
        }
    }

    function rewind() {
        if (algoCounter > 0) {
            s.renderers[0].dispatchEvent('outEdge', {edge: s.graph.edges(dijkstraEdgeStatesArray[algoCounter === path.length ? algoCounter - 1 : algoCounter].currentEdge.id)});
            algoCounter -= 1;
            action[actionPosition].name === "graphAction" ? actionPosition -= 1 : actionPosition -= 1;
            freeFlow = false;
            task.step();
        }
    }

    function forward() {
        if (algoCounter < path.length) {
            actionPosition++;
            freeFlow = false;
            task.step();
        }
    }

    function end() {
        if (algoCounter < path.length) {
            s.renderers[0].dispatchEvent('outEdge', {edge: s.graph.edges(dijkstraEdgeStatesArray[algoCounter].currentEdge.id)});
            algoCounter = path.length - 1;
            actionPosition = action.length - 1;
            freeFlow = false;
            task.step();
        }
    }

    executeDijkstraTeacher.restart = restart;
    executeDijkstraTeacher.pause = pause;
    executeDijkstraTeacher.play = play;
    executeDijkstraTeacher.rewind = rewind;
    executeDijkstraTeacher.forward = forward;
    executeDijkstraTeacher.end = end;
}