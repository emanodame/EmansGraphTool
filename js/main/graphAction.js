function openRandomGraphInput() {
    showOverlay();
    document.getElementById("random-graph-input").style.visibility = "visible";
}

function closeRandomGraphInput() {
    removeOverlay();
    document.getElementById("random-graph-input").style.visibility = "hidden";
}

function createRandomGraph() {
    event.preventDefault();

    const quantityOfNodes = $("#number-text-input").val();

    if (quantityOfNodes < 2 || quantityOfNodes > 101) {
        $.iGrowl({
            type: "growler-settings",
            message: "Please enter a number between 2-10 (inclusive)",
            placement: {
                x: 'center'
            },
        });

    } else {
        removeOverlay();
        closeRandomGraphInput();
        clearGraph();

        noNodeFlag = false;
        let labelId = 0;

        const nodeIdSet = new Set();

        for (let i = 0; i < quantityOfNodes; i++) {

            let randomGeneratedX = Math.floor(Math.random() * 5) + 1;
            randomGeneratedX *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;

            let randomGeneratedY = Math.floor(Math.random() * 5) + 1;
            randomGeneratedY *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;


            const nodeId = createNodeIdFromCoordinates(randomGeneratedX, randomGeneratedY);

            if (!nodeIdSet.has(nodeId)) {
                s.graph.addNode({
                    id: createNodeIdFromCoordinates(randomGeneratedX, randomGeneratedY),
                    x: randomGeneratedX * 100,
                    y: randomGeneratedY * 100,
                    label: (labelId++).toString(),
                    size: 10
                });

                nodeIdSet.add(nodeId);
            }
        }

        const nodesOnGraph = s.graph.nodes();

        const edgeIdSet = new Set();

        for (let node of nodesOnGraph) {
            const pickRandomNodeToConnect = Math.floor(Math.random() * nodesOnGraph.length);

            const sourceNode = node;
            let targetNode = nodesOnGraph[pickRandomNodeToConnect];

            while (sourceNode === targetNode) {
                targetNode = nodesOnGraph[Math.floor(Math.random() * nodesOnGraph.length)];
            }

            const edgeId = createEdgeIdFromCoordinates(sourceNode.id, targetNode.id);

            if (!edgeIdSet.has(edgeId)) {
                s.graph.addEdge({
                    id: edgeId,
                    source: sourceNode.id,
                    target: targetNode.id,
                    defaultEdgeLabelSize: 20,
                    size: 3,
                    label: computePathLength(sourceNode, targetNode).toString()
                });

                edgeIdSet.add(edgeId);
            }
        }
        s.refresh();
    }
}

function clearGraph() {
    noNodeFlag = false;
    s.graph.clear();
    localStorage.clear();
    s.refresh();
}