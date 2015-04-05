/**
 * Image compare
 */

function drags(dragElement, resizeElement, container) {

    // Initialize the dragging event on mousedown.
    dragElement.on('mousedown touchstart', function(e) {

        dragElement.addClass('is-draggable');
        resizeElement.addClass('is-resizable');

        // Check if it's a mouse or touch event and pass along the correct value
        var startX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

        // Get the initial position
        var dragWidth = dragElement.outerWidth(),
            posX = dragElement.offset().left + dragWidth - startX,
            containerOffset = container.offset().left,
            containerWidth = container.outerWidth();

        // Set limits
        var minLeft = containerOffset + 10,
            maxLeft = containerOffset + containerWidth - dragWidth - 10;

        // Calculate the dragging distance on mousemove.
        dragElement.parents().on("mousemove touchmove", function(e) {

            // Check if it's a mouse or touch event and pass along the correct value
            var moveX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX,
                leftValue = moveX + posX - dragWidth;

            // Prevent going off limits
            if ( leftValue < minLeft) {
                leftValue = minLeft;
            } else if (leftValue > maxLeft) {
                leftValue = maxLeft;
            }

            // Translate the handle's left value to masked divs width.
            var widthValue = (leftValue + dragWidth/2 - containerOffset)*100/containerWidth+'%';

            // Set the new values for the slider and the handle.
            // Bind mouseup events to stop dragging.
            $('.is-draggable').css('left', widthValue).on('mouseup touchend touchcancel', function () {
                $(this).removeClass('is-draggable');
                resizeElement.removeClass('is-resizable');
            });
            $('.is-resizable').css('width', widthValue);

        }).on('mouseup touchend touchcancel', function() {
            dragElement.removeClass('is-draggable');
            resizeElement.removeClass('is-resizable');
        });

        e.preventDefault();

    }).on('mouseup touchend touchcancel', function(e) {
        dragElement.removeClass('is-draggable');
        resizeElement.removeClass('is-resizable');
    });
}

// Call & init compare tool
$(document).ready(function() {
    $('.js-image-compare-tool').each(function() {
        var cur = $(this);
        // Adjust the slider
        var width = cur.width()+'px';
        cur.find('.Image-compare__resize img').css('width', width);
        // Bind dragging events
        drags(cur.find('.Image-compare__handle'), cur.find('.Image-compare__resize'), cur);
    });
});

// Update tool on window resize
// Because we all do this: i.imgur.com/YkbaV.gif
$(window).resize(function(){
    $('.js-image-compare-tool').each(function(){
        var cur = $(this);
        var width = cur.width()+'px';
        cur.find('.Image-compare__resize img').css('width', width);
    });
});
