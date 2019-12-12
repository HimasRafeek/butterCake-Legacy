  // CHIPS
  ButterCake.plugin('chip', function () {
    $('.chip .btn-clear-chip').on('click', function () {
      var $this = $(this);
      $this.closest('.chip').fadeOut('fast', function () {
        $this.closest('.chip').remove();
      })
    })
  }, true);