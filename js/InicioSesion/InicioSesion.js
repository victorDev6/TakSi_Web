//Cambia el nombre de la petaña de la pagina
window.document.title = "Iniciar Sesión";
$(document).ready(function () {
  //Obtener el hash dirección
  if (location.hash === "#!/InicioSesion") {
    $("nav a").removeClass("activo");
    $("#iniciosesion").addClass("activo");
  }

  /********************************************************** */
  /*MUESTRA EL CARGANDO AL CAMBIAR DE PAGINA
/*********************************************************** */
  setTimeout(function () {
    $("#loader").fadeIn(500);
    $("#loader").fadeOut(500);
  }, 1);

  //LIMPIA LOS ERRORES
  limpiarModalErrores();

  /********************************************************** */
  /*SE INICIA FIREBASE
/*********************************************************** */
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

  //Nuevo codigo de Iniciar Sesión
  $("#btn_ini_sesion").click(function (e) {
    e.preventDefault();
    var validar = $("#formularioInicioSesion")
      .data("bootstrapValidator")
      .validate();
    if (validar.isValid()) {
      let email_ini_sesion = document.getElementById("email_ini_sesion").value;
      let pass_ini_sesion = document.getElementById("pass_ini_sesion").value;
      setTimeout(function () {
        $("#loader").fadeIn(500);
        $("#loader").fadeOut(500);
      }, 1);
      //Tipo User
      tipoUser = pass_ini_sesion.split("_");
      if (tipoUser[0] === "admin") {
        Ingresar("admin");
      } else {
        //user afiliado
        db.collection("reg_prop_prin_web")
          .where("email", "==", email_ini_sesion.trim())
          .get()
          .then(function (snapshot) {
            if (snapshot.size > 0) {
              snapshot.forEach(function (item) {
                if (item.data().verifEmail == "false") {
                  mensajeM = `Lo sentimos, no ha activado su cuenta`;
                  colorTodos = "#fbbf0c";
                  linkImagen = "../../Diseno/ICONOS/icon_modal_alert.svg";
                  mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
                } else {
                  if (item.data().status == "false") {
                    mensajeM = `Su cuenta ha sido deshabilitada, para mas información comuniquese al centro de ayuda`;
                    colorTodos = "#fbbf0c";
                    linkImagen = "../../Diseno/ICONOS/icon_modal_alert.svg";
                    mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
                  } else {
                    Ingresar("afiliado");
                  }
                }
              });
            } else {
              mensajeM = `El email ingresado no se encuentra en el sistema`;
              colorTodos = "#fbbf0c";
              linkImagen = "../../Diseno/ICONOS/icon_modal_alert.svg";
              mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
            }
          })
          .catch(function (error) {
            console.log(error);
            mensajeM = `Ocurrio un error, intentelo de nuevo`;
            colorTodos = "#e24c4b";
            linkImagen = "../../Diseno/ICONOS/icon_modal_error.svg";
            mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
          });
      }
    } else {
      mensajeM = `Por favor, ingrese su email y contraseña correctamente`;
      colorTodos = "#fbbf0c";
      linkImagen = "../../Diseno/ICONOS/icon_modal_alert.svg";
      mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
    }
  });

  function Ingresar(type) {
    limpiarModalErrores();
    let email_ini_sesion = document.getElementById("email_ini_sesion").value;
    let pass_ini_sesion = document.getElementById("pass_ini_sesion").value;
    firebase
      .auth()
      .signInWithEmailAndPassword(email_ini_sesion, pass_ini_sesion)
      .then(function () {
        if (type == "admin") {
          mensajeM = `Bienvenido ${email_ini_sesion}`;
          colorTodos = "#4caf50";
          linkImagen = "../../Diseno/ICONOS/icon_modal_correct.svg";
          mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
          window.location = "../../vistas/AdminGeneral/AdminGeneral.html";
        } else {
          mensajeM = `Bienvenido ${email_ini_sesion}`;
          colorTodos = "#4caf50";
          linkImagen = "../../Diseno/ICONOS/icon_modal_correct.svg";
          mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
          window.location =
            "../../vistas/Propietario_Ubicacion/principal_propietario.html";
        }
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        switch (errorCode) {
          case "auth/invalid-email":
            mensajeM = `¡El correo no es valido!. Verifique`;
            colorTodos = "#fbbf0c";
            linkImagen = "../../Diseno/ICONOS/icon_modal_alert.svg";
            mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
            break;

          case "auth/user-disabled":
            mensajeM = `¡El correo ingresado, esta deshabilitado!`;
            colorTodos = "#fbbf0c";
            linkImagen = "../../Diseno/ICONOS/icon_modal_alert.svg";
            mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
            break;

          case "auth/user-not-found":
            mensajeM = `¡No existe ningun usuario con este correo`;
            colorTodos = "#fbbf0c";
            linkImagen = "../../Diseno/ICONOS/icon_modal_alert.svg";
            mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
            break;

          case "auth/wrong-password":
            mensajeM = `¡La contraseña no es valida!`;
            colorTodos = "#fbbf0c";
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

  (function Observador() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        let email = user.email;
        let verifEmail = user.emailVerified;
        if (verifEmail) {
          BuscarUsuario(email);
        }
      } else {
        console.log("No existe usuario activo");
        CerrarSesion();
        // User is signed out.
        //console.log("no existe usuario activo");
      }
    });
  })();

  function UpdateEmailVerif(id) {
    db.collection("reg_prop_prin_web")
      .doc(id)
      .update({
        verifEmail: "true",
      })
      .then(function () {
        //Si se actualizo
      });
  }

  function BuscarUsuario(email) {
    let idUser = "",
      statusVerif = "";
    db.collection("reg_prop_prin_web")
      .where("email", "==", email)
      .get()
      .then(function (user) {
        user.forEach(function (doc) {
          idUser = doc.id;
          statusVerif = doc.data().verifEmail;
        });
        if (statusVerif === "false") {
          UpdateEmailVerif(idUser, statusVerif);
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

  function CerrarSesion() {
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

  $("#pass_ini_sesion , #email_ini_sesion").keypress(function (e) {
    if (e.which == 13) {
      e.preventDefault();
      limpiarModalErrores();
      let validar = $("#formularioInicioSesion")
        .data("bootstrapValidator")
        .validate();
      if (validar.isValid()) {
        let email_ini_sesion = document.getElementById("email_ini_sesion")
          .value;
        let pass_ini_sesion = document.getElementById("pass_ini_sesion").value;
        setTimeout(function () {
          $("#loader").fadeIn(500);
          $("#loader").fadeOut(500);
        }, 1);
        //Tipo User
        tipoUser = pass_ini_sesion.split("");
        if (tipoUser[0] === "admin") {
          Ingresar("admin");
        } else {
          //user afiliado
          db.collection("reg_prop_prin_web")
            .where("email", "==", email_ini_sesion.trim())
            .get()
            .then(function (snapshot) {
              if (snapshot.size > 0) {
                snapshot.forEach(function (item) {
                  if (item.data().verifEmail === "false") {
                    mensajeM = `Lo sentimos, no ha activado su cuenta`;
                    colorTodos = "#fbbf0c";
                    linkImagen = "../../Diseno/ICONOS/icon_modal_alert.svg";
                    mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
                  } else {
                    if (item.data().status == "false") {
                      mensajeM = `Su cuenta ha sido deshabilitada, para mas información comuniquese al centro de ayuda`;
                      colorTodos = "#fbbf0c";
                      linkImagen = "../../Diseno/ICONOS/icon_modal_alert.svg";
                      mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
                    } else {
                      Ingresar("afiliado");
                    }
                  }
                });
              } else {
                mensajeM = `El email ingresado no se encuentra en el sistema`;
                colorTodos = "#fbbf0c";
                linkImagen = "../../Diseno/ICONOS/icon_modal_alert.svg";
                mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
              }
            })
            .catch(function (error) {
              console.log(error);
              mensajeM = `Ocurrio un error, intentelo de nuevo`;
              colorTodos = "#e24c4b";
              linkImagen = "../../Diseno/ICONOS/icon_modal_error.svg";
              mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
            });
        }
      } else {
        mensajeM = `Por favor, ingrese su email y contraseña correctamente`;
        colorTodos = "#fbbf0c";
        linkImagen = "../../Diseno/ICONOS/icon_modal_alert.svg";
        mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
      }
    }
  });
}); //fin del documento
