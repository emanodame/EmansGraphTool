function importJson() {
    document.getElementById("json-import").style.visibility = "visible";
    document.getElementById("json-export").style.visibility = "hidden";
}

function parseJson() {
    event.preventDefault();

    try {
        const jsonTextInput = document.getElementById("json-text-input").value;
        const textToJson = JSON.parse(jsonTextInput);

        clearGraph();
        closeJsonInput();

        for (let i = 0; i < textToJson.nodes.length; i++) {

            const nodeCreation = {
                id: textToJson.nodes[i].id,
                x: textToJson.nodes[i].x * 100,
                y: textToJson.nodes[i].y * 100,
                label: textToJson.nodes[i].label ? textToJson.nodes[i].label : textToJson.nodes[i].id.toString(),
                size: 10
            };

            s.graph.addNode(nodeCreation);
            s.refresh();
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
            s.refresh();
        }
    } catch (err) {
        console.log("lol");
        $.iGrowl({
            type: "growler-settings",
            message: "Invalid JSON structure!",
            placement: {
                x: 'center'
            },
        });
    }
}

function exportJson() {
    document.getElementById("json-import").style.visibility = "hidden";
    document.getElementById("json-export").style.visibility = "visible";

    let jsonGraphText = "{\"nodes\":";
    const nodes = [];

    s.graph.nodes().forEach(function (node) {
        const nodeCreation = {
            id: node.id,
            x: (node.x / 100).toString(),
            y: (node.y / 100).toString(),
            label: node.label
        };

        nodes.push(nodeCreation);
    });
    jsonGraphText += JSON.stringify(nodes);
    jsonGraphText += ",\"edges\":";

    const edges = [];

    s.graph.edges().forEach(function (edge) {
        const edgeCreation = {
            id: edge.id,
            source: edge.source,
            target: edge.target,
        };

        edges.push(edgeCreation);
    });

    jsonGraphText += JSON.stringify(edges);
    jsonGraphText += "}";


    document.getElementById("json-text-output").value = jsonGraphText;
}

function closeJsonInput() {
    document.getElementById("json-import").style.visibility = "hidden";
    document.getElementById("json-export").style.visibility = "hidden";
}

function copyJsonOutput() {
    const copyText = document.getElementById("json-text-output");
    copyText.select();
    document.execCommand("Copy");
}