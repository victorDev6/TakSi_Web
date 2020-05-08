$(document).ready(function () {
  setTimeout(function () {
    $("#loader").fadeIn(500);
    $("#loader").fadeOut(500);
  }, 1);

  limpiarModalErrores();

  // Initialize Firebase
  try {
    firebase.initializeApp({
      apiKey: "AIzaSyB3Vk0nWljV4KhsfU9Co4qNNE0P_FhIJC4",
      authDomain: "taksi-d543c.firebaseapp.com",
      databaseURL: "https://taksi-d543c.firebaseio.com",
      projectId: "taksi-d543c",
      storageBucket: "taksi-d543c.appspot.com",
      messagingSenderId: "3651890584",
      appId: "1:3651890584:web:3807da6ea8ba790f560fed",
      measurementId: "G-6VDL057TWQ",
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

  //Variable global
  var estatus_user_global = "";
  /********************************************************** */
  /*MOSTRAR PASSWORD
/*********************************************************** */
  $("#mostrarPass").click(function () {
    var pass = document.getElementById("pass_ini_sesion");
    if (pass.type === "password") {
      pass.type = "text";
      document.getElementById("iconoOjoS").classList.remove("fa-eye-slash");
      document.getElementById("iconoOjoS").classList.add("fa-eye");
    } else {
      pass.type = "password";
      document.getElementById("iconoOjoS").classList.remove("fa-eye");
      document.getElementById("iconoOjoS").classList.add("fa-eye-slash");
    }
  });
  /********************************************************** */
  /*LIMPIA LOS DOS CAMPOS
/*********************************************************** */
  function Limpiar() {
    document.getElementById("email_ini_sesion").value = "";
    document.getElementById("pass_ini_sesion").value = "";
  }

  /********************************************************** */
  /*INICIAR SESION
/*********************************************************** */
  function ingreso() {
    var email_ini_sesion = document.getElementById("email_ini_sesion").value;
    var pass_ini_sesion = document.getElementById("pass_ini_sesion").value;

    firebase
      .auth()
      .signInWithEmailAndPassword(email_ini_sesion, pass_ini_sesion)

      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        switch (errorCode) {
          case "auth/invalid-email":
            mensajeM = `¡El correo no es valido!. Verifique`;
            colorTodos = "#ffc107";
            linkImagen = "../../Diseno/ICONOS/icon_modal_alert.svg";
            mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
            break;

          case "auth/user-disabled":
            mensajeM = `¡El correo ingresado, esta deshabilitado!`;
            colorTodos = "#ffc107";
            linkImagen = "../../Diseno/ICONOS/icon_modal_alert.svg";
            mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
            break;

          case "auth/user-not-found":
            mensajeM = `¡No existe ningun usuario con este correo`;
            colorTodos = "#ffc107";
            linkImagen = "../../Diseno/ICONOS/icon_modal_alert.svg";
            mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
            break;

          case "auth/wrong-password":
            mensajeM = `¡La contraseña no es valida!`;
            colorTodos = "#ffc107";
            linkImagen = "../../Diseno/ICONOS/icon_modal_alert.svg";
            mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
            break;

          default:
            mensajeM = `¡Error!<br>
            Intentalo mas tarde`;
            colorTodos = "#e24c4b";
            linkImagen = "../../Diseno/ICONOS/icon_modal_error.svg";
            mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
            break;
        }
      });
  }
  $("#btn_ini_sesion").click(function (e) {
    e.preventDefault();
    limpiarModalErrores();
    let validarUser = $("#formularioInicioSesion")
      .data("bootstrapValidator")
      .validate();
    if (validarUser.isValid()) {
      setTimeout(function () {
        $("#loader").fadeIn(500);
        $("#loader").fadeOut(500);
      }, 1);
      ingreso();
    } else {
      mensajeM = `Verifique los campos`;
      colorTodos = "#ffc107";
      linkImagen = "../../Diseno/ICONOS/icon_modal_alert.svg";
      mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
    }
  });

  //Al dar enter
  $("#pass_ini_sesion , #email_ini_sesion").keypress(function (e) {
    if (e.which == 13) {
      e.preventDefault();
      limpiarModalErrores();
      let validarUser = $("#formularioInicioSesion")
        .data("bootstrapValidator")
        .validate();
      if (validarUser.isValid()) {
        setTimeout(function () {
          $("#loader").fadeIn(500);
          $("#loader").fadeOut(500);
        }, 1);
        ingreso();
      } else {
        mensajeM = `Verifique los campos`;
        colorTodos = "#ffc107";
        linkImagen = "../../Diseno/ICONOS/icon_modal_alert.svg";
        mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
      }
    }
  });

  /**AdCkeck */
  function adCheck() {
    let adCheck = document.getElementById("pass_ini_sesion").value;
    let valorAdchek = false;
    try {
      separador = "_"; // un espacio en blanco
      limit = 2;
      arrayDivicion = adCheck.split(separador);
      if (arrayDivicion[0] === "admin") {
        valorAdchek = true;
      }
    } catch (error) {
      console.log(error);
    }
    return valorAdchek;
  }

  /********************************************************** */
  /*ESTA EN ESCUCHA POR CUALQUIER CAMBIO
/*********************************************************** */
  function observador() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        let email = user.email;
        let verifiEmail = user.emailVerified;

        BuscarStatus(email);

        setTimeout(() => {
          if (verifiEmail && estatus_user_global == "true") {
            checkAd = adCheck();
            if (checkAd) {
              window.location = "../../vistas/AdminGeneral/AdminGeneral.html";
            } else {
              buscarIdDoc(email);
              MostrarBienvenida(user);
              Limpiar();
            }
          } else if (estatus_user_global == "false" && verifiEmail === true) {
            mensajeM = `¡Su cuenta ha sido bloqueada!`;
            colorTodos = "#e24c4b";
            linkImagen = "../../Diseno/ICONOS/icon_modal_error.svg";
            mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
            cerrarSesion();
          } else if (verifiEmail === false) {
            mensajeM = `Revise su correo y active su cuenta para poder accesar`;
            colorTodos = "#ffc107";
            linkImagen = "../../Diseno/ICONOS/icon_modal_alert.svg";
            mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
            cerrarSesion();
          }
        }, 1000);
      } else {
        // User is signed out.
        //console.log("no existe usuario activo");
      }
    });
  }
  observador();
  /********************************************************** */
  /*SOLO MUESTRA EL MODAL DE BIENVENIDA
/*********************************************************** */
  function MostrarBienvenida(user) {
    let mensajeM = `Bienvenido ${user.email}`;
    let colorTodos = "#4caf50";
    let linkImagen = "../../Diseno/ICONOS/icon_modal_correct.svg";
    mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
  }
  /********************************************************** */
  /*CAMBIA EL ESTADO DE EMAIL A ACTIVO
/*********************************************************** */
  function updateStateEmail(idDoc) {
    db.collection("reg_prop_prin_web")
      .doc(idDoc)
      .update({
        verifEmail: "true",
      })
      .then(function () {
        //Document successfully updated
      });
  }
  /********************************************************** */
  /*SI SE VERIFICO EL CORREO SE EJECUTA ESTO
/*********************************************************** */
  function buscarIdDoc(emailU) {
    let obtenerId = "";
    let obtenerStateEmail = "";
    let mensajeM;
    let colorTodos;
    let linkImagen;
    db.collection("reg_prop_prin_web")
      .where("email", "==", emailU)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          obtenerId = doc.id;
          obtenerStateEmail = doc.data().verifEmail;
        });
        if (obtenerStateEmail === "false") {
          updateStateEmail(obtenerId);
        }
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
        mensajeM = `¡Error de comunicación!<br>
            Inténtalo mas tarde`;
        colorTodos = "#e24c4b";
        linkImagen = "../../Diseno/ICONOS/icon_modal_error.svg";
        mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
      });
  }
  /********************************************************** */
  /*AGREGAR DATOS AL MODAL Y CERRAR MODAL
/*********************************************************** */
  function mostrarModalMensaje(mensajeM, colorTodos, linkImagenCuerpo) {
    $("#cabezaModal").css("background-color", colorTodos);
    $("#textoCuerpoModal").css("color", colorTodos);
    $("#botonAceptarModalM").css("background-color", colorTodos);
    $("#imagenCuerpoM").attr("src", linkImagenCuerpo);
    $("#textoCuerpoModal").html(mensajeM);
    $("#modalMensajesM").modal("show");
    setTimeout(QuitarModalM, 4000);
  }
  function QuitarModalM() {
    $("#modalMensajesM").modal("hide");
  }
  /********************************************************** */
  /*CERRAR SESION
/*********************************************************** */
  function cerrarSesion() {
    firebase
      .auth()
      .signOut()
      .then(function () {
        //console.log("Saliendo...");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  /********************************************************** */
  /*REESTABLECER PASSWORD
/*********************************************************** */
  function reestablecerPassword() {
    var auth = firebase.auth();
    var email_recup_pass = document.getElementById("email_recup_pass").value;
    let mensajeM;
    let colorTodos;
    let linkImagen;

    auth
      .sendPasswordResetEmail(email_recup_pass)
      .then(function () {
        mensajeM = `Correo enviado`;
        colorTodos = "#4caf50";
        linkImagen = "../../Diseno/ICONOS/icon_modal_correct.svg";
        mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        switch (errorCode) {
          case "auth/invalid-email":
            mensajeM = `¡El correo no es valido!`;
            colorTodos = "#ffc107";
            linkImagen = "../../Diseno/ICONOS/icon_modal_alert.svg";
            mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
            break;

          case "auth/user-not-found":
            mensajeM = `¡No existe ningun usuario con este correo`;
            colorTodos = "#ffc107";
            linkImagen = "../../Diseno/ICONOS/icon_modal_alert.svg";
            mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
            break;

          default:
            mensajeM = `¡Error!<br>
            Intentalo mas tarde`;
            colorTodos = "#e24c4b";
            linkImagen = "../../Diseno/ICONOS/icon_modal_error.svg";
            mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
            break;
        }
      });
  }
  $("#btn_acept_pass").click(function (e) {
    e.preventDefault();
    limpiarModalErrores();
    let validarUserRecup = $("#formularioModalRecupPass")
      .data("bootstrapValidator")
      .validate();
    if (validarUserRecup.isValid()) {
      setTimeout(function () {
        $("#loader").fadeIn(500);
        $("#loader").fadeOut(500);
      }, 1);
      reestablecerPassword();
    }
  });
  $("#btn_cancel_pass").click(function (e) {
    e.preventDefault();
    limpiarModalErrores();
  });

  //FUNCION PARA BUSCAR EL STATUS
  //Nota: intente hacer esto pero me di cuenta de que
  //debe validarlo leiver
  function BuscarStatus(email) {
    estatus_user_global = "";
    let mensajeM;
    let colorTodos;
    let linkImagen;
    db.collection("reg_prop_prin_web")
      .where("email", "==", email)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          estatus_user_global = doc.data().status;
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
        mensajeM = `¡Error de comunicación!<br>
            Inténtalo mas tarde`;
        colorTodos = "#e24c4b";
        linkImagen = "../../Diseno/ICONOS/icon_modal_error.svg";
        mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
      });
  }
}); //fin del documento
