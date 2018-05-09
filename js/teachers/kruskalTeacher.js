function executeKruskalTeacher(idsOfMinSpanningTreeEdges) {
    let maxCount = 0;
    let kruskalCounter = 0;
    const kruskalEdgeStatesArray = [];
    const sortedEdgesOnGraph = returnSortedEdgesByWeight();

    let actionPosition = 0;
    const action = [];

    const divIds = new Set();

    sortedEdgesOnGraph.forEach(function (edge) {
        edge.color = isEdgeInSpanningTree(edge.id) ? "#6e0db6" : "#CDAD00";

        const edgeStates = {
            currentEdge: edge,
            isEdgeInSpanningTree: isEdgeInSpanningTree(edge.id),
            edges: jQuery.extend(true, {}, sigmaInstance.graph.edges())
        };

        kruskalEdgeStatesArray.push(edgeStates);
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
        Object.values(kruskalEdgeStatesArray[kruskalCounter].edges).forEach(function (edge) {
            sigmaInstance.graph.edges(edge.id).color = edge.color;
        });

        sigmaInstance.graph.edges(kruskalEdgeStatesArray[kruskalCounter].currentEdge.id).color = kruskalEdgeStatesArray[kruskalCounter].currentEdge.color;
        sigmaInstance.renderers[0].dispatchEvent('outEdge', {edge: sigmaInstance.graph.edges(kruskalEdgeStatesArray[kruskalCounter].currentEdge.id)});

        kruskalCounter++;
        sigmaInstance.refresh();

        if (!freeFlow) {
            task.pause();
        }
    }

    function textAction() {
        if (maxCount === actionPosition) {
            const div = document.createElement('div');
            div.id = kruskalCounter.toString();

            if (!divIds.has(div.id)) {
                div.insertAdjacentHTML("beforeend", " <br />" + displayConnectionInfo());
                document.getElementById("helper-text-container").appendChild(div);
                document.getElementById("helper-text-container").scrollTop = document.getElementById("helper-text-container").scrollHeight;

                document.getElementById(div.id).addEventListener("click", function (k) {
                    kruskalCounter = k.srcElement.id;
                    actionPosition = k.srcElement.id * 2;
                    highlightElement(kruskalCounter, '#6e0db6', 0.5);
                    task.step();
                });

                $('.resize-drag').addClass('resize-drag-highlight');
                setTimeout(function () {
                    $('.resize-drag').removeClass('resize-drag-highlight');
                }, 1000);

                divIds.add(div.id);
            }
        }
        highlightElement(kruskalCounter, '#6e0db6', 0.5);
        sigmaInstance.renderers[0].dispatchEvent('overEdge', {edge: sigmaInstance.graph.edges(kruskalEdgeStatesArray[kruskalCounter].currentEdge.id)})
    }

    function* actionExecutor() {
        while (true) {
            if (kruskalCounter !== kruskalEdgeStatesArray.length) {
                if (freeFlow) {
                    actionPosition++;
                }
                maxCount = actionPosition > maxCount ? actionPosition : maxCount;
                action[actionPosition]();
            } else {
                $.iGrowl.prototype.dismissAll('all');

                $.iGrowl({
                    type: "growler-settings",
                    message: "End of Kruskal's Algorithm!",
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
        if (kruskalEdgeStatesArray[kruskalCounter].isEdgeInSpanningTree) {
            return "Step " + (kruskalCounter + 1) + ") Pick the lowest weighted undiscovered Edge that does not form a cycle. " +
                "<br /> This will be Edge " +
                sigmaInstance.graph.nodes(kruskalEdgeStatesArray[kruskalCounter].currentEdge.source).label + " - " +
                sigmaInstance.graph.nodes(kruskalEdgeStatesArray[kruskalCounter].currentEdge.target).label +
                " with the weight of " + kruskalEdgeStatesArray[kruskalCounter].currentEdge.label +
                ".  <br /> This will get added to Minimum Spanning Tree."
        } else {
            return "Step " + (kruskalCounter + 1) + ") Pick the lowest weighted undiscovered edge: " +
                sigmaInstance.graph.nodes(kruskalEdgeStatesArray[kruskalCounter].currentEdge.source).label + " - " +
                sigmaInstance.graph.nodes(kruskalEdgeStatesArray[kruskalCounter].currentEdge.target).label +
                " this has weight " + kruskalEdgeStatesArray[kruskalCounter].currentEdge.label +
                ".  <br /> This will not get added to Minimum Spanning Tree as a cycle is formed."

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

        if (kruskalCounter > 2) {
            sigmaInstance.renderers[0].dispatchEvent('outEdge', {edge: sigmaInstance.graph.edges(kruskalEdgeStatesArray[kruskalCounter === sortedEdgesOnGraph.length ? kruskalCounter - 1 : kruskalCounter].currentEdge.id)});
            kruskalCounter = 0;
            actionPosition = 1;
            maxCount = actionPosition;
            freeFlow = false;
            task.step();
        }
    }

    function rewind() {
        $.iGrowl.prototype.dismissAll('all');

        if (kruskalCounter > 0) {
            sigmaInstance.renderers[0].dispatchEvent('outEdge', {edge: sigmaInstance.graph.edges(kruskalEdgeStatesArray[kruskalCounter === sortedEdgesOnGraph.length ? kruskalCounter - 1 : kruskalCounter].currentEdge.id)});
            kruskalCounter -= 1;
            actionPosition -= 1;
            freeFlow = false;
            task.step();
        }
    }

    function forward() {
        $.iGrowl.prototype.dismissAll('all');

        if (kruskalCounter < sortedEdgesOnGraph.length) {
            actionPosition++;
            freeFlow = false;
            task.step();

            if (kruskalCounter === sortedEdgesOnGraph.length) {
                $.iGrowl({
                    type: "growler-settings",
                    message: "End of Kruskal's Algorithm!",
                    placement: {
                        x: 'center'
                    },
                });
            }
        }
    }

    function end() {
        $.iGrowl.prototype.dismissAll('all');

        if (kruskalCounter < sortedEdgesOnGraph.length) {

            while (kruskalCounter < sortedEdgesOnGraph.length - 1) {
                kruskalCounter++;
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

function highlightElement(id, color, seconds) {
    const element = document.getElementById(id);
    const origcolor = element.style.backgroundColor;
    element.style.backgroundColor = color;
    const t = setTimeout(function () {
        element.style.backgroundColor = origcolor;
    }, (seconds * 1000));
}
