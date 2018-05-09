let tour;

function initalizeTourGuide() {
    tour = new Tour({
        steps: [
            {
                template: "<div class='popover tour'>\n" +
                "<button class='tour-close-button algo-button' data-role='end'>X</button>" +
                "    <div class='popover-content'>Welcome to the Graph Algorithm Teaching Tool!" +
                " Explore the site by proceeding the tour. (Click or press right key)</div>\n" +
                "    <div class='popover-navigation'>\n" +
                "     <div id='options'>" +
                "        <div class='glyphicon glyphicon-arrow-left directional-buttons tour-prev' data-role='prev'></div>\n" +
                "        <div class='glyphicon glyphicon-arrow-right directional-buttons tour-next' data-role='next'></div>\n" +
                "    </div>" +
                "   </div>\n" +

                "  </div>",
                element: "#tour-anchor",
                backdrop: true,
            }, {
                template: "<div class='popover tour'>\n" +
                "<button class='tour-close-button algo-button' data-role='end'>X</button>" +
                "    <div class='popover-content'>Left click anywhere on the screen to create a node. Right click on the node to remove it.</div>\n" +
                "    <div class='popover-navigation'>\n" +
                "     <div id='options'>" +
                "        <div class='glyphicon glyphicon-arrow-left directional-buttons tour-prev' data-role='prev'></div>\n" +
                "        <div class='glyphicon glyphicon-arrow-right directional-buttons tour-next' data-role='next'></div>\n" +
                "    </div>" +
                "   </div>\n" +
                "  </div>",
                element: "#tour-anchor",
                backdrop: false,
            },
            {
                template: "<div class='popover tour'>\n" +
                "<button class='tour-close-button algo-button' data-role='end'>X</button>" +
                "    <div class='popover-content'>Nodes are draggable! Left Click and hold to move them around. </div>\n" +
                "    <div class='popover-navigation'>\n" +
                "     <div id='options'>" +
                "        <div class='glyphicon glyphicon-arrow-left directional-buttons tour-prev' data-role='prev'></div>\n" +
                "        <div class='glyphicon glyphicon-arrow-right directional-buttons tour-next' data-role='next'></div>\n" +
                "    </div>" +
                "   </div>\n" +
                "  </div>",
                element: "#tour-anchor",
                backdrop: false,
            },
            {
                template: "<div class='popover tour'>\n" +
                "<button class='tour-close-button algo-button' data-role='end'>X</button>" +
                "    <div class='popover-content'>To create edges, Have at least two nodes displayed. Shift Left click on your desired source node - It will turn grey to illustrate it's selection. " +
                "Shift left click again on your desired target node to create the edge.</div>\n" +
                "    <div class='popover-navigation'>\n" +
                "     <div id='options'>" +
                "        <div class='glyphicon glyphicon-arrow-left directional-buttons tour-prev' data-role='prev'></div>\n" +
                "        <div class='glyphicon glyphicon-arrow-right directional-buttons tour-next' data-role='next'></div>\n" +
                "    </div>" +
                "   </div>\n" +
                "  </div>",
                element: "#tour-anchor",
                backdrop: false,
            }, {
                template: "<div class='popover tour'>\n" +
                "<button class='tour-close-button algo-button' data-role='end'>X</button>" +
                "    <div class='popover-content'>On the far right is the Control Panel. From here is where you setup graph execution. Hover cusor to the far right of the screen to bring Control Panel into view." +
                "<br> Furthermore, with the buttons below, the ability to create a random graph and import your own graph is possible! </div>\n" +
                "    <div class='popover-navigation'>\n" +
                "     <div id='options'>" +
                "        <div class='glyphicon glyphicon-arrow-left directional-buttons tour-prev' data-role='prev'></div>\n" +
                "        <div class='glyphicon glyphicon-arrow-right directional-buttons tour-next' data-role='next'></div>\n" +
                "    </div>" +
                "   </div>\n" +
                "  </div>",
                element: "#hover-bar",
                backdrop: false,
                onShow: function () {
                    showSlider();
                },
            }, {
                template: "<div class='popover tour'>\n" +
                "<button class='tour-close-button algo-button' data-role='end'>X</button>" +
                "    <div class='popover-content'>Nodes and Edges have ID's. Use Node ID to pinpoint where the graph algorithm execution should start from. (Dijkstra's & Prim's)</div>\n" +
                "    <div class='popover-navigation'>\n" +
                "     <div id='options'>" +
                "        <div class='glyphicon glyphicon-arrow-left directional-buttons tour-prev' data-role='prev'></div>\n" +
                "        <div class='glyphicon glyphicon-arrow-right directional-buttons tour-next' data-role='next'></div>\n" +
                "    </div>" +
                "   </div>\n" +
                "  </div>",
                element: "#src-node",
                backdrop: false,
                onShow: function () {
                    showSlider();
                    $("#helper-text-container").fadeOut();
                    $('.resize-drag').removeClass('resize-drag-highlight');
                },
            },
            {
                template: "<div class='popover tour'>\n" +
                "<button class='tour-close-button algo-button' data-role='end'>X</button>" +
                "    <div class='popover-content'>While executing, the steps taken by the graph algorithms are displayed here. The text box is fully resizeable and movable!</div>\n" +
                "    <div class='popover-navigation'>\n" +
                "     <div id='options'>" +
                "        <div class='glyphicon glyphicon-arrow-left directional-buttons tour-prev' data-role='prev'></div>\n" +
                "        <div class='glyphicon glyphicon-arrow-right directional-buttons tour-next' data-role='next'></div>\n" +
                "    </div>" +
                "   </div>\n" +
                "  </div>",
                element: "#helper-text-container",
                backdrop: false,
                onShow: function () {
                    hideSlider();
                    $("#helper-text-container").fadeIn();
                    $('.resize-drag').addClass('resize-drag-highlight');
                }
            },
            {
                template: "<div class='popover tour'>\n" +
                "<button class='tour-close-button algo-button' data-role='end'>X</button>" +
                "    <div class='popover-content'>Just below gives you the ability to modify the execution. You can: Restart, Rewind a step, Pause, Forward a step and Finish execution. " +
                "<br>You also have the ability to change the speed of execution. </div>\n" +
                "    <div class='popover-navigation'>\n" +
                "     <div id='options'>" +
                "        <div class='glyphicon glyphicon-arrow-left directional-buttons tour-prev' data-role='prev'></div>\n" +
                "        <div class='glyphicon glyphicon-arrow-right directional-buttons tour-next' data-role='next'></div>\n" +
                "    </div>" +
                "   </div>\n" +
                "  </div>",
                element: "#tour-anchor",
                backdrop: false,
                onShow: function () {
                    $("#helper-text-container").fadeOut();
                    $('.resize-drag').removeClass('resize-drag-highlight');
                }
            },
            {
                template: "<div class='popover tour'>\n" +
                "<button class='tour-close-button algo-button' data-role='end'>X</button>" +
                "    <div class='popover-content'>Give it a try. To run the tour guide again, go into the Control Panel and click the info button on the top right! <br>" +
                " Further documentation on the GitHub Info Page!</div>\n" +
                "    <div class='popover-navigation'>\n" +
                "     <div id='options'>" +
                "        <div class='glyphicon glyphicon-arrow-left directional-buttons tour-prev' data-role='prev'></div>\n" +
                "        <div class='glyphicon glyphicon-arrow-right directional-buttons tour-next' data-role='next'></div>\n" +
                "    </div>" +
                "   </div>\n" +
                "  </div>",
                element: "#tour-anchor",
                backdrop: false,
                onShow: function () {
                    hideSlider();
                    $("#helper-text-container").fadeOut();
                    $('.resize-drag').removeClass('resize-drag-highlight');
                }
            },
        ]
    });
}