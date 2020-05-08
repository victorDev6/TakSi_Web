$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
      $("header").addClass("header2");
    } else {
      $("header").removeClass("header2");
    }
  });

  /*para activar menu seleccionado*/
  $("#sidebar nav a").on("click", function () {
    $("nav a").removeClass("activo");
    $(this).addClass("activo");
    $("nav a").removeClass("active");
    $(this).addClass("active");
  });
});
