(function ($, window) {

    "use strict";


    // BODY
    var $body = $('body , html');

    
    /**
     * NAVBAR
     * ––––––––––––––––––––––––––––––––––––––––––––––––––
     */
    var $toggler = $('.navbar .toggler');
    var breakPoint = {
        'sm': 580,
        'md': 780,
        'lg': 1150,
        'xl': 1250
    }

    // NAVBAR RESPONSIVE BREAKING POINTS
    // 
    $('.navbar').each(function () {

        if ($(this).hasClass('expand-sm')) {
            $(this).attr('data-toggle', breakPoint.sm);
        } else if ($(this).hasClass('expand-md')) {
            $(this).attr('data-toggle', breakPoint.md);
        } else if ($(this).hasClass('expand-lg')) {
            $(this).attr('data-toggle', breakPoint.lg);
        } else if ($(this).hasClass('expand-xl')) {
            $(this).attr('data-toggle', breakPoint.xl);
        } else if ($(this).hasClass('expanded')) {
            $(this).attr('data-toggle', 'null');
        } else {
            $(this).attr('data-toggle', 'none');
        }
        sideBar();
        $(this).find('.container').append('<div class="shadow-fixed"></div>');
        $(this).find('.container-fluid').append('<div class="shadow-fixed"></div>');
    });

    // SIDEBAR 
    function sideBar() {
        var $width = $(window).width() + 15;
        $('.navbar').each(function () {
            var $toggleWidth = $(this).attr('data-toggle');
            if ($toggleWidth !== undefined) {
                if ($toggleWidth !== 'null' || $toggleWidth === 'none') {
                    if ($width >= $toggleWidth) {
                        $(this).find('.menu-box').removeClass('sideNavbar toggled');
                    } else {
                        $(this).find('.menu-box').addClass('sideNavbar');
                    }
                }
            }

        });
    }


    // ON RESIZE 
    $(window).on('resize', function () {
        sideBar();
    });

    // TOGGLER CLICK
    $toggler.on('click', function () {
        var $id = $(this).attr('data-nav');
        $body.toggleClass('noScroll');
        $($id).toggleClass('toggled');
    });

    // MENU CLOSE
    $('.menu-close').on('click', function () {
        $body.removeClass('noScroll');
        $('.navbar .menu-box').removeClass('toggled');
    });


    // SHADOW CLICK
    $('.navbar .shadow-fixed').click(function (e) {
        var $id = $(this).parents('.navbar').find('.toggler').attr('data-nav');
        if (!$(e.target).is($id)) {
            $body.removeClass('noScroll');
            $($id).removeClass('toggled');
        }
    });


    /**
     * DROPDOWN
     * ––––––––––––––––––––––––––––––––––––––––––––––––––
     */
    var $dropdown = $('.dropdown');
    $('.dropdown > a').on('click', function (e) {
        e.preventDefault();
    })

    $dropdown.on('click', function (event) {
        event.stopPropagation();
        $(this).siblings('.dropdown').removeClass('menu-showing');
        $(this).toggleClass('menu-showing');
    });

    $dropdown.on('mouseleave', function (event) {
        event.stopPropagation();
        $(this).removeClass('menu-showing');
    });

    $body.on('click', function (e) {
        if (!$(e.target).is('.dropdown')) {
            $('.dropdown').removeClass('menu-showing');
        }
    });



    /**
     * MODAL
     * ––––––––––––––––––––––––––––––––––––––––––––––––––
     */

    // MODAL ANIMATIONS
    function animateModal($modal) {
        var animate = $modal.find('.modal-container').attr('data-modal-animate');
        if (typeof animate !== typeof undefined && animate !== false) {
            animate = animate.split(',');
            return animate;
        } else {
            $modal.find('.modal-container').addClass('animation-added');
            return ['', ''];
        }
    }

    // MODAL OPEN
    function modalOpen($modal){
        $modal.removeClass('modal-exit').addClass('modal-show');
        $modal.find('.modal-container').addClass('animated ' + animateModal($modal)[0]);
        $body.addClass('noScroll');
        setTimeout(function () {
            $modal.find('.modal-container').removeClass('animated ' + animateModal($modal)[0]);
        }, 1000);
    }

    // MODAL CLOSE
    function modalClose($modal){
        $modal.find('.modal-container').addClass('animated ' + animateModal($modal)[1]);
        if (animateModal($modal)[1] === '') {
            $modal.find('.modal-container').removeClass('animated ' + animateModal($modal)[1]);
            $modal.removeClass('modal-show').addClass('modal-exit');
        } else {
            setTimeout(function () {
                $modal.find('.modal-container').removeClass('animated ' + animateModal($modal)[1]);
                $modal.removeClass('modal-show').addClass('modal-exit');
                if ($('.modal-show').length === 0) {
                    $body.removeClass('noScroll');
                }
            }, 1000);
        }
    }

    // MODAL OPEN ON CLICK
    $('.modal-open').on('click', function (e) {
        e.preventDefault();
        var target = $(this).attr('data-modal');
        var $modal = $('#' + target);
        modalOpen($modal);
    });


    // MODAL CLOSE ON CLICK
    $('.modal-close').on('click', function (e) {
        e.preventDefault();
        var target = $(this).attr('data-modal');
        var $modal = $('#' + target);
        modalClose($modal)
    });

    // MODAL PLUGIN
    $.fn.BCModal = function () {
        var $target = $(this);

        function open() {
            modalOpen($target);
        }

        function close() {
            modalClose($target);
        }

        return {
            open: open,
            close: close
        }

    };


    // CLICK EVENT OUTSIDE MODAL
    $('.modal').on('click', function (e) {
        if ($(e.target).is('.modal')) {
            var $modal = $('.modal.modal-show');
            modalClose($modal);
        }
    });



    /**
     * TAB
     * ––––––––––––––––––––––––––––––––––––––––––––––––––
     */
    $('.tab-link').on('click', function () {
        var $target = $(this).attr('data-tab');
        var $mainParent = $(this).closest('.tabs');

        $mainParent.find('.tab-nav .tab-link').removeClass('active');
        $("[data-tab='" + $target + "']").addClass('active');

        $mainParent.find('.tab-content').removeClass('active');
        $('#' + $target).addClass('active');

    });

    // TAB CLOSE
    $('.tab-close').on('click', function () {
        $(this).closest('.tab-content').removeClass('active');
    });


    /**
     * ACCORDION
     * ––––––––––––––––––––––––––––––––––––––––––––––––––
     */
    $('.accordion').each(function () {

        if ($(this).hasClass('active')) {
            var panel = $(this).next('.panel');
            $(this).next('.panel').css('max-height', panel[0].scrollHeight + "px");
        }

        $('.accordion').on('click', function () {

            $('.accordion').next('.panel').css('max-height', 0);
            $('.accordion').removeClass('active');

            panel = $(this).next('.panel');
            $(this).addClass('active');
            if (parseFloat($(this).next('.panel').css('max-height'))) {
                $(this).next('.panel').css('max-height', 0);
                $(this).removeClass('active');
            } else {
                $(this).next('.panel').css('max-height', panel[0].scrollHeight + "px");
            }
        });
    });


    /**
     * ALERT
     * ––––––––––––––––––––––––––––––––––––––––––––––––––
     */
    $('.alert .alert-close').on('click', function () {
        var $this = $(this);
        $this.parent('.dismissable').fadeOut('fast', function () {
            $this.parent('.dismissable').remove();
        })
    });

    /**
     * CHIPS
     * ––––––––––––––––––––––––––––––––––––––––––––––––––
     */
    $('.chip .btn-clear-chip').on('click', function () {
        var $this = $(this);
        $this.closest('.chip').fadeOut('fast', function () {
            $this.closest('.chip').remove();
        })
    })


}(jQuery, window))