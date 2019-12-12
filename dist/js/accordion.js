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