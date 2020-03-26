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

/********************************************************** */
/*SE LLENAN LOS SELECT DE ESTADO Y CIUDAD
/*********************************************************** */
(function ObtenerEdo() {
  let estados = [];
  let $selectEdo = $("#selectEdo_AdminCosto");
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
  const selectEdo = document.querySelector("#selectEdo_AdminCosto");
  const selectCd = document.querySelector("#selectCd_AdminCosto");
  selectEdo.addEventListener("change", event => {
    selectCd.innerHTML = "";
    selectCd.innerHTML = `<option selected>Ciudad</option>`;
    ObtenerCd(event.target.value);
  });
})();
function ObtenerCd(estado) {
  let obj = [];
  let arrayLibreComa = [];
  let $selectCd = $("#selectCd_AdminCosto");
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

/************************************************************* */
/*SE LLENAN LOS SELECT DE ESTADO Y CIUDAD RESPECTO A ADD COSTO
/************************************************************* */
(function ObtenerEdo_AddCosto() {
  let estados = [];
  let $selectEdo = $("#select_edo_add_costo");
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
  let selectEdo = document.querySelector("#select_edo_add_costo");
  let selectCd = document.querySelector("#select_cd_add_costo");
  selectEdo.addEventListener("change", event => {
    selectCd.innerHTML = "";
    selectCd.innerHTML = `<option selected>Ciudad</option>`;
    ObtenerCd_AddCosto(event.target.value);
  });
})();
function ObtenerCd_AddCosto(estado) {
  let obj = [];
  let arrayLibreComa = [];
  let $selectCd = $("#select_cd_add_costo");
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

/********************************************************** */
/*INSERTAR NUEVO COSTO Y DAR CLICK PARA GUARDAR
/*********************************************************** */
$("#btn_add_new_costo").click(function(e) {
  e.preventDefault();
  validarRepeticionDatos();
});
function InsertarNuevoCosto() {
  let edo_agregar = document.getElementById("select_edo_add_costo").value;
  let cd_agregar = document.getElementById("select_cd_add_costo").value;
  let monto_mes = document.getElementById("monto_mes_costo").value;
  let monto_anual = document.getElementById("monto_anual_costo").value;
  let descuento = document.getElementById("descuento_costo").value;
  monto_mes = parseFloat(monto_mes);
  monto_anual = parseFloat(monto_anual);
  descuento = parseFloat(descuento);
  db.collection("costo_suscripcion")
    .add({
      estado: edo_agregar,
      ciudad: cd_agregar,
      fecha: firebase.firestore.FieldValue.serverTimestamp(),
      monto_mes: monto_mes,
      monto_anual: monto_anual,
      descuento: descuento
    })
    .then(function(docRef) {
      console.log("Registro exitoso");
      //Limpia los campos
      document.getElementById("monto_mes_costo").value = "";
      document.getElementById("monto_anual_costo").value = "";
      document.getElementById("descuento_costo").value = "";
      $("#select_edo_add_costo option[value=" + "Estado" + "]").attr(
        "selected",
        true
      );
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
}
function ConsultaGeneralCostos() {
  $("#my-table_costo").removeClass("d-none");
  $("#NoRegistro").addClass("d-none");
  let formatDate;
  let date;
  let datevalues = [];
  let contadorCosto = 0;
  let tabla = document.getElementById("tabla_general_costo");
  db.collection("costo_suscripcion")
    .orderBy("fecha", "desc")
    .onSnapshot(function(querySnapshot) {
      contadorCosto = 0;
      tabla.innerHTML = "";
      querySnapshot.forEach(function(doc) {
        /**Realiza la conversion de fecha */
        try {
          (date = new Date(doc.data().fecha.seconds * 1000)),
            (datevalues = [
              date.getFullYear(),
              date.getMonth() + 1,
              date.getDate()
            ]);
          formatDate =
            datevalues[2] + "/" + datevalues[1] + "/" + datevalues[0];
        } catch (error) {
          console.log("No pasa nada");
        }

        /**Contador para crear el numeral */
        contadorCosto += 1;

        tabla.innerHTML += `<tr>
							<td class="text-nowrap">${contadorCosto}</td>
							<td class="text-nowrap">${doc.data().estado}</td>
							<td class="text-nowrap">${doc.data().ciudad}</td>
                            <td class="text-nowrap">${formatDate}</td>
                            <td class="text-nowrap">${doc.data().monto_mes}</td>
                            <td class="text-nowrap">${
                              doc.data().monto_anual
                            }</td>
                            <td class="text-nowrap">${doc.data().descuento}</td>
                            <td class="text-nowrap">
                            <button class="btn btn-danger btn-sm" 
                            onclick="EliminarCosto('${doc.id}')">
                            Eliminar</button></td>
                            <td class="text-nowrap">
                            <button class="btn btn-info btn-sm" 
                            onclick="EditarCosto('${doc.id}', 
                            '${doc.data().estado}', 
                            '${doc.data().ciudad}', 
                            '${doc.data().monto_mes}', 
                            '${doc.data().monto_anual}', 
                            '${doc.data().descuento}')">Editar
                            </button></td>
							</tr>`;
      });
      paginacionA();
    });
}
function EliminarCosto(id) {
  db.collection("costo_suscripcion")
    .doc(id)
    .delete()
    .then(function() {
      console.log("Document successfully deleted!");
    })
    .catch(function(error) {
      console.error("Error removing document: ", error);
    });
}
function EditarCosto(id, edo, cd, m_mes, m_anual, desc) {
  document.getElementById("monto_mes_costo").value = m_mes;
  document.getElementById("monto_anual_costo").value = m_anual;
  document.getElementById("descuento_costo").value = desc;

  let botonA = document.getElementById("btnEditarCosto_o");
  $("#ocultar_caja_btn_editar_costo_o").removeClass("d-none");
  $("#ocultar_caja_btn_agregar_costos_o").addClass("d-none");

  botonA.onclick = function(e) {
    e.preventDefault();
    let selEstado = document.getElementById("select_edo_add_costo").value;
    let selCiudad = document.getElementById("select_cd_add_costo").value;
    let monto_mes = document.getElementById("monto_mes_costo").value;
    let monto_anual = document.getElementById("monto_anual_costo").value;
    let descuento = document.getElementById("descuento_costo").value;
    let editarCosto = db.collection("costo_suscripcion").doc(id);
    return editarCosto
      .update({
        estado: selEstado,
        ciudad: selCiudad,
        fecha: firebase.firestore.FieldValue.serverTimestamp(),
        monto_mes: monto_mes,
        monto_anual: monto_anual,
        descuento: descuento
      })
      .then(function() {
        console.log("Document successfully updated!");
        $("#ocultar_caja_btn_agregar_costos_o").removeClass("d-none");
        $("#ocultar_caja_btn_editar_costo_o").addClass("d-none");
        document.getElementById("monto_mes_costo").value = "";
        document.getElementById("monto_anual_costo").value = "";
        document.getElementById("descuento_costo").value = "";
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };
}
function ConsultaEdoCdCostos_o() {
  let formatDate;
  let date;
  let datevalues = [];
  let contadorCosto = 0;

  let tabla = document.getElementById("tabla_general_costo");
  let selEstado = document.getElementById("selectEdo_AdminCosto").value;
  let selCiudad = document.getElementById("selectCd_AdminCosto").value;

  db.collection("costo_suscripcion")
    .where("estado", "==", selEstado)
    .where("ciudad", "==", selCiudad)
    .onSnapshot(function(querySnapshot) {
      if (querySnapshot._snapshot.docChanges.length != 0) {
        $("#my-table_costo").removeClass("d-none");
        $("#NoRegistro").addClass("d-none");
        contadorCosto = 0;
        tabla.innerHTML = "";
        querySnapshot.forEach(function(doc) {
          /**Realiza la conversion de fecha */
          try {
            (date = new Date(doc.data().fecha.seconds * 1000)),
              (datevalues = [
                date.getFullYear(),
                date.getMonth() + 1,
                date.getDate()
              ]);
            formatDate =
              datevalues[2] + "/" + datevalues[1] + "/" + datevalues[0];
          } catch (error) {
            console.log("No pasa nada");
          }

          /**Contador para crear el numeral */
          contadorCosto += 1;
          tabla.innerHTML += `<tr>
							<td class="text-nowrap">${contadorCosto}</td>
							<td class="text-nowrap">${doc.data().estado}</td>
							<td class="text-nowrap">${doc.data().ciudad}</td>
                            <td class="text-nowrap">${formatDate}</td>
                            <td class="text-nowrap">${doc.data().monto_mes}</td>
                            <td class="text-nowrap">${
                              doc.data().monto_anual
                            }</td>
                            <td class="text-nowrap">${doc.data().descuento}</td>
                            <td class="text-nowrap">
                            <button class="btn btn-danger btn-sm" 
                            onclick="EliminarCosto('${doc.id}')">
                            Eliminar</button></td>
                            <td class="text-nowrap">
                            <button class="btn btn-info btn-sm" 
                            onclick="EditarCosto('${doc.id}', 
                            '${doc.data().estado}', 
                            '${doc.data().ciudad}', 
                            '${doc.data().monto_mes}', 
                            '${doc.data().monto_anual}', 
                            '${doc.data().descuento}')">Editar
                            </button></td>
							</tr>`;
        });
        paginacionA();
      } else {
        NoHayRegistros();
      }
    }); //Termino del Snapshot
}
function validarRepeticionDatos() {
  let edo_agregar = document.getElementById("select_edo_add_costo").value;
  let cd_agregar = document.getElementById("select_cd_add_costo").value;
  let montoMes = document.getElementById("monto_mes_costo").value;
  let montoAnual = document.getElementById("monto_anual_costo").value;
  let desc = document.getElementById("descuento_costo").value;
  db.collection("costo_suscripcion")
    .where("estado", "==", edo_agregar)
    .where("ciudad", "==", cd_agregar)
    .get()
    .then(function(querySnapshot) {
      if (querySnapshot._snapshot.docChanges.length != 0) {
        alert("YA EXISTE UN REGISTRO CON EL ESTADO Y CIUDAD SELECCIONADO");
      } else {
        if (
          edo_agregar != "Estado" &&
          cd_agregar != "Ciudad" &&
          montoMes.trim() != "" &&
          montoAnual.trim() != "" &&
          desc.trim() != ""
        ) {
          InsertarNuevoCosto(); //Si no existe que se agregue
        } else {
          alert("LLENE TODOS LOS CAMPOS");
        }
      }
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });
}
/**Si no encuentra registros en la busqueda */
function NoHayRegistros() {
  $("#my-table_costo").addClass("d-none");
  $("#esconderPaginacionC").addClass("d-none");
  $("#NoRegistro").removeClass("d-none");
}
/**Ejecutar automaticamente la busqueda general */
ConsultaGeneralCostos();

$("#btn_buscar_costo").click(function(e) {
  e.preventDefault();
  ConsultaEdoCdCostos_o();
});
$("#btn_limpiar_costo").click(function(e) {
  e.preventDefault();
  ConsultaGeneralCostos();
});

/**Agregar evento al input Anual para calcular */
$("#monto_mes_costo, #descuento_costo").keyup(function(e) {
  let inputMonto = document.getElementById("monto_mes_costo").value;
  let inputDescuento = document.getElementById("descuento_costo").value;
  let operacion, resultado, total, monto_anual;
  if (inputDescuento != "") {
    //32 / 100 x 517= 165,44
    try {
      inputDescuento = parseInt(inputDescuento);
      inputMonto = parseInt(inputMonto);
      operacion = inputDescuento / 100;
      operacion = parseFloat(operacion);
      monto_anual = inputMonto * 12;
      resultado = monto_anual * operacion;
      total = monto_anual - resultado;
      total = parseInt(total);
      let inputMonto_anual = (document.getElementById(
        "monto_anual_costo"
      ).value = total);
    } catch (error) {
      console.log("No pasa nada");
    }
  } else {
    console.log("Agrega el descuento");
  }
});
/********************************************************** */
/*PAGINACION PARA TODAS LAS TABLAS
/*********************************************************** */
function paginacionA() {
  $("#esconderPaginacionC").removeClass("d-none");
  /*************************************************************************/
  /**							INICIA PAGINACION 							**/
  /*************************************************************************/
  const rowsPerPage = 3;
  const rows = $("#my-table_costo tbody tr");
  const rowsCount = rows.length;
  const pageCount = Math.ceil(rowsCount / rowsPerPage); // evitar decimales
  displayRows(1); // Muestra el primer conjunto de filas.

  /**#####################################################################**/
  /**					INICIA PAGINACION CON bootpag.min.js				**/
  /**#####################################################################**/
  $("#pagination-here_c").bootpag({
    total: pageCount,
    page: 1,
    maxVisible: 3,
    leaps: true
  });

  //al hacer click en el paginador
  $("#pagination-here_c").on("page", function(event, num) {
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
