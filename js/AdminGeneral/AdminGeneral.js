//$(document).ready(function() {
/**INICIAMOS FIREBASE */
try {
  firebase.initializeApp({
    apiKey: "AIzaSyB3Vk0nWljV4KhsfU9Co4qNNE0P_FhIJC4",
    authDomain: "taksi-d543c.firebaseapp.com",
    databaseURL: "https://taksi-d543c.firebaseio.com",
    projectId: "taksi-d543c",
    storageBucket: "taksi-d543c.appspot.com",
    messagingSenderId: "3651890584",
    appId: "1:3651890584:web:3807da6ea8ba790f560fed",
    measurementId: "G-6VDL057TWQ"
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
$(".cerrar-menu, .overlay").on("click", function() {
  $(".sidebar").removeClass("active");
  $(".overlay").removeClass("active");
});

/*Abrir Sidebar*/
$(".abrir-menu").on("click", function(e) {
  e.preventDefault();
  $(".sidebar").addClass("active");
  $(".overlay").addClass("active");
});

/*para activar menu seleccionado*/
$(".sidebar li a").on("click", function() {
  $("li a").removeClass("activo");
  $(this).addClass("activo");
  $("li a").removeClass("active");
  $(this).addClass("active");

  $(".sidebar").removeClass("active");
  $(".overlay").removeClass("active");
});

/********************************************************** */
/*CERRAR SESION Y OBSERVADOR
/*********************************************************** */
function observador() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      let email = user.email;
      let verifiEmail = user.emailVerified;

      if (verifiEmail) {
        console.log("Admin Activo");
      } else {
        cerrarSesion();
      }
    } else {
      console.log("No hay usuario activo");
      cerrarSesion();
    }
  });
}
observador();

function cerrarSesion() {
  firebase
    .auth()
    .signOut()
    .then(function() {
      window.location = "../../vistas/Principal/index.html";
    })
    .catch(function(error) {
      console.log(error);
    });
}
/********************************************************** */
/*EJECUTA EL MODAL DE CERRAR SESION
/*********************************************************** */
$("#cerrarsession").click(function(e) {
  e.preventDefault();
  $("#modalCerrarSesion").modal("show");
});

/********************************************************** */
/*CIERRA SESION Y REDIRECCIONA A INDEX PRINCIPAL
/*********************************************************** */
$("#btn_modal_cerrar_sesion").click(function(e) {
  e.preventDefault();
  cerrarSesion();
  $("#modalCerrarSesion").modal("hide");
});
//});
