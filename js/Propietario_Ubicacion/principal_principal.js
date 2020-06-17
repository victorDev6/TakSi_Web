//jQuery(document).ready(function () {
$(document).ready(function () {

$("#loaderP").removeClass("loader");
	  /* Conectarse a Firebase*/
  try {
    firebase.initializeApp({
      apiKey: "AIzaSyB3Vk0nWljV4KhsfU9Co4qNNE0P_FhIJC4",
      authDomain: "taksi-d543c.firebaseapp.com",
      projectId: "taksi-d543c",
      storageBucket: "taksi-d543c.appspot.com",
    });
  } catch (err) {
    if (!/already exists/.test(err.message)) {
      console.error(
        "Se produjo un error de inicialización de Firebase",
        err.stack
      );
    }
  }

  var db = firebase.firestore();





  /*Cerar Sidebar*/
  $(".cerrar-menu, .overlay").on("click", function () {
    $(".sidebar").removeClass("active");
    $(".overlay").removeClass("active");
  });

  /*Abrir Sidebar*/
  $(".abrir-menu").on("click", function (e) {
    e.preventDefault();
    $(".sidebar").addClass("active");
    $(".overlay").addClass("active");
  });

  /*para activar menu seleccionado*/
  $(".sidebar li a").on("click", function () {
    $("li a").removeClass("activo");
    $(this).addClass("activo");
    $("li a").removeClass("active");
    $(this).addClass("active");

    $(".sidebar").removeClass("active");
    $(".overlay").removeClass("active");
  });

  /********************************************************** */
  /*FUNCION PARA CERRAR SESION
	/*********************************************************** */
  function cerrarSesion() {
    firebase
      .auth()
      .signOut()
      .then(function () {
        window.location = "../../vistas/Principal/index.html";
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  /********************************************************** */
  /*EJECUTA EL MODAL DE CERRAR SESION
	/*********************************************************** */
  $("#cerrarsession").click(function (e) {
    e.preventDefault();
    $("#modalCerrarSesion_prop").modal("show");
  });

  /********************************************************** */
  /*AL DAR LE CLICK EN ACEPTAR DEL MODAL, SE CIERRA SESION
	/*********************************************************** */
  $("#btn_modal_cerrar_sesion_prop").click(function (e) {
    e.preventDefault();
    cerrarSesion();
    $("#modalCerrarSesion_prop").modal("hide");
  });
});
