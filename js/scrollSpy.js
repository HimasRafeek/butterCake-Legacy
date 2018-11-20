/*!
 * jQuery Scroll Spy Plugin
 * Author: Jannis Betz @ Rock5 <jannis.betz@rock5.de>
 * Licensed under the MIT license
 */

;
(function ($) {
    $.fn.scrollspy = function (options) {

        var settings = $.extend({
                // These are the defaults.
                scrollElement: window,
                activeClass: 'active',
                throttle: 250,
                distanceBottom: 3,
                distanceBottomUnit: 'fraction',
                addSideClasses: false,
                inCallback: function ($element, side) {
                    return true;
                },
                outCallback: function ($element, side) {
                    return true;
                }
            },
            options
        );

        var didScroll = true;


        var lastIndex = 999;
        var lastActive = null;
        var $collection = $($(this).get().reverse());

        var spy = function (scroll) {
            var height = $(window).height();
            var distanceBottom;

            if (settings.distanceBottomUnit === 'fraction') {

                distanceBottom = height / settings.distanceBottom;
            } else if (settings.distanceBottomUnit === 'pixel' || settings.distanceBottomUnit === 'px') {

                distanceBottom = height - settings.distanceBottom;
            } else if (settings.distanceBottomUnit === 'percent' || settings.distanceBottomUnit === '%') {

                distanceBottom = height * settings.distanceBottom / 100;
            }

            var min = scroll + (height - distanceBottom);
            $collection.each(function (index) {
                var $_this = $(this);
                if ($_this.offset().top <= min) {

                    if (!$_this.hasClass(settings.activeClass)) {
                        var sideIn = 'bottom';
                        var sideOut = 'top';
                        if (lastIndex < index) {
                            sideIn = 'top';
                            sideOut = 'bottom';
                        }

                        if (lastActive !== null) {

                            lastActive.removeClass(settings.activeClass);

                            if (settings.addSideClasses) {

                                lastActive.removeClass('in-bottom')
                                    .removeClass('in-top')
                                    .addClass('out-' + sideOut);
                            }

                            settings.outCallback(lastActive, sideOut);
                        }

                        $_this.addClass(settings.activeClass);

                        if (settings.addSideClasses) {
                            $_this.addClass('in-' + sideIn)
                                .removeClass('out-bottom')
                                .removeClass('out-top');
                        }

                        settings.inCallback($_this, sideIn);

                        lastActive = $_this;
                        lastIndex = index;
                    }

                    // Break loop
                    return false;
                }

            });
        };

        $(settings.scrollElement).on('scroll', function () {
            didScroll = true;
        });

        setInterval(function () {
            if (didScroll) {
                didScroll = false;

                spy($(window).scrollTop());
            }
        }, settings.throttle);

        return this;
    };
})(jQuery);