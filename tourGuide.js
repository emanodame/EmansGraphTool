function runTourGuide() {
    const tour = new Tour({
        steps: [
            {
                template: "<div class='popover tour'>\n" +
                "    <div class='popover-content'>Welcome to my Graph Algo Tool! This website will educate you on algorithms</div>\n" +
                "    <div class='popover-navigation'>\n" +
                "     <div id='options'>" +
                "        <div class='glyphicon glyphicon-arrow-left directional-buttons' data-role='prev'></div>\n" +
                "        <span data-role='separator'>|</span>\n" +
                "        <div class='glyphicon glyphicon-arrow-right directional-buttons' data-role='next'></div>\n" +
                "    </div>" +
                "   </div>\n" +
                "  </div>",
                element: "#tour-anchor",
                backdrop: true,
            }, {
                template: "<div class='popover tour'>\n" +
                "    <div class='popover-content'>Right click to insert node on screen. Left click to remove. Try it out!</div>\n" +
                "    <div class='popover-navigation'>\n" +
                "     <div id='options'>" +
                "        <div class='glyphicon glyphicon-arrow-left directional-buttons' data-role='prev'></div>\n" +
                "        <span data-role='separator'>|</span>\n" +
                "        <div class='glyphicon glyphicon-arrow-right directional-buttons' data-role='next'></div>\n" +
                "    </div>" +
                "   </div>\n" +
                "  </div>",
                element: "#tour-anchor",
                backdrop: false,
            }, {
                template: "<div class='popover tour'>\n" +
                "    <div class='popover-content'>To create edges, Shift Right click on the first node and Shift Right click on the target node. Try it out!</div>\n" +
                "    <div class='popover-navigation'>\n" +
                "     <div id='options'>" +
                "        <div class='glyphicon glyphicon-arrow-left directional-buttons' data-role='prev'></div>\n" +
                "        <span data-role='separator'>|</span>\n" +
                "        <div class='glyphicon glyphicon-arrow-right directional-buttons' data-role='next'></div>\n" +
                "    </div>" +
                "   </div>\n" +
                "  </div>",
                element: "#tour-anchor",
                backdrop: false,
                onNext: function () {
                    showSlider();
                },
            }, {
                template: "<div class='popover tour'>\n" +
                "    <div class='popover-content'>On the right is the control panel, from here is where the algorithms get executed. Hover cursor on the right to view.</div>\n" +
                "    <div class='popover-navigation'>\n" +
                "     <div id='options'>" +
                "        <div class='glyphicon glyphicon-arrow-left directional-buttons' data-role='prev'></div>\n" +
                "        <span data-role='separator'>|</span>\n" +
                "        <div class='glyphicon glyphicon-arrow-right directional-buttons' data-role='next'></div>\n" +
                "    </div>" +
                "   </div>\n" +
                "  </div>",
                element: "#hover-bar",
                backdrop: false,
                onNext: function () {
                    hideSlider();
                }
            }, {
                template: "<div class='popover tour'>\n" +
                "    <div class='popover-content'>Every Node and Edge has an ID associated with it. The labels represent their IDs. The ID's will be needed to execute Dijkstra's and Prim's algorithm!</div>\n" +
                "    <div class='popover-navigation'>\n" +
                "     <div id='options'>" +
                "        <div class='glyphicon glyphicon-arrow-left directional-buttons' data-role='prev'></div>\n" +
                "        <span data-role='separator'>|</span>\n" +
                "        <div class='glyphicon glyphicon-arrow-right directional-buttons' data-role='next'></div>\n" +
                "    </div>" +
                "   </div>\n" +
                "  </div>",
                element: "#tour-anchor",
                backdrop: false,
                onNext: function () {
                    showSlider();
                }
            }, {
                template: "<div class='popover tour'>\n" +
                "    <div class='popover-content'>Random graph button will create a graph of your size that you want!</div>\n" +
                "    <div class='popover-navigation'>\n" +
                "     <div id='options'>" +
                "        <div class='glyphicon glyphicon-arrow-left directional-buttons' data-role='prev'></div>\n" +
                "        <span data-role='separator'>|</span>\n" +
                "        <div class='glyphicon glyphicon-arrow-right directional-buttons' data-role='next'></div>\n" +
                "    </div>" +
                "   </div>\n" +
                "  </div>",
                element: "#hover-bar",
                backdrop: false,
                onNext: function () {
                    showSlider();
                }
            }, {
                template: "<div class='popover tour'>\n" +
                "    <div class='popover-content'>Import/Export is handy if you want to save your graph configurations!</div>\n" +
                "    <div class='popover-navigation'>\n" +
                "     <div id='options'>" +
                "        <div class='glyphicon glyphicon-arrow-left directional-buttons' data-role='prev'></div>\n" +
                "        <span data-role='separator'>|</span>\n" +
                "        <div class='glyphicon glyphicon-arrow-right directional-buttons' data-role='next'></div>\n" +
                "    </div>" +
                "   </div>\n" +
                "  </div>",
                element: "#hover-bar",
                backdrop: false,
                onNext: function () {
                    hideSlider();
                }
            }, {
                template: "<div class='popover tour'>\n" +
                "    <div class='popover-content'>Give it a try!</div>\n" +
                "    <div class='popover-navigation'>\n" +
                "     <div id='options'>" +
                "        <div class='glyphicon glyphicon-arrow-left directional-buttons' data-role='prev'></div>\n" +
                "        <span data-role='separator'>|</span>\n" +
                "        <div class='glyphicon glyphicon-arrow-right directional-buttons' data-role='next'></div>\n" +
                "    </div>" +
                "   </div>\n" +
                "  </div>",
                element: "#tour-anchor",
                backdrop: false,
            },
        ]
    });

    tour.init();
    tour.start();
}