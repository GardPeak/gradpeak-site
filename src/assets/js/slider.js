/**
 * Slider using bxSlider
 */

/**
 * Get Viewport Dimensions
 *
 * returns object with viewport dimensions to match css in width and height
 * properties
 *
 * @link: http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript
 */

function updateViewportDimensions() {
    var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
    return { width:x,height:y };
}

// setting the viewport width
var viewport = updateViewportDimensions();

/**
 * Viewport orientation
 */

function isPortrait() {
    return window.innerHeight > window.innerWidth;
}

function isLandscape() {
    return (window.innerWidth > window.innerHeight);
}

/**
 * Throttle Resize-triggered Events
 *
 * Wrap your actions in this function to throttle the frequency of firing them
 * off, for better performance, esp. on mobile.
 *
 * @link: http://stackoverflow.com/questions/2854407/javascript-jquery-window-resize-how-to-fire-after-the-resize-is-completed
 */

var waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
        if (!uniqueId) { uniqueId = "Don't call this twice without a uniqueId"; }
        if (timers[uniqueId]) { clearTimeout (timers[uniqueId]); }
        timers[uniqueId] = setTimeout(callback, ms);
    };
})();

/**
 * We're going to swap out the slider settings depending on device dimensions.
 */

(function ($) {

    var slideshow;
    var slideSettings = {
        auto: true,
        pager: false,
    };

    // set the viewport using the function above
    viewport = updateViewportDimensions();

    // if the viewport is tablet or less, we load in these slider options
    if (viewport.width >= 640 && isLandscape()) {
        slideSettings.mode = 'horizontal';
        slideSettings.slideWidth = 640;
        slideSettings.minSlides = 1;
        slideSettings.maxSlides = 3;
        slideSettings.slideMargin = 12;
    } else if (viewport.height >= 560 && isPortrait()) {
        slideSettings.mode = 'vertical';
        slideSettings.touchEnabled = 'false';
        slideSettings.slideWidth = 640;
        slideSettings.minSlides = 2;
        slideSettings.maxSlides = 3;
        slideSettings.slideMargin = 12;
    } else {
        slideSettings.mode = 'horizontal';
        slideSettings.slideWidth = 480;
        slideSettings.minSlides = 1;
    }

    slideshow = $('.js-bxslider').bxSlider(slideSettings);

    // check the slider is present
    if ($('.js-bxslider').length > 0) {
        $(window).resize(function() {
            waitForFinalEvent(function() {

                // update the viewport, in case the window size has changed
                viewport = updateViewportDimensions();

                // if the viewport is tablet or less, we load in these slider options
                if (viewport.width >= 640 && isLandscape()) {
                    slideSettings.mode = 'horizontal';
                    slideSettings.slideWidth = 640;
                    slideSettings.minSlides = 1;
                    slideSettings.maxSlides = 3;
                    slideSettings.slideMargin = 12;
                } else if (viewport.height >= 560 && isPortrait()) {
                    slideSettings.mode = 'vertical';
                    slideSettings.touchEnabled = 'false';
                    slideSettings.slideWidth = 640;
                    slideSettings.minSlides = 2;
                    slideSettings.maxSlides = 3;
                    slideSettings.slideMargin = 12;
                } else {
                    slideSettings.mode = 'horizontal';
                    slideSettings.slideWidth = 480;
                    slideSettings.minSlides = 1;
                }

                slideshow.destroySlider();
                slideshow.reloadSlider();

            }, 100);
        });
    }
})(jQuery);
