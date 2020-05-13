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

/**Variable global para verificar el modo de busqueda */
var valorOpcionBusqueda;

/********************************************************** */
/*SE LLENAN LOS SELECT DE ESTADO Y CIUDAD
/*********************************************************** */
(function ObtenerEdoP() {
  let estados = [];
  let $selectEdo = $("#selectEdo_AdminPerfil");
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
  const selectEdo = document.querySelector("#selectEdo_AdminPerfil");
  const selectCd = document.querySelector("#selectCd_AdminPerfil");
  selectEdo.addEventListener("change", (event) => {
    selectCd.innerHTML = "";
    selectCd.innerHTML = `<option selected>Ciudad</option>`;
    ObtenerCdP(event.target.value);
  });
})();
function ObtenerCdP(estado) {
  let obj = [];
  let arrayLibreComa = [];
  let $selectCd = $("#selectCd_AdminPerfil");
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
(function ChangeSelectOpciones() {
  let selectOpcionBus = document.getElementById("addSelectOpcionesP");
  let valorSelect;
  selectOpcionBus.addEventListener("change", (event) => {
    valorSelect = event.target.value;
    switch (valorSelect) {
      case "1": //Estado y ciudad
        $("#esconderCajaP").addClass("d-none");
        $("#esconderSelEdo").removeClass("d-none");
        $("#esconderSelCd").removeClass("d-none");
        valorOpcionBusqueda = 1;
        break;
      case "2": //Nombre
        $("#esconderCajaP").removeClass("d-none");
        $("#esconderSelEdo").addClass("d-none");
        $("#esconderSelCd").addClass("d-none");
        valorOpcionBusqueda = 2;
        break;
      case "3": //Apellido
        $("#esconderCajaP").removeClass("d-none");
        $("#esconderSelEdo").addClass("d-none");
        $("#esconderSelCd").addClass("d-none");
        valorOpcionBusqueda = 3;
        break;
      case "4": //Status
        $("#esconderCajaP").removeClass("d-none");
        $("#esconderSelEdo").addClass("d-none");
        $("#esconderSelCd").addClass("d-none");
        valorOpcionBusqueda = 4;
        break;
      default:
        console.log("No selecciono nada");
        $("#esconderCajaP").addClass("d-none");
        $("#esconderSelEdo").addClass("d-none");
        $("#esconderSelCd").addClass("d-none");
        break;
    }
  });
})();

function BusquedaGeneral() {
  $("#my-table_perfiles").removeClass("d-none");
  let formatDate;
  let date;
  let datevalues = [];
  let contadorCosto = 0;
  let statusP, statusEmail, colorC, colorTexto, colorTextEmail;
  let tabla = document.getElementById("tabla_general_perfiles");
  db.collection("reg_prop_prin_web")
    .orderBy("fecha", "desc")
    .onSnapshot(function (querySnapshot) {
      contadorCosto = 0;
      tabla.innerHTML = "";
      querySnapshot.forEach(function (doc) {
        /**Realiza la conversion de fecha */
        try {
          (date = new Date(doc.data().fecha.seconds * 1000)),
            (datevalues = [
              date.getFullYear(),
              date.getMonth() + 1,
              date.getDate(),
            ]);
          formatDate =
            datevalues[2] + "/" + datevalues[1] + "/" + datevalues[0];
        } catch (error) {
          console.log("No pasa nada");
        }

        /**Contador para crear el numeral */
        contadorCosto += 1;
        /**si es activo o inactivo */
        if (doc.data().status === "false") {
          statusP = "Activar";
          colorC = "btn-success";
          colorTexto = "font-weight-bold text-dark bg-warning";
        } else {
          statusP = "Desactivar";
          colorC = "btn-warning";
          colorTexto = "font-weight-bold text-white bg-success";
        }
        /**Si el status es true o false */
        if (doc.data().verifEmail === "false") {
          colorTextEmail = "font-weight-bold text-dark bg-warning";
        } else {
          colorTextEmail = "font-weight-bold text-white bg-success";
        }
        tabla.innerHTML += `<tr>
							<td class="text-nowrap">${contadorCosto}</td>
              <td class="text-nowrap">${formatDate}</td>
							<td class="text-nowrap">${doc.data().estado}</td>
							<td class="text-nowrap">${doc.data().ciudad}</td>
              <td class="text-nowrap">${doc.data().nombre}</td>
              <td class="text-nowrap">${doc.data().apellido}</td>
              <td class="text-nowrap ${colorTextEmail}">
              ${doc.data().verifEmail}</td>
              <td class="text-nowrap ${colorTexto}">
              ${doc.data().status}</td>
              <td class="text-nowrap">
              <button class="btn ${colorC} btn-sm" 
              onclick="CambiarStatus('${doc.id}', '${doc.data().status}')">
              ${statusP}</button></td>
              <td class="text-nowrap">
              <button class="btn btn-danger btn-sm" 
              onclick="EliminarPerfil('${doc.id}')">
              Eliminar</button></td>
							</tr>`;
      });
      paginacionA();
    });
}
function BusquedaEdoCd() {
  $("#my-table_perfiles").removeClass("d-none");
  let formatDate;
  let date;
  let datevalues = [];
  let contadorCosto = 0;
  let statusP, statusEmail, colorC, colorTexto, colorTextEmail;
  let selEstado = document.getElementById("selectEdo_AdminPerfil").value;
  let selCiudad = document.getElementById("selectCd_AdminPerfil").value;
  let tabla = document.getElementById("tabla_general_perfiles");
  db.collection("reg_prop_prin_web")
    .where("estado", "==", selEstado)
    .where("ciudad", "==", selCiudad)
    .onSnapshot(function (querySnapshot) {
      contadorCosto = 0;
      tabla.innerHTML = "";
      querySnapshot.forEach(function (doc) {
        /**Realiza la conversion de fecha */
        try {
          (date = new Date(doc.data().fecha.seconds * 1000)),
            (datevalues = [
              date.getFullYear(),
              date.getMonth() + 1,
              date.getDate(),
            ]);
          formatDate =
            datevalues[2] + "/" + datevalues[1] + "/" + datevalues[0];
        } catch (error) {
          console.log("No pasa nada");
        }

        /**Contador para crear el numeral */
        contadorCosto += 1;
        /**si es activo o inactivo */
        if (doc.data().status === "false") {
          statusP = "Activar";
          colorC = "btn-success";
          colorTexto = "font-weight-bold text-dark bg-warning";
        } else {
          statusP = "Desactivar";
          colorC = "btn-warning";
          colorTexto = "font-weight-bold text-white bg-success";
        }
        /**Si el status es true o false */
        if (doc.data().verifEmail === "false") {
          colorTextEmail = "font-weight-bold text-dark bg-warning";
        } else {
          colorTextEmail = "font-weight-bold text-white bg-success";
        }
        tabla.innerHTML += `<tr>
							<td class="text-nowrap">${contadorCosto}</td>
              <td class="text-nowrap">${formatDate}</td>
							<td class="text-nowrap">${doc.data().estado}</td>
							<td class="text-nowrap">${doc.data().ciudad}</td>
              <td class="text-nowrap">${doc.data().nombre}</td>
              <td class="text-nowrap">${doc.data().apellido}</td>
              <td class="text-nowrap ${colorTextEmail}">
              ${doc.data().verifEmail}</td>
              <td class="text-nowrap ${colorTexto}">
              ${doc.data().status}</td>
              <td class="text-nowrap">
              <button class="btn ${colorC} btn-sm" 
              onclick="CambiarStatus('${doc.id}', '${doc.data().status}')">
              ${statusP}</button></td>
              <td class="text-nowrap">
              <button class="btn btn-danger btn-sm" 
              onclick="EliminarPerfil('${doc.id}')">
              Eliminar</button></td>
							</tr>`;
      });
      paginacionA();
    });
}
function BusquedaNombre() {
  $("#my-table_perfiles").removeClass("d-none");
  let formatDate;
  let date;
  let datevalues = [];
  let contadorCosto = 0;
  let statusP, statusEmail, colorC, colorTexto, colorTextEmail;
  let nombreP = document.getElementById("caja_bus_filtrada_p").value;
  let tabla = document.getElementById("tabla_general_perfiles");
  db.collection("reg_prop_prin_web")
    .where("nombre", "==", nombreP.trim())
    .onSnapshot(function (querySnapshot) {
      contadorCosto = 0;
      tabla.innerHTML = "";
      querySnapshot.forEach(function (doc) {
        /**Realiza la conversion de fecha */
        try {
          (date = new Date(doc.data().fecha.seconds * 1000)),
            (datevalues = [
              date.getFullYear(),
              date.getMonth() + 1,
              date.getDate(),
            ]);
          formatDate =
            datevalues[2] + "/" + datevalues[1] + "/" + datevalues[0];
        } catch (error) {
          console.log("No pasa nada");
        }

        /**Contador para crear el numeral */
        contadorCosto += 1;
        /**si es activo o inactivo */
        if (doc.data().status === "false") {
          statusP = "Activar";
          colorC = "btn-success";
          colorTexto = "font-weight-bold text-dark bg-warning";
        } else {
          statusP = "Desactivar";
          colorC = "btn-warning";
          colorTexto = "font-weight-bold text-white bg-success";
        }
        /**Si el status es true o false */
        if (doc.data().verifEmail === "false") {
          colorTextEmail = "font-weight-bold text-dark bg-warning";
        } else {
          colorTextEmail = "font-weight-bold text-white bg-success";
        }
        tabla.innerHTML += `<tr>
							<td class="text-nowrap">${contadorCosto}</td>
              <td class="text-nowrap">${formatDate}</td>
							<td class="text-nowrap">${doc.data().estado}</td>
							<td class="text-nowrap">${doc.data().ciudad}</td>
              <td class="text-nowrap">${doc.data().nombre}</td>
              <td class="text-nowrap">${doc.data().apellido}</td>
              <td class="text-nowrap ${colorTextEmail}">
              ${doc.data().verifEmail}</td>
              <td class="text-nowrap ${colorTexto}">
              ${doc.data().status}</td>
              <td class="text-nowrap">
              <button class="btn ${colorC} btn-sm" 
              onclick="CambiarStatus('${doc.id}', '${doc.data().status}')">
              ${statusP}</button></td>
              <td class="text-nowrap">
              <button class="btn btn-danger btn-sm" 
              onclick="EliminarPerfil('${doc.id}')">
              Eliminar</button></td>
							</tr>`;
      });
      paginacionA();
    });
}
function BusquedaApellido() {
  $("#my-table_perfiles").removeClass("d-none");
  let formatDate;
  let date;
  let datevalues = [];
  let contadorCosto = 0;
  let statusP, statusEmail, colorC, colorTexto, colorTextEmail;
  let apellidoP = document.getElementById("caja_bus_filtrada_p").value;
  let tabla = document.getElementById("tabla_general_perfiles");
  db.collection("reg_prop_prin_web")
    .where("apellido", "==", apellidoP.trim())
    .onSnapshot(function (querySnapshot) {
      contadorCosto = 0;
      tabla.innerHTML = "";
      querySnapshot.forEach(function (doc) {
        /**Realiza la conversion de fecha */
        try {
          (date = new Date(doc.data().fecha.seconds * 1000)),
            (datevalues = [
              date.getFullYear(),
              date.getMonth() + 1,
              date.getDate(),
            ]);
          formatDate =
            datevalues[2] + "/" + datevalues[1] + "/" + datevalues[0];
        } catch (error) {
          console.log("No pasa nada");
        }

        /**Contador para crear el numeral */
        contadorCosto += 1;
        /**si es activo o inactivo */
        if (doc.data().status === "false") {
          statusP = "Activar";
          colorC = "btn-success";
          colorTexto = "font-weight-bold text-dark bg-warning";
        } else {
          statusP = "Desactivar";
          colorC = "btn-warning";
          colorTexto = "font-weight-bold text-white bg-success";
        }
        /**Si el status es true o false */
        if (doc.data().verifEmail === "false") {
          colorTextEmail = "font-weight-bold text-dark bg-warning";
        } else {
          colorTextEmail = "font-weight-bold text-white bg-success";
        }
        tabla.innerHTML += `<tr>
							<td class="text-nowrap">${contadorCosto}</td>
              <td class="text-nowrap">${formatDate}</td>
							<td class="text-nowrap">${doc.data().estado}</td>
							<td class="text-nowrap">${doc.data().ciudad}</td>
              <td class="text-nowrap">${doc.data().nombre}</td>
              <td class="text-nowrap">${doc.data().apellido}</td>
              <td class="text-nowrap ${colorTextEmail}">
              ${doc.data().verifEmail}</td>
              <td class="text-nowrap ${colorTexto}">
              ${doc.data().status}</td>
              <td class="text-nowrap">
              <button class="btn ${colorC} btn-sm" 
              onclick="CambiarStatus('${doc.id}', '${doc.data().status}')">
              ${statusP}</button></td>
              <td class="text-nowrap">
              <button class="btn btn-danger btn-sm" 
              onclick="EliminarPerfil('${doc.id}')">
              Eliminar</button></td>
							</tr>`;
      });
      paginacionA();
    });
}
function BusquedaStatus() {
  $("#my-table_perfiles").removeClass("d-none");
  let formatDate;
  let date;
  let datevalues = [];
  let contadorCosto = 0;
  let statusP, statusEmail, colorC, colorTexto, colorTextEmail;
  let statusPerfil = document.getElementById("caja_bus_filtrada_p").value;
  let tabla = document.getElementById("tabla_general_perfiles");
  db.collection("reg_prop_prin_web")
    .where("status", "==", statusPerfil.trim())
    .onSnapshot(function (querySnapshot) {
      contadorCosto = 0;
      tabla.innerHTML = "";
      querySnapshot.forEach(function (doc) {
        /**Realiza la conversion de fecha */
        try {
          (date = new Date(doc.data().fecha.seconds * 1000)),
            (datevalues = [
              date.getFullYear(),
              date.getMonth() + 1,
              date.getDate(),
            ]);
          formatDate =
            datevalues[2] + "/" + datevalues[1] + "/" + datevalues[0];
        } catch (error) {
          console.log("No pasa nada");
        }

        /**Contador para crear el numeral */
        contadorCosto += 1;
        /**si es activo o inactivo */
        if (doc.data().status === "false") {
          statusP = "Activar";
          colorC = "btn-success";
          colorTexto = "font-weight-bold text-dark bg-warning";
        } else {
          statusP = "Desactivar";
          colorC = "btn-warning";
          colorTexto = "font-weight-bold text-white bg-success";
        }
        /**Si el status es true o false */
        if (doc.data().verifEmail === "false") {
          colorTextEmail = "font-weight-bold text-dark bg-warning";
        } else {
          colorTextEmail = "font-weight-bold text-white bg-success";
        }
        tabla.innerHTML += `<tr>
							<td class="text-nowrap">${contadorCosto}</td>
              <td class="text-nowrap">${formatDate}</td>
							<td class="text-nowrap">${doc.data().estado}</td>
							<td class="text-nowrap">${doc.data().ciudad}</td>
              <td class="text-nowrap">${doc.data().nombre}</td>
              <td class="text-nowrap">${doc.data().apellido}</td>
              <td class="text-nowrap ${colorTextEmail}">
              ${doc.data().verifEmail}</td>
              <td class="text-nowrap ${colorTexto}">
              ${doc.data().status}</td>
              <td class="text-nowrap">
              <button class="btn ${colorC} btn-sm" 
              onclick="CambiarStatus('${doc.id}', '${doc.data().status}')">
              ${statusP}</button></td>
              <td class="text-nowrap">
              <button class="btn btn-danger btn-sm" 
              onclick="EliminarPerfil('${doc.id}')">
              Eliminar</button></td>
							</tr>`;
      });
      paginacionA();
    });
}

$("#btn_buscar_perfiles").click(function (e) {
  e.preventDefault();
  EjecutarBusquedas(valorOpcionBusqueda);
});
function EjecutarBusquedas(numero) {
  switch (numero) {
    case 1:
      BusquedaEdoCd();
      break;
    case 2:
      BusquedaNombre();
      break;
    case 3:
      BusquedaApellido();
      break;
    case 4:
      BusquedaStatus();
      break;
    default:
      break;
  }
}
$("#btn_limpiar_perfiles").click(function (e) {
  e.preventDefault();
  BusquedaGeneral();
  document.getElementById("caja_bus_filtrada_p").value = "";
  /*var select = document.getElementById("addSelectOpcionesP");
  select.children[0].selected = true;*/
});

/**Cambiar Status Activo/Inactivo */
function CambiarStatus(id, status) {
  let NewStatus;
  if (status === "true") {
    NewStatus = "false";
  } else {
    NewStatus = "true";
  }
  let editarStatus = db.collection("reg_prop_prin_web").doc(id);
  return editarStatus
    .update({
      status: NewStatus,
    })
    .then(function () {
      console.log("Se cambio de Status");
    })
    .catch(function (error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });
}
/**Eliminar Perfil */
function EliminarPerfil(id) {
  db.collection("reg_prop_prin_web")
    .doc(id)
    .delete()
    .then(function () {
      console.log("Document successfully deleted!");
    })
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
}
/**Ejecutar Busqueda */
BusquedaGeneral();

function paginacionA() {
  /*************************************************************************/
  /**							INICIA PAGINACION 							**/
  /*************************************************************************/
  const rowsPerPage = 3;
  const rows = $("#my-table_perfiles tbody tr");
  const rowsCount = rows.length;
  const pageCount = Math.ceil(rowsCount / rowsPerPage); // evitar decimales
  displayRows(1); // Muestra el primer conjunto de filas.

  /**#####################################################################**/
  /**					INICIA PAGINACION CON bootpag.min.js				**/
  /**#####################################################################**/
  $("#pagination-here_p").bootpag({
    total: pageCount,
    page: 1,
    maxVisible: 3,
    leaps: true,
  });

  //al hacer click en el paginador
  $("#pagination-here_p").on("page", function (event, num) {
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

/********************************************************** */
/*QUEJAS DE USUARIOS
/*********************************************************** */
/**Busqueda General */
(function BusquedaGeneralQuejas() {
  let formatDate;
  let date;
  let datevalues = [];
  let contadorCosto = 0;
  let hora, minutos, resulH;
  let tabla = document.getElementById("tabla_general_quejas");
  db.collection("reportes_usuarios")
    .orderBy("fecha", "desc")
    .onSnapshot(function (querySnapshot) {
      contadorCosto = 0;
      tabla.innerHTML = "";
      querySnapshot.forEach(function (doc) {
        /**Realiza la conversion de fecha */
        try {
          (date = new Date(doc.data().fecha.seconds * 1000)),
            (datevalues = [
              date.getFullYear(),
              date.getMonth() + 1,
              date.getDate(),
              date.getHours(),
              date.getMinutes(),
            ]);
          formatDate =
            datevalues[2] + "/" + datevalues[1] + "/" + datevalues[0];

          hora = datevalues[3];
          minutos = datevalues[4];
          if (hora >= 13) {
            hora = hora - 12;
            resulH = hora + ":" + minutos + " PM";
          } else {
            resulH = hora + ":" + minutos + " AM";
          }
        } catch (error) {
          console.log("No pasa nada");
        }

        /**Contador para crear el numeral */
        contadorCosto += 1;
        tabla.innerHTML += `<tr>
							<td class="text-nowrap">${contadorCosto}</td>
              <td class="text-nowrap">${formatDate} - ${resulH}</td>
							<td class="text-nowrap">${doc.data().estado}</td>
							<td class="text-nowrap">${doc.data().ciudad}</td>
              <td class="text-nowrap">${doc.data().nombre}</td>
              <td class="text-nowrap">${doc.data().correo}</td>
              <td class="text-nowrap">${doc.data().tipo}</td>
              <td class="text-nowrap text-center">
              <textarea class="text-justify" rows="3" cols="20">${
                doc.data().reporte
              }</textarea>
              </td>
              <td class="text-nowrap">
              <button class="btn btn-danger btn-sm" 
              onclick="EliminarQueja('${doc.id}')">
              Eliminar</button></td>
							</tr>`;
      });
      paginacionQueja();
    });
})();
function paginacionQueja() {
  /*************************************************************************/
  /**							INICIA PAGINACION 							**/
  /*************************************************************************/
  const rowsPerPage = 3;
  const rows = $("#my-table_quejas tbody tr");
  const rowsCount = rows.length;
  const pageCount = Math.ceil(rowsCount / rowsPerPage); // evitar decimales
  displayRows(1); // Muestra el primer conjunto de filas.

  /**#####################################################################**/
  /**					INICIA PAGINACION CON bootpag.min.js				**/
  /**#####################################################################**/
  $("#pagination-here_quejas").bootpag({
    total: pageCount,
    page: 1,
    maxVisible: 3,
    leaps: true,
  });

  //al hacer click en el paginador
  $("#pagination-here_quejas").on("page", function (event, num) {
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
function EliminarQueja(id) {
  db.collection("reportes_usuarios")
    .doc(id)
    .delete()
    .then(function () {
      console.log("Document successfully deleted!");
    })
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
}

/********************************************************** */
/*QUEJAS DE CHOFERES
/*********************************************************** */
(function BusquedaGeneralBugsChofer() {
  let formatDate;
  let date;
  let datevalues = [];
  let contadorCosto = 0;
  let hora, minutos, resulH;
  let tabla = document.getElementById("tabla_general_bugs_chofer");
  db.collection("bugs_feature")
    .orderBy("fecha", "desc")
    .onSnapshot(function (querySnapshot) {
      contadorCosto = 0;
      tabla.innerHTML = "";
      querySnapshot.forEach(function (doc) {
        /**Realiza la conversion de fecha */
        try {
          (date = new Date(doc.data().fecha.seconds * 1000)),
            (datevalues = [
              date.getFullYear(),
              date.getMonth() + 1,
              date.getDate(),
              date.getHours(),
              date.getMinutes(),
            ]);
          formatDate =
            datevalues[2] + "/" + datevalues[1] + "/" + datevalues[0];

          hora = datevalues[3];
          minutos = datevalues[4];
          if (hora >= 13) {
            hora = hora - 12;
            resulH = hora + ":" + minutos + " PM";
          } else {
            resulH = hora + ":" + minutos + " AM";
          }
        } catch (error) {
          console.log("No pasa nada");
        }

        /**Contador para crear el numeral */
        contadorCosto += 1;
        tabla.innerHTML += `<tr>
							<td class="text-nowrap">${contadorCosto}</td>
              <td class="text-nowrap">${doc.data().estado}</td>
              <td class="text-nowrap">${doc.data().ciudad}</td>
              <td class="text-nowrap">${formatDate} - ${resulH}</td>
              <td class="text-nowrap">${doc.data().tipoReporte}</td>
              <td class="text-nowrap text-center">
              <textarea class="text-justify" rows="3" cols="20">${
                doc.data().reporte
              }</textarea>
              </td>
              
              <td class="text-nowrap">
              <button class="btn btn-danger btn-sm" 
              onclick="EliminarBugsChofer('${doc.id}')">
              Eliminar</button></td>
							</tr>`;
      });
      paginacionBugsChofer();
    });
})();
function paginacionBugsChofer() {
  /*************************************************************************/
  /**							INICIA PAGINACION 							**/
  /*************************************************************************/
  const rowsPerPage = 3;
  const rows = $("#my-table_bugs_chofer tbody tr");
  const rowsCount = rows.length;
  const pageCount = Math.ceil(rowsCount / rowsPerPage); // evitar decimales
  displayRows(1); // Muestra el primer conjunto de filas.

  /**#####################################################################**/
  /**					INICIA PAGINACION CON bootpag.min.js				**/
  /**#####################################################################**/
  $("#pagination-here_bugs_chofer").bootpag({
    total: pageCount,
    page: 1,
    maxVisible: 3,
    leaps: true,
  });

  //al hacer click en el paginador
  $("#pagination-here_bugs_chofer").on("page", function (event, num) {
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
function EliminarBugsChofer(id) {
  db.collection("bugs_feature")
    .doc(id)
    .delete()
    .then(function () {
      console.log("Document successfully deleted!");
    })
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
}
//}); //FIN DEL DOC
