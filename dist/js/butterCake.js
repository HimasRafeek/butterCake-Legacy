(function ($) {


    // BODY
    $body = $('body,html');

    // NAVBAR
    let $toggler = $('.navbar .toggler');
    let breakPoint = {
        'sm': 580,
        'md': 768,
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
        }else{
            $(this).attr('data-toggle', 'none');
        }
        sideBar();
        $(this).find('.container').append('<div class="shadow"></div>');
        $(this).find('.container-fluid').append('<div class="shadow"></div>');
    });

    // SIDEBAR 
    function sideBar() {
        let $width = $(window).width();
        $('.navbar').each(function () {
            let $toggleWidth = $(this).attr('data-toggle');
            if ($toggleWidth !== undefined) {
                if ($toggleWidth !== 'null' || $toggleWidth === 'none') {
                    if ($width > $toggleWidth) {
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
        $id = $(this).attr('data-nav');
        $body.toggleClass('noScroll');
        $($id).toggleClass('toggled');
    });

    // MENU CLOSE
    $('.menu-close').on('click', function () {
        $body.removeClass('noScroll');
        $($id).removeClass('toggled');
    });


    // SHADOW CLICK
    $('.shadow').click(function (e) {
        if (!$(e.target).is($id)) {
            $body.removeClass('noScroll');
            $($id).removeClass('toggled');
        }
    });


    // DROP DOWN
    let $dropdown = $('.dropdown');
    $dropdown.on('click', function (event) {
        event.stopPropagation();
        $(this).toggleClass('menu-showing')
    });
    $body.on('click', function (e) {
        if (!$(e.target).is('.dropdown')) {
            $('.dropdown').removeClass('menu-showing');
        }
    });



    // MODAL
    $('.modal-open').on('click', function () {
        let target = $(this).attr('data-modal');
        $('#' + target).removeClass('modal-exit');
        $('#' + target).addClass('modal-show');
        $body.addClass('noScroll');
    });


    // MODAL CLOSE
    $('.modal-close').on('click', function () {
        let target = $(this).attr('data-modal');
        $('#' + target).removeClass('modal-show');
        $('#' + target).addClass('modal-exit');
        if ($('.modal-show').length === 0) {
            setTimeout(function () {
                $body.removeClass('noScroll');
            }, 500);
        }
    });


    // CLICK EVENT OUTSIDE MODAL
    $('.modal').on('click', function (e) {
        if ($(e.target).is('.modal')) {
            $('.modal').removeClass('modal-show');
            $body.removeClass('noScroll');
        }
    });



    // TAB
    $('.tab-link').on('click', function () {
        $target = $(this).attr('data-tab');
        $mainParent = $(this).closest('.tabs');

        $mainParent.find('.tab-nav .tab-link').removeClass('active');
        $("[data-tab='" + $target + "']").addClass('active');

        $mainParent.find('.tab-content').removeClass('active');
        $('#' + $target).addClass('active');

    });

    // TAB CLOSE
    $('.tab-close').on('click', function () {
        $(this).closest('.tab-content').removeClass('active');
    });


    // ACCORDIAN
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


    


}(jQuery))