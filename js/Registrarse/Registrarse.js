$(document).ready(function () {
  setTimeout(function () {
    $("#loader").fadeIn(500);
    $("#loader").fadeOut(500);
  }, 1);

  /********************************************************** */
  /*CAMBIAR ICONO DEL OJO DE CAMPOS PASSWORD
/*********************************************************** */
  $("#mostrar1").click(function () {
    var pass = document.getElementById("pass_prop");
    if (pass.type === "password") {
      pass.type = "text";
      document.getElementById("iconoOjo").classList.remove("fa-eye-slash");
      document.getElementById("iconoOjo").classList.add("fa-eye");
    } else {
      pass.type = "password";
      document.getElementById("iconoOjo").classList.remove("fa-eye");
      document.getElementById("iconoOjo").classList.add("fa-eye-slash");
    }
  });
  $("#mostrar2").click(function () {
    //Cambiar icono del ojo de la caja de password
    var pass = document.getElementById("pass2_prop");
    if (pass.type === "password") {
      pass.type = "text";
      document.getElementById("iconoOjo2").classList.remove("fa-eye-slash");
      document.getElementById("iconoOjo2").classList.add("fa-eye");
    } else {
      pass.type = "password";
      document.getElementById("iconoOjo2").classList.remove("fa-eye");
      document.getElementById("iconoOjo2").classList.add("fa-eye-slash");
    }
  });

  /********************************************************** */
  /*INICIA FIREBASE
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

  limpiarModalErrores();
  /********************************************************** */
  /*CLICK AL BOTON CONTINUAR
/*********************************************************** */
  $("#btn_add_prop").click(function (e) {
    e.preventDefault();
    limpiarModalErrores();
    var validar = $("#formularioRegistro")
      .data("bootstrapValidator")
      .validate();
    if (validar.isValid()) {
      let pass1 = document.getElementById("pass_prop").value;
      let pass2 = document.getElementById("pass2_prop").value;
      let valorChecar = 0;
      if ($("#checkTerminos_prop").prop("checked")) {
        if (pass1 === pass2) {
          /**VALIDA SI SE ENCUENTRA EN LA LISTA DE CONSESIONADOS */
          consultarFolioExis();
        } else {
          mensajeM = `Las contraseñas no coinciden`;
          colorTodos = "#ffc107";
          linkImagen = "../../Diseno/ICONOS/icon_modal_alert.svg";
          mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
        }
      } else {
        mensajeM = `Marca la casilla aceptando los terminos y condiciones`;
        colorTodos = "#ffc107";
        linkImagen = "../../Diseno/ICONOS/icon_modal_alert.svg";
        mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
      }
    } //Termina el validator
    else {
      mensajeM = `Verifique los campos`;
      colorTodos = "#ffc107";
      linkImagen = "../../Diseno/ICONOS/icon_modal_alert.svg";
      mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
    }
  });

  /********************************************************** */
  /*FUNCION GUARDAR DATOS DEL PROP registro_prop_princ_web 
/*********************************************************** */
  function SalvarDatos() {
    let nom_prop = document.getElementById("nom_prop").value;
    let ape_prop = document.getElementById("ape_prop").value;
    let cd_prop = document.getElementById("cd_prop").value;
    let edo_prop = document.getElementById("edo_prop").value;
    let direc_prop = document.getElementById("direc_prop").value;
    let mail_prop = document.getElementById("mail_prop").value;
    let num_cons_prop = document.getElementById("num_cons_prop").value;
    let cant_tax_prop = document.getElementById("cant_tax_prop").value;
    let tel_prop = document.getElementById("tel_prop").value;
    let verificacionEmail = "false";
    let mensajeM;
    let colorTodos;
    let linkImagen;

    db.collection("reg_prop_prin_web") //registro_prop_princ_web
      .add({
        nombre: nom_prop,
        apellido: ape_prop,
        ciudad: cd_prop,
        estado: edo_prop,
        direccion: direc_prop,
        email: mail_prop,
        num_consesion: num_cons_prop,
        num_taxis: cant_tax_prop,
        telefono: tel_prop,
        fecha: firebase.firestore.FieldValue.serverTimestamp(),
        verifEmail: verificacionEmail,
        status: "true",
      })
      .then(function (docRef) {
        verficar();
        LimpiarCampos(); //Limpia los campos
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
        mensajeM = `¡Error de comunicación!<br>
            Inténtalo mas tarde`;
        colorTodos = "#e24c4b";
        linkImagen = "../../Diseno/ICONOS/icon_modal_error.svg";
        mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
      });
  }

  /********************************************************** */
  /*LIMPIA CAMPOS DEL FORMULARIO
/*********************************************************** */
  function LimpiarCampos() {
    document.getElementById("nom_prop").value = "";
    document.getElementById("ape_prop").value = "";
    document.getElementById("direc_prop").value = "";
    document.getElementById("tel_prop").value = "";
    document.getElementById("cant_tax_prop").value = "";
    document.getElementById("mail_prop").value = "";
    document.getElementById("num_cons_prop").value = "";
    document.getElementById("pass_prop").value = "";
    document.getElementById("pass2_prop").value = "";
    $("#checkTerminos_prop").prop("checked", false);
  }

  /*************************************************************** */
  /*SE CONSULTA EL FOLIO SI EXISTE EN LA BD Y SI ESTA SIENDO USADO
/*************************************************************** */
  function consultarFolioExis() {
    let mensajeM;
    let colorTodos;
    let linkImagen;
    let statusFolioExis = false;
    let validFolioProp = false;
    let num_cons_prop = document.getElementById("num_cons_prop").value;

    db.collection("folios_consesion")
      .where("folio", "==", num_cons_prop)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          if (querySnapshot._snapshot.docChanges.length != 0) {
            statusFolioExis = true;
          }
        });
        //Agregamos la otra busqueda
        if (statusFolioExis) {
          //Inicio
          db.collection("reg_prop_prin_web")
            .where("num_consesion", "==", num_cons_prop)
            .where("verifEmail", "==", "true")
            .get()
            .then(function (querySnapshot2) {
              querySnapshot2.forEach(function (doc) {
                if (querySnapshot2._snapshot.docChanges.length != 0) {
                  validFolioProp = true;
                }
              });

              if (!validFolioProp) {
                setTimeout(function () {
                  $("#loader").fadeIn(500);
                  $("#loader").fadeOut(500);
                }, 1);
                registrarAuth();
              } else {
                setTimeout(function () {
                  $("#loader").fadeIn(500);
                  $("#loader").fadeOut(500);
                }, 1);
                mensajeM = `El folio ya esta siendo usado por otro usuario`;
                colorTodos = "#ffc107";
                linkImagen = "../../Diseno/ICONOS/icon_modal_alert.svg";
                mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
              }
            })
            .catch(function (error) {
              console.log("Error");
            });
          //Fin
        } else {
          mensajeM = `El numero de consesion ingresado no es valido`;
          colorTodos = "#ffc107";
          linkImagen = "../../Diseno/ICONOS/icon_modal_alert.svg";
          mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
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
  /*LLENA LOS SELECT ESTADO Y CIUDAD
/*********************************************************** */
  (function ObtenerEdo() {
    let estados = [];
    let $selectEdo = $("#edo_prop");
    db.collection("estado_ciudad")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          estados.push(doc.id);
        });
        for (const iterator of estados) {
          $selectEdo.append(
            "<option value=" + iterator + ">" + iterator + "</option>"
          );
        }
      });
    /**Accion que realiza el selectEdo para buscar ciudad*/
    const selectEdo = document.querySelector("#edo_prop");
    const selectCd = document.querySelector("#cd_prop");
    selectEdo.addEventListener("change", (event) => {
      selectCd.innerHTML = "";
      selectCd.innerHTML = `<option value="" selected>Ciudad</option>`;
      ObtenerCd(event.target.value);
    });
  })();
  function ObtenerCd(estado) {
    let obj = [];
    let arrayLibreComa = [];
    let $selectCd = $("#cd_prop");
    var docRef = db.collection("estado_ciudad").doc(estado);
    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          obj = doc.data();
          obj = Object.values(obj);
          arrayLibreComa = obj.toString().split(",");
          arrayLibreComa.forEach(function (valor, indice, array) {
            $selectCd.append(`<option value="${valor}">${valor}</option>`);
          });
        } else {
          console.log("No enontro el documento");
          $selectCd.append(`<option selected>Ciudad</option>`);
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
        mensajeM = `¡Error de comunicación!<br>
            Inténtalo mas tarde`;
        colorTodos = "#e24c4b";
        linkImagen = "../../Diseno/ICONOS/icon_modal_error.svg";
        mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
      });
  }

  /********************************************************** */
  /*SI ESTA TODO BIEN, SE REGISTRA LA CUENTA EN AUTH Y 
  SE GUARDAN LOS DATOS AL MISMO TIEMPO
/*********************************************************** */
  function registrarAuth() {
    let mail_prop = document.getElementById("mail_prop").value;
    let pass_prop = document.getElementById("pass_prop").value;
    let mensajeM;
    let colorTodos;
    let linkImagen;
    firebase
      .auth()
      .createUserWithEmailAndPassword(mail_prop, pass_prop)
      .then(function () {
        SalvarDatos();
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        switch (errorCode) {
          case "auth/weak-password":
            mensajeM = `¡La contraseña no es segura!. Minimo 6 caracteres`;
            colorTodos = "#ffc107";
            linkImagen = "../../Diseno/ICONOS/icon_modal_alert.svg";
            mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
            break;

          case "auth/operation-not-allowed":
            mensajeM = `¡Operacion no permitida!`;
            colorTodos = "#ffc107";
            linkImagen = "../../Diseno/ICONOS/icon_modal_alert.svg";
            mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
            break;

          case "auth/invalid-email":
            mensajeM = `¡El correo no es valido!. Verifique`;
            colorTodos = "#ffc107";
            linkImagen = "../../Diseno/ICONOS/icon_modal_alert.svg";
            mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
            break;

          case "auth/email-already-in-use":
            mensajeM = `¡Ya existe una cuenta con este correo!`;
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

  /********************************************************** */
  /*UNA VEZ QUE SE HAYA REGISTRADO SE EJECUTA ESTA FUNCION
    PARA ENVIAR EMAIL AL USER Y QUE LO ACTIVE
/*********************************************************** */
  function verficar() {
    var user = firebase.auth().currentUser;
    user
      .sendEmailVerification()
      .then(function () {
        let mensajeM = `Registro exitoso <br> Verifique el correo para la activación de su cuenta`;
        let colorTodos = "#4caf50";
        let linkImagen = "../../Diseno/ICONOS/icon_modal_correct.svg";
        mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
      })
      .catch(function (error) {
        console.log(error);
        let mensajeM = `¡Error! <br> El email no se envió`;
        let colorTodos = "#e24c4b";
        let linkImagen = "../../Diseno/ICONOS/icon_modal_error.svg";
        mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
      });
  }
  /********************************************************** */
  /*FUNCION PARA MODIFICAR EL MODAL DE MENSAJES Y OCULTAR
/*********************************************************** */
  function mostrarModalMensaje(mensajeM, colorTodos, linkImagenCuerpo) {
    $("#cabezaModal").css("background-color", colorTodos);
    $("#textoCuerpoModal").css("color", colorTodos);
    $("#botonAceptarModalM").css("background-color", colorTodos);
    $("#imagenCuerpoM").attr("src", linkImagenCuerpo);
    $("#textoCuerpoModal").html(mensajeM);
    $("#modalMensajesM").modal("show");
    setTimeout(QuitarModalM, 3000);
  }
  function QuitarModalM() {
    $("#modalMensajesM").modal("hide");
  }
}); //fin del doc
