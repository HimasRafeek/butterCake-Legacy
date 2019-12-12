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