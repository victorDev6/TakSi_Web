$(document).ready(function() {
  $(window).scroll(function() {
    if ($(this).scrollTop() > 0) {
      $("header").addClass("header2");
    } else {
      $("header").removeClass("header2");
    }
  });

  /*para activar menu seleccionado*/
  $("#sidebar nav a").on("click", function() {
    $("nav a").removeClass("activo");
    $(this).addClass("activo");
    $("nav a").removeClass("active");
    $(this).addClass("active");
  });

  /*Otro codigo para seleccionar */
  // var url = window.location.pathname;
  // var filename = url.substring(url.lastIndexOf("/") + 1);
  // $(this).removeClass("menu_activo");
  // $('.nav-link[href="' + filename + '"]').addClass("menu_activo");
}); //final del docu ready

// var URLhash = window.location.hash;
// alert(URLhash);
