 // NAVBAR
 ButterCake.plugin('navbar', function () {
  var $toggler = $('.navbar .toggler');
  // NAVBAR RESPONSIVE BREAKING POINTS
  // 
  $('.navbar').each(function () {

    if ($(this).hasClass('expand-sm')) {
      $(this).attr('data-toggle', ButterCake.settings.breakPoints.sm);
    } else if ($(this).hasClass('expand-md')) {
      $(this).attr('data-toggle', ButterCake.settings.breakPoints.md);
    } else if ($(this).hasClass('expand-lg')) {
      $(this).attr('data-toggle', ButterCake.settings.breakPoints.lg);
    } else if ($(this).hasClass('expand-xl')) {
      $(this).attr('data-toggle', ButterCake.settings.breakPoints.xl);
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
    ButterCake.settings.body.toggleClass('noScroll');
    $($id).toggleClass('toggled');
  });

  // MENU CLOSE
  $('.menu-close').on('click', function () {
    ButterCake.settings.body.removeClass('noScroll');
    $('.navbar .menu-box').removeClass('toggled');
  });


  // SHADOW CLICK
  $('.navbar .shadow-fixed').click(function (e) {
    $(this).parents('.navbar').find('.toggled').removeClass('toggled');
    ButterCake.settings.body.removeClass('noScroll');
  });
}, true);