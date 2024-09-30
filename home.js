$(document).ready(function() {
  $(window).scroll(function() {
    var distanceFromTop = $(document).scrollTop();
    if (distanceFromTop >= $('#header').height())
    {
      $('#sticky').fadeIn(200).addClass('fixed');
    }
    else
    {
      $('#sticky').fadeOut(200).removeClass('fixed');
    }
  });
});
