  // ALERTS
  ButterCake.plugin('alert', function () {
    $('.alert .alert-close').on('click', function () {
      var $this = $(this);
      $this.parent('.dismissable').fadeOut('fast', function () {
        $this.parent('.dismissable').remove();
      })
    });
  }, true);