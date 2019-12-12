// BUTTERCAKE CORE
(function ($, window) {
  'use strict';
  var ButterCake = function () {

    // DEAFULTS
    var settings = {
      plugins: {}
    };

    var enabled = {};

    var BcSettings = {
      breakPoints: {
        'sm': 580,
        'md': 780,
        'lg': 1150,
        'xl': 1250
      },
      body: $('body , html'),
    }

    function plugin(pluginName, pluginFuntion, initPlugin) {

      var initPlugin = '' ? false : initPlugin;

      settings.plugins[pluginName] = {
        enabled: initPlugin,
        run: pluginFuntion
      };
      enabled[pluginName] = initPlugin;

      this[pluginName] = pluginFuntion;
      if (initPlugin) {
        if (enabled[pluginName]) {
          settings.plugins[pluginName].run()
        }
      }
    }

    function InitPlugin(pluginName) {
      if (settings.plugins[pluginName]) {
        settings.plugins[pluginName].run();
      }
    }

    function init() {
      var timer = setTimeout(function () {
        $.each(enabled, function (pluginName) {
          if (this) {
            settings.plugins[pluginName].run();
          }
        });
        clearTimeout(timer);
      }, 100);
    }

    return {
      plugin: plugin,
      plugins: settings.plugins,
      init: init,
      initPlugin: InitPlugin,
      settings: BcSettings,
    };
  };
  Window.prototype.ButterCake = Window.prototype.$BC = ButterCake();
})(jQuery, window);


// NAVBAR
ButterCake.plugin('navbar', function () {
  var $toggler = $('.navbar .toggler');


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


// SLIDEDOWN NAVBAR
ButterCake.plugin('slideNavbar', function () {
  var $elem = $('.navbar .menu-box');
  var $toggler = $('.navbar .toggler');

  // NAVBAR RESPONSIVE BREAKING POINTS
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
    menu();

  });

  // SLIDEDOWN 
  function menu() {
    var $width = $(window).width();

    $('.navbar').each(function () {
      var $toggleWidth = $(this).attr('data-toggle');
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


});


// DROPDOWN
ButterCake.plugin('dropdown', function () {
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

  ButterCake.settings.body.on('click', function (e) {
    if (!$(e.target).is('.dropdown')) {
      $('.dropdown').removeClass('menu-showing');
    }
  });
}, true);


// MODAL
ButterCake.plugin('modal', function () {
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
  function modalOpen($modal) {
    $modal.removeClass('modal-exit').addClass('modal-show');
    $modal.find('.modal-container').addClass('animated ' + animateModal($modal)[0]);
    ButterCake.settings.body.addClass('noScroll');
    setTimeout(function () {
      $modal.find('.modal-container').removeClass('animated ' + animateModal($modal)[0]);
    }, 1000);
  }

  // MODAL CLOSE
  function modalClose($modal) {
    $modal.find('.modal-container').addClass('animated ' + animateModal($modal)[1]);
    if (animateModal($modal)[1] === '') {
      $modal.find('.modal-container').removeClass('animated ' + animateModal($modal)[1]);
      $modal.removeClass('modal-show').addClass('modal-exit');
      ButterCake.settings.body.removeClass('noScroll');
    } else {
      setTimeout(function () {
        $modal.find('.modal-container').removeClass('animated ' + animateModal($modal)[1]);
        $modal.removeClass('modal-show').addClass('modal-exit');
        if ($('.modal-show').length === 0) {
          ButterCake.settings.body.removeClass('noScroll');
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
    modalClose($modal);
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
}, true);


// TABS
ButterCake.plugin('tabs', function () {
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
}, true);


// ACCORDIONS
ButterCake.plugin('accordion', function () {
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
}, true);


// ALERTS
ButterCake.plugin('alert', function () {
  $('.alert .alert-close').on('click', function () {
    var $this = $(this);
    $this.parent('.dismissable').fadeOut('fast', function () {
      $this.parent('.dismissable').remove();
    })
  });
}, true);


// CHIPS
ButterCake.plugin('chip', function () {
  $('.chip .btn-clear-chip').on('click', function () {
    var $this = $(this);
    $this.closest('.chip').fadeOut('fast', function () {
      $this.closest('.chip').remove();
    })
  })
}, true);


// SCROLL SPY
ButterCake.plugin('scrollSpy', function (options) {
  // SETTINGS
  var scrollSpySetting = {
    el: '.scrollSpy',
    spyEl: '.scrollSpy-item',
    menu: '.scrollSpyMenu',
    menuLi: '.scrollSpyMenu li',
    offset: 150,
    speed: 100,
    activeClass: 'active'
  };

  $.extend(scrollSpySetting, options);

  // Add smooth scrolling to all links
  $(scrollSpySetting.el).on('click', function (event) {

    event.preventDefault();

    var hash = this.hash;

    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, scrollSpySetting.speed, function () {

      window.location.hash = hash;
    });
  });

  $(window).on('scroll', function () {
    $(scrollSpySetting.spyEl).each(function () {
      if ($(window).scrollTop() >= $(this).offset().top - scrollSpySetting.offset) {
        var id = $(this).attr('id');
        $(scrollSpySetting.menuLi).removeClass(scrollSpySetting.active);
        $(scrollSpySetting.menu + ' a[href=#' + id + ']').parents('li').addClass(scrollSpySetting.active);
      }
    });
  });
});


