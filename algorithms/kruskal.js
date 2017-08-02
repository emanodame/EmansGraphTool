(function () {

    sigma.classes.graph.addMethod('kruskal', function () {
        const sortedEdges = returnSortedEdgesByWeight();

        const treeArray = [];
        const edgesToHighlight = [];
        const setNodes = new Set();

        sortedEdges.forEach(function (edge) {

            if (treeArray.length === 0) {
                const tree = new Tree();

                tree.add(edge.source);
                tree.add(edge.target, edge.source);
                treeArray.push(tree);
                edgesToHighlight.push(edge.source + "|" + edge.target);
                setNodes.add(edge.source);
                setNodes.add(edge.target);
            } else {
                let makeNewTree = true;
                for (let i = 0; i < treeArray.length; i++) {

                    if (treeArray[i].contains(edge.source) && treeArray[i].contains(edge.target)) {
                        console.log("same tree!");
                        makeNewTree = false;
                        break;
                    }

                    if (treeArray[i].contains(edge.source)) {
                        let reset = false;

                        if (setNodes.has(edge.target)) {
                            for (let y = 0; y < treeArray.length; y++) {
                                if (treeArray[i] === treeArray[y]) {
                                    continue;
                                }
                                if (treeArray[y].contains(edge.target)) {

                                    treeArray[y].traverseBFS(function (node) {
                                        treeArray[i].add(node.data, edge.source)
                                    });

                                    treeArray.splice(y, 1);
                                    reset = true;
                                    break;
                                }
                            }
                        }

                        if (reset) {
                            break;
                        }

                        edgesToHighlight.push(edge.source + "|" + edge.target);
                        treeArray[i].add(edge.target, edge.source);
                        setNodes.add(edge.source);
                        setNodes.add(edge.target);
                        makeNewTree = false;
                        break;

                    } else if (treeArray[i].contains(edge.target)) {
                        let reset = false;

                        if (setNodes.has(edge.source)) {
                            for (let y = 0; y < treeArray.length; y++) {
                                if (treeArray[i] === treeArray[y]) {
                                    continue;
                                }
                                if (treeArray[y].contains(edge.source)) {

                                    treeArray[y].traverseBFS(function (node) {
                                        treeArray[i].add(node.data, edge.target)
                                    });

                                    treeArray.splice(y, 1);
                                    reset = true;
                                    break;
                                }
                            }
                        }

                        if (reset) {
                            break;
                        }

                        edgesToHighlight.push(edge.source + "|" + edge.target);
                        treeArray[i].add(edge.source, edge.target);
                        setNodes.add(edge.source);
                        setNodes.add(edge.target);
                        makeNewTree = false;
                        break;

                    }
                }

                if (makeNewTree) {

                    let tree1 = new Tree();

                    tree1.add(edge.source);
                    tree1.add(edge.target, edge.source);
                    setNodes.add(edge.source);
                    setNodes.add(edge.target);
                    edgesToHighlight.push(edge.source + "|" + edge.target);
                    treeArray.push(tree1);
                }
            }
        });

        return edgesToHighlight;
    });

    function returnSortedEdgesByWeight() {
        return s.graph.edges().sort(function (a, b) {
            return a.label - b.label;
        });
    }
}).call(window);