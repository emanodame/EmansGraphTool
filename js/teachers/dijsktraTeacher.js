function executeDijkstraTeacher(path) {
    let maxCount = 0;
    const dijkstraNodeStateArray = [];
    const dijkstraEdgeStatesArray = [];

    const nodeDiscoveryStatus = new Set();
    const divIds = new Set();

    const action = [];
    let actionPosition = 0;

    let dijkstraCounter = 0;
    let intervalTimeDijkstra;

    const sourceNodeId = getNodeIdFromLabel($("#src-node").val());

    path.forEach(function (edge) {
        sigmaInstance.graph.nodes(edge.source).color = "#CDAD00";
        sigmaInstance.graph.nodes(edge.target).color = "#CDAD00";
        edge.color = "#6e0db6";

        const nodeStates = {
            sourceNode: edge.source,
            targetNode: edge.target,
            nodes: jQuery.extend(true, {}, sigmaInstance.graph.nodes()),
        };

        const edgeStates = {
            edges: jQuery.extend(true, {}, sigmaInstance.graph.edges()),
            currentEdge: edge,
            actionDescription: document.createTextNode("> Connecting nodes  " +
                sigmaInstance.graph.nodes(edge.source).label + " and " +
                sigmaInstance.graph.nodes(edge.target).label),
        };

        dijkstraNodeStateArray.push(nodeStates);
        dijkstraEdgeStatesArray.push(edgeStates);
        action.push(textAction);
        action.push(graphAction);
    });

    clearColoredNodesAndEdges();

    if (task) {
        task.pause();
    }

    task = new Task(actionExecutor(), executionSpeed);
    let freeFlow = false;

    nodeDiscoveryStatus.add(sourceNodeId);
    task.step();

    function* actionExecutor() {
        sigmaInstance.graph.edges().forEach(function (edge) {
            sigmaInstance.renderers[0].dispatchEvent('outEdge', {edge: edge});
        });

        while (true) {
            if (dijkstraCounter !== path.length) {
                if (freeFlow) {
                    actionPosition++;
                }

                maxCount = actionPosition > maxCount ? actionPosition : maxCount;
                action[actionPosition]();
            } else {
                freeFlow = false;
                $.iGrowl.prototype.dismissAll('all');

                $.iGrowl({
                    type: "growler-settings",
                    message: "End of Dijkstra's Algorithm!",
                    placement: {
                        x: 'center'
                    },
                    animation: false
                });
                showPlayButton();
            }
            yield;
        }
    }

    function graphAction() {
        Object.values(dijkstraNodeStateArray[dijkstraCounter].nodes).forEach(function (node) {
            sigmaInstance.graph.nodes(node.id).color = node.color;
        });

        Object.values(dijkstraEdgeStatesArray[dijkstraCounter].edges).forEach(function (edge) {
            sigmaInstance.graph.edges(edge.id).color = edge.color;
        });

        sigmaInstance.graph.edges(dijkstraEdgeStatesArray[dijkstraCounter].currentEdge.id).color = dijkstraEdgeStatesArray[dijkstraCounter].currentEdge.color;
        sigmaInstance.renderers[0].dispatchEvent('outEdge', {edge: sigmaInstance.graph.edges(dijkstraEdgeStatesArray[dijkstraCounter].currentEdge.id)});

        nodeDiscoveryStatus.add(dijkstraEdgeStatesArray[dijkstraCounter].currentEdge.source).add(dijkstraEdgeStatesArray[dijkstraCounter].currentEdge.target);
        dijkstraCounter++;
        sigmaInstance.refresh();

        if (!freeFlow) {
            task.pause();
        }
    }

    function textAction() {
        if (maxCount === actionPosition) {
            const div = document.createElement('div');
            div.id = dijkstraCounter.toString();

            if (!divIds.has(div.id)) {
                div.insertAdjacentHTML("beforeend", displayConnectionInfo() + "<br />" + "<br />");
                document.getElementById("helper-text-container").appendChild(div);
                document.getElementById("helper-text-container").scrollTop = document.getElementById("helper-text-container").scrollHeight;

                document.getElementById(div.id).addEventListener("click", function (k) {
                    sigmaInstance.graph.edges().forEach(function (edge) {
                        sigmaInstance.renderers[0].dispatchEvent('outEdge', {edge: edge});
                    });

                    const srcElement = k.srcElement || k.target;

                    dijkstraCounter = srcElement.id;
                    actionPosition = srcElement.id * 2;
                    highlightElement(dijkstraCounter, '#6e0db6', 500);
                    forward();
                    showPlayButton();
                });

                $('.resize-drag').addClass('resize-drag-highlight');
                setTimeout(function () {
                    $('.resize-drag').removeClass('resize-drag-highlight');
                }, 1000);

                divIds.add(div.id);
            }
        }

        highlightElement(dijkstraCounter, '#6e0db6', freeFlow ? intervalTimeDijkstra ? intervalTimeDijkstra : 1750 : 500);
        sigmaInstance.renderers[0].dispatchEvent('overEdge', {edge: sigmaInstance.graph.edges(dijkstraEdgeStatesArray[dijkstraCounter].currentEdge.id)});
    }

    function displayConnectionInfo() {
        if (!nodeDiscoveryStatus.has(dijkstraNodeStateArray[dijkstraCounter].sourceNode)) {
            return "Step " + (dijkstraCounter + 1) + ") This will now go to Node " + sigmaInstance.graph.nodes(dijkstraNodeStateArray[dijkstraCounter].sourceNode).label
                + " as it is the shortest unvisited Node from starting Node (Node " + sigmaInstance.graph.nodes(sourceNodeId).label + ")"
                + "<br/> The weight from starting node is " + dijkstraEdgeStatesArray[dijkstraCounter].currentEdge.weight;
        } else {
            return "Step " + (dijkstraCounter + 1) + ") This will now go to Node " + sigmaInstance.graph.nodes(dijkstraNodeStateArray[dijkstraCounter].targetNode).label
                + " as it is the shortest unvisited Node from starting Node (Node " + sigmaInstance.graph.nodes(sourceNodeId).label + ")"
                + "<br/> The weight from starting node is " + dijkstraEdgeStatesArray[dijkstraCounter].currentEdge.weight;
        }
    }

    function play(intervalTime) {
        freeFlow = true;
        intervalTimeDijkstra = intervalTime ? intervalTime : 1750;
        task.resume(intervalTime);
    }

    function pause() {
        freeFlow = false;
        task.pause();
    }

    function restart() {
        $.iGrowl.prototype.dismissAll('all');

        if (dijkstraCounter > 2) {
            sigmaInstance.renderers[0].dispatchEvent('outEdge', {edge: sigmaInstance.graph.edges(dijkstraEdgeStatesArray[dijkstraCounter === path.length ? dijkstraCounter - 1 : dijkstraCounter].currentEdge.id)});
            dijkstraCounter = 0;
            actionPosition = 1;
            freeFlow = false;
            task.step();
        }
    }

    function rewind() {
        $.iGrowl.prototype.dismissAll('all');

        if (dijkstraCounter > 0) {
            sigmaInstance.renderers[0].dispatchEvent('outEdge', {edge: sigmaInstance.graph.edges(dijkstraEdgeStatesArray[dijkstraCounter === path.length ? dijkstraCounter - 1 : dijkstraCounter].currentEdge.id)});
            dijkstraCounter -= 1;
            actionPosition -= 1;
            freeFlow = false;
            task.step();
        }
    }

    function forward() {
        $.iGrowl.prototype.dismissAll('all');
        if (dijkstraCounter < path.length) {
            actionPosition++;
            freeFlow = false;
            task.step();

            if (dijkstraCounter === path.length) {
                $.iGrowl({
                    type: "growler-settings",
                    message: "End of Dijkstra's Algorithm!",
                    placement: {
                        x: 'center'
                    },
                });
            }
        }
    }

    function end() {
        $.iGrowl.prototype.dismissAll('all');
        if (dijkstraCounter < path.length) {
            sigmaInstance.renderers[0].dispatchEvent('outEdge', {edge: sigmaInstance.graph.edges(dijkstraEdgeStatesArray[dijkstraCounter].currentEdge.id)});
            while (actionPosition < action.length - 1) {
                forward();
            }
        }
    }

    executeDijkstraTeacher.restart = restart;
    executeDijkstraTeacher.pause = pause;
    executeDijkstraTeacher.play = play;
    executeDijkstraTeacher.rewind = rewind;
    executeDijkstraTeacher.forward = forward;
    executeDijkstraTeacher.end = end;

    function highlightElement(id, color, seconds) {
        const element = document.getElementById(id);
        const origcolor = element.style.backgroundColor;
        element.style.backgroundColor = color;
        setTimeout(function () {
            element.style.backgroundColor = origcolor;
        }, (seconds));
    }
}

