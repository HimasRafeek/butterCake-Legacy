$(function () {

    // CUSTOM MENU
    if($('.page-id-col ul').length){
    $parent = $('.page-id-col ul');
    $('.section-title').each(function () {
        $id = $(this).attr('id');
        $text = $(this).text();

        $parent.append('<li><a href="#' + $id + '" class="js-scroll-trigger">' + $text + '</a></li>');
    });

    $('.trigger-cat').on('click', function () {

        $(this).parentsUntil('.page-id-col').find('ul').slideToggle();

    });


    $(window).on('scroll', function () {
        $('.section-title').each(function () {
            if ($(window).scrollTop() >= $(this).position().top - 400) {
                var id = $(this).attr('id');
                $('.page-id-col li').removeClass('active');
                $('.page-id-col li a[href="#' + id + '"]').parents('li').addClass('active');
            }
        });
    });

    }


    


    $('#feedbackForm').submit(function (e) {
        e.preventDefault();
        var notEmpty = Boolean;
        $('input').each(function () {
            if (!$(this).val().length) {
                $(this).addClass('invalid');
                $('.danger').show().slideDown().text('Fields are empty.');
                notEmpty = false;
            } else {
                $(this).removeClass('invalid');
            }
        });

        // SUBMIT IF NOT EMPTY
        if (notEmpty) {
            $('.danger').addClass('d-none').slideUp();

            // AJAX
            var form = $(this);
            var url = 'https://getbuttercake.com/email/email.php';

            $.ajax({
                type: "POST",
                url: url,
                data: form.serialize(), // serializes the form's elements.
                success: function (data) {

                    $('.danger').removeClass('danger d-none').addClass('success').html(data).slideDown();
                    $('input').each(function () {
                        $(this).val('');
                    });

                }

            });
        }
    });


});


hljs.initHighlightingOnLoad();