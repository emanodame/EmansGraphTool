function executePrimsTeacher(edgesOnGraph) {
    let maxCount = 0;
    let primsCounter = 0;
    const primsEdgeStates = [];

    let actionPosition = 0;
    const action = [];

    const divIds = new Set();

    edgesOnGraph.forEach(function (edge) {
        edge.color = edge.inSpanningTree ? "#6e0db6" : "#CDAD00";

        const edgeStates = {
            currentEdge: edge,
            edges: jQuery.extend(true, {}, sigmaInstance.graph.edges())
        };

        primsEdgeStates.push(edgeStates);
        action.push(textAction);
        action.push(graphAction);
    });

    clearColoredNodesAndEdges();

    if (task) {
        task.pause();
    }

    task = new Task(actionExecutor(), executionSpeed);
    let freeFlow = false;

    task.step();

    function graphAction() {
        Object.values(primsEdgeStates[primsCounter].edges).forEach(function (edge) {
            sigmaInstance.graph.edges(edge.id).color = edge.color;
        });

        sigmaInstance.graph.edges(primsEdgeStates[primsCounter].currentEdge.id).color = primsEdgeStates[primsCounter].currentEdge.color;
        sigmaInstance.renderers[0].dispatchEvent('outEdge', {edge: sigmaInstance.graph.edges(primsEdgeStates[primsCounter].currentEdge.id)});

        primsCounter++;
        sigmaInstance.refresh();

        if (!freeFlow) {
            task.pause();
        }
    }

    function textAction() {
        if (maxCount === actionPosition) {
            const div = document.createElement('div');
            div.id = primsCounter.toString();

            if (!divIds.has(div.id)) {
                div.insertAdjacentHTML("beforeend", displayConnectionInfo() + "<br/>" + "<br/>");
                document.getElementById("helper-text-container").appendChild(div);
                document.getElementById("helper-text-container").scrollTop = document.getElementById("helper-text-container").scrollHeight;

                document.getElementById(div.id).addEventListener("click", function (k) {
                    primsCounter = k.srcElement.id;
                    actionPosition = k.srcElement.id * 2;
                    highlightElement(primsCounter, '#6e0db6', 0.5);
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
        highlightElement(primsCounter, '#6e0db6', 0.5);
        sigmaInstance.renderers[0].dispatchEvent('overEdge', {edge: sigmaInstance.graph.edges(primsEdgeStates[primsCounter].currentEdge.id)});
    }

    function* actionExecutor() {
        sigmaInstance.graph.edges().forEach(function (edge) {
            sigmaInstance.renderers[0].dispatchEvent('outEdge', {edge: edge});
        });

        while (true) {
            if (primsCounter !== primsEdgeStates.length) {
                if (freeFlow) {
                    actionPosition++;
                }
                maxCount = actionPosition > maxCount ? actionPosition : maxCount;
                action[actionPosition]();
            } else {
                $.iGrowl.prototype.dismissAll('all');

                $.iGrowl({
                    type: "growler-settings",
                    message: "End of Prims's Algorithm!",
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

    function displayConnectionInfo() {
        if (primsEdgeStates[primsCounter].currentEdge.inSpanningTree) {
            return "Step " + (primsCounter + 1) + ") Pick the lowest weighted undiscovered Edge that does not form a cycle. " +
                "<br /> This will be Edge " +
                sigmaInstance.graph.nodes(primsEdgeStates[primsCounter].currentEdge.source).label + " - " +
                sigmaInstance.graph.nodes(primsEdgeStates[primsCounter].currentEdge.target).label +
                " this has weight " + primsEdgeStates[primsCounter].currentEdge.label +
                ". </br> This will get added to Minimum Spanning Tree"
        } else {
            return "Step " + (primsCounter + 1) + ") Picking the smallest edge: " +
                sigmaInstance.graph.nodes(primsEdgeStates[primsCounter].currentEdge.source).label + " - " +
                sigmaInstance.graph.nodes(primsEdgeStates[primsCounter].currentEdge.target).label +
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
        $.iGrowl.prototype.dismissAll('all');

        if (primsCounter > 2) {
            sigmaInstance.renderers[0].dispatchEvent('outEdge', {edge: sigmaInstance.graph.edges(primsEdgeStates[primsCounter === edgesOnGraph.length ? primsCounter - 1 : primsCounter].currentEdge.id)});
            primsCounter = 0;
            actionPosition = 1;
            maxCount = actionPosition;
            freeFlow = false;
            task.step();
        }
    }

    function rewind() {
        $.iGrowl.prototype.dismissAll('all');

        if (primsCounter > 0) {
            sigmaInstance.renderers[0].dispatchEvent('outEdge', {edge: sigmaInstance.graph.edges(primsEdgeStates[primsCounter === edgesOnGraph.length ? primsCounter - 1 : primsCounter].currentEdge.id)});
            primsCounter -= 1;
            actionPosition -= 1;
            freeFlow = false;
            task.step();
        }
    }

    function forward() {
        $.iGrowl.prototype.dismissAll('all');

        if (primsCounter < edgesOnGraph.length) {
            actionPosition++;
            freeFlow = false;
            task.step();

            if (primsCounter === edgesOnGraph.length) {
                $.iGrowl({
                    type: "growler-settings",
                    message: "End of Prim's Algorithm!",
                    placement: {
                        x: 'center'
                    },
                });
            }
        }
    }

    function end() {
        $.iGrowl.prototype.dismissAll('all');

        if (primsCounter < edgesOnGraph.length) {

            while (primsCounter < edgesOnGraph.length - 1) {
                primsCounter++;
                textAction();
            }

            actionPosition = action.length - 1;
            maxCount = actionPosition;
            freeFlow = false;
            task.step();

            sigmaInstance.graph.edges().forEach(function (edge) {
                sigmaInstance.renderers[0].dispatchEvent('outEdge', {edge: edge});
            });

            $.iGrowl({
                type: "growler-settings",
                message: "End of Kruskal's Algorithm!",
                placement: {
                    x: 'center'
                },
            });
        }
    }

    executePrimsTeacher.restart = restart;
    executePrimsTeacher.pause = pause;
    executePrimsTeacher.play = play;
    executePrimsTeacher.rewind = rewind;
    executePrimsTeacher.forward = forward;
    executePrimsTeacher.end = end;
}

function highlightElement(id, color, seconds) {
    const element = document.getElementById(id);
    const origcolor = element.style.backgroundColor;
    element.style.backgroundColor = color;
    const t = setTimeout(function () {
        element.style.backgroundColor = origcolor;
    }, (seconds * 1000));
}