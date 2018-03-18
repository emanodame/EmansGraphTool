let tour;

function initalizeTourGuide() {
    tour = new Tour({
        steps: [
            {
                template: "<div class='popover tour'>\n" +
                "<button class='tour-close-button algo-button' data-role='end'>X</button>" +
                "    <div class='popover-content'>Welcome to the Graph Algorithm Teaching Tool! This website will educate you on algorithms such as Dijkstra, Kruskal's and Prim's." +
                " This tour will give a short guide on how to operate the site</div>\n" +
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
                "<button class='tour-close-button algo-button' data-role='end'>X</button>" +
                "    <div class='popover-content'>Right click to insert node on screen. Left click on it to remove.</div>\n" +
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
            {
                template: "<div class='popover tour'>\n" +
                "<button class='tour-close-button algo-button' data-role='end'>X</button>" +
                "    <div class='popover-content'>Click and Drag nodes to move around them around.</div>\n" +
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
            {
                template: "<div class='popover tour'>\n" +
                "<button class='tour-close-button algo-button' data-role='end'>X</button>" +
                "    <div class='popover-content'>To create edges, Shift Right click on the first node and Shift Right again click on the second/target node. A selected node will be grey in colour.</div>\n" +
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
                "<button class='tour-close-button algo-button' data-role='end'>X</button>" +
                "    <div class='popover-content'>On the right is the Control Panel from here is where the algorithms get executed. Hover cusor to the far right of screen to bring Control Panel into view.</div>\n" +
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
            }, {
                template: "<div class='popover tour'>\n" +
                "<button class='tour-close-button algo-button' data-role='end'>X</button>" +
                "    <div class='popover-content'>Functionality such as Random Graph, Import/Export are displayed!</div>\n" +
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
                    hideSlider();

                }
            },
            {
                template: "<div class='popover tour'>\n" +
                "<button class='tour-close-button algo-button' data-role='end'>X</button>" +
                "    <div class='popover-content'>This is where the teacher tool will display it's instructions. It will be fully resizaable and moveable!</div>\n" +
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
                    hideSlider();
                }
            },
            {
                template: "<div class='popover tour'>\n" +
                "<button class='tour-close-button algo-button' data-role='end'>X</button>" +
                "    <div class='popover-content'>Every Node and Edge has an ID associated with it. The labels represent their IDs. These ID's will be necessary to start certain algorithms such as Dijkstra's and Prim's.</div>\n" +
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
                "<button class='tour-close-button algo-button' data-role='end'>X</button>" +
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
}