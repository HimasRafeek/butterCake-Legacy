(function ($, window) {

  // NAVBARS
  var $elem = $('.navbar .menu-box');

  // NAVBAR
  let $toggler = $('.navbar .toggler');
  let breakPoint = {
    'sm': 580,
    'md': 768,
    'lg': 1150,
    'xl': 1250
  }

  // NAVBAR RESPONSIVE BREAKING POINTS
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
    menu();

  });



  // SLIDEDOWN 
  function menu() {
    let $width = $(window).width();

    $('.navbar').each(function () {
      let $toggleWidth = $(this).attr('data-toggle');
      if ($toggleWidth !== undefined) {
        if ($toggleWidth !== 'null' || $toggleWidth === 'none') {
          if ($width > $toggleWidth) {
             $('.menu-box').css('max-height', '');
            $(this).find('.menu-box').removeClass('slidedown toggled');
          } else {
            $('.menu-box').css('max-height', 0);
            $(this).find('.menu-box').addClass('slidedown');
            $elem.each(function (e) {
              var $elemHeight = $($elem)[e].scrollHeight;
              $(this).attr('data-height', $elemHeight);
            });
          }
        }
      }
    });
  }

  // ON RESIZE 
  $(window).on('resize', function () {
    menu();
  });

  // TOGGLER CLICK
  $toggler.on('click', function () {
    var $elemId = $(this).attr('data-nav');
    $($elemId).toggleClass('toggled');
    var $elemHeight = parseFloat($($elemId).attr('data-height'));
    $($elemId).css('max-height', $elemHeight + "px");
    if (parseFloat($($elemId).css('max-height'))) {
      $($elemId).css('max-height', 0);
    } else {
      $($elemId).css('max-height', $elemHeight + "px");
    }
  });


}(jQuery, window))