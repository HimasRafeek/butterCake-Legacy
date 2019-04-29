(function ($, window) {

  // BODY
  $body = $('body , html');

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

}(jQuery, window))