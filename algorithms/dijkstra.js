(function () {

    sigma.classes.graph.addMethod('dijkstra', function (startNodeId) {

        const edgeMap = [];
        const visitedEdges = [];

        const path = [];

        const startNodeNeighbours = getNeighboursConnectedToNode(startNodeId, this);
        addToNodeAndEdgeMap(undefined, startNodeNeighbours);

        let lowestEdge = sortAndReturnLowestEdge();

        while (lowestEdge) {
            const neighboursOfTargetNode = getNeighboursConnectedToEdge(lowestEdge, this);
            addToNodeAndEdgeMap(lowestEdge, neighboursOfTargetNode);
            path.push(lowestEdge);
            lowestEdge = sortAndReturnLowestEdge();
        }

        return path;

        function sortAndReturnLowestEdge() {
            const sortedEdges = edgeMap.sort(function (a, b) {
                return parseFloat(a.weight) - parseFloat(b.weight);
            });

            return sortedEdges.shift();
        }

        function getNeighboursConnectedToNode(node, outerThis) {
            return Object.values(outerThis.allNeighborsIndex[node]);
        }

        function getNeighboursConnectedToEdge(edge, outerThis) {
            return Object.values(outerThis.allNeighborsIndex[edge.source])
                .concat(Object.values(outerThis.allNeighborsIndex[edge.target]));
        }

        function addToNodeAndEdgeMap(prevEdge, neighbours) {

            neighbours.forEach(function (neighbour) {
                const edge = Object.values(neighbour)[0];

                if (!visitedEdges.includes(edge)) {
                    edge.prevEdge = parseFloat(prevEdge !== undefined ? parseFloat(prevEdge.weight) : 0);
                    edge.weight = (edge.prevEdge) + parseFloat(edge.label);
                    edgeMap.push(edge);
                    visitedEdges.push(edge);
                }
            });
        }
    });
}).call(window);