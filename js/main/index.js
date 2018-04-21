let growler;
let validNodeId = false;
let executionSpeed = undefined;

const nodeColour = "#ff0e58";
const edgeColour = "#ff0e58";

window.onload = function () {
    const storageNodes = JSON.parse(localStorage.getItem("nodes"));
    const storageEdges = JSON.parse(localStorage.getItem("edges"));

    if (storageNodes.length > 0) {
        storageNodes.forEach(function (node) {
            node.hidden = false;
            s.graph.addNode(node);
        });

        if (storageEdges.length > 0) {
            storageEdges.forEach(function (edge) {
                s.graph.addEdge(edge);
            });
        }
        s.refresh();
    }
};

window.onbeforeunload = function () {
    clearColoredNodesAndEdges();
    localStorage.clear();

    localStorage.setItem("nodes", JSON.stringify(s.graph.nodes()));
    localStorage.setItem("edges", JSON.stringify(s.graph.edges()));

    localStorage.setItem("cameraX", s.camera.x);
    localStorage.setItem("cameraY", s.camera.y);
};

$(document).bind("contextmenu", function (event) {
    event.preventDefault();
});

$(document).ondblclick = function (event) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
};

$('.animsition').animsition();

$(document).ready(function () {
    initalizeTourGuide();
});

const s = new sigma({
    renderer: {
        container: document.getElementById('base'),
        type: 'canvas'
    },
    settings: {
        borderSize: 3,

        defaultNodeColor: "#ff0e58",
        defaultNodeBorderColor: "#c9ddff",

        defaultEdgeColor: "#ff0e58",
        defaultEdgeLabelColor: "#ff0e58",
        defaultEdgeLabelSize: 20,

        defaultLabelColor: "#ffffff",
        defaultLabelHoverColor: "#ff0e58",
        labelHoverColor: "node",
        labelShadowColor: "#c9ddff",

        enableEdgeHovering: true,
        edgeHoverSizeRatio: 2,
        edgeHoverExtremities: true,
        autoRescale: false,
        mouseEnabled: true,
        doubleClickEnabled: false,
        immutable: true
    }
});

s.camera.x = localStorage.getItem("cameraX") === null ? localStorage.getItem("cameraX") : 0;
s.camera.y = localStorage.getItem("cameraY") === null ? localStorage.getItem("cameraY") : 0;

const dragListener = sigma.plugins.dragNodes(s, s.renderers[0]);

sigma.classes.graph.attach('clear', 'clearLog', function () {
    setTimeout(checkNodeExistence, 1000);
});

sigma.classes.graph.attach('dropNode', 'dropNodeLog', function () {
    setTimeout(checkNodeExistence, 1000);
});

sigma.classes.graph.attach('addNode', 'addNodeLog', function () {
    if (growler) {
        growler.dismiss();
    }
});

function createNodeIdFromCoordinates(x, y) {
    return x + '.' + y;
}

function createEdgeIdFromCoordinates(x, y) {
    return x + "|" + y;
}

function clearColoredNodesAndEdges() {
    s.graph.nodes().forEach(function (node) {
        node.color = nodeColour;
    });

    s.graph.edges().forEach(function (edges) {
        edges.color = nodeColour;
    });

    s.refresh();
}

function getNodeIdFromLabel(nodeId) {
    const node = s.graph.nodes().filter(function (node) {
        return node.label === nodeId;
    }).shift();

    return node ? node.id : null;
}

function returnSortedEdgesByWeight() {
    return s.graph.edges().sort(function (a, b) {
        return a.label - b.label;
    });
}

$("#src-node").focusout(function () {
    const srcNodeId = getNodeIdFromLabel($("#src-node").val());

    if (!srcNodeId) {
        document.getElementById("source-error-message").style.display = "inline";
        validNodeId = false;
    } else {
        document.getElementById("source-error-message").style.display = "none";
        validNodeId = true;
    }
});

function checkNodeExistence() {
    if (s.graph.nodes().length === 0) {
        growler = $.iGrowl({
            type: "growler-settings",
            animShow: 'fadeInDown',
            message: "Go ahead and add some nodes on the graph by clicking on the screen! :)",
            placement: {
                x: 'center'
            },
            delay: 0
        });
    }
}

function showAlgorithmSummarisation() {
    s.graph.nodes().forEach(function (node) {
        node.hidden = true;
    });

    s.refresh();
    document.getElementById("guide-prompt").style.left = "23%";

    document.getElementById("guide-prompt").style.width = "60%";
    document.getElementById("guide-prompt").style.height = "75%";

    document.getElementById("answer-container").style.display = "none";
    document.getElementById("prompt-text").style.display = "none";

    $("#guide-prompt").css('borderWidth', '4px');
    $("#algorithm-summary-holder").fadeIn(500);

    if (algorithmSelected === "dijkstra") {
        $("#dijkstra-summary-container").fadeIn(500);
        localStorage.setItem("dijkstra-summary-prompt", "true");

    } else if (algorithmSelected === "kruskal") {
        $("#kruskal-summary-container").fadeIn(500);
        localStorage.setItem("kruskal-summary-prompt", "true");

    } else if (algorithmSelected === "prim") {
        $("#prim-summary-container").fadeIn(500);
        localStorage.setItem("prim-summary-prompt", "true");
    }
}

function closePrompt() {
    document.getElementById("guide-prompt").style.display = "none";

    if (algorithmSelected === "dijkstra") {
        localStorage.setItem("dijkstra-summary-prompt", "true");

    } else if (algorithmSelected === "kruskal") {
        localStorage.setItem("kruskal-summary-prompt", "true");

    } else {
        localStorage.setItem("prim-summary-prompt", "true");
    }
    executedSelectedAlgorithm();
}

function closeSummary() {
    s.graph.nodes().forEach(function (node) {
        node.hidden = false;
    });
    s.refresh();

    document.getElementById("algorithm-summary-holder").style.display = "none";
    document.getElementById("guide-prompt").style.display = "none";

    document.getElementById("guide-prompt").style.left = "43%";
    document.getElementById("guide-prompt").style.top = "12%";


    document.getElementById("guide-prompt").style.width = "300px";
    document.getElementById("guide-prompt").style.height = "92px";

    if (algorithmSelected === "dijkstra") {
        localStorage.setItem("dijkstra-summary-prompt", "true");
        document.getElementById("dijkstra-summary-container").style.display = "none";

    } else if (algorithmSelected === "kruskal") {
        localStorage.setItem("kruskal-summary-prompt", "true");
        document.getElementById("kruskal-summary-container").style.display = "none";

    } else {
        localStorage.setItem("prim-summary-prompt", "true");
        document.getElementById("prim-summary-container").style.display = "none";
    }
}

function computePathLength(node1, node2) {
    return (Math.sqrt(Math.pow((node2.y - node1.y), 2) + Math.pow((node2.x - node1.x), 2)) / 10).toFixed(2);
}