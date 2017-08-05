(function () {

    sigma.classes.graph.addMethod('prims', function (startNodeId) {
        const minSpanningTree = [];

        const visitedNodes = [startNodeId];
        const discoveredEdges = [];

        while (true) {
            const lowestEdges = [];

            for (let visitedNode of visitedNodes) {
                const lowestUndiscoveredEdge = getLowestUndiscoveredEdgeInNeighbouringNodes(this.allNeighborsIndex[visitedNode]);
                if (lowestUndiscoveredEdge !== null) {
                    lowestEdges.push(lowestUndiscoveredEdge);
                }
            }

            if (lowestEdges.length === 0) {
                break;
            }

            const lowestEdge = lowestEdges.reduce((prev, current) => parseFloat(current.label) < parseFloat(prev.label) ? current : prev);

            if (!checkIfNodeAlreadyVisited(lowestEdge.source, lowestEdge.target)) {
                minSpanningTree.push(lowestEdge);
                visitedNodes.push(lowestEdge.source);
                visitedNodes.push(lowestEdge.target);
            }

            discoveredEdges.push(lowestEdge);
        }

        return minSpanningTree;

        function getLowestUndiscoveredEdgeInNeighbouringNodes(neighbouringNodes) {
            const nodeNeighbours = Object.values(neighbouringNodes);

            const undiscoveredEdges = [];

            nodeNeighbours.forEach(function (edgeNeighbour) {
                const edge = Object.values(edgeNeighbour)[0];

                if (!checkIfEdgeAlreadyDiscovered(edge)) {
                    undiscoveredEdges.push(edge);
                }
            });

            return undiscoveredEdges.length > 0 ?
                undiscoveredEdges.reduce((prev, current) => parseFloat(current.label) < parseFloat(prev.label) ? current : prev) : null;
        }

        function checkIfNodeAlreadyVisited(node1, node2) {
            return $.inArray(node1, visitedNodes) !== -1 && $.inArray(node2, visitedNodes) !== -1;
        }

        function checkIfEdgeAlreadyDiscovered(edgeId) {
            return $.inArray(edgeId, discoveredEdges) !== -1;
        }
    });
}).call(window);