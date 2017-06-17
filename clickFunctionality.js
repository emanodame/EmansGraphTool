function loadClickFunctionality() {

    const dom = document.querySelector('#base canvas:last-child');
    const sigmaCamera = s.camera;


    dom.addEventListener("click", function (e) {

        let x = sigma.utils.getX(e) - dom.offsetWidth / 2;
        let y = sigma.utils.getY(e) - dom.offsetHeight / 2;

        let p = sigmaCamera.cameraPosition(x, y);
        x = p.x;
        y = p.y;

        s.graph.addNode({
            id: (i++).toString(),
            size: 10,
            x: x,
            y: y
        });

        s.refresh();

    }, false);

    s.bind("clickNode", function (e) {

        s.graph.addEdge({
            id : "edge",
            source : "0",
            target : "1"
        });

        s.refresh();
    });

    let i = 0;

}