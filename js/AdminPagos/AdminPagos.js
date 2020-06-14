//$(document).ready(function() {

/********************************************************** */
/*SE INICIA SELECTPICKER
/*********************************************************** */
$(".selectpicker").selectpicker();
/********************************************************** */
/*INICIAMOS FIREBASE
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

/**Variable global para ver que opcion de busqueda seleccionó el usuario */
var valOpcionBus;
/********************************************************** */
/*LLENAMOS SELECT CIUDAD ESTADO
/*********************************************************** */
(function ObtenerEdoPagos() {
  let estados = [];
  let $selectEdo = $("#select_edo_pagos");
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
  const selectEdo = document.querySelector("#select_edo_pagos");
  const selectCd = document.querySelector("#select_cd_pagos");
  selectEdo.addEventListener("change", (event) => {
    selectCd.innerHTML = "";
    selectCd.innerHTML = `<option selected>Ciudad</option>`;
    ObtenerCdPagos(event.target.value);
  });
})();
function ObtenerCdPagos(estado) {
  let obj = [];
  let arrayLibreComa = [];
  let $selectCd = $("#select_cd_pagos");
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
    });
}
/*************************************************************** */
/*SE LLENA EL SELECT DE ACUERDO AL ESTADO Y CIUDAD SELECCIONADOS
/*************************************************************** */
/*function LlenarSelectSitioPago() {
  let estado = document.getElementById("select_edo_pagos").value;
  let ciudad = document.getElementById("select_cd_pagos").value;
  let sitios = [];
  let $selectSitio = $("#select_sitio_pagos");
  db.collection("lineas")
    .where("estado", "==", estado)
    .where("ciudad", "==", ciudad)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        sitios.push(doc.data().nombre);
      });
      sitios.forEach(function (valor, indice, array) {
        $selectSitio.append(`<option value="${valor}">${valor}</option>`);
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
      $selectSitio.append(`<option selected>Sitio</option>`);
    });
}
(function ChangeBuscarSitioPago() {
  //Accion que realiza el selectCd para buscar Sitio
  const selectCd = document.querySelector("#select_cd_pagos");
  const selSitio = document.getElementById("select_sitio_pagos");
  selectCd.addEventListener("change", (event) => {
    selSitio.innerHTML = "";
    selSitio.innerHTML = `<option selected>Sitio</option>`;
    LlenarSelectSitioPago();
  });
})();*/

(function ChangeOpcionesBus() {
  let selectOpcionBus = document.getElementById("sel_opc_bus_pago");
  //let desactivarSitio = document.getElementById("select_sitio_pagos");
  let desactivarEdo = document.getElementById("select_edo_pagos");
  let desactivarCd = document.getElementById("select_cd_pagos");
  let campoBusqueda = document.getElementById("campo_bus_pagos");
  let valorSelect;
  campoBusqueda.disabled = true;
  desactivarEdo.disabled = true;
  desactivarCd.disabled = true;
  //desactivarSitio.disabled = true;

  selectOpcionBus.addEventListener("change", (event) => {
    valorSelect = event.target.value;
    switch (valorSelect) {
      case "1": //Estado y ciudad
        campoBusqueda.disabled = true;
        desactivarEdo.disabled = false;
        desactivarCd.disabled = false;
        $("#select_edo_pagos").focus();
        valOpcionBus = 1;
        break;

      case "2": //Nombre
        campoBusqueda.disabled = false;
        desactivarEdo.disabled = true;
        desactivarCd.disabled = true;
        $("#campo_bus_pagos").focus();
        valOpcionBus = 3;
        break;
      default:
        campoBusqueda.disabled = true;
        desactivarEdo.disabled = true;
        desactivarCd.disabled = true;
        desactivarSitio.disabled = true;
        break;
    }
  });
})();

/*************************************************************** */
/*BUSQUEDA GENERAL
/*************************************************************** */
function BusquedaGeneral() {
  let tabla = document.getElementById("tabla_general_pagos");
  let contadorCosto = 0;
  let segundosActual = Math.floor(Date.now() / 1000);
  let segundosIni = 0;
  let segundosFin = 0;
  let textoStatus = "",
    textoClase = "",
    codigoBtnElim = "";

  db.collection("pagos_realizados")
    .orderBy("fecha_aceptacion", "desc")
    .onSnapshot(function (querySnapshot) {
      tabla.innerHTML = "";
      contadorCosto = 0;
      querySnapshot.forEach(function (doc) {
        try {
          contFechaAcep = 0;
          contFechaFin = 0;
          contFechaIni = 0;
          contFechaAcep = MostrarFecha(doc.data().fecha_aceptacion.seconds);
          contFechaFin = MostrarFecha(doc.data().fecha_final_pago.seconds);
          contFechaIni = MostrarFecha(doc.data().fecha_inicial_pago.seconds);
          segundosIni = doc.data().fecha_inicial_pago.seconds;
          segundosFin = doc.data().fecha_final_pago.seconds;
        } catch (error) {
          console.log("No pasa nada..");
        }

        if (segundosActual >= segundosIni && segundosActual <= segundosFin) {
          textoStatus = "Activo";
          textoClase = "bg-success";
          codigoBtnElim = `<p>No se puede eliminar</p>`;
        } else {
          textoStatus = "Inactivo";
          textoClase = "bg-danger";
          codigoBtnElim = `
            <button class="btn btn-danger btn-sm font-weight-bold" 
              onclick="EliminarPago('${doc.id}')">
              Eliminar
            </button>`;
        }

        contadorCosto += 1;
        tabla.innerHTML += `
            <tr>
                <td class="text-nowrap">${contadorCosto}</td>
			          <td class="text-nowrap">${doc.data().estado}</td>
				        <td class="text-nowrap">${doc.data().ciudad}</td>
				        <td class="text-nowrap">${doc.data().nombre}</td>
                <td class="text-nowrap">${doc.data().apellido}</td>
                <td class="text-nowrap">${contFechaAcep[0]} 
                <p class="py-0 my-0">${contFechaAcep[1]}</p></td>
                <td class="text-nowrap">${contFechaIni[0]} 
                <p class="py-0 my-0">${contFechaIni[1]}</p></td>
                <td class="text-nowrap">${contFechaFin[0]} 
                <p class="py-0 my-0">${contFechaFin[1]}</p></td>
                <td class="text-nowrap text-white font-weight-bold ${textoClase}">${textoStatus}</td>
                <td class="text-nowrap">
                  <button class="btn btn-info btn-sm font-weight-bold" 
                  onclick="VerMasInfo('${doc.data().email}',
                  '${doc.data().consesion}', '${doc.data().telefono}',
                  '${doc.data().solicitud}')">
                  Ver Mas
                </button></td>
                <td class="text-nowrap">${codigoBtnElim}</td>
			</tr>`;
      });
      paginacionPagos();
    });
}
BusquedaGeneral();

function BusquedaEdoCdPagos() {
  let tabla = document.getElementById("tabla_general_pagos");
  let estado = document.getElementById("select_edo_pagos").value;
  let ciudad = document.getElementById("select_cd_pagos").value;
  let contadorCosto = 0;
  let segundosActual = Math.floor(Date.now() / 1000);
  let segundosIni = 0;
  let segundosFin = 0;
  let textoStatus, textoClase, codigoBtnElim;
  db.collection("pagos_realizados")
    .where("estado", "==", estado)
    .where("ciudad", "==", ciudad)
    .onSnapshot(function (querySnapshot) {
      tabla.innerHTML = "";
      contadorCosto = 0;
      querySnapshot.forEach(function (doc) {
        try {
          contFechaAcep = 0;
          contFechaFin = 0;
          contFechaIni = 0;
          contFechaAcep = MostrarFecha(doc.data().fecha_aceptacion.seconds);
          contFechaFin = MostrarFecha(doc.data().fecha_final_pago.seconds);
          contFechaIni = MostrarFecha(doc.data().fecha_inicial_pago.seconds);
          segundosIni = doc.data().fecha_inicial_pago.seconds;
          segundosFin = doc.data().fecha_final_pago.seconds;
        } catch (error) {
          console.log("No pasa nada..");
        }

        if (segundosActual >= segundosIni && segundosActual <= segundosFin) {
          textoStatus = "Activo";
          textoClase = "bg-success";
          codigoBtnElim = `<p>No se puede eliminar</p>`;
        } else {
          textoStatus = "Inactivo";
          textoClase = "bg-danger";
          codigoBtnElim = `
            <button class="btn btn-danger btn-sm font-weight-bold" 
              onclick="EliminarPago('${doc.id}')">
              Eliminar
            </button>`;
        }

        contadorCosto += 1;
        tabla.innerHTML += `
            <tr>
                <td class="text-nowrap">${contadorCosto}</td>
			          <td class="text-nowrap">${doc.data().estado}</td>
				        <td class="text-nowrap">${doc.data().ciudad}</td>
				        <td class="text-nowrap">${doc.data().nombre}</td>
                <td class="text-nowrap">${doc.data().apellido}</td>
                <td class="text-nowrap">${contFechaAcep[0]} 
                <p class="py-0 my-0">${contFechaAcep[1]}</p></td>
                <td class="text-nowrap">${contFechaIni[0]} 
                <p class="py-0 my-0">${contFechaIni[1]}</p></td>
                <td class="text-nowrap">${contFechaFin[0]} 
                <p class="py-0 my-0">${contFechaFin[1]}</p></td>
                <td class="text-nowrap text-white font-weight-bold ${textoClase}">${textoStatus}</td>
                <td class="text-nowrap">
                  <button class="btn btn-info btn-sm font-weight-bold" 
                  onclick="VerMasInfo('${doc.data().email}',
                  '${doc.data().consesion}', '${doc.data().telefono}',
                  '${doc.data().solicitud}')">
                  Ver Mas
                </button></td>
                <td class="text-nowrap">${codigoBtnElim}</td>
			</tr>`;
      });
      paginacionPagos();
    });
}

function BusquedaNomPagos() {
  let tabla = document.getElementById("tabla_general_pagos");
  let nombre = document.getElementById("campo_bus_pagos").value;
  let contadorCosto = 0;
  let segundosActual = Math.floor(Date.now() / 1000);
  let segundosIni = 0;
  let segundosFin = 0;
  let textoStatus, textoClase, codigoBtnElim;
  db.collection("pagos_realizados")
    .where("nombre", "==", nombre)
    .onSnapshot(function (querySnapshot) {
      tabla.innerHTML = "";
      contadorCosto = 0;
      querySnapshot.forEach(function (doc) {
        try {
          contFechaAcep = 0;
          contFechaFin = 0;
          contFechaIni = 0;
          contFechaAcep = MostrarFecha(doc.data().fecha_aceptacion.seconds);
          contFechaFin = MostrarFecha(doc.data().fecha_final_pago.seconds);
          contFechaIni = MostrarFecha(doc.data().fecha_inicial_pago.seconds);
          segundosIni = doc.data().fecha_inicial_pago.seconds;
          segundosFin = doc.data().fecha_final_pago.seconds;
        } catch (error) {
          console.log("No pasa nada..");
        }

        if (segundosActual >= segundosIni && segundosActual <= segundosFin) {
          textoStatus = "Activo";
          textoClase = "bg-success";
          codigoBtnElim = `<p>No se puede eliminar</p>`;
        } else {
          textoStatus = "Inactivo";
          textoClase = "bg-danger";
          codigoBtnElim = `
            <button class="btn btn-danger btn-sm font-weight-bold" 
              onclick="EliminarPago('${doc.id}')">
              Eliminar
            </button>`;
        }

        contadorCosto += 1;
        tabla.innerHTML += `
            <tr>
                <td class="text-nowrap">${contadorCosto}</td>
			          <td class="text-nowrap">${doc.data().estado}</td>
				        <td class="text-nowrap">${doc.data().ciudad}</td>
				        <td class="text-nowrap">${doc.data().nombre}</td>
                <td class="text-nowrap">${doc.data().apellido}</td>
                <td class="text-nowrap">${contFechaAcep[0]} 
                <p class="py-0 my-0">${contFechaAcep[1]}</p></td>
                <td class="text-nowrap">${contFechaIni[0]} 
                <p class="py-0 my-0">${contFechaIni[1]}</p></td>
                <td class="text-nowrap">${contFechaFin[0]} 
                <p class="py-0 my-0">${contFechaFin[1]}</p></td>
                <td class="text-nowrap text-white font-weight-bold ${textoClase}">${textoStatus}</td>
                <td class="text-nowrap">
                  <button class="btn btn-info btn-sm font-weight-bold" 
                  onclick="VerMasInfo('${doc.data().email}',
                  '${doc.data().consesion}', '${doc.data().telefono}',
                  '${doc.data().solicitud}')">
                  Ver Mas
                </button></td>
                <td class="text-nowrap">${codigoBtnElim}</td>
			</tr>`;
      });
      paginacionPagos();
    });
}

/*************************************************************** */
/*CONVERTIR FECHAS EN FORMA LEGIBLE
/*************************************************************** */
function MostrarFecha(valor) {
  try {
    (date = new Date(valor * 1000)),
      (datevalues = [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
      ]);

    hora = datevalues[3];
    minutos = datevalues[4];
    if (hora >= 13) {
      hora = hora - 12;
      horaN = hora + ":" + minutos + " PM";
    } else {
      horaN = hora + ":" + minutos + " AM";
    }
    formatDate =
      datevalues[2] + "/" + datevalues[1] + "/" + datevalues[0] + " ";
    //Agregamos un array
    contFechas = [formatDate, horaN];
  } catch (error) {
    console.log("No pasa nada");
  }
  return contFechas;
}
/*************************************************************** */
/*MOSTRAR MODAL DE MAS INFORMACIÓN
/*************************************************************** */
function VerMasInfo(mail, cons, tel, soli) {
  let solicitudTaxis = DividirCadena(soli);
  let cadena_solicitudes = "";
  let opcionPago, textoOpcionPago;

  if (solicitudTaxis != null) {
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
                                  <span><span class="font-weight-bold">Placa: </span> ${iterator.placa} <br>
                                  <span class="font-weight-bold">Marca: </span>${iterator.marca} <br>
                                  <span class="font-weight-bold">Monto: </span>$${iterator.monto} </span>
                                </li>
                              </ul>
                              `;
    }
    $("#email_modalA").html(mail);
    $("#consesion_modalA").html(cons);
    $("#telefono_modalA").html(tel);
    $("#opcion_modalA").html(textoOpcionPago);
    $("#solicitud_modalA").html(cadena_solicitudes);
    $("#modalMostrarInfoA").modal("show");
  }
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
function mostrarModalMensaje(mensajeM, colorTodos, linkImagenCuerpo) {
  $("#cabezaModalA").css("background-color", colorTodos);
  $("#textoCuerpoModalA").css("color", colorTodos);
  $("#botonAceptarModalElimA").css("background-color", colorTodos);
  $("#botonCancelarModalA").css("background-color", "#E30613");
  $("#imagenCuerpoA").attr("src", linkImagenCuerpo);
  $("#textoCuerpoModalA").html(mensajeM);
  $("#modalMensajesA").modal("show");
}
/*************************************************************** */
/*ELIMINAR REGISTRO
/*************************************************************** */
function EliminarPago(id) {
  mensajeM = `¿Estas seguro de eliminar este registro?`;
  colorTodos = "#414c50";
  linkImagen = "../../Diseno/ICONOS/alerta.svg";
  mostrarModalMensaje(mensajeM, colorTodos, linkImagen);

  $("#botonAceptarModalElimA").click(function (e) {
    e.preventDefault();
    db.collection("pagos_realizados")
      .doc(id)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  });
}
/*************************************************************** */
/*REALIZAR BUSQUEDA Y LIMPIAR
/*************************************************************** */
$("#btn_bus_pagos").click(function (e) {
  e.preventDefault();
  //agregarNuevaFecha();
  switch (valOpcionBus) {
    case 1:
      BusquedaEdoCdPagos();
      break;
    case 2:
      BusquedaNomPagos();
      break;
    default:
      break;
  }
});
$("#btn_limpiar_pagos").click(function (e) {
  e.preventDefault();
  BusquedaGeneral();
  let selectSitio = document.getElementById("select_sitio_pagos");
  selectSitio.children[0].selected = true;
  let selectCd = document.getElementById("select_cd_pagos");
  selectCd.children[0].selected = true;
  document.getElementById("campo_bus_pagos").value = "";
});

/*************************************************************** */
/*PAGINACIÓN
/*************************************************************** */
function paginacionPagos() {
  /*************************************************************************/
  /**							INICIA PAGINACION 							**/
  /*************************************************************************/
  const rowsPerPage = 3;
  const rows = $("#my-table_pagos tbody tr");
  const rowsCount = rows.length;
  const pageCount = Math.ceil(rowsCount / rowsPerPage); // evitar decimales
  displayRows(1); // Muestra el primer conjunto de filas.

  /**#####################################################################**/
  /**					INICIA PAGINACION CON bootpag.min.js				**/
  /**#####################################################################**/
  $("#pagination-here_pagos").bootpag({
    total: pageCount,
    page: 1,
    maxVisible: 3,
    leaps: true,
  });

  //al hacer click en el paginador
  $("#pagination-here_pagos").on("page", function (event, num) {
    displayRows(num);
  });

  // función que muestra filas de una página específica.
  function displayRows(index) {
    var start = (index - 1) * rowsPerPage;
    var end = start + rowsPerPage;
    rows.hide(); // Ocultar todas las filas
    rows.slice(start, end).show(); // Muestra las filas adecuadas para esta página.
  }
}

/*************************************************************** */
/*CODIGO DE PAGAR FISICAMENTE :V
/*************************************************************** */
var email_global = "";
var estado_global = "";
var ciudad_global = "";
var telefono_global = "";
var nombre_global = "";
var apellido_global = "";
var consesion_global = "";
var montoMes_global = 0;
var montoAnual_global = 0;
var descuento_global = 0;
var opcionPago_global = "";
//var idPagosRealizados_global = '';

function MostrarDatosUser(edo, cd, nom, ape, cons, tel) {
  let opcionP = document.getElementById("selectOpcionPago").value;
  $("#label_edo").html(edo);
  $("#label_cd").html(cd);
  $("#label_nom").html(nom);
  $("#label_ape").html(ape);
  $("#label_cons").html(cons);
  $("#label_opcionP").html(opcionP);
  $("#label_tel").html(tel);
}

function BuscarEdoCdUser() {
  email_global = document.getElementById("campo_email").value;
  let statusBusEdoCdUser = false;
  db.collection("reg_prop_prin_web")
    .where("email", "==", email_global)
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
        BuscarCostoMes(estado_global, ciudad_global, email_global);
        MostrarDatosUser(
          estado_global,
          ciudad_global,
          nombre_global,
          apellido_global,
          consesion_global,
          telefono_global
        );
      }
    })
    .catch(function (error) {
      console.log(error);
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
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

//Esto es funciones del mes
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
        //$("#cajaVisual").removeClass("d-none");
        selectTaxis.innerHTML = "";
        selectTaxis.innerHTML += `<option value="" disabled>Selecciona</option>`;
        for (const iterator of taxisResul) {
          totalPagar = montoMes_global - iterator.todo.suma_descuentos;
          selectTaxis.innerHTML += `<option value="${iterator.todo.placa}_${totalPagar}=${iterator.id}>${iterator.todo.marca}">${iterator.todo.placa}</option>`;
        }
        $(".selectpicker").selectpicker("refresh");
        //AQUI TERMINA EL LLENADO DEL SELECT Y FINALIZA EL LOADER
      } else {
        console.log("No hay taxis");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function BuscarTaxiGeneralMes(email, montoMes) {
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
          $("#mensaje_taxis_activos").removeClass("d-none");
          $("#contenedor_select").addClass("d-none");
          $("#ocultar_btn_pago").addClass("d-none");
        } else {
          $("#mensaje_taxis_activos").addClass("d-none");
          $("#contenedor_select").removeClass("d-none");
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

//Funciones del anio
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
        selectTaxis.innerHTML = "";
        selectTaxis.innerHTML += `<option value="" disabled>Selecciona</option>`;
        for (const iterator of taxisResul) {
          totalPagar = montoAnual_global - iterator.todo.suma_descuentos;
          selectTaxis.innerHTML += `<option value="${iterator.todo.placa}_${totalPagar}=${iterator.id}>${iterator.todo.marca}">${iterator.todo.placa}</option>`;
        }
        $(".selectpicker").selectpicker("refresh");
        //AQUI TERMINA EL LLENADO DEL SELECT Y FINALIZA EL LOADER
      } else {
        console.log("No hay taxis");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function BuscarTaxiGeneralAnio(email, montoAnio, descuentoAnio) {
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
          $("#mensaje_taxis_activos").removeClass("d-none");
          $("#contenedor_select").addClass("d-none");
          $("#ocultar_btn_pago").addClass("d-none");
        } else {
          $("#mensaje_taxis_activos").addClass("d-none");
          $("#contenedor_select").removeClass("d-none");
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

$("#selectOpcionPago").change(function () {
  opcionPago_global = document.getElementById("selectOpcionPago").value;
  if (opcionPago_global != "0") {
    BuscarEdoCdUser();
  }
});

$("#btn_consultar_user").click(function (e) {
  e.preventDefault();
  if (opcionPago_global === "Mensual") {
    BuscarTaxiGeneralMes(email_global, montoMes_global);
    BuscarTaxiInactivoMes(email_global);
    $("#cajaPago1").removeClass("d-none");
    $("#cajaPago2").removeClass("d-none");
  } else if (opcionPago_global === "Anual") {
    BuscarTaxiGeneralAnio(email_global, montoAnual_global, descuento_global);
    BuscarTaxiInactivoAnio(email_global);
    $("#cajaPago1").removeClass("d-none");
    $("#cajaPago2").removeClass("d-none");
  } else if (opcionPago_global === "0" || email_global === "") {
    alert("Verifica los campos");
    $("#cajaPago1").addClass("d-none");
    $("#cajaPago2").addClass("d-none");
  }
});

$("#btn_cancelar_pago").click(function (e) {
  e.preventDefault();
  $("#cajaPago1").addClass("d-none");
  $("#cajaPago2").addClass("d-none");
});

$("#btn_aceptar_pago").click(function (e) {
  e.preventDefault();
  PagosRealizados();
  $("#cajaPago1").addClass("d-none");
  $("#cajaPago2").addClass("d-none");
});

/*************************************************************** */
/*GUARDAR DATOS DEL TAXI Y EN PAGOS REALIZADOS
/*************************************************************** */
$("#selectTaxis").change(function () {
  $("#cajaTaxiSelect").val("" + $("#selectTaxis").val());
  let cajaSelect = document.getElementById("cajaTaxiSelect").value;
  if (cajaSelect === "") {
    $("#mensajeSeleccion").removeClass("d-none");
    $("#ocultar_btn_pago").addClass("d-none");
  } else {
    $("#mensajeSeleccion").addClass("d-none");
    $("#ocultar_btn_pago").removeClass("d-none");
  }
});

function PagosRealizados() {
  let solicitud = document.getElementById("cajaTaxiSelect").value;
  db.collection("pagos_realizados")
    .add({
      estado: estado_global,
      ciudad: ciudad_global,
      nombre: nombre_global,
      apellido: apellido_global,
      email: email_global,
      consesion: consesion_global,
      telefono: telefono_global,
      fecha_aceptacion: firebase.firestore.FieldValue.serverTimestamp(),
      solicitud: solicitud,
    })
    .then(function (docRef) {
      console.log("Registro exitoso");
      //idPagosRealizados_global = docRef.id;
      RecuperarFechaBD(docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}

function RecuperarFechaBD(idPago) {
  let OpcionPago = document.getElementById("selectOpcionPago").value;
  let segundosBD;
  let docRef = db.collection("pagos_realizados").doc(idPago);
  docRef
    .get()
    .then(function (doc) {
      if (doc.exists) {
        segundosBD = doc.data().fecha_aceptacion.seconds;
        ValidarFecha(idPago, segundosBD, OpcionPago);
      } else {
        console.log("No enontro el documento");
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
}

//Checar fecha
function ValidarFecha(idPago, segundos, OpcionPago) {
  let dia2 = 0,
    mes2 = 0,
    anio2 = 0;

  //Se obtiene las fecha actual
  let date = new Date(segundos * 1000);
  let mes = date.getMonth();
  let anio = date.getFullYear();
  let dia = date.getDate();

  //Array que contiene los dias del mes
  let days_in_months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (new Date(anio, 1, 29).getDate() == 29) days_in_months[1] = 29;

  //Obtener dias de mes actual y siguiente mes
  let diasActual = days_in_months[mes];
  let diasSig = days_in_months[mes + 1];

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

  if (OpcionPago === "Mensual") {
    fechaCompletaActual = anio + "-" + mes + "-" + dia;
    fechaCompletaSiguiente = anio2 + "-" + mes2 + "-" + dia2;
  } else if (OpcionPago === "Anual") {
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

  GuardarSegFechas(idPago, totalSegundosBD, totalSegundosAdd);
}

//Guardar los segundos para comparar
function GuardarSegFechas(idPago, fechaInicio, fechaFin) {
  db.collection("pagos_realizados")
    .doc(idPago)
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
      CicloUpdateTaxi(fechaInicio, fechaFin);
    })
    .catch(function (error) {
      console.log(error);
    });
}

//Agregar datos a la coleccion taxis
function CicloUpdateTaxi(fechaIni, fechaFin) {
  let OpcionPago = document.getElementById("selectOpcionPago").value;
  let solicitud = document.getElementById("cajaTaxiSelect").value;
  let objetoRes = DividirCadena(solicitud);
  for (const iterator of objetoRes) {
    UpdateStatusPagoTaxi(
      iterator.id,
      fechaIni,
      fechaFin,
      OpcionPago,
      iterator.monto
    );
  }
}

function UpdateStatusPagoTaxi(
  idTaxi,
  fechaIni,
  fechaFin,
  opcionPago,
  montoPago
) {
  montoPago = parseInt(montoPago);
  let updateSoliTaxi = db.collection("taxis").doc(idTaxi);
  return updateSoliTaxi
    .update({
      status_pago: "true",
      fecha_inicial_pago: firebase.firestore.Timestamp.fromDate(
        new Date(fechaIni * 1000)
      ),
      fecha_final_pago: firebase.firestore.Timestamp.fromDate(
        new Date(fechaFin * 1000)
      ),
      opcion_pago: opcionPago,
      monto_pago: montoPago,
    })
    .then(function () {
      console.log("Document successfully updated!");
    })
    .catch(function (error) {
      console.error("Error updating document: ", error);
    });
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
