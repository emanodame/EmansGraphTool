(function () {

    sigma.classes.graph.addMethod('kruskal', function () {
        const sortedEdgesInGraph = returnSortedEdgesByWeight();

        const spanningTreesArray = [];

        const edgesInMinSpanningTree = new Set();
        const nodesInTrees = new Set();

        initializeFirstTreeWithFirstEdge();

        for (let sortedEdgeIndex = 1; sortedEdgeIndex < sortedEdgesInGraph.length; sortedEdgeIndex++) {

            if (!nodesInTrees.has(sortedEdgesInGraph[sortedEdgeIndex].source) &&
                !nodesInTrees.has(sortedEdgesInGraph[sortedEdgeIndex].target)) {
                addEdgeToNewSpanningTree(sortedEdgesInGraph[sortedEdgeIndex]);
                continue;
            }

            for (let spanningTree of spanningTreesArray) {

                if (spanningTree.contains(sortedEdgesInGraph[sortedEdgeIndex].source) &&
                    spanningTree.contains(sortedEdgesInGraph[sortedEdgeIndex].target)) {
                    break;
                }

                if (spanningTree.contains(sortedEdgesInGraph[sortedEdgeIndex].source)) {

                    if (nodesInTrees.has(sortedEdgesInGraph[sortedEdgeIndex].target)) {

                        for (let innerSpanningTree of spanningTreesArray) {

                            if (innerSpanningTree.contains(sortedEdgesInGraph[sortedEdgeIndex].target)) {

                                innerSpanningTree.traverseBFS(function (node) {
                                    spanningTree.add(node.data, sortedEdgesInGraph[sortedEdgeIndex].source)
                                });

                                edgesInMinSpanningTree.add(sortedEdgesInGraph[sortedEdgeIndex].source + "|" + sortedEdgesInGraph[sortedEdgeIndex].target);
                                spanningTreesArray.splice(spanningTreesArray.indexOf(innerSpanningTree), 1);
                                break;
                            }
                        }

                    } else {
                        addEdgeToMinSpanningTreeAndVisitedNodes(sortedEdgesInGraph[sortedEdgeIndex]);
                        spanningTree.add(sortedEdgesInGraph[sortedEdgeIndex].target, sortedEdgesInGraph[sortedEdgeIndex].source);
                    }
                    break;

                } else if (spanningTree.contains(sortedEdgesInGraph[sortedEdgeIndex].target)) {

                    if (nodesInTrees.has(sortedEdgesInGraph[sortedEdgeIndex].source)) {

                        for (let innerSpanningTree of spanningTreesArray) {

                            if (innerSpanningTree.contains(sortedEdgesInGraph[sortedEdgeIndex].source)) {

                                innerSpanningTree.traverseBFS(function (node) {
                                    spanningTree.add(node.data, sortedEdgesInGraph[sortedEdgeIndex].target)
                                });

                                edgesInMinSpanningTree.add(sortedEdgesInGraph[sortedEdgeIndex].source + "|" + sortedEdgesInGraph[sortedEdgeIndex].target);
                                spanningTreesArray.splice(spanningTreesArray.indexOf(innerSpanningTree), 1);
                                break;
                            }
                        }

                    } else {
                        addEdgeToMinSpanningTreeAndVisitedNodes(sortedEdgesInGraph[sortedEdgeIndex]);
                        spanningTree.add(sortedEdgesInGraph[sortedEdgeIndex].source, sortedEdgesInGraph[sortedEdgeIndex].target);
                    }
                    break;
                }
            }
        }

        return edgesInMinSpanningTree;

        function addEdgeToMinSpanningTreeAndVisitedNodes(sortedEdges) {
            edgesInMinSpanningTree.add(sortedEdges.source + "|" + sortedEdges.target);

            nodesInTrees.add(sortedEdges.source);
            nodesInTrees.add(sortedEdges.target);
        }

        function addEdgeToNewSpanningTree(edge) {
            const tree = new Tree();

            tree.add(edge.source);
            tree.add(edge.target, edge.source);

            nodesInTrees.add(edge.source);
            nodesInTrees.add(edge.target);

            spanningTreesArray.push(tree);
            edgesInMinSpanningTree.add(edge.source + "|" + edge.target);
        }

        function initializeFirstTreeWithFirstEdge() {
            const tree = new Tree();

            tree.add(sortedEdgesInGraph[0].source);
            tree.add(sortedEdgesInGraph[0].target, sortedEdgesInGraph[0].source);

            nodesInTrees.add(sortedEdgesInGraph[0].source);
            nodesInTrees.add(sortedEdgesInGraph[0].target);

            spanningTreesArray.push(tree);
            edgesInMinSpanningTree.add(sortedEdgesInGraph[0].source + "|" + sortedEdgesInGraph[0].target);
        }

        function returnSortedEdgesByWeight() {
            return s.graph.edges().sort(function (a, b) {
                return a.label - b.label;
            });
        }
    });
}).call(window);