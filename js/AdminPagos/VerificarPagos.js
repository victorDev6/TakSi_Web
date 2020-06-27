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

//Variables Globales
var idPagosRealizados_global = "";
var id_reg_soli_pagos = "";

/********************************************************** */
/*HACE UNA BUSQUEDA CON LAS SOLICITUDES PENDIENTES
/*********************************************************** */
function ConsulSoliPendientes() {
  let solicitudes_hijos = document.getElementById("hijos_solicitudes");
  db.collection("solicitudes_pagos")
    .where("estado_pago", "==", "Pendiente")
    .onSnapshot(function (querySnapshot) {
      solicitudes_hijos.innerHTML = "";
      querySnapshot.forEach(function (doc) {
        solicitudes_hijos.innerHTML += `
         <div class="contenedorhijo_pagos mt-3">
                    <div class="contenedor_imagen">
                        <div class="form-group">
                            <a href="${doc.data().url}" target="_blank">
                                <img class="imgSubida_estilo border-primary borderSolido" 
                                src="${doc.data().url}">
                            </a>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-5">
                            <button class="btn btn_foto_info p-0" role="link" type="button"
                            onclick="ShowInfoModal(
                            '${doc.data().estado}','${doc.data().ciudad}',
                            '${doc.data().nombre}','${doc.data().apellido}',
                            '${doc.data().fecha.seconds}',
                            '${doc.data().email}','${doc.data().consesion}',
                            '${doc.data().telefono}',
                            '${doc.data().descripcion}',
                            '${doc.data().solicitudes}')">
                            INFO
                            </button>
                        </div>
                        <div class="col-5">
                            <button class="btn btn_foto_aceptar p-0" role="link" type="button"
                            onclick="AceptarSolicitud(
                              '${doc.id}','${doc.data().solicitudes}',
                              '${doc.data().estado}','${doc.data().ciudad}',
                              '${doc.data().nombre}','${doc.data().apellido}',
                              '${doc.data().email}','${doc.data().consesion}',
                              '${doc.data().telefono}','${
          doc.data().opcion_pago
        }'
                              )">
                                ACEPTAR
                            </button>
                        </div>
                        <div class="col-5">
                            <button class="btn btn_foto_elim p-0" role="link" type="button"
                            onclick="RechazarSolicitud(
                              '${doc.id}',
                              '${doc.data().solicitudes}'
                              )">
                                RECHAZAR
                            </button>
                        </div>
                    </div>
                </div>
        `;
      });
    });
}
ConsulSoliPendientes();
/********************************************************** */
/*HACE UNA BUSQUEDA CON LAS SOLICITUDES ACEPTADAS
/*********************************************************** */
function ConsulSoliAceptados() {
  let solicitudes_hijos = document.getElementById("hijos_solicitudes");
  db.collection("solicitudes_pagos")
    .where("estado_pago", "==", "Aceptado")
    .onSnapshot(function (querySnapshot) {
      solicitudes_hijos.innerHTML = "";
      querySnapshot.forEach(function (doc) {
        solicitudes_hijos.innerHTML += `
         <div class="contenedorhijo_pagos mt-3">
                    <div class="contenedor_imagen">
                        <div class="form-group">
                            <a href="${doc.data().url}" target="_blank">
                                <img class="imgSubida_estilo border-success borderSolido" 
                                src="${doc.data().url}">
                            </a>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-5">
                            <button class="btn btn_foto_info p-0" role="link" type="button"
                            onclick="ShowInfoModal(
                            '${doc.data().estado}','${doc.data().ciudad}',
                            '${doc.data().nombre}','${doc.data().apellido}',
                            '${doc.data().fecha.seconds}',
                            '${doc.data().email}','${doc.data().consesion}',
                            '${doc.data().telefono}',
                            '${doc.data().descripcion}',
                            '${doc.data().solicitudes}')">
                            INFO
                            </button>
                        </div>
                        <div class="col-5">
                            <button class="btn btn_foto_elim p-0" role="link" type="button"
                            onclick="EliminarSolicitud(
                              '${doc.id}','${doc.data().url}')">
                                ELIMINAR
                            </button>
                        </div>
                    </div>
                </div>
        `;
      });
    });
}
/********************************************************** */
/*HACE UNA BUSQUEDA CON LAS SOLICITUES RECHAZADAS
/*********************************************************** */
function ConsulSoliRechazado() {
  let solicitudes_hijos = document.getElementById("hijos_solicitudes");
  db.collection("solicitudes_pagos")
    .where("estado_pago", "==", "Rechazado")
    .onSnapshot(function (querySnapshot) {
      solicitudes_hijos.innerHTML = "";
      querySnapshot.forEach(function (doc) {
        solicitudes_hijos.innerHTML += `
         <div class="contenedorhijo_pagos mt-3">
                    <div class="contenedor_imagen">
                        <div class="form-group">
                            <a href="${doc.data().url}" target="_blank">
                                <img class="imgSubida_estilo border-danger borderSolido" 
                                src="${doc.data().url}">
                            </a>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-5">
                            <button class="btn btn_foto_info p-0" role="link" type="button"
                            onclick="ShowInfoModal(
                            '${doc.data().estado}','${doc.data().ciudad}',
                            '${doc.data().nombre}','${doc.data().apellido}',
                            '${doc.data().fecha.seconds}',
                            '${doc.data().email}','${doc.data().consesion}',
                            '${doc.data().telefono}',
                            '${doc.data().descripcion}',
                            '${doc.data().solicitudes}')">
                            INFO
                            </button>
                        </div>
                        <div class="col-5">
                            <button class="btn btn_foto_elim p-0" role="link" type="button"
                            onclick="EliminarSolicitud(
                              '${doc.id}','${doc.data().url}')">
                                ELIMINAR
                            </button>
                        </div>
                    </div>
                </div>
        `;
      });
    });
}
/********************************************************** */
/*MOSTRAR LOS DATOS EN EL MODAL
/*********************************************************** */
function ShowInfoModal(edo, cd, nom, ape, fec, mail, cons, tel, descrip, soli) {
  let fechaCompleta = ConvertirFechas(fec);
  let solicitudTaxis = DividirCadena(soli);
  let cadena_solicitudes = "";
  let opcionPago, textoOpcionPago;
  console.log(fec);

  if (fechaCompleta != null && solicitudTaxis != null) {
    //impirmir el array de objetos
    for (const iterator of solicitudTaxis) {
      opcionPago = parseInt(iterator.monto);
      if (opcionPago < 1000) {
        textoOpcionPago = "Mensual";
      } else {
        textoOpcionPago = "Anual";
      }
      cadena_solicitudes += `
                              <ul class="list-group texto_lista border border-secondary">
                                <li class="list-group-item list-group-item-action list-group-item-info">
                                  <span><span class="font-weight-bold">Pago: </span>${textoOpcionPago}<br>
                                  <span><span class="font-weight-bold">Placa: </span> ${iterator.placa} <br>
                                  <span class="font-weight-bold">Marca: </span>${iterator.marca} <br>
                                  <span class="font-weight-bold">Monto: </span>$${iterator.monto} </span>
                                </li>
                              </ul>
                              `;
    }
    $("#estado_modal").html(edo);
    $("#ciudad_modal").html(cd);
    $("#nombre_modal").html(nom);
    $("#apellido_modal").html(ape);
    $("#fecha_modal").html(fechaCompleta);
    $("#email_modal").html(mail);
    $("#consesion_modal").html(cons);
    //$("#opcion_pago_modal").html();
    $("#telefono_modal").html(tel);
    $("#descripcion_modal").html(descrip);
    $("#solicitud_modal").html(cadena_solicitudes);
    $("#modalMostrarInfo").modal("show");
  }
}
/********************************************************** */
/*ACTUALIZAR STATUS PAGO DE "TAXI" A TRUE ACEPTADO
Y EL EL STATUS DE SOLICITUDES DE PENDIENTE A ACEPTADO
/*********************************************************** */
function AceptarSolicitud(
  idRegistro,
  solicitud,
  edo,
  cd,
  nom,
  ape,
  email,
  cons,
  tel,
  opcionPago
) {
  $("#botonAceptarModalM").removeClass("d-none");
  $("#botonAceptarModalMR").addClass("d-none");
  $("#botonAceptarModalElim").addClass("d-none");
  mensajeM = `¿Estas seguro de aceptar esta solicitud?`;
  colorTodos = "#414c50";
  linkImagen = "../../Diseno/ICONOS/alerta.svg";
  mostrarModalMensaje(mensajeM, colorTodos, linkImagen);

  $("#botonAceptarModalM").click(function (e) {
    e.preventDefault();
    id_reg_soli_pagos = idRegistro; //Variable global le pasa el id
    let estadoPago = "Aceptado";
    PagosRealizados(solicitud, edo, cd, nom, ape, email, cons, tel, opcionPago);
    UpdateSolicitudPagos(idRegistro, estadoPago);
    CicloUpdateSolicitudTaxi(solicitud);
    CicloGuardarFechaBD(solicitud, opcionPago);
    //Guardar datos en otra coleccion
  });
}

//Cambia el estado de solicitudes_pagos a Aceptado
function UpdateSolicitudPagos(id, estadoPago) {
  let updateSoliPagos = db.collection("solicitudes_pagos").doc(id);
  return updateSoliPagos
    .update({
      estado_pago: estadoPago,
    })
    .then(function () {
      console.log("Document successfully updated!");
    })
    .catch(function (error) {
      console.error("Error updating document: ", error);
    });
}

//Se agrega nueva fecha en la coleccion de solicitudes_pagos
function ActualizarFechaAceptado(fechaInicio, fechaFin) {
  let idReg = id_reg_soli_pagos;
  let updateSoliPagos = db.collection("solicitudes_pagos").doc(idReg);
  return updateSoliPagos
    .update({
      fecha_inicial_pago: firebase.firestore.Timestamp.fromDate(
        new Date(fechaInicio * 1000)
      ),
      fecha_final_pago: firebase.firestore.Timestamp.fromDate(
        new Date(fechaFin * 1000)
      ),
    })
    .then(function () {
      console.log("Document successfully updated!");
    })
    .catch(function (error) {
      console.error("Error updating document: ", error);
    });
}

//Se crea un ciclo para ir actualizando los taxis a true
function CicloUpdateSolicitudTaxi(solicitud) {
  let objetoRes = DividirCadena(solicitud);
  for (const iterator of objetoRes) {
    UpdateStatusPagoTaxi(iterator.id);
  }
}

//Funcion que cambia el status del taxi a true
function UpdateStatusPagoTaxi(idTaxi) {
  let updateSoliTaxi = db.collection("taxis").doc(idTaxi);
  return updateSoliTaxi
    .update({
      status_pago: "true",
    })
    .then(function () {
      console.log("Document successfully updated!");
    })
    .catch(function (error) {
      console.error("Error updating document: ", error);
    });
}

/********************************************************** */
/*ACTUALIZAR EL STATUS DE SOLICITUDES DE PENDIENTE A
RECHAZADO
/*********************************************************** */
function RechazarSolicitud(idRegistro, solicitud) {
  $("#botonAceptarModalMR").removeClass("d-none");
  $("#botonAceptarModalM").addClass("d-none");
  $("#botonAceptarModalElim").addClass("d-none");
  mensajeM = `¿Estas seguro de rechazar esta solicitud?`;
  colorTodos = "#414c50";
  linkImagen = "../../Diseno/ICONOS/alerta.svg";
  mostrarModalMensaje(mensajeM, colorTodos, linkImagen);

  $("#botonAceptarModalMR").click(function (e) {
    e.preventDefault();
    console.log("Rechazaste la solicitud");
    let estadoPago = "Rechazado";
    UpdateSolicitudPagos(idRegistro, estadoPago);
  });
}

/********************************************************** */
/*METODO PARA ELIMINAR DE FORMA PERMANENTE EL REGISTRO
DEBE SER SOLO SI SE RECHAZO O ACEPTO
/*********************************************************** */
function EliminarSolicitud(idRegistro, urlImagen) {
  $("#botonAceptarModalElim").removeClass("d-none");
  $("#botonAceptarModalM").addClass("d-none");
  $("#botonAceptarModalMR").addClass("d-none");
  mensajeM = `¿Estas seguro de eliminar esta solicitud?`;
  colorTodos = "#414c50";
  linkImagen = "../../Diseno/ICONOS/alerta.svg";
  mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
  //Boton
  $("#botonAceptarModalElim").click(function (e) {
    e.preventDefault();
    //Elimina Imagen de storage
    var queryDelete = firebase.storage().refFromURL(LinkImagen);
    queryDelete
      .delete()
      .then(function () {
        //Elimina registro de la bd
        db.collection("solicitudes_pagos")
          .doc(idRegistro)
          .delete()
          .then(function () {
            console.log("Document successfully deleted!");
          })
          .catch(function (error) {
            console.error("Error removing document: ", error);
          });
      })
      .catch(function (error) {
        console.log("Error al eliminar imagen");
      });
  });
}

function EliminarImagenStorage(LinkImagen) {}

/********************************************************** */
/*METODO DE ABRIR MODAL Y ENVIAR PARAMETROS
/*********************************************************** */
function mostrarModalMensaje(mensajeM, colorTodos, linkImagenCuerpo) {
  $("#cabezaModal").css("background-color", colorTodos);
  $("#textoCuerpoModal").css("color", colorTodos);
  $("#botonAceptarModalM").css("background-color", colorTodos);
  $("#botonAceptarModalMR").css("background-color", colorTodos);
  $("#botonAceptarModalElim").css("background-color", colorTodos);
  $("#botonCancelarModalM").css("background-color", "#E30613");
  $("#imagenCuerpoM").attr("src", linkImagenCuerpo);
  $("#textoCuerpoModal").html(mensajeM);
  $("#modalMensajesP").modal("show");
}

function DividirCadena(cadena) {
  //Se eliminar las comas
  let filtroUnoComa = [];
  let filtroUnoComa2 = [];
  let usuario = {};
  filtroUnoComa = cadena.split(",");
  for (let i = 0; i < filtroUnoComa.length; i++) {
    usuario = { usuario: filtroUnoComa[i] };
    filtroUnoComa2.push(usuario);
  }
  //Se eliminan los signos igual
  let filtroDosIgual = [];
  let usuario2 = {};
  for (let i = 0; i < filtroUnoComa2.length; i++) {
    usuario2 = { usuario2: filtroUnoComa2[i].usuario.split("=") };
    filtroDosIgual.push(usuario2);
  }
  //Se eliminan los guiones bajos
  let filtroTresGuion = [];
  let usuario3 = {};
  for (let i = 0; i < filtroDosIgual.length; i++) {
    usuario3 = {
      usuario: filtroDosIgual[i].usuario2[0].split("_"),
      id: filtroDosIgual[i].usuario2[1],
    };
    filtroTresGuion.push(usuario3);
  }
  //Se eliminan los signos >
  let filtroCuatroMayor = [];
  let usuario4 = {};
  for (let i = 0; i < filtroTresGuion.length; i++) {
    usuario4 = {
      placa: filtroTresGuion[i].usuario[0],
      monto: filtroTresGuion[i].usuario[1],
      id: filtroTresGuion[i].id.split(">"),
    };
    filtroCuatroMayor.push(usuario4);
  }
  //Resultado final acomodando los objetos
  let resultadoFinal = [];
  let objetosFinales = {};
  for (let i = 0; i < filtroCuatroMayor.length; i++) {
    objetosFinales = {
      id: filtroCuatroMayor[i].id[0],
      marca: filtroCuatroMayor[i].id[1],
      placa: filtroCuatroMayor[i].placa,
      monto: filtroCuatroMayor[i].monto,
    };
    resultadoFinal.push(objetosFinales);
  }
  //console.log(resultadoFinal);
  return resultadoFinal;
}

function ConvertirFechas(fecha) {
  let formatDate = 0;
  let resulH, hora, minutos;
  let fechaCompleta = "";
  try {
    (date = new Date(fecha * 1000)),
      (datevalues = [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
      ]);
    formatDate = datevalues[2] + "/" + datevalues[1] + "/" + datevalues[0];

    hora = datevalues[3];
    minutos = datevalues[4];
    if (hora >= 13) {
      hora = hora - 12;
      resulH = hora + ":" + minutos + " PM";
    } else {
      resulH = hora + ":" + minutos + " AM";
    }

    fechaCompleta = formatDate + " " + resulH;
    return fechaCompleta;
  } catch (error) {
    console.log("No pasa nada");
  }
}

/********************************************************** */
/*EVENTO CHANGE PARA IR CAMBIANDO DE BUSQUEDA
/*********************************************************** */
$("#selectBusquedaSoli").change(function () {
  let valorSelect = document.getElementById("selectBusquedaSoli").value;
  switch (valorSelect) {
    // case "0":
    //   console.log("No seleccionó nada");
    //   break;
    case "1":
      ConsulSoliPendientes();
      break;
    case "2":
      ConsulSoliAceptados();
      break;
    case "3":
      ConsulSoliRechazado();
      break;
    default:
      console.log("No seleccionó nada");
      break;
  }
});

//Ciclo para ir guardando las fechas por cada taxi aceptado
function CicloGuardarFechaBD(solicitud, opcionPago) {
  let objetoRes = DividirCadena(solicitud);
  for (const iterator of objetoRes) {
    GuardarFechaBD(iterator.id, opcionPago, iterator.monto);
  }
}
function GuardarFechaBD(idTaxi, opcionPago, montoPago) {
  montoPago = parseInt(montoPago);
  db.collection("taxis")
    .doc(idTaxi)
    .update({
      fecha_aceptacion: firebase.firestore.FieldValue.serverTimestamp(),
      opcion_pago: opcionPago,
      monto_pago: montoPago,
    })
    .then(function () {
      console.log("Document successfully updated!");
      //Metodo de consulta de fecha
      RecuperarFechaBD(idTaxi, opcionPago);
    })
    .catch(function (error) {
      console.log(error);
    });
}
//Recuperar esa fecha que se guardo
function RecuperarFechaBD(idTaxi, opcionPago) {
  let segundosBD;
  let docRef = db.collection("taxis").doc(idTaxi);
  docRef
    .get()
    .then(function (doc) {
      if (doc.exists) {
        segundosBD = doc.data().fecha_aceptacion.seconds;
        ValidarFecha(idTaxi, segundosBD, opcionPago);
      } else {
        console.log("No enontro el documento");
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
}

//Checar fecha
function ValidarFecha(idTaxi, segundos, opcionPago) {
  let dia2 = 0,
    mes2 = 0,
    anio2 = 0;

  //Se obtiene las fecha actual
  let date = new Date(segundos * 1000);
  let mes = date.getMonth();
  let anio = date.getFullYear();
  let dia = date.getDate();

  let days_in_months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (new Date(anio, 1, 29).getDate() == 29) days_in_months[1] = 29;

  //Obtener dias de mes actual y siguiente mes
  let diasActual = days_in_months[mes]; //30
  let diasSig = days_in_months[mes + 1]; //31

  //Se valida si dia actual es mayor a la cantidad de dias del mes
  //siguiente
  if (dia > diasSig) {
    let restaDias = diasActual - diasSig;
    anio2 = anio;
    mes2 = mes + 2;
    dia2 = restaDias;
    mes = mes + 1;
  } else {
    anio2 = anio;
    mes2 = mes + 2;
    dia2 = dia;
    mes = mes + 1;
  }

  if (mes < 10) {
    mes = "0" + mes;
  }
  if (dia < 10) {
    dia = "0" + dia;
  }
  if (mes2 < 10) {
    mes2 = "0" + mes2;
  }
  if (dia2 < 10) {
    dia2 = "0" + dia2;
  }

  let fechaCompletaActual;
  let fechaCompletaSiguiente;

  if (opcionPago === "Mensual") {
    fechaCompletaActual = anio + "-" + mes + "-" + dia;
    fechaCompletaSiguiente = anio2 + "-" + mes2 + "-" + dia2;
  } else if (opcionPago === "Anual") {
    anio2 = anio2 + 1;
    fechaCompletaActual = anio + "-" + mes + "-" + dia;
    fechaCompletaSiguiente = anio2 + "-" + mes + "-" + dia;
  }

  //Se convieten en segundos las fechas asignadas
  let fechaInicio = new Date(fechaCompletaActual).getTime();
  let fechaFin = new Date(fechaCompletaSiguiente).getTime();

  //Se obtiene el intervao de dias
  var diff = fechaFin - fechaInicio;
  let intervaloDias = diff / (1000 * 60 * 60 * 24);

  //se muiltiplica los segundos actuales por el intervalo y se guarda
  let totalSegundosBD = segundos;
  let totalSegundosAdd = totalSegundosBD + 86400 * intervaloDias;

  GuardarSegFechas(idTaxi, totalSegundosBD, totalSegundosAdd);
}

//Guardar los segundos para comparar
function GuardarSegFechas(idTaxi, fechaInicio, fechaFin) {
  db.collection("taxis")
    .doc(idTaxi)
    .update({
      fecha_inicial_pago: firebase.firestore.Timestamp.fromDate(
        new Date(fechaInicio * 1000)
      ),
      fecha_final_pago: firebase.firestore.Timestamp.fromDate(
        new Date(fechaFin * 1000)
      ),
    })
    .then(function () {
      console.log("Document successfully updated!");
      PagosRealizadosFechas(fechaInicio, fechaFin);
      ActualizarFechaAceptado(fechaInicio, fechaFin);
    })
    .catch(function (error) {
      console.log(error);
    });
}

//Agregar los mismos datos en una coleccion diferente
//Pagos_Realizados
function PagosRealizados(
  solicitud,
  edo,
  cd,
  nom,
  ape,
  email,
  cons,
  tel,
  opcionPago
) {
  db.collection("pagos_realizados")
    .add({
      estado: edo,
      ciudad: cd,
      nombre: nom,
      apellido: ape,
      email: email,
      consesion: cons,
      telefono: tel,
      fecha_aceptacion: firebase.firestore.FieldValue.serverTimestamp(),
      solicitud: solicitud,
      opcion_pago: opcionPago,
    })
    .then(function (docRef) {
      console.log("Registro exitoso");
      idPagosRealizados_global = docRef.id;
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}

function PagosRealizadosFechas(fecInicio, fecFin) {
  db.collection("pagos_realizados")
    .doc(idPagosRealizados_global)
    .update({
      fecha_inicial_pago: firebase.firestore.Timestamp.fromDate(
        new Date(fecInicio * 1000)
      ),
      fecha_final_pago: firebase.firestore.Timestamp.fromDate(
        new Date(fecFin * 1000)
      ),
    })
    .then(function () {
      console.log("Document successfully updated!");
    })
    .catch(function (error) {
      console.log(error);
    });
}

/*function PagosRealizados_fecha (idPagosR) {
  db.collection("pagos_realizados")
    .doc(idPagosR)
    .update({
      fecha_aceptacion: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(function () {
      console.log("Document successfully updated!");
    })
    .catch(function (error) {
      console.log(error);
    });
}*/
