function openRandomGraphInput() {
    showOverlay();
    document.getElementById("random-graph-input").style.visibility = "visible";
    document.getElementById("json-import").style.visibility = "hidden";
    document.getElementById("json-export").style.visibility = "hidden";
}

function closeRandomGraphInput() {
    removeOverlay();
    document.getElementById("random-graph-input").style.visibility = "hidden";
}

function createRandomGraphKeyPress(event) {
    if (event.keyCode === 13) {
        createRandomGraph(event);
    }
}

function createRandomGraph() {
    const quantityOfNodes = $("#number-text-input").val();

    if (quantityOfNodes < 2 || quantityOfNodes > 101 || isNaN(quantityOfNodes)) {
        $.iGrowl.prototype.dismissAll('all');
        $.iGrowl({
            type: "growler-settings",
            message: "Please enter a number between 2-100 (inclusive)",
            placement: {
                x: 'center'
            },
        });

    } else {
        removeOverlay();
        closeRandomGraphInput();
        clearGraph();

        let labelId = 0;

        const nodeIdSet = new Set();

        for (let i = 0; i < quantityOfNodes; i++) {

            let randomGeneratedX = Math.floor(Math.random() * 10) + 1;
            randomGeneratedX *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;

            let randomGeneratedY = Math.floor(Math.random() * 10) + 1;
            randomGeneratedY *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;

            const centeredCameraSettings = {
              x: 0,
              y: 0,
              ratio: 1
            };

            sigmaInstance.camera.goTo(centeredCameraSettings);

            const nodeId = createNodeIdFromCoordinates(randomGeneratedX, randomGeneratedY);

            if (!nodeIdSet.has(nodeId)) {
                sigmaInstance.graph.addNode({
                    id: createNodeIdFromCoordinates(randomGeneratedX, randomGeneratedY),
                    x: randomGeneratedX * 50,
                    y: randomGeneratedY * 50,
                    label: (labelId++).toString(),
                    size: 10
                });

                nodeIdSet.add(nodeId);
            }
        }

        const nodesOnGraph = sigmaInstance.graph.nodes();

        const edgeIdSet = new Set();

        for (let node of nodesOnGraph) {
            const pickRandomNodeToConnect = Math.floor(Math.random() * nodesOnGraph.length);

            const sourceNode = node;
            let targetNode = nodesOnGraph[pickRandomNodeToConnect];

            while (sourceNode === targetNode) {
                targetNode = nodesOnGraph[Math.floor(Math.random() * nodesOnGraph.length)];
            }

            const edgeId = createEdgeIdFromCoordinates(sourceNode.id, targetNode.id);
            const oppositeEdgeId = createEdgeIdFromCoordinates(targetNode.id, sourceNode.id);
            const edgeLabel = (computePathLength(sourceNode, targetNode) / 10).toFixed(2);

            if (!edgeIdSet.has(edgeId)) {
                sigmaInstance.graph.addEdge({
                    id: edgeId,
                    source: sourceNode.id,
                    target: targetNode.id,
                    defaultEdgeLabelSize: 20,
                    size: 3,
                    label: edgeLabel.toString()
                });

                edgeIdSet.add(edgeId);
                edgeIdSet.add(oppositeEdgeId);
            }
        }
        sigmaInstance.refresh();
    }
}

function clearGraph() {
    sigmaInstance.graph.clear();
    sigmaInstance.refresh();
}