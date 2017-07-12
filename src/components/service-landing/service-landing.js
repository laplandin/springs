// slider initialization
$('.flexslider-service').flexslider({
    animation: "slide"
});
// slider end

$('.service-designation img').on('mouseenter', function() {
    var elem = $(this).parent().siblings('.inner-circle');
   elem.addClass('outer-anim');

   setTimeout(function () {
       elem.removeClass('outer-anim');
   }, 1000);
});
