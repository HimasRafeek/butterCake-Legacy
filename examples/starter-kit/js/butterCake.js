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

    if ($('.expand-sm').length) {
        $('.navbar').attr('data-toggle', breakPoint.sm);
    } else if ($('.expand-md').length) {
        $('.navbar').attr('data-toggle', breakPoint.md);
    } else if ($('.expand-lg').length) {
        $('.navbar').attr('data-toggle', breakPoint.lg);
    } else if ($('.expand-xl').length) {
        $('.navbar').attr('data-toggle', breakPoint.xl);
    }

    let $id = $('.navbar .toggler').attr('data-nav');
    function toggler($width) {
        let $toggleWidth = $('.navbar').attr('data-toggle');
        if ($width < $toggleWidth) {
            return true;
        } else {
            return false;
        }
    }

    let $width = $(window).width();
    let isOk = toggler($width);
    if (!isOk) {
        $($id).removeClass('sideNavbar toggled');
    } else {
        $($id).addClass('sideNavbar');
    }

    $(window).on('resize', function () {
        let $width = $(window).width();
        let isOk = toggler($width);
        if (!isOk) {
            $($id).removeClass('sideNavbar toggled');
        } else {
            $($id).addClass('sideNavbar');
        }
    });

    $toggler.on('click', function () {
        let $width = $(window).width();
        let isOk = toggler($width);
        if (isOk) {
            $body.toggleClass('noScroll');
            $($id).toggleClass('toggled');
        }
    });

    $('.menu-close').on('click', function () {
        $body.removeClass('noScroll');
        $($id).removeClass('toggled');
    });


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

    $('.modal').on('click', function (e) {
        if ($(e.target).is('.modal')) {
            $('.modal').removeClass('modal-show');
            $body.removeClass('noScroll');
        }
    });



}(jQuery))