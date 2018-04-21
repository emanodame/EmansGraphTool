describe("Tests", function () {

    beforeAll(function() {
        s.graph.clear();
        s.drawNodes = false;
    });

    var dummyElement = document.createElement('div');
    document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);

    fit('should initialise sigma', function () {
        expect(s.id).toBe("0");
    });

    fit('should correctly import and export test graph', function () {
        mockExportGraphButton(JSON.stringify(getContentsFromFile("../resources/json-graphs/graph3.json")));
        expect(s.graph.nodes().length).toBe(10);
    });

    fit('should create node id from x and y coordinates', function () {
        expect(createNodeIdFromCoordinates(4, 12.1)).toBe("4.12.1");
    });

    fit('should create edge id from source and target id', function () {
        expect(createEdgeIdFromCoordinates(243, 221.2)).toBe("243|221.2");
    });

    fit('should rest nodes and edges to default colour', function () {
        const mockNode = {
            id: "mock",
            size: 10,
            color: "#ffffff"
        };

        s.graph.addNode(mockNode);
        expect(s.graph.nodes("mock").color).toBe("#ffffff");

        clearColoredNodesAndEdges();
        expect(s.graph.nodes("mock").color).toBe("#ff0e58");
    });

    fit('should correctly execute dijkstra and return correct path', function () {
        spyOn(window, "getNodeIdFromLabel").and.returnValue("1");
        spyOn(window, 'executeDijkstraTeacher');
        spyOn($.fn, "slideReveal");

        validNodeId = true;

        const expectedPath = calculateDijkstraPath();
        expect(JSON.stringify(expectedPath)).toBe(getContentsFromFile("expectedDijkstraPath"));
    });

    fit('should correctly execute kruskal and return correct path', function () {
        spyOn(window, 'executeKruskalTeacher');
        spyOn($.fn, "slideReveal");

        const expectedPath = calculateKruskalPath();
        expect(JSON.stringify(expectedPath)).toBe(getContentsFromFile("expectedKruskalPath"));
    });

    fit('should correctly execute prim and return correct path', function () {
        spyOn(window, "getNodeIdFromLabel").and.returnValue("1");
        spyOn(window, 'executePrimsTeacher');
        spyOn($.fn, "slideReveal");

        const expectedPath = calculatePrimsPath();
        expect(JSON.stringify(expectedPath)).toBe(getContentsFromFile("expectedPrimPath"));
    });

/*    fit('should correctly execute selected algorithm', function () {
        const kruskalAlgorithmSpy = spyOn(window, 'calculateKruskalPath');
        algorithmSelected = "kruskal";
TODO: replace test so that it checks for prompt instead add test case for prompt and non prompt
        executedSelectedAlgorithm();
        expect(kruskalAlgorithmSpy).toHaveBeenCalled();
    });*/

    fit('should correcly create a random grpah', function () {
        const randomNodesValue = 5;

        spyOn($.fn, "val").and.returnValue(randomNodesValue);
        createRandomGraph();
        expect(s.graph.nodes().length).toBe(randomNodesValue);
    });

    fit('should show dijkstra input box', function () {
        spyOn($.fn, "animate");
        spyOn($.fn, "removeClass");
        spyOn($.fn, "addClass");

        showDijkstraInputBoxes();
        expect(algorithmSelected).toBe("dijkstra");
    });

    fit('should show kruskal input box', function () {
        spyOn($.fn, "animate");
        spyOn($.fn, "removeClass");
        spyOn($.fn, "addClass");

        showKruskalInputBoxes();
        expect(algorithmSelected).toBe("kruskal");
    });

    fit('should show prim input box', function () {
        spyOn($.fn, "animate");
        spyOn($.fn, "removeClass");
        spyOn($.fn, "addClass");

        showPrimsInputBoxes();
        expect(algorithmSelected).toBe("prim");
    });


    fit('should show slider', function () {
        spyOn($.fn, "slideReveal");

        showSlider();
        expect(sliderStick).toBe(true);
    });

    fit('should hide slider', function () {
        spyOn($.fn, "slideReveal");

        hideSlider();
        expect(sliderStick).toBe(false);
    });

    fit('should restart algorithm', function () {
        const restartAlgorithmSpy = spyOn(window, "restartAlgorithm");

        localStorage.setItem("algorithm", "dijkstra");
        restartAlgorithm();

        expect(restartAlgorithmSpy).toHaveBeenCalled();
    });

    fit('should pause algorithm', function () {
        const pauseAlgorithmSpy = spyOn(window, "pauseAlgorithm");

        localStorage.setItem("algorithm", "dijkstra");
        pauseAlgorithm();

        expect(pauseAlgorithmSpy).toHaveBeenCalled();
    });

    fit('should resume algorithm', function () {
        const resumeAlgorithmSpy = spyOn(window, "resumeAlgorithm");

        localStorage.setItem("algorithm", "dijkstra");
        resumeAlgorithm();

        expect(resumeAlgorithmSpy).toHaveBeenCalled();
    });

    fit('should rewind algorithm', function () {
        const rewindAlgorithmSpy = spyOn(window, "rewindAlgorithm");

        localStorage.setItem("algorithm", "dijkstra");
        rewindAlgorithm();

        expect(rewindAlgorithmSpy).toHaveBeenCalled();
    });

    fit('should step algorithm', function () {
        const stepAlgorithmSpy = spyOn(window, "stepAlgorithm");

        localStorage.setItem("algorithm", "dijkstra");
        stepAlgorithm();

        expect(stepAlgorithmSpy).toHaveBeenCalled();
    });

    fit('should end algorithm', function () {
        const endAlgorithmSpy = spyOn(window, "endAlgorithm");

        localStorage.setItem("algorithm", "dijkstra");
        endAlgorithm();

        expect(endAlgorithmSpy).toHaveBeenCalled();
    });
});


function mockExportGraphButton(graphJsonText) {
    const textToJson = JSON.parse(graphJsonText);

    for (let i = 0; i < textToJson.nodes.length; i++) {

        const nodeCreation = {
            id: textToJson.nodes[i].id,
            x: textToJson.nodes[i].x * 100,
            y: textToJson.nodes[i].y * 100,
            label: textToJson.nodes[i].label ? textToJson.nodes[i].label : textToJson.nodes[i].id.toString(),
            size: 10
        };

        s.graph.addNode(nodeCreation);
    }

    for (let i = 0; i < textToJson.edges.length; i++) {

        const edgeCreation = {
            id: createEdgeIdFromCoordinates(textToJson.edges[i].source, textToJson.edges[i].target),
            source: textToJson.edges[i].source,
            target: textToJson.edges[i].target,
            defaultEdgeLabelSize: 20,
            size: 3,
            label: textToJson.edges[i].weight
        };

        s.graph.addEdge(edgeCreation);
    }
    s.refresh();
}

function getContentsFromFile(filePath) {
    var readHTMLFile = function (url) {
        var toReturn;
        $.ajax({
            url: url,
            async: false
        }).done(function (data) {
            toReturn = data;
        });
        return toReturn;
    };

    return readHTMLFile(filePath);
}