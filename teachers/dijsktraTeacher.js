function executeDijkstraTeacher(path) {
    const helperText = document.getElementById("helper-text");

    const dijkstraNodeStateArray = [];
    const dijkstraEdgeStatesArray = [];

    const nodeDiscoveryStatus = new Set();

    const action = [];
    let actionPosition = 0;

    let dijkstraCounter = 0;

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
        action.push(textAction);
        action.push(graphAction);
    });

    clearColoredNodesAndEdges();
    displayFirstEdgeInfo();

    const task = new Task(actionExecutor());
    let freeFlow = false;

    function displayFirstEdgeInfo() {
        helperText.innerHTML = "Starting node is " + $("#src-node").val() + "<br /> Pick the shortest path to an undiscovered node from the source node. " + "</br>" + displayConnectionInfo();
        s.renderers[0].dispatchEvent('overEdge', {edge: s.graph.edges(dijkstraEdgeStatesArray[dijkstraCounter].currentEdge.id)});
        nodeDiscoveryStatus.add(s.graph.nodes(getNodeIdFromLabel($("#src-node").val())).id);
        makeTextScroll();
    }

    function* actionExecutor() {
        while (true) {
            if (dijkstraCounter !== path.length) {
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

    function graphAction() {
        if (dijkstraCounter === path.length) {
            showPlayButton();
        }

        Object.values(dijkstraNodeStateArray[dijkstraCounter].nodes).forEach(function (node) {
            s.graph.nodes(node.id).color = node.color;
        });

        Object.values(dijkstraEdgeStatesArray[dijkstraCounter].edges).forEach(function (edge) {
            s.graph.edges(edge.id).color = edge.color;
        });

        s.graph.edges(dijkstraEdgeStatesArray[dijkstraCounter].currentEdge.id).color = dijkstraEdgeStatesArray[dijkstraCounter].currentEdge.color;
        s.renderers[0].dispatchEvent('outEdge', {edge: s.graph.edges(dijkstraEdgeStatesArray[dijkstraCounter].currentEdge.id)});

        nodeDiscoveryStatus.add(dijkstraEdgeStatesArray[dijkstraCounter].currentEdge.source).add(dijkstraEdgeStatesArray[dijkstraCounter].currentEdge.target);
        dijkstraCounter++;
        s.refresh();

        if (!freeFlow) {
            task.pause();
        }
    }

    function textAction() {
        helperText.innerHTML = "Pick the shortest path to an undiscovered node from the source node. <br />" + displayConnectionInfo();
        makeTextScroll();
        s.renderers[0].dispatchEvent('overEdge', {edge: s.graph.edges(dijkstraEdgeStatesArray[dijkstraCounter].currentEdge.id)});
    }

    function displayConnectionInfo() {
        if (!nodeDiscoveryStatus.has(dijkstraNodeStateArray[dijkstraCounter].sourceNode)) {
            return " This would go to Node " + s.graph.nodes(dijkstraNodeStateArray[dijkstraCounter].sourceNode).label
                + " from Node " + s.graph.nodes(dijkstraNodeStateArray[dijkstraCounter].targetNode).label
                + " using Edge " + dijkstraEdgeStatesArray[dijkstraCounter].currentEdge.label
                + "<br/> The weight from source node is " + dijkstraEdgeStatesArray[dijkstraCounter].currentEdge.weight;
        } else {
            return " This would go to Node " + s.graph.nodes(dijkstraNodeStateArray[dijkstraCounter].targetNode).label
                + " from Node " + s.graph.nodes(dijkstraNodeStateArray[dijkstraCounter].sourceNode).label
                + " using Edge " + dijkstraEdgeStatesArray[dijkstraCounter].currentEdge.label
                + "<br/> The weight from source node is " + dijkstraEdgeStatesArray[dijkstraCounter].currentEdge.weight;
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
        if (dijkstraCounter > 2) {
            s.renderers[0].dispatchEvent('outEdge', {edge: s.graph.edges(dijkstraEdgeStatesArray[dijkstraCounter === path.length ? dijkstraCounter - 1 : dijkstraCounter].currentEdge.id)});
            dijkstraCounter = 0;
            actionPosition = 1;
            freeFlow = false;
            task.step();
        }
    }

    function rewind() {
        if (dijkstraCounter > 0) {
            s.renderers[0].dispatchEvent('outEdge', {edge: s.graph.edges(dijkstraEdgeStatesArray[dijkstraCounter === path.length ? dijkstraCounter - 1 : dijkstraCounter].currentEdge.id)});
            dijkstraCounter -= 1;
            action[actionPosition].name === "graphAction" ? actionPosition -= 1 : actionPosition -= 1;
            freeFlow = false;
            task.step();
        }
    }

    function forward() {
        if (dijkstraCounter < path.length) {
            actionPosition++;
            freeFlow = false;
            task.step();
        }
    }

    function end() {
        if (dijkstraCounter < path.length) {
            s.renderers[0].dispatchEvent('outEdge', {edge: s.graph.edges(dijkstraEdgeStatesArray[dijkstraCounter].currentEdge.id)});
            dijkstraCounter = path.length - 1;
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