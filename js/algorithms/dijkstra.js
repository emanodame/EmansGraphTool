(function () {
    sigma.classes.graph.addMethod('dijkstra', function (startNodeId) {

        const discoveredEdges = [];
        const visitedEdges = [];
        const visitedNodes = new Set();

        const path = [];

        const startNodeNeighbours = Object.values(this.allNeighborsIndex[startNodeId]);
        discoverNeighbourEdges(undefined, startNodeNeighbours);

        let lowestEdge = sortAndReturnLowestEdge();

        while (lowestEdge) {
            const neighboursOfTargetNode = getNeighboursConnectedToEdge(lowestEdge, this);

            if (visitedNodes.has(lowestEdge.source) && visitedNodes.has(lowestEdge.target)) {

            } else {
                visitedNodes.add(lowestEdge.source);
                visitedNodes.add(lowestEdge.target);
                path.push(lowestEdge);
            }

            discoverNeighbourEdges(lowestEdge, neighboursOfTargetNode);
            lowestEdge = sortAndReturnLowestEdge();
        }

        return path;

        function sortAndReturnLowestEdge() {
            const sortedEdges = discoveredEdges.sort(function (a, b) {
                return parseFloat(a.weight) - parseFloat(b.weight);
            });

            return sortedEdges.shift();
        }

        function getNeighboursConnectedToEdge(edge, outerThis) {
            return Object.values(outerThis.allNeighborsIndex[edge.source])
                .concat(Object.values(outerThis.allNeighborsIndex[edge.target]));
        }

        function discoverNeighbourEdges(prevEdge, neighbours) {
            neighbours.forEach(function (neighbour) {
                const edge = Object.values(neighbour)[0];

                if (!visitedEdges.includes(edge)) {
                    edge.prevEdge = parseFloat(prevEdge !== undefined ? parseFloat(prevEdge.weight) : 0);
                    edge.weight = (edge.prevEdge) + parseFloat(edge.label);
                    discoveredEdges.push(edge);
                    visitedEdges.push(edge);
                }
            });
        }
    });
}).call(window);