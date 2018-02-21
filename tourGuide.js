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
                backdrop: true,
                element: "#tour-anchor"
            }, {
                template: "<div class='popover tour'>\n" +
                "    <div class='popover-content'>Right click to insert node on screen. Left click to remove!</div>\n" +
                "    <div class='popover-navigation'>\n" +
                "     <div id='options'>" +
                "        <div class='glyphicon glyphicon-arrow-left directional-buttons' data-role='prev'></div>\n" +
                "        <span data-role='separator'>|</span>\n" +
                "        <div class='glyphicon glyphicon-arrow-right directional-buttons' data-role='next'></div>\n" +
                "    </div>" +
                "   </div>\n" +
                "  </div>",
                backdrop: false,
                element: "#tour-anchor",
                onNext: show()
            }, {
                element: "#trigger",
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
                backdrop: true,
            }
        ]
    });

    tour.init();
    tour.start();
}