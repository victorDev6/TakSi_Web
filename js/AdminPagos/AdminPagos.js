//$(document).ready(function() {
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
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
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
  selectEdo.addEventListener("change", event => {
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
    .then(function(doc) {
      if (doc.exists) {
        obj = doc.data();
        obj = Object.values(obj);
        arrayLibreComa = obj.toString().split(",");
        arrayLibreComa.forEach(function(valor, indice, array) {
          $selectCd.append(`<option value="${valor}">${valor}</option>`);
        });
      } else {
        console.log("No enontro el documento");
        $selectCd.append(`<option selected>Ciudad</option>`);
      }
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });
}

/*************************************************************** */
/*SE LLENA EL SELECT DE ACUERDO AL ESTADO Y CIUDAD SELECCIONADOS
/*************************************************************** */
function LlenarSelectSitioPago() {
  let estado = document.getElementById("select_edo_pagos").value;
  let ciudad = document.getElementById("select_cd_pagos").value;
  let sitios = [];
  let $selectSitio = $("#select_sitio_pagos");
  db.collection("lineas")
    .where("estado", "==", estado)
    .where("ciudad", "==", ciudad)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        sitios.push(doc.data().nombre);
      });
      sitios.forEach(function(valor, indice, array) {
        $selectSitio.append(`<option value="${valor}">${valor}</option>`);
      });
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
      $selectSitio.append(`<option selected>Sitio</option>`);
    });
}
(function ChangeBuscarSitioPago() {
  /**Accion que realiza el selectCd para buscar Sitio*/
  const selectCd = document.querySelector("#select_cd_pagos");
  const selSitio = document.getElementById("select_sitio_pagos");
  selectCd.addEventListener("change", event => {
    selSitio.innerHTML = "";
    selSitio.innerHTML = `<option selected>Sitio</option>`;
    LlenarSelectSitioPago();
  });
})();
(function ChangeOpcionesBus() {
  let selectOpcionBus = document.getElementById("sel_opc_bus_pago");
  let desactivarSitio = document.getElementById("select_sitio_pagos");
  let desactivarEdo = document.getElementById("select_edo_pagos");
  let desactivarCd = document.getElementById("select_cd_pagos");
  let campoBusqueda = document.getElementById("campo_bus_pagos");
  let valorSelect;
  campoBusqueda.disabled = true;
  desactivarEdo.disabled = true;
  desactivarCd.disabled = true;
  desactivarSitio.disabled = true;

  selectOpcionBus.addEventListener("change", event => {
    valorSelect = event.target.value;
    switch (valorSelect) {
      case "1": //Estado y ciudad
        desactivarSitio.disabled = true;
        campoBusqueda.disabled = true;
        desactivarEdo.disabled = false;
        desactivarCd.disabled = false;
        valOpcionBus = 1;
        break;
      case "2": //Estado y ciudad, sitio
        campoBusqueda.disabled = true;
        desactivarEdo.disabled = false;
        desactivarCd.disabled = false;
        desactivarSitio.disabled = false;
        valOpcionBus = 2;
        break;
      case "3": //Nombre
        campoBusqueda.disabled = false;
        desactivarEdo.disabled = true;
        desactivarCd.disabled = true;
        desactivarSitio.disabled = true;
        valOpcionBus = 3;
        break;
      case "4": //Cantidad
        campoBusqueda.disabled = false;
        desactivarEdo.disabled = true;
        desactivarCd.disabled = true;
        desactivarSitio.disabled = true;
        valOpcionBus = 4;
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

function BusquedaGeneral() {
  let tabla = document.getElementById("tabla_general_pagos");
  let contadorCosto = 0;
  db.collection("pagos_realizados").onSnapshot(function(querySnapshot) {
    tabla.innerHTML = "";
    contadorCosto = 0;
    querySnapshot.forEach(function(doc) {
      contFecha = MostrarFecha(doc.data().fecha.seconds);
      contadorCosto += 1;
      tabla.innerHTML += `
            <tr>
                <td class="text-nowrap">${contadorCosto}</td>
			    <td class="text-nowrap">${doc.data().estado}</td>
				<td class="text-nowrap">${doc.data().ciudad}</td>
				<td class="text-nowrap">${doc.data().nombre}</td>
                <td class="text-nowrap">${doc.data().apellido}</td>
                <td class="text-nowrap">${doc.data().concepto}</td>
                <td class="text-nowrap">${contFecha[0]} 
                <p class="py-0 my-0">${contFecha[1]}</p></td>
                <td class="text-nowrap">${doc.data().tipo}</td>
                <td class="text-nowrap">${doc.data().cantidad}</td>
                <td class="text-nowrap">${doc.data().sitio}</td>
                <td class="text-nowrap"><button class="btn btn-danger btn-sm" 
                onclick="EliminarPago('${doc.id}')">Eliminar</button></td>
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
  db.collection("pagos_realizados")
    .where("estado", "==", estado)
    .where("ciudad", "==", ciudad)
    .onSnapshot(function(querySnapshot) {
      tabla.innerHTML = "";
      contadorCosto = 0;
      querySnapshot.forEach(function(doc) {
        contFecha = MostrarFecha(doc.data().fecha.seconds);
        contadorCosto += 1;
        tabla.innerHTML += `
            <tr>
                <td class="text-nowrap">${contadorCosto}</td>
			    <td class="text-nowrap">${doc.data().estado}</td>
				<td class="text-nowrap">${doc.data().ciudad}</td>
				<td class="text-nowrap">${doc.data().nombre}</td>
                <td class="text-nowrap">${doc.data().apellido}</td>
                <td class="text-nowrap">${doc.data().concepto}</td>
                <td class="text-nowrap">${contFecha[0]} 
                <p class="py-0 my-0">${contFecha[1]}</p></td>
                <td class="text-nowrap">${doc.data().tipo}</td>
                <td class="text-nowrap">${doc.data().cantidad}</td>
                <td class="text-nowrap">${doc.data().sitio}</td>
                <td class="text-nowrap"><button class="btn btn-danger btn-sm" 
                onclick="EliminarPago('${doc.id}')">Eliminar</button></td>
			</tr>`;
      });
      paginacionPagos();
    });
}
function BusquedaEdoCdSitioPagos() {
  let tabla = document.getElementById("tabla_general_pagos");
  let estado = document.getElementById("select_edo_pagos").value;
  let ciudad = document.getElementById("select_cd_pagos").value;
  let sitio = document.getElementById("select_sitio_pagos").value;
  let contadorCosto = 0;
  db.collection("pagos_realizados")
    .where("estado", "==", estado)
    .where("ciudad", "==", ciudad)
    .where("sitio", "==", sitio)
    .onSnapshot(function(querySnapshot) {
      tabla.innerHTML = "";
      contadorCosto = 0;
      querySnapshot.forEach(function(doc) {
        contFecha = MostrarFecha(doc.data().fecha.seconds);
        contadorCosto += 1;
        tabla.innerHTML += `
            <tr>
                <td class="text-nowrap">${contadorCosto}</td>
			    <td class="text-nowrap">${doc.data().estado}</td>
				<td class="text-nowrap">${doc.data().ciudad}</td>
				<td class="text-nowrap">${doc.data().nombre}</td>
                <td class="text-nowrap">${doc.data().apellido}</td>
                <td class="text-nowrap">${doc.data().concepto}</td>
                <td class="text-nowrap">${contFecha[0]} 
                <p class="py-0 my-0">${contFecha[1]}</p></td>
                <td class="text-nowrap">${doc.data().tipo}</td>
                <td class="text-nowrap">${doc.data().cantidad}</td>
                <td class="text-nowrap">${doc.data().sitio}</td>
                <td class="text-nowrap"><button class="btn btn-danger btn-sm" 
                onclick="EliminarPago('${doc.id}')">Eliminar</button></td>
			</tr>`;
      });
      paginacionPagos();
    });
}
function BusquedaNomPagos() {
  let tabla = document.getElementById("tabla_general_pagos");
  let nombre = document.getElementById("campo_bus_pagos").value;
  let contadorCosto = 0;
  db.collection("pagos_realizados")
    .where("nombre", "==", nombre)
    .onSnapshot(function(querySnapshot) {
      tabla.innerHTML = "";
      contadorCosto = 0;
      querySnapshot.forEach(function(doc) {
        contFecha = MostrarFecha(doc.data().fecha.seconds);
        contadorCosto += 1;
        tabla.innerHTML += `
            <tr>
                <td class="text-nowrap">${contadorCosto}</td>
			    <td class="text-nowrap">${doc.data().estado}</td>
				<td class="text-nowrap">${doc.data().ciudad}</td>
				<td class="text-nowrap">${doc.data().nombre}</td>
                <td class="text-nowrap">${doc.data().apellido}</td>
                <td class="text-nowrap">${doc.data().concepto}</td>
                <td class="text-nowrap">${contFecha[0]} 
                <p class="py-0 my-0">${contFecha[1]}</p></td>
                <td class="text-nowrap">${doc.data().tipo}</td>
                <td class="text-nowrap">${doc.data().cantidad}</td>
                <td class="text-nowrap">${doc.data().sitio}</td>
                <td class="text-nowrap"><button class="btn btn-danger btn-sm" 
                onclick="EliminarPago('${doc.id}')">Eliminar</button></td>
			</tr>`;
      });
      paginacionPagos();
    });
}
function BusquedaCantPagos() {
  let tabla = document.getElementById("tabla_general_pagos");
  let cantidad = document.getElementById("campo_bus_pagos").value;
  cantidad = parseInt(cantidad);
  let contadorCosto = 0;
  db.collection("pagos_realizados")
    .where("cantidad", "==", cantidad)
    .onSnapshot(function(querySnapshot) {
      tabla.innerHTML = "";
      contadorCosto = 0;
      querySnapshot.forEach(function(doc) {
        contFecha = MostrarFecha(doc.data().fecha.seconds);
        contadorCosto += 1;
        tabla.innerHTML += `
            <tr>
                <td class="text-nowrap">${contadorCosto}</td>
			    <td class="text-nowrap">${doc.data().estado}</td>
				<td class="text-nowrap">${doc.data().ciudad}</td>
				<td class="text-nowrap">${doc.data().nombre}</td>
                <td class="text-nowrap">${doc.data().apellido}</td>
                <td class="text-nowrap">${doc.data().concepto}</td>
                <td class="text-nowrap">${contFecha[0]} 
                <p class="py-0 my-0">${contFecha[1]}</p></td>
                <td class="text-nowrap">${doc.data().tipo}</td>
                <td class="text-nowrap">${doc.data().cantidad}</td>
                <td class="text-nowrap">${doc.data().sitio}</td>
                <td class="text-nowrap"><button class="btn btn-danger btn-sm" 
                onclick="EliminarPago('${doc.id}')">Eliminar</button></td>
			</tr>`;
      });
      paginacionPagos();
    });
}

function MostrarFecha(valor) {
  try {
    (date = new Date(valor * 1000)),
      (datevalues = [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes()
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

function EliminarPago(id) {
  db.collection("pagos_realizados")
    .doc(id)
    .delete()
    .then(function() {
      console.log("Document successfully deleted!");
    })
    .catch(function(error) {
      console.error("Error removing document: ", error);
    });
}

$("#btn_bus_pagos").click(function(e) {
  e.preventDefault();
  //agregarNuevaFecha();
  switch (valOpcionBus) {
    case 1:
      BusquedaEdoCdPagos();
      break;
    case 2:
      BusquedaEdoCdSitioPagos();
      break;
    case 3:
      BusquedaNomPagos();
      break;
    case 4:
      BusquedaCantPagos();
      break;
    default:
      break;
  }
});
$("#btn_limpiar_pagos").click(function(e) {
  e.preventDefault();
  BusquedaGeneral();
  let selectSitio = document.getElementById("select_sitio_pagos");
  selectSitio.children[0].selected = true;
  let selectCd = document.getElementById("select_cd_pagos");
  selectCd.children[0].selected = true;
  document.getElementById("campo_bus_pagos").value = "";
});

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
    leaps: true
  });

  //al hacer click en el paginador
  $("#pagination-here_pagos").on("page", function(event, num) {
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

function obtenerFecha() {
  db.collection("pagos_realizados")
    .where("cantidad", "==", cantidad)
    .onSnapshot(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        contFecha = MostrarFecha(doc.data().fecha.seconds);
      });
    });
}

function toTimestamp() {
  let myDate = "20-03-2010 21:23:13";
  let resultado;
  myDate = myDate.split("-");
  let newDate = myDate[1] + "/" + myDate[0] + "/" + myDate[2];
  resultado = new Date(newDate).getTime();
  console.log(resultado);
  return resultado;
}
//toTimestamp();

function agregarNuevaFecha() {
  let fechaFinal = toTimestamp();
  db.collection("prueba_guardar_fecha")
    .add({
      fechaIni: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(function(docRef) {
      console.log("Registro exitoso");
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
}
//}); //FIN DEL DOC
