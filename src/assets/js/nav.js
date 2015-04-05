/**
 * Navigation
 *
 * Used to control the fullscreen nav.
 */

(function($) {
    var isLateralNavAnimating = false;

    // open/close navigation
    $('.js-nav-target').on('click', function(event){
        event.preventDefault();
        // stop if nav animation is running
        if( !isLateralNavAnimating ) {
            if($(this).parents('.csstransitions').length > 0 ) {
                isLateralNavAnimating = true;
            }

            $('body').toggleClass('nav-is-active');
            $('.Nav-fullscreen__content').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                // animation is over
                isLateralNavAnimating = false;
            });
        }
    });
}(jQuery));
