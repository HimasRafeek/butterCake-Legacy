(function ($, window) {


  // BODY
  $body = $('body , html');


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
  $('.navbar .shadow-fixed').click(function (e) {
    if (!$(e.target).is($id)) {
      $body.removeClass('noScroll');
      $($id).removeClass('toggled');
    }
  });


}(jQuery, window))