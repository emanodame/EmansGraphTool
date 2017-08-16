(function () {

    sigma.classes.graph.addMethod('kruskal', function () {
        const sortedEdgesInGraph = returnSortedEdgesByWeight();

        const spanningTreesArray = [];

        const edgesInMinSpanningTree = new Set();
        const nodesInSpanningTrees = new Set();

        initializeFirstTreeWithFirstEdge();

        for (let sortedEdgeIndex = 1; sortedEdgeIndex < sortedEdgesInGraph.length; sortedEdgeIndex++) {
            const sourceNodeId = sortedEdgesInGraph[sortedEdgeIndex].source;
            const targetNodeId = sortedEdgesInGraph[sortedEdgeIndex].target;

            if (!nodesInSpanningTrees.has(sourceNodeId) &&
                !nodesInSpanningTrees.has(targetNodeId)) {
                addEdgeToNewSpanningTree(sortedEdgesInGraph[sortedEdgeIndex]);
                continue;
            }

            for (let spanningTree of spanningTreesArray) {

                if (spanningTree.contains(sourceNodeId) && spanningTree.contains(targetNodeId)) {
                    break;
                }

                if (spanningTree.contains(sourceNodeId)) {

                    if (nodesInSpanningTrees.has(targetNodeId)) {
                        const spanningTreeWithTargetNode = returnSpanningTreeWithNodeId(targetNodeId);

                        spanningTreeWithTargetNode.traverseBFS(function (node) {
                            spanningTree.add(node.data, sourceNodeId)
                        });

                        edgesInMinSpanningTree.add(sourceNodeId + "|" + targetNodeId);
                        spanningTreesArray.splice(spanningTreesArray.indexOf(spanningTreeWithTargetNode), 1);
                        break;

                    } else {
                        addEdgeToMinSpanningTreeAndVisitedNodes(sortedEdgesInGraph[sortedEdgeIndex]);
                        spanningTree.add(targetNodeId, sourceNodeId);
                    }
                    break;

                } else if (spanningTree.contains(targetNodeId)) {

                    if (nodesInSpanningTrees.has(sourceNodeId)) {
                        const spanningTreeWithSourceNode = returnSpanningTreeWithNodeId(sourceNodeId);

                        spanningTreeWithSourceNode.traverseBFS(function (node) {
                            spanningTree.add(node.data, targetNodeId)
                        });

                        edgesInMinSpanningTree.add(sourceNodeId + "|" + targetNodeId);
                        spanningTreesArray.splice(spanningTreesArray.indexOf(spanningTreeWithSourceNode), 1);
                        break;

                    } else {
                        addEdgeToMinSpanningTreeAndVisitedNodes(sortedEdgesInGraph[sortedEdgeIndex]);
                        spanningTree.add(sourceNodeId, targetNodeId);
                    }
                    break;
                }
            }
        }

        return Array.from(edgesInMinSpanningTree);

        function initializeFirstTreeWithFirstEdge() {
            const tree = new Tree();

            tree.add(sortedEdgesInGraph[0].source);
            tree.add(sortedEdgesInGraph[0].target, sortedEdgesInGraph[0].source);

            nodesInSpanningTrees.add(sortedEdgesInGraph[0].source);
            nodesInSpanningTrees.add(sortedEdgesInGraph[0].target);

            spanningTreesArray.push(tree);
            edgesInMinSpanningTree.add(sortedEdgesInGraph[0].source + "|" + sortedEdgesInGraph[0].target);
        }

        function returnSortedEdgesByWeight() {
            return s.graph.edges().sort(function (a, b) {
                return a.label - b.label;
            });
        }

        function returnSpanningTreeWithNodeId(edge) {
            for (let spanningTree of spanningTreesArray) {
                if (spanningTree.contains(edge)) {
                    return spanningTree;
                }
            }
        }

        function addEdgeToMinSpanningTreeAndVisitedNodes(sortedEdges) {
            edgesInMinSpanningTree.add(sortedEdges.source + "|" + sortedEdges.target);

            nodesInSpanningTrees.add(sortedEdges.source);
            nodesInSpanningTrees.add(sortedEdges.target);
        }

        function addEdgeToNewSpanningTree(edge) {
            const tree = new Tree();

            tree.add(edge.source);
            tree.add(edge.target, edge.source);

            nodesInSpanningTrees.add(edge.source);
            nodesInSpanningTrees.add(edge.target);

            spanningTreesArray.push(tree);
            edgesInMinSpanningTree.add(edge.source + "|" + edge.target);
        }
    });
}).call(window);