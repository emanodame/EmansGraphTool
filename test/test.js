describe("Tests", function () {

    beforeAll(function () {
        sigmaInstance.graph.clear();
        sigmaInstance.drawNodes = false;
    });

    var dummyElement = document.createElement('div');
    document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);

    fit('should initialise sigma', function () {
        expect(sigmaInstance.id).toBe("0");
    });

    fit('should correctly import and export test graph', function () {
        mockExportGraphButton(JSON.stringify(getContentsFromFile("../resources/json-graphs/graph3.json")));
        expect(sigmaInstance.graph.nodes().length).toBe(10);
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

        sigmaInstance.graph.addNode(mockNode);
        expect(sigmaInstance.graph.nodes("mock").color).toBe("#ffffff");

        clearColoredNodesAndEdges();
        expect(sigmaInstance.graph.nodes("mock").color).toBe("#ff0e58");
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

    fit('should correctly create a random graph', function () {
        const randomNodesValue = 2;

        spyOn($.fn, "val").and.returnValue(randomNodesValue);
        createRandomGraph(event);
        expect(sigmaInstance.graph.nodes().length).toBe(randomNodesValue);
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

    fit('should compute path length of nodes', function () {
        const node1 = {
            x: 101,
            y: 120
        };

        const node2 = {
            x: 1012,
            y: 102
        };

        expect(computePathLength(node1, node2)).toBe("91.12");
    });

    fit('should retrieve node object from label', function () {
        const node = {
            id: 1,
            x: 10,
            y: 20,
            label: "5"
        };

        sigmaInstance.graph.addNode(node);
        expect(getNodeIdFromLabel(node.label)).toBe(node.id);
    });

    fit('should call clear nodes and edges', function () {
        const endAlgorithmSpy = spyOn(window, "clearColoredNodesAndEdges");

        clearColoredNodesAndEdges();
        expect(endAlgorithmSpy).toHaveBeenCalled();
    });

    fit('should close prompt should execute algorithm', function () {
        const executeAlgorithmSpy = spyOn(window, "executedSelectedAlgorithm");

        closePrompt();
        expect(executeAlgorithmSpy).toHaveBeenCalled();
    });

    fit('should overlay executed on show summary', function () {
        const overlaySpy = spyOn(window, 'showOverlay');

        showSummary();
        expect(overlaySpy).toHaveBeenCalled();
    });

    fit('should reset info container', function () {
        resetInformation();

        expect($("#helper-text-container").val()).toBe(undefined);
    });

    fit('should open random graph output', function () {
        const overlaySpy = spyOn(window, 'showOverlay');

        openRandomGraphInput();
        expect(overlaySpy).toHaveBeenCalled();
    });

    fit('should close random graph output', function () {
        const overlaySpy = spyOn(window, 'removeOverlay');

        closeRandomGraphInput();
        expect(overlaySpy).toHaveBeenCalled();
    });

    fit('should assert close check', function () {
        expect(closed).toBe(false);
    });

    fit('should clear graph', function () {
        const node = {
            id: 10,
            x: 10,
            y: 20,
            label: "5"
        };

        sigmaInstance.graph.addNode(node);

        clearGraph();
        expect(sigmaInstance.graph.nodes().length).toBe(0);
    });

    fit('should show overlay when json import', function () {
        const overlaySpy = spyOn(window, 'showOverlay');

        importJson();
        expect(overlaySpy).toHaveBeenCalled();
    });

    fit('should remove overlay when json import close', function () {
        const overlaySpy = spyOn(window, 'removeOverlay');

        closeJsonInput();
        expect(overlaySpy).toHaveBeenCalled();
    });

    fit('should show play button', function () {
        showPlayButton();
        expect(document.getElementById("play-button").style.display).toBe("inline");
    });

    fit('should show pause button', function () {
        showPauseButton();
        expect(document.getElementById("pause-button").style.display).toBe("inline");
    });

    fit('should restart algorithm and show play button', function () {
        const showPlayButtonSpy = spyOn(window, 'showPlayButton');
        restartAlgorithm();
        expect(showPlayButtonSpy).toHaveBeenCalled();
    });

    fit('should restart algorithm and show pause button', function () {
        const showPlayButtonSpy = spyOn(window, 'pauseAlgorithm');
        restartAlgorithm();
        expect(showPlayButtonSpy).toHaveBeenCalled();
    });

    fit('should rewind algorithm', function () {
        const showPlayButtonSpy = spyOn(window, 'showPlayButton');
        rewindAlgorithm();
        expect(showPlayButtonSpy).toHaveBeenCalled();
    });

    fit('should step algorithm and show play button', function () {
        const showPlayButtonSpy = spyOn(window, 'showPlayButton');
        rewindAlgorithm();
        expect(showPlayButtonSpy).toHaveBeenCalled();
    });

    fit('should step algorithm and show pause button', function () {
        const showPlayButtonSpy = spyOn(window, 'pauseAlgorithm');
        rewindAlgorithm();
        expect(showPlayButtonSpy).toHaveBeenCalled();
    });

    fit('should resume algorithm', function () {
        const showPlayButtonSpy = spyOn(window, 'resumeAlgorithm');
        resumeAlgorithm();
        expect(showPlayButtonSpy).toHaveBeenCalled();
    });

    fit('should pause algorithm', function () {
        const showPlayButtonSpy = spyOn(window, 'pauseAlgorithm');
        pauseAlgorithm();
        expect(showPlayButtonSpy).toHaveBeenCalled();
    });

    fit('should end algorithm and show play button', function () {
        const showPlayButtonSpy = spyOn(window, 'showPlayButton');
        endAlgorithm();
        expect(showPlayButtonSpy).toHaveBeenCalled();
    });

    fit('should end algorithm and pause algorithm', function () {
        const showPlayButtonSpy = spyOn(window, 'pauseAlgorithm');
        endAlgorithm();
        expect(showPlayButtonSpy).toHaveBeenCalled();
    });

    fit('should initalise tour guide', function () {
        const tourGuidesSpy = spyOn(window, 'initalizeTourGuide');
        initalizeTourGuide();
        expect(tourGuidesSpy).toHaveBeenCalled();
    });

    fit('should initalise dijkstra teacher', function () {
        const dijkstraTeacherSpy = spyOn(window, 'executeDijkstraTeacher');
        executeDijkstraTeacher();
        expect(dijkstraTeacherSpy).toHaveBeenCalled();
    });

    fit('should initalise kruskal teacher', function () {
        const kruskalTeacherSpy = spyOn(window, 'executeKruskalTeacher');
        executeKruskalTeacher();
        expect(kruskalTeacherSpy).toHaveBeenCalled();
    });

    fit('should initalise prim teacher', function () {
        const primTeacherSpy = spyOn(window, 'executePrimsTeacher');
        executePrimsTeacher();
        expect(primTeacherSpy).toHaveBeenCalled();
    });

    fit('should expect empty local storage', function () {
        expect(localStorage.length).toBe(0);
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

        sigmaInstance.graph.addNode(nodeCreation);
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

        sigmaInstance.graph.addEdge(edgeCreation);
    }
    sigmaInstance.refresh();
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