(function () {

    sigma.classes.graph.addMethod('prims', function (startNodeId) {
        const nodesOnGraph = s.graph.nodes();
        const visitedNodes = new Array(startNodeId);

        const highestEdgeWeight = getHighestEdgeWeight();

        let lowestEdgeWeight = highestEdgeWeight;
        let lowestNode;

        while (nodesOnGraph.length !== visitedNodes.length) {
            visitedNodes.forEach(function (visitedNode) {
                let visitedNodeNeighbours = Object.values(this.allNeighborsIndex[visitedNode]);

                visitedNodeNeighbours.forEach(function (neighbour) {
                    let connectedEdges = Object.values(neighbour)[0];
                    const edgeWeight = connectedEdges.label;

                    if (parseFloat(edgeWeight) <= parseFloat(lowestEdgeWeight)) {
                        if (!checkIfVisited(connectedEdges.target)) {
                            lowestEdgeWeight = edgeWeight;
                            lowestNode = connectedEdges.target;
                        }
                    }
                });
            }, this);

            visitedNodes.push(lowestNode);
            lowestEdgeWeight = highestEdgeWeight;
        }

        return visitedNodes;

        function checkIfVisited(nodeId) {
            return $.inArray(nodeId, visitedNodes) > -1;
        }

        function getHighestEdgeWeight() {
            const edgeWeights = [];
            s.graph.edges().forEach(function (edge) {
                edgeWeights.push(parseFloat(edge.label));
            });

            return Math.max.apply(Math, edgeWeights);
        }
    });
}).call(window);