$(document).ready(function () {
    const sigmaCamera = s.camera;

    const nodesCreated = [];
    const edgesCreated = [];

    const nodesSelected = [];

    s.bind('clickStage', function (e) {

        if (!e.shiftKey && !e.data.captor.isDragging && s.settings('mouseEnabled')) {
            noNodeFlag = false;

            const positionWithCamera = sigmaCamera.cameraPosition(e.data.captor.x, e.data.captor.y);

            const node = {
                id: createNodeIdFromCoordinates(positionWithCamera.x, positionWithCamera.y),
                x: positionWithCamera.x,
                y: positionWithCamera.y,
                size: 10,
            };

            if (!assertNoDuplicateNodePosition(node)) {
                node.label = (++s.graph.nodes().length).toString();
                nodesCreated.push(node);
                s.graph.addNode(node);
                s.refresh();
            }
        }
    });

    s.bind("clickNode", function (e) {

        if (e.data.captor.shiftKey) {
            selectOrUnselectNode(e.data.node);

            if (nodesSelected.length === 2) {
                connectNodesViaEdges();
            }
        }
    });

    s.bind("rightClickNode", function (e) {
        s.graph.dropNode(e.data.node.id);
        s.refresh();
    });

    s.bind("rightClickEdge", function (e) {
        const edge = e.data.edge;
        s.graph.dropEdge(edge.id);

        removeEdgeIdAndInverseEdgeInArray(edge.source, edge.target);
        s.refresh();
    });

    function selectOrUnselectNode(node) {
        const isNodeAlreadySelected = nodesSelected.includes(node);

        if (isNodeAlreadySelected) {
            s.graph.nodes(node.id).color = "#ff0e58";
            nodesSelected.splice(nodesSelected.indexOf(node), 1);

        } else {
            s.graph.nodes(node.id).color = "#4f5b66";
            nodesSelected.push(node);
        }
        s.refresh();
    }

    function connectNodesViaEdges() {
        const sourceNodeId = nodesSelected[0].id;
        const targetNodeId = nodesSelected[1].id;

        if (edgesCreated.includes(createEdgeIdFromCoordinates(sourceNodeId, targetNodeId))) {
            resetAllNodesColourAndRefresh();
            nodesSelected.length = 0;
            throw "Already an edge between " + sourceNodeId + " and " + targetNodeId;

        } else {
            s.graph.addEdge({
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
        s.graph.nodes().forEach(function (node) {
            node.color = "#ff0e58";
        });
        s.refresh();
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
        return s.graph.nodes().filter(function (inspectedNode) {
            return inspectedNode.id === createNodeIdFromCoordinates(node.x, node.y)
        }).shift();
    }

    dragListener.bind('drag', function (event) {
        const edgesConnectedToNode = s.graph.edges().filter(function (edge) {
            return event.data.node.id === edge.source || event.data.node.id === edge.target;
        });

        edgesConnectedToNode.forEach(function (edge) {
            edge.label = computePathLength(s.graph.nodes(edge.source), s.graph.nodes(edge.target));
            s.refresh();
        });
    });
});