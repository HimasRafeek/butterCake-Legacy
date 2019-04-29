(function ($, window) {

  /**
   * TAB
   * ––––––––––––––––––––––––––––––––––––––––––––––––––
   */
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


}(jQuery, window))