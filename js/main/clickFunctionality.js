$(document).ready(function () {
    const sigmaCamera = sigmaInstance.camera;

    const nodesCreated = [];
    const edgesCreated = [];

    const nodesSelected = [];

    sigmaInstance.bind('clickStage', function (e) {

        if (!e.shiftKey && !e.data.captor.isDragging && sigmaInstance.settings('mouseEnabled')) {
            const positionWithCamera = sigmaCamera.cameraPosition(e.data.captor.x, e.data.captor.y);

            const node = {
                id: createNodeIdFromCoordinates(positionWithCamera.x, positionWithCamera.y),
                x: positionWithCamera.x,
                y: positionWithCamera.y,
                size: 10
            };

            if (!assertNoDuplicateNodePosition(node)) {
                node.label = (++sigmaInstance.graph.nodes().length).toString();
                nodesCreated.push(node);
                sigmaInstance.graph.addNode(node);
                sigmaInstance.refresh();
            }
        }
    });

    sigmaInstance.bind("clickNode", function (e) {

        if (e.data.captor.shiftKey) {
            selectOrUnselectNode(e.data.node);

            if (nodesSelected.length === 2) {
                connectNodesViaEdges();
            }
        }
    });

    sigmaInstance.bind("rightClickNode", function (node) {
        sigmaInstance.graph.dropNode(node.data.node.id);
        sigmaInstance.refresh();


        if (sigmaInstance.graph.nodes().length > 0) {
            for (let i = 0; i < sigmaInstance.graph.nodes().length; i++) {
                sigmaInstance.graph.nodes()[i].label =  (i + 1).toString();
            }
        }


        sigmaInstance.refresh();

    });

    sigmaInstance.bind("rightClickEdge", function (e) {
        const edge = e.data.edge;
        sigmaInstance.graph.dropEdge(edge.id);

        removeEdgeIdAndInverseEdgeInArray(edge.source, edge.target);
        sigmaInstance.refresh();
    });

    function selectOrUnselectNode(node) {
        const isNodeAlreadySelected = nodesSelected.includes(node);

        if (isNodeAlreadySelected) {
            sigmaInstance.graph.nodes(node.id).color = "#ff0e58";
            nodesSelected.splice(nodesSelected.indexOf(node), 1);

        } else {
            sigmaInstance.graph.nodes(node.id).color = "#4f5b66";
            nodesSelected.push(node);
        }
        sigmaInstance.refresh();
    }

    dragListener.bind('drag', function (event) {
        const edgesConnectedToNode = sigmaInstance.graph.edges().filter(function (edge) {
            return event.data.node.id === edge.source || event.data.node.id === edge.target;
        });

        edgesConnectedToNode.forEach(function (edge) {
            edge.label = computePathLength(sigmaInstance.graph.nodes(edge.source), sigmaInstance.graph.nodes(edge.target));
            sigmaInstance.refresh();
        });
    });

    function connectNodesViaEdges() {
        const sourceNodeId = nodesSelected[0].id;
        const targetNodeId = nodesSelected[1].id;

        if (edgesCreated.includes(createEdgeIdFromCoordinates(sourceNodeId, targetNodeId))) {
            $.iGrowl.prototype.dismissAll('all');

            $.iGrowl({
                type: "growler-settings",
                message: "An edge already exists between these two nodes1",
                placement: {
                    x: 'center'
                },
            });

            resetAllNodesColourAndRefresh();
            nodesSelected.length = 0;

        } else {
            sigmaInstance.graph.addEdge({
                id: createEdgeIdFromCoordinates(sourceNodeId, targetNodeId),
                source: sourceNodeId,
                target: targetNodeId,
                defaultEdgeLabelSize: 20,
                size: 3,
                label: computePathLength(nodesSelected[0], nodesSelected[1]).toString()
            });

            addEdgeIdAndInverseEdgeIdToArray(sourceNodeId, targetNodeId);
            resetAllNodesColourAndRefresh();
            nodesSelected.length = 0;
        }
    }

    function resetAllNodesColourAndRefresh() {
        sigmaInstance.graph.nodes().forEach(function (node) {
            node.color = "#ff0e58";
        });
        sigmaInstance.refresh();
    }

    function addEdgeIdAndInverseEdgeIdToArray(sourceNodeId, targetNodeId) {
        edgesCreated.push(createEdgeIdFromCoordinates(sourceNodeId, targetNodeId));
        edgesCreated.push(createEdgeIdFromCoordinates(targetNodeId, sourceNodeId));
    }

    function removeEdgeIdAndInverseEdgeInArray(sourceNodeId, targetNodeId) {
        edgesCreated.splice(edgesCreated.indexOf(createEdgeIdFromCoordinates(sourceNodeId, targetNodeId)), 1);
        edgesCreated.splice(edgesCreated.indexOf(createEdgeIdFromCoordinates(targetNodeId, sourceNodeId)), 1);
    }

    function createNodeIdFromCoordinates(x, y) {
        return x + "." + y;
    }

    function createEdgeIdFromCoordinates(x, y) {
        return x + "|" + y;
    }

    function computePathLength(node1, node2) {
        return (Math.sqrt(Math.pow((node2.y - node1.y), 2) + Math.pow((node2.x - node1.x), 2)) / 100).toFixed(2);
    }

    function assertNoDuplicateNodePosition(node) {
        return sigmaInstance.graph.nodes().filter(function (inspectedNode) {
            return inspectedNode.id === createNodeIdFromCoordinates(node.x, node.y)
        }).shift();
    }
});