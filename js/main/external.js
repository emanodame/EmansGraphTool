let sliderStick = false;

interact('.resize-drag')
    .draggable({
        onmove: window.dragMoveListener,
        restrict: {
            restriction: 'parent',
            elementRect: {top: 0, left: 0, bottom: 1, right: 1}
        },
    })
    .resizable({
        // resize from all edges and corners
        edges: {left: true, right: true, bottom: true, top: true},

        restrictEdges: {
            outer: 'parent',
            endOnly: true,
        },
        restrictSize: {
            min: {width: 650, height: 85},
        },

        inertia: true,
    }).on('resizemove', function (event) {
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

    // update the element's style
    target.style.width = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';

    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
});

function dragMoveListener(event) {
    const target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
        target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

$(function () {
    $("#slider").slider({
        value: 50,
        stop: function (event, ui) {
            play(3000 - (ui.value * 25));
            showPauseButton();
        }
    });
});

function showSlider() {
    $('#slide-revealer').slideReveal("show");
    document.getElementById("left-trigger").style.display = "inline";
    document.getElementById("right-trigger").style.display = "none";
    sliderStick = true;
}

function hideSlider() {
    $('#slide-revealer').slideReveal("hide");
    document.getElementById("left-trigger").style.display = "none";
    document.getElementById("right-trigger").style.display = "inline";
    sliderStick = false;
}

$('#slide-revealer').slideReveal({
    trigger: $("#left-trigger"),
    position: "right",
    push: false,
    overlay: true
});


$("#hover-bar").mouseover(function () {
    $('#slide-revealer').slideReveal("show");
    document.getElementById("left-trigger").style.display = "inline";
    document.getElementById("right-trigger").style.display = "none";
});

$("#slide-revealer").mouseleave(function () {
    if (!sliderStick) {
        $('#slide-revealer').slideReveal("hide");
        document.getElementById("left-trigger").style.display = "none";
        document.getElementById("right-trigger").style.display = "inline";
    }
});

$(document).ready(function () {
    $('#slide-revealer').show();
});
