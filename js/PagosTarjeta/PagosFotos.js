/********************************************************** */
/*SE INICIA SELECTPICKER
/*********************************************************** */
$("select").selectpicker();

/********************************************************** */
/*VARIABLES GLOBALES
/*********************************************************** */
var numeroNoti = "";
var file = "";
var montoMes_global = 0;
var montoAnual_global = 0;
var descuento_global = 0;
var email_global = "";
var estado_global = "";
var ciudad_global = "";
var telefono_global = "";
var nombre_global = "";
var apellido_global = "";
var consesion_global = "";
var opcionPago_global = "";
/********************************************************** */
/*SE INICIA FIRESTORE Y STORAGE
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
var storageRef = firebase.storage().ref();

/* Funcion lanzada por clase, que extrae el ID de quien lo lanzo, para procesar su imagen de salida*/
$(".selectorImagen").click(function (e) {
  switch (e.target.id) {
    case "imgSubida1":
      inImg = e.target.id;
      $("#imagenNoticia1").click();
      numeroNoti = "1";
      break;
  }
});
/* Se carga la imagen de Perfil en el input correspondiente, unicamente si es un formato válido (png,jpg y jpeg)*/
$("#imagenNoticia1").change(function () {
  file = $("#imagenNoticia" + numeroNoti).val();
  var ext = file.substring(file.lastIndexOf("."));
  if (
    ext == ".jpg" ||
    ext == ".png" ||
    ext == ".JPG" ||
    ext == ".PNG" ||
    ext == ".JPEG" ||
    ext == ".jpeg"
  ) {
    var imgExt = 23;
    if (ext == ".png" || ext == ".PNG") {
      imgExt = 22;
    }
    var preview = document.getElementById("imgSubida" + numeroNoti);
    file = document.getElementById("imagenNoticia" + numeroNoti).files[0];
    extension_PM = ext; //ext de imagen

    $("#imgSubida" + numeroNoti).attr("title", file.name);
    $("#imgSubida" + numeroNoti).attr("alt", imgExt);
    var reader = new FileReader();
    reader.addEventListener(
      "load",
      function () {
        preview.src = reader.result;
        //Hace que muestre la img
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  } else {
    $("#imgSubida" + numeroNoti).attr(
      "src",
      "../../Diseno/ICONOS/fotoDefault.svg"
    );
  }
});

/********************************************************** */
/*FUNCION QUE SUBE LA IMG A STORAGE
/*********************************************************** */
function SubirFotoFirebase() {
  $("#loaderFoto").show();
  var imagenASubir = file;
  var uploadTask = storageRef
    .child("Fotos_Pagos/" + imagenASubir.name)
    .put(imagenASubir);

  uploadTask.on(
    "state_changed",
    function (snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //showProgress(progress); //ejecutar progreso
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          //console.log("Upload is paused");
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          //console.log("Upload is running");
          break;
      }
    },
    function (error) {
      // Handle unsuccessful uploads
      $("#loaderFoto").hide();
      mensajeM = `<span>Error de Comunicación</span>`;
      ShowModalMensajes(mensajeM, "0");
    },
    function () {
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        GuardarDatos(downloadURL);
      });
    }
  );
}
/********************************************************** */
/*GUARDAR DATOS EN LA BD
/*********************************************************** */
function GuardarDatos(url) {
  let mensajeM = "";
  let descripcion = document.getElementById("descripcion_pago").value;
  let solicitudes = document.getElementById("cajaTaxiSelect").value;
  let correo = email_global;
  let telefono = telefono_global;
  let estado = estado_global;
  let ciudad = ciudad_global;
  let foto_url = url;
  let nombre = nombre_global;
  let apellido = apellido_global;
  let consesion = consesion_global;
  let opcionPago = opcionPago_global;
  //console.log(descripcion);
  db.collection("solicitudes_pagos")
    .add({
      url: foto_url,
      email: correo,
      descripcion: descripcion,
      fecha: firebase.firestore.FieldValue.serverTimestamp(),
      solicitudes: solicitudes,
      estado: estado,
      ciudad: ciudad,
      telefono: telefono,
      nombre: nombre,
      apellido: apellido,
      consesion: consesion,
      estado_pago: "Pendiente",
      opcion_pago: opcionPago,
    })
    .then(function (docRef) {
      console.log("Registro exitoso");
      document.getElementById("descripcion_pago").value = "";
      $("#loaderFoto").hide();
      mensajeM = `<span class="text-info">¡Solicitud enviada correctamente!</span><br><br>
                  <span class="text-info">Esperé entre 2 a 3 horas</span><br>
                  <span class="text-info">El equipo verificará sus datos si son veridicos y se activará su cuenta</span>`;
      ShowModalMensajes(mensajeM, "1");
    })
    .catch(function (error) {
      $("#loaderFoto").hide();
      console.error("Error adding document: ", error);
      mensajeM = `<span>Error de Comunicación</span>`;
      ShowModalMensajes(mensajeM, "0");
    });
}
/********************************************************** */
/*EL SELECT OCULTA ELEMENTOS Y LLENA A LA ACAJA DE TEXTO OCULTO
/*********************************************************** */
$("#selectTaxis").change(function () {
  $("#cajaTaxiSelect").val("" + $("#selectTaxis").val());
  let cajaSelect = document.getElementById("cajaTaxiSelect").value;
  //let contenidoSelect = document.getElementById("selectTaxis");
  //let selectedText = contenidoSelect.options[contenidoSelect.selectedIndex].text;
  //let texto = $(this).find("option:selected").text();
  //$("#cajaMontos").val('' + texto);

  if (cajaSelect === "") {
    $("#mensajeSeleccion").removeClass("d-none");
    $("#ocul_btn_continuar").addClass("d-none");
    $("#ocul_btn_enviar").addClass("d-none");
    $("#oculCajaImg").addClass("d-none");
  } else {
    $("#mensajeSeleccion").addClass("d-none");
    $("#ocul_btn_continuar").removeClass("d-none");
    $("#ocul_btn_enviar").addClass("d-none");
    $("#oculCajaImg").addClass("d-none");
  }
});
/********************************************************** */
/*BOTON QUE DA SIGUIENTE
/*********************************************************** */
$("#btn_continuar_pago").click(function (e) {
  e.preventDefault();
  let mensaje = `<span class="text-info">Ahora suba la foto de su ticket de pago, coherente con lo que seleccionó.</span>`;
  ShowModalMensajes(mensaje, "0");
  $("#ocul_btn_enviar").removeClass("d-none");
  $("#ocul_btn_continuar").addClass("d-none");
  $("#oculCajaImg").removeClass("d-none");
});

/********************************************************** */
/*BOTON QUE GUARDA LOS DATOS A LA BD
/*********************************************************** */
$("#btn_enviar_datos").click(function (e) {
  e.preventDefault();
  limpiarModalErrores();
  let validarUser = $("#formulario_pagos")
    .data("bootstrapValidator")
    .validate();
  if (validarUser.isValid()) {
    //Aca se va a guardar todo
    SubirFotoFirebase();
  }
});
/********************************************************** */
/*VALIDA SI EL EMAIL EXISTE O ESTA ACTIVO
/*********************************************************** */
/*function ValidarEmail() {
  $("#loaderFoto").show();
  let emailUser = document.getElementById("email_user_pago").value;
  let statusBusqueda = false;
  db.collection("reg_prop_prin_web")
    .where("email", "==", emailUser)
    .where("verifEmail", "==", "true")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        if (querySnapshot._snapshot.docChanges.length != 0) {
          statusBusqueda = true;
        }
      });
      if (statusBusqueda) {
        console.log("Si esta activo");
        BuscarEdoCdUser(emailUser);
        BuscarTaxiInactivo(emailUser);
      } else {
        console.log("Email incorrecto");
        $("#loaderFoto").hide();
      }
    })
    .catch(function (error) {
      console.log(error);
      $("#loaderFoto").hide();
    });
}*/

function BuscarTaxiInactivoMes(email) {
  let statusBusTaxi = false;
  let contarTaxis = 0;
  let taxisResul = [];
  let objetosAcum = {};
  let totalPagar = 0;
  let selectTaxis = document.getElementById("selectTaxis");
  db.collection("taxis")
    .where("correo", "==", email)
    .where("status_pago", "==", "false")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        if (querySnapshot._snapshot.docChanges.length != 0) {
          statusBusTaxi = true;
          objetosAcum = { todo: doc.data(), id: doc.id };
          taxisResul.push(objetosAcum);
        }
        contarTaxis += 1;
      });
      if (statusBusTaxi) {
        //SE LLENA EL SELECT, LAS UNIDADES INACTIVAS Y SE OCULTA EL LOADER
        $("#cajaVisual").removeClass("d-none");
        selectTaxis.innerHTML = "";
        selectTaxis.innerHTML += `<option value="" disabled>Selecciona</option>`;
        for (const iterator of taxisResul) {
          totalPagar = montoMes_global - iterator.todo.suma_descuentos;
          selectTaxis.innerHTML += `<option value="${iterator.todo.placa}_${totalPagar}=${iterator.id}>${iterator.todo.marca}">${iterator.todo.placa}</option>`;
        }
        $("select").selectpicker("refresh");
        $("#loaderFoto").hide();
        //AQUI TERMINA EL LLENADO DEL SELECT Y FINALIZA EL LOADER
      } else {
        //console.log("No hay taxis");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function BuscarTaxiGeneralMes(email, montoMes) {
  $("#loaderFoto").show();
  let taxisActivos_v = 0;
  let cantTaxi_activo = 0;
  let statusTaxiActivo = false;
  let siHayEdoCd = false;
  let estadoBD, ciudadBD;
  let listarTaxis = document.getElementById("listarTaxis");
  let clasePila, mensajeStatus, codigoInactivo, totalPagar, resultadoMes;
  db.collection("taxis")
    .where("correo", "==", email)
    .get()
    .then(function (querySnapshot) {
      listarTaxis.innerHTML = "";
      querySnapshot.forEach(function (doc) {
        if (querySnapshot._snapshot.docChanges.length != 0) {
          statusTaxiActivo = true;
          //Condicion se es activo o inactivo
          if (doc.data().status_pago === "true") {
            clasePila = "badge-success";
            mensajeStatus = "Activo";
            codigoInactivo = "";
            taxisActivos_v += 1;
          } else {
            clasePila = "badge-danger";
            mensajeStatus = "Inactivo";
            totalPagar = montoMes - doc.data().suma_descuentos; //se resta
            codigoInactivo = `
            <br><span class="font-weight-bold">Descuento Acumulado: 
            </span>$${doc.data().suma_descuentos} Pesos
            <br><span class="font-weight-bold">Pagas: </span>
            <span class="border-success border-bottom">$${totalPagar} Pesos</span>`;
          }
          listarTaxis.innerHTML += `
          <li class="list-group-item small">
            <span class="font-weight-bold">Placa: </span>${doc.data().placa}  
            <span class="badge ${clasePila} badge-pill">${mensajeStatus}</span>
            <br><span class="font-weight-bold">Marca: </span>${doc.data().marca}
            ${codigoInactivo}
          </li>
          `;
        }
        cantTaxi_activo += 1;
      });
      if (statusTaxiActivo) {
        $("#taxisRegistrados").html(cantTaxi_activo);
        if (taxisActivos_v === cantTaxi_activo) {
          //validar si estan todos activos o no
          $("#caja_mensaje_activos").removeClass("d-none");
          $("#caja_mensaje_admin").addClass("d-none");
        } else {
          $("#caja_mensaje_activos").addClass("d-none");
          $("#caja_mensaje_admin").removeClass("d-none");
        }
        $("#loaderFoto").hide();
      } else {
        $("#loaderFoto").hide();
        let mensajeM = `<span class="text-info">¡No tienes taxis registrados!</span><br><br>`;
        ShowModalMensajes(mensajeM, "2");
      }
    })
    .catch(function (error) {
      console.log(error);
      $("#loaderFoto").hide();
    });
}

function BuscarTaxiInactivoAnio(email) {
  let statusBusTaxi = false;
  let contarTaxis = 0;
  let taxisResul = [];
  let totalPagar = 0;
  let objetosAcum = {};
  let selectTaxis = document.getElementById("selectTaxis");
  db.collection("taxis")
    .where("correo", "==", email)
    .where("status_pago", "==", "false")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        if (querySnapshot._snapshot.docChanges.length != 0) {
          statusBusTaxi = true;
          objetosAcum = { todo: doc.data(), id: doc.id };
          taxisResul.push(objetosAcum);
        }
        contarTaxis += 1;
      });
      if (statusBusTaxi) {
        //SE LLENA EL SELECT, LAS UNIDADES INACTIVAS Y SE OCULTA EL LOADER
        $("#cajaVisual").removeClass("d-none");
        selectTaxis.innerHTML = "";
        selectTaxis.innerHTML += `<option value="" disabled>Selecciona</option>`;
        for (const iterator of taxisResul) {
          totalPagar = montoAnual_global - iterator.todo.suma_descuentos;
          selectTaxis.innerHTML += `<option value="${iterator.todo.placa}_${totalPagar}=${iterator.id}>${iterator.todo.marca}">${iterator.todo.placa}</option>`;
        }
        $("select").selectpicker("refresh");
        $("#loaderFoto").hide();
        //AQUI TERMINA EL LLENADO DEL SELECT Y FINALIZA EL LOADER
      } else {
        console.log("No hay taxis");
        $("#loaderFoto").hide();
        let mensajeM = `<span class="text-info">¡No tienes taxis registrados!</span><br><br>`;
        ShowModalMensajes(mensajeM, "2");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function BuscarTaxiGeneralAnio(email, montoAnio, descuentoAnio) {
  $("#loaderFoto").show();
  let taxisActivos_v = 0;
  let cantTaxi_activo = 0;
  let statusTaxiActivo = false;
  let siHayEdoCd = false;
  let estadoBD, ciudadBD;
  let listarTaxis = document.getElementById("listarTaxis");
  let clasePila, mensajeStatus, codigoInactivo, totalPagar, resultadoMes;
  db.collection("taxis")
    .where("correo", "==", email)
    .get()
    .then(function (querySnapshot) {
      listarTaxis.innerHTML = "";
      querySnapshot.forEach(function (doc) {
        if (querySnapshot._snapshot.docChanges.length != 0) {
          statusTaxiActivo = true;
          //Condicion se es activo o inactivo
          if (doc.data().status_pago === "true") {
            clasePila = "badge-success";
            mensajeStatus = "Activo";
            codigoInactivo = "";
            taxisActivos_v += 1;
          } else {
            clasePila = "badge-danger";
            mensajeStatus = "Inactivo";
            totalPagar = montoAnio - doc.data().suma_descuentos; //se resta
            codigoInactivo = `
            <br><span class="font-weight-bold">Descuento Acumulado: 
            </span>$${doc.data().suma_descuentos} Pesos
            <br><span class="font-weight-bold">Descuento General: 
            </span>${descuentoAnio}%
            <br><span class="font-weight-bold">Total a Pagar: </span>
            <span class="border-success border-bottom">$${totalPagar} Pesos</span>`;
          }
          listarTaxis.innerHTML += `
          <li class="list-group-item small">
            <span class="font-weight-bold">Placa: </span>${doc.data().placa}  
            <span class="badge ${clasePila} badge-pill">${mensajeStatus}</span>
            <br><span class="font-weight-bold">Marca: </span>${doc.data().marca}
            ${codigoInactivo}
          </li>
          `;
        }
        cantTaxi_activo += 1;
      });
      if (statusTaxiActivo) {
        $("#taxisRegistrados").html(cantTaxi_activo);
        if (taxisActivos_v === cantTaxi_activo) {
          //validar si estan todos activos o no
          $("#caja_mensaje_activos").removeClass("d-none");
          $("#caja_mensaje_admin").addClass("d-none");
        } else {
          $("#caja_mensaje_activos").addClass("d-none");
          $("#caja_mensaje_admin").removeClass("d-none");
        }
        $("#loaderFoto").hide();
      }
    })
    .catch(function (error) {
      console.log(error);
      $("#loaderFoto").hide();
    });
}

function BuscarCostoMes(estado, ciudad, email) {
  let statusBusCostoMes = false;
  db.collection("costo_suscripcion")
    .where("estado", "==", estado)
    .where("ciudad", "==", ciudad)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        if (querySnapshot._snapshot.docChanges.length != 0) {
          statusBusCostoMes = true;
          montoMes_global = doc.data().monto_mes;
          montoAnual_global = doc.data().monto_anual;
          descuento_global = doc.data().descuento;
        }
        if (statusBusCostoMes) {
          //BuscarTaxiGeneral(email, montoMes);
          $("#cantMes").html("$" + montoMes_global);
          $("#cantMes2").html("$" + montoMes_global);
          $("#cantAnual").html("$" + montoAnual_global);
          $("#cantAnual2").html("$" + montoAnual_global);
          $("#cantAnual3").html("= $" + montoAnual_global);
          $("#cantDesc").html(descuento_global + "%");
          $("#cantDesc2").html("-" + descuento_global + "%");
          let montoMas = montoMes_global * 12;
          $("#cantAnual_mas").html("$" + montoMas + " ");
          $("#modalMostrarOpcion").modal("show");
          $("#loaderFoto").hide();
        }
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

function BuscarEdoCdUser(email) {
  $("#loaderFoto").show();
  let statusBusEdoCdUser = false;
  db.collection("reg_prop_prin_web")
    .where("email", "==", email)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        if (querySnapshot._snapshot.docChanges.length != 0) {
          statusBusEdoCdUser = true;
          estado_global = doc.data().estado;
          ciudad_global = doc.data().ciudad;
          telefono_global = doc.data().telefono;
          nombre_global = doc.data().nombre;
          apellido_global = doc.data().apellido;
          consesion_global = doc.data().num_consesion;
        }
      });
      if (statusBusEdoCdUser) {
        BuscarCostoMes(estado_global, ciudad_global, email);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

/********************************************************** */
/*BOTONES QUE FUERON PULSADOS DEL MODAL (MES O ANUAL)
/*********************************************************** */
$("#btn_pago_mes").click(function (e) {
  e.preventDefault();
  let cambiarTituloPago = document.getElementById("tituloPago");
  cambiarTituloPago.innerHTML = "MENSUAL";
  BuscarTaxiGeneralMes(email_global, montoMes_global);
  BuscarTaxiInactivoMes(email_global);
  opcionPago_global = "Mensual";
  $("#modalMostrarOpcion").modal("hide");
});

$("#btn_pago_anual").click(function (e) {
  e.preventDefault();
  let cambiarTituloPago = document.getElementById("tituloPago");
  cambiarTituloPago.innerHTML = "ANUAL";
  BuscarTaxiGeneralAnio(email_global, montoAnual_global, descuento_global);
  BuscarTaxiInactivoAnio(email_global);
  opcionPago_global = "Anual";
  $("#modalMostrarOpcion").modal("hide");
});

/********************************************************** */
/*OBSERVADOR
/*********************************************************** */
(function ObservadorPago() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      email_global = user.email;
      let verifiEmail = user.emailVerified;

      if (verifiEmail) {
        console.log("email: " + email_global);
        //Que se ejecute la busqueda
        BuscarEdoCdUser(email_global);
      } else {
        //Si no hay usuario activo
        console.log("No hay usuario activo");
      }
    } else {
      console.log("No hay usuario activo");
    }
  });
})();

/********************************************************** */
/*AL INICIAR SE DEBE DE RALIZAR UNA BUSQUEDA Y MOSTRAR LOS
DATOS DE COSTO EN EL MODAL DE PAGO
/*********************************************************** */
/*(function MostrarModalPagos() {
  email_global = "dueno2@gmail.com";
  BuscarEdoCdUser(email_global);
})();*/

function ShowModalMensajes(mensajeM, valorBoton) {
  $("#textoCuerpoModalPF").html(mensajeM);
  $("#modalMensajesPF").modal("show");
  if (valorBoton === "1") {
    $("#btn_modal_PF").click(function (e) {
      e.preventDefault();
      $("#modalMensajesPF").modal("hide");
      setTimeout(redireccionarInfo, 1000);
    });
  }
  if (valorBoton === "2") {
    $("#btn_modal_PF").click(function (e) {
      e.preventDefault();
      $("#modalMensajesPF").modal("hide");
      setTimeout(redireccionarInfo, 1000);
    });
  }
}

function redireccionarInfo() {
  window.location = "#!/Informacion"; //redirige a informacion cuando acabe el envio
}
//Regresar a la pagina anterior
$("#btn_regresar_atras").click(function (e) {
  e.preventDefault();
  window.location = "#!/Informacion";
  limpiarModalErrores();
});
