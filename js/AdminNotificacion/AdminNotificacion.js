$(document).ready(function(){
    $('.toast').toast('show');

//efecto zoom
    $('.zoom').hover(function() {
        $(this).addClass('transition');
    }, function() {
        $(this).removeClass('transition');
    });
});


