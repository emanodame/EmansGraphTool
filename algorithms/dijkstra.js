(function () {

    sigma.classes.graph.addMethod('dijkstra', function (sourceNodeId, targetNodeId) {

        const NO_PREVIOUS_NODE = null;

        const nodesInEvaluation = [];
        const nodesEvaluated = [];

        const sourceNode = this.nodes(sourceNodeId);
        const targetNode = this.nodes(targetNodeId);

        addNodeToEvaluationList(sourceNode, NO_PREVIOUS_NODE, 0);

        return findNeighbours(targetNode, this.allNeighborsIndex, this.nodes);

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

        function findNeighbours(targetNode, allNeighbors, nodes) {

            while (nodesInEvaluation.length > 0) {
                const inspectedNode = nodesInEvaluation.shift();

                if (inspectedNode.nodeId === targetNode.id) {
                    return calculatePath(targetNode);
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

        function calculatePath(targetNode) {

            let path = [];
            let currentNode = targetNode;

            while (currentNode) {
                path.unshift(currentNode);
                currentNode = nodesEvaluated[currentNode.id].previousNode;
            }
            return path;
        }

    });
}).call(window);