(function () {

    const NO_PREVIOUS_NODE = null;

    const nodesInEvaluation = [];
    const nodesEvaluated = [];

    sigma.classes.graph.addMethod('dijkstra', function (sourceNodeId, destNodeId) {
        const sourceNode = this.nodes(sourceNodeId);
        const destNode = this.nodes(destNodeId);

        addNodeToEvaluationList(sourceNode, NO_PREVIOUS_NODE, 0);

        let completePath = findNeighbours(destNode, this.allNeighborsIndex, this.nodes);

        return completePath === undefined ? "Cannot find path" : completePath;
    });

    function addNodeToEvaluationList(evaluatedNode, previousNode, pathLength) {
        const nodeId = evaluatedNode.id;

        const newNode = {
            nodeId: nodeId,
            node: evaluatedNode,
            pathLength: pathLength,
            previousNode: previousNode
        };

        if (nodesEvaluated[nodeId] === undefined || nodesEvaluated[nodeId].pathLength > pathLength) {
            nodesEvaluated[nodeId] = newNode;

            nodesInEvaluation.splice(nodesInEvaluation.length, 0, newNode);
        }
    }

    function findNeighbours(destNode, allNeighbors, nodes) {

        while (nodesInEvaluation.length > 0) {
            const inspectedNode = nodesInEvaluation.shift();

            if (inspectedNode.nodeId === destNode.id) {
                return calculatePath(destNode);
            }

            const neighbors = Object.keys(allNeighbors[inspectedNode.nodeId]);
            for (let i = 0; i < neighbors.length; i++) {
                const neighbor = nodes(neighbors[i]);
                const pathLength = computePathLength(inspectedNode.node, neighbor, inspectedNode.pathLength);
                addNodeToEvaluationList(neighbor, inspectedNode.node, pathLength);
            }
        }
    }

    function computePathLength(node1, node2, previousPathLength) {
        let isEverythingDefined =
            node1 !== undefined &&
            node2 !== undefined &&
            node1.x !== undefined &&
            node1.y !== undefined &&
            node2.x !== undefined &&
            node2.y !== undefined;

        if (!isEverythingDefined) {
            return undefined;
        }

        return (previousPathLength || 0) + Math.sqrt(
                Math.pow((node2.y - node1.y), 2) + Math.pow((node2.x - node1.x), 2)
            );
    }

    function calculatePath(destNode) {

        let path = [];
        let currentNode = destNode;

        while (currentNode) {
            path.unshift(currentNode);
            currentNode = nodesEvaluated[currentNode.id].previousNode;
        }
        return path;
    }

}).call(window);