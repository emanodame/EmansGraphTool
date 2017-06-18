function loadClickFunctionality() {
    const dom = document.querySelector('#base canvas:last-child');
    const sigmaCamera = s.camera;

    const nodesPresentOnGraph = [];
    const nodesSelected = [];

    let i = 0;

    addNodeOnLeftClick();
    selectNodeOnShiftLeftClick();

    function addNodeOnLeftClick() {

        dom.addEventListener("click", function (e) {

            if (!e.shiftKey) {

                let x = sigma.utils.getX(e) - dom.offsetWidth / 2;
                let y = sigma.utils.getY(e) - dom.offsetHeight / 2;

                let p = sigmaCamera.cameraPosition(x, y);
                x = p.x;
                y = p.y;

                const node = {
                    id: createIdFromCoordinates(x, y),
                    x: x,
                    y: y,
                    size: 10
                };

                nodesPresentOnGraph.push(node);

                s.graph.addNode({
                    id: node.id,
                    x: node.x,
                    y: node.y,
                    size: node.size
                });

                s.refresh();
            }
        });
    }

    function selectNodeOnShiftLeftClick() {

        s.bind("clickNode", function (e) {

            if (e.data.captor.shiftKey) {

                nodesSelected.push(e.data.node);

                if (nodesSelected.length === 2) {

                    s.graph.addEdge({
                        id: (i++).toString(),
                        source: nodesSelected[0].id,
                        target: nodesSelected[1].id
                    });

                    nodesSelected.length = 0;
                }

                s.refresh();
            }
        });
    }

    function createIdFromCoordinates(x, y) {
        return x + "." + "y";
    }
}