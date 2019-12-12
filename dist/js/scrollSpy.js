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