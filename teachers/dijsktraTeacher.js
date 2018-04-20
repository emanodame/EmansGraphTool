function executeDijkstraTeacher(path) {
    let maxCount = 0;
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

    const task = new Task(actionExecutor(), executionSpeed);
    let freeFlow = false;

    function displayFirstEdgeInfo() {
        if (maxCount === actionPosition) {
            const helperText = document.getElementById("helper-text");
            helperText.insertAdjacentHTML("beforeend", "" + displayConnectionInfo());
            document.getElementById("helper-text-container").scrollTop = document.getElementById("helper-text-container").scrollHeight;
        }
        s.renderers[0].dispatchEvent('overEdge', {edge: s.graph.edges(dijkstraEdgeStatesArray[dijkstraCounter].currentEdge.id)});
        nodeDiscoveryStatus.add(s.graph.nodes(getNodeIdFromLabel($("#src-node").val())).id);
    }

    function* actionExecutor() {
        while (true) {
            if (dijkstraCounter !== path.length) {
                if (freeFlow) {
                    actionPosition++;
                }

                maxCount = actionPosition > maxCount ? actionPosition : maxCount;
                action[actionPosition]();
            } else {
                if (dijkstraCounter === path.length) {
                }
                showPlayButton();
            }
            yield;
        }
    }

    function graphAction() {
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
        const div = document.createElement('div');
        div.id = dijkstraCounter.toString();
        div.insertAdjacentHTML("beforeend", "<br />" + displayConnectionInfo());
        document.getElementById("helper-text-container").appendChild(div);
        document.getElementById("helper-text-container").scrollTop = document.getElementById("helper-text-container").scrollHeight;

        document.getElementById(div.id).addEventListener("click", function (k) {
            dijkstraCounter = k.srcElement.id;
            actionPosition = k.srcElement.id * 2 + 1;
            task.step();
        });

        $('.resize-drag').addClass('resize-drag-highlight');
        setTimeout(function () {
            $('.resize-drag').removeClass('resize-drag-highlight');
        }, 1000);

        s.renderers[0].dispatchEvent('overEdge', {edge: s.graph.edges(dijkstraEdgeStatesArray[dijkstraCounter].currentEdge.id)});
    }

    function displayConnectionInfo() {
        if (!nodeDiscoveryStatus.has(dijkstraNodeStateArray[dijkstraCounter].sourceNode)) {
            return "Step " + (dijkstraCounter + 1) + ") This would go to Node " + s.graph.nodes(dijkstraNodeStateArray[dijkstraCounter].sourceNode).label
                + " from Node " + s.graph.nodes(dijkstraNodeStateArray[dijkstraCounter].targetNode).label
                + " using Edge " + dijkstraEdgeStatesArray[dijkstraCounter].currentEdge.label
                + "<br/> The weight from source node is " + dijkstraEdgeStatesArray[dijkstraCounter].currentEdge.weight;
        } else {
            return "Step " + (dijkstraCounter + 1) + ") This would go to Node " + s.graph.nodes(dijkstraNodeStateArray[dijkstraCounter].targetNode).label
                + " from Node " + s.graph.nodes(dijkstraNodeStateArray[dijkstraCounter].sourceNode).label
                + " using Edge " + dijkstraEdgeStatesArray[dijkstraCounter].currentEdge.label
                + "<br/> The weight from source node is " + dijkstraEdgeStatesArray[dijkstraCounter].currentEdge.weight;
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
            actionPosition -= 1;
            freeFlow = false;
            task.step();
        }
    }

    function forward() {
        if (dijkstraCounter < path.length) {
            actionPosition++;
            freeFlow = false;
            task.step();

            if (dijkstraCounter === path.length) {
                $.iGrowl({
                    type: "growler-settings",
                    message: "End of Kruskal's Algorithm!",
                });
            }
        }
    }

    function end() {
        if (dijkstraCounter < path.length) {
            s.renderers[0].dispatchEvent('outEdge', {edge: s.graph.edges(dijkstraEdgeStatesArray[dijkstraCounter].currentEdge.id)});
            dijkstraCounter = path.length - 1;
            actionPosition = action.length - 1;
            maxCount = actionPosition;
            freeFlow = false;
            task.step();

            $.iGrowl({
                type: "growler-settings",
                message: "End of Dijkstra's Algorithm!",
            });
        }
    }

    executeDijkstraTeacher.restart = restart;
    executeDijkstraTeacher.pause = pause;
    executeDijkstraTeacher.play = play;
    executeDijkstraTeacher.rewind = rewind;
    executeDijkstraTeacher.forward = forward;
    executeDijkstraTeacher.end = end;
}