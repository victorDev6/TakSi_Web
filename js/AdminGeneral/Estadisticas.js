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
/*LLENA LOS SELECT ESTADO Y CIUDAD
/*********************************************************** */
(function ObtenerEdo() {
  let estados = [];
  let $selectEdo = $("#edo_estadistica");
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
  const selectEdo = document.querySelector("#edo_estadistica");
  const selectCd = document.querySelector("#cd_estadistica");
  selectEdo.addEventListener("change", (event) => {
    selectCd.innerHTML = "";
    selectCd.innerHTML = `<option value="" selected>Ciudad</option>`;
    ObtenerCd(event.target.value);
  });
})();

function ObtenerCd(estado) {
  let obj = [];
  let arrayLibreComa = [];
  let $selectCd = $("#cd_estadistica");
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

/********************************************************** */
/*FUNCION DEL BOTON BUSCAR
/*********************************************************** */
$("#btn_buscar_reg").click(function (e) {
  e.preventDefault();
  PropietarioEdoCd();
  TaxisEdoCd();
  TaxisPasajerosCd();
  ViajesEdoCd();
  MarcadoresCd();
  MontoEdoCd();
});

/********************************************************** */
/*TOTAL DE PROPIETARIOS Y POR ESTADO Y CIUDAD SELECCIONADO
/*********************************************************** */
(function TotalPropietarios() {
  db.collection("reg_prop_prin_web")
    .get()
    .then(function (querySnapshot) {
      num_prop = querySnapshot.size;
      $("#total_prop_g").html(num_prop); //Se envia al dom
    });
})();

function PropietarioEdoCd() {
  let estadoSel = document.getElementById("edo_estadistica").value;
  let ciudadSel = document.getElementById("cd_estadistica").value;
  $("#ciudad_prop").html(ciudadSel);
  let totalProp,
    totalActivos = 0,
    totalInactivos = 0;
  db.collection("reg_prop_prin_web")
    .where("estado", "==", estadoSel)
    .where("ciudad", "==", ciudadSel)
    .get()
    .then(function (querySnapshot) {
      totalProp = querySnapshot.size;
      $("#total_prop_cd").html(totalProp); //Se envia al dom
      querySnapshot.forEach(function (doc) {
        if (doc.data().status == "true") {
          totalActivos += 1;
        } else {
          totalInactivos += 1;
        }
      });
      $("#total_prop_activo").html(totalActivos);
      $("#total_prop_inactivo").html(totalInactivos);
      //aca va la grafica
      var ctx_prop = document.getElementById("propietario").getContext("2d");
      var propietario = new Chart(ctx_prop, {
        type: "pie",
        data: {
          labels: ["Activo", "Inactivo"],

          datasets: [
            {
              data: [totalActivos, totalInactivos],

              backgroundColor: [
                "rgba(85, 196, 72, 0.9)",
                "rgba(216, 57, 41, 0.9)",
              ],
              borderColor: ["#fff", "#fff"],
              borderWidth: 2,
            },
          ],
        },
      });
    })
    .catch(function (error) {
      console.log("Error: " + error);
    });
}

/********************************************************** */
/*TOTAL DE TAXIS Y POR ESTADO Y CIUDAD SELECCIONADO
/*********************************************************** */
(function TotalTaxis() {
  db.collection("taxis")
    .get()
    .then(function (querySnapshot) {
      num_taxis = querySnapshot.size;
      $("#total_taxis_g").html(num_taxis); //Se envia al dom
    });
})();

function TaxisEdoCd() {
  let estadoSel = document.getElementById("edo_estadistica").value;
  let ciudadSel = document.getElementById("cd_estadistica").value;
  $("#ciudad_taxis").html(ciudadSel);
  let totalTaxi,
    totalActivos = 0,
    totalInactivos = 0;
  db.collection("taxis")
    .where("estado", "==", estadoSel)
    .where("ciudad", "==", ciudadSel)
    .get()
    .then(function (querySnapshot) {
      totalTaxi = querySnapshot.size;
      $("#total_taxis_cd").html(totalTaxi); //Se envia al dom
      querySnapshot.forEach(function (doc) {
        if (doc.data().status_pago == "true") {
          totalActivos += 1;
        } else {
          totalInactivos += 1;
        }
      });
      $("#total_taxis_activo").html(totalActivos);
      $("#total_taxis_inactivo").html(totalInactivos);
      //aca va la grafica
      var ctx_taxis = document.getElementById("taxis").getContext("2d");
      var taxis = new Chart(ctx_taxis, {
        type: "pie",
        data: {
          labels: ["Activo", "Inactivo"],

          datasets: [
            {
              data: [totalActivos, totalInactivos],

              backgroundColor: [
                "rgba(85, 196, 72, 0.9)",
                "rgba(216, 57, 41, 0.9)",
              ],
              borderColor: ["#fff", "#fff"],
              borderWidth: 2,
            },
          ],
        },
      });
    })
    .catch(function (error) {
      console.log("Error: " + error);
    });
}

/********************************************************** */
/*TOTAL DE TAXIS Y POR ESTADO Y CIUDAD SELECCIONADO
/*********************************************************** */
(function TotalPasajeros() {
  db.collection("usuarios")
    .get()
    .then(function (querySnapshot) {
      num_pasajeros = querySnapshot.size;
      $("#total_pasajeros_g").html(num_pasajeros); //Se envia al dom
    });
})();

function TaxisPasajerosCd() {
  let estadoSel = document.getElementById("edo_estadistica").value;
  let ciudadSel = document.getElementById("cd_estadistica").value;
  $("#ciudad_pasajeros").html(ciudadSel);
  let totalTaxi,
    totalActivos = 0,
    totalInactivos = 0;
  db.collection("usuarios")
    .where("estado", "==", estadoSel)
    .where("ciudad", "==", ciudadSel)
    .get()
    .then(function (querySnapshot) {
      totalTaxi = querySnapshot.size;
      $("#total_pasajeros_cd").html(totalTaxi); //Se envia al dom
      querySnapshot.forEach(function (doc) {
        if (doc.data().status == "true") {
          totalActivos += 1;
        } else {
          totalInactivos += 1;
        }
      });
      $("#total_pasajero_activo").html(totalActivos);
      $("#total_pasajero_inactivo").html(totalInactivos);
      //aca va la grafica
      var ctx_pasajeros = document.getElementById("pasajeros").getContext("2d");
      var pasajeros = new Chart(ctx_pasajeros, {
        type: "pie",
        data: {
          labels: ["Activo", "Inactivo"],

          datasets: [
            {
              data: [totalActivos, totalInactivos],
              backgroundColor: [
                "rgba(85, 196, 72, 0.9)",
                "rgba(216, 57, 41, 0.9)",
              ],
              borderColor: ["#fff", "#fff", "#fff"],
              borderWidth: 2,
            },
          ],
        },
      });
    })
    .catch(function (error) {
      console.log("Error: " + error);
    });
}

/********************************************************** */
/*VIAJES
/*********************************************************** */
(function TotalViajes() {
  db.collection("viajes")
    .get()
    .then(function (querySnapshot) {
      num_viajes = querySnapshot.size;
      $("#total_viajes_g").html(num_viajes); //Se envia al dom
    });
})();

function ViajesEdoCd() {
  let estadoSel = document.getElementById("edo_estadistica").value;
  let ciudadSel = document.getElementById("cd_estadistica").value;
  $("#ciudad_viajes").html(ciudadSel);
  let fechasLocal = ObtenerSegundos();
  let totalViajes = 0;
  let segundosObteniedos = 0;
  let contaHoy = 0,
    contaAyer = 0,
    contaAntier = 0;
  db.collection("viajes")
    .where("estado", "==", estadoSel)
    .where("ciudad", "==", ciudadSel)
    .get()
    .then(function (querySnapshot) {
      totalViajes = querySnapshot.size;
      $("#total_viajes_cd").html(totalViajes); //Se envia al dom
      querySnapshot.forEach(function (doc) {
        segundosObteniedos = doc.data().fecha.seconds;
        //Pendiente de que se muestre viajes de ayer
        //Hoy y antier
        let segundosBD = SegundosBd(segundosObteniedos);
        if (fechasLocal[0] === segundosBD) {
          contaHoy += 1;
        } else if (fechasLocal[1] === segundosBD) {
          contaAyer += 1;
        } else if (fechasLocal[2] === segundosBD) {
          contaAntier += 1;
        }
      });
      $("#total_viajes_hoy").html(contaHoy);
      $("#total_viajes_ayer").html(contaAyer);
      $("#total_viajes_antier").html(contaAntier);
      //aca va la grafica
      var ctx_viajes = document.getElementById("viajes").getContext("2d");
      var viajes = new Chart(ctx_viajes, {
        type: "pie",
        data: {
          labels: ["Hoy", "Ayer", "Antier"],

          datasets: [
            {
              data: [contaHoy, contaAyer, contaAntier],

              backgroundColor: [
                "rgba(39, 120, 200, 0.8)",
                "rgba(140, 45, 68, 0.8)",
                "rgba(100, 30, 40 0.8)",
              ],
              borderColor: ["#fff", "#fff", "#fff"],
              borderWidth: 2,
            },
          ],
        },
      });
    })
    .catch(function (error) {
      console.log("Error: " + error);
    });
}

/********************************************************** */
/*SOLICITUDES
/*********************************************************** */
Array.prototype.unique = (function (a) {
  return function () {
    return this.filter(a);
  };
})(function (a, b, c) {
  return c.indexOf(a, b + 1) < 0;
});

(function SolicitudesCd() {
  let estadoSel = document.getElementById("edo_estadistica").value;
  let ciudadSel = document.getElementById("cd_estadistica").value;
  let totalSolicitud;
  let arrayCiudadesT = [];
  let arrayCd = [];
  let arrayCdNum = [];
  let contadorVeces = 0;
  db.collection("solicitudes")
    .get()
    .then(function (querySnapshot) {
      totalSolicitud = querySnapshot.size;
      $("#total_solicitudes_g").html(totalSolicitud);
      querySnapshot.forEach(function (doc) {
        arrayCiudadesT.push(doc.data().ciudad);
        arrayCd.push(doc.data().ciudad);
      });
      arrayCdNum = arrayCd.unique(); //Se le pasa los valores no repetitivos

      for (let i = 0; i < arrayCd.unique().length; i++) {
        const ciudad = arrayCd.unique()[i];
        contadorVeces = 0;
        for (let x = 0; x < arrayCiudadesT.length; x++) {
          if (ciudad === arrayCiudadesT[x]) {
            contadorVeces += 1;
            arrayCdNum[i] = contadorVeces;
          } else {
            console.log("nada");
          }
        }
      }
      //Se imprime todo
      let ciudades_solicitud = document.getElementById("ciudades_solicitudes");
      ciudades_solicitud.innerHTML = "";
      for (let y = 0; y < arrayCd.unique().length; y++) {
        let ciudad = arrayCd.unique()[y];
        let numero = arrayCdNum[y];
        ciudades_solicitud.innerHTML += `
            <p class="card-title">
                <span>${ciudad}</span>
                <span class="font-weight-bold float-right ml-3"> 
                  <span class="badge badge-info tamNumero">
                  ${numero}
                  </span>
                </span>
            </p>
        `;
      }
      //aca va la grafica
    })
    .catch(function (error) {
      console.log("Error: " + error);
    });
})();

/********************************************************** */
/*MARCADORES
/*********************************************************** */
(function TotalMarcadores() {
  db.collection("marcadores_publicidad")
    .get()
    .then(function (querySnapshot) {
      num_marcadores = querySnapshot.size;
      $("#total_marcadores_g").html(num_marcadores); //Se envia al dom
    });
})();

function MarcadoresCd() {
  let estadoSel = document.getElementById("edo_estadistica").value;
  let ciudadSel = document.getElementById("cd_estadistica").value;
  $("#ciudad_marcadores").html(ciudadSel);
  let totalMarcadores,
    totalActivos = 0,
    totalInactivos = 0;
  db.collection("marcadores_publicidad")
    .where("estado", "==", estadoSel)
    .where("ciudad", "==", ciudadSel)
    .get()
    .then(function (querySnapshot) {
      totalMarcadores = querySnapshot.size;
      $("#total_marcadores_cd").html(totalMarcadores); //Se envia al dom
      querySnapshot.forEach(function (doc) {
        if (doc.data().status == "true") {
          totalActivos += 1;
        } else {
          totalInactivos += 1;
        }
      });
      $("#total_marcador_activo").html(totalActivos);
      $("#total_marcador_inactivo").html(totalInactivos);
      //aca va la grafica
      var ctx_marcadores = document
        .getElementById("marcadores")
        .getContext("2d");
      var marcadores = new Chart(ctx_marcadores, {
        type: "pie",
        data: {
          labels: ["Activo", "Inactivo"],

          datasets: [
            {
              data: [totalActivos, totalInactivos],

              backgroundColor: [
                "rgba(85, 196, 72, 0.9)",
                "rgba(216, 57, 41, 0.9)",
              ],
              borderColor: ["#fff", "#fff"],
              borderWidth: 2,
            },
          ],
        },
      });
    })
    .catch(function (error) {
      console.log("Error: " + error);
    });
}

/********************************************************** */
/*MONTO
/*********************************************************** */
(function TotalMonto() {
  db.collection("pagos_realizados")
    .get()
    .then(function (querySnapshot) {
      num_pagos = querySnapshot.size;
      $("#total_monto_g").html(num_pagos); //Se envia al dom
    });
})();

function MontoEdoCd() {
  let estadoSel = document.getElementById("edo_estadistica").value;
  let ciudadSel = document.getElementById("cd_estadistica").value;
  $("#ciudad_montos").html(ciudadSel);
  let cantidadPagos = 0;
  let solicitudBD = "";
  let contadorMontos = 0,
    contaMontoMes = 0,
    contaMontoAnio = 0;
  let convertir_numero = 0;
  let opcionPago = "";
  let personasAnio = 0,
    personasMes = 0;
  db.collection("pagos_realizados")
    .where("estado", "==", estadoSel)
    .where("ciudad", "==", ciudadSel)
    .get()
    .then(function (querySnapshot) {
      cantidadPagos = querySnapshot.size;
      $("#cantidad_pago_cd").html(cantidadPagos); //Se envia al dom
      querySnapshot.forEach(function (doc) {
        /**Aqui va el metodo donde desglosa todo
       y saca la cantidad */
        solicitudBD = doc.data().solicitud;
        opcionPago = doc.data().opcion_pago;

        let valorMonto = ObtenerCostosPagos(solicitudBD);
        for (const iterator of valorMonto) {
          convertir_numero = parseInt(iterator.monto);
          contadorMontos += convertir_numero;
          if (opcionPago == "Mensual") {
            contaMontoMes += convertir_numero;
            personasMes += 1;
          } else {
            contaMontoAnio += convertir_numero;
            personasAnio += 1;
          }
        }
      });
      console.log("Total de montos en comitan: " + contadorMontos);
      $("#total_monto_cd").html("$" + contadorMontos);
      $("#cant_pago_mes").html("$" + contaMontoMes);
      $("#cant_pago_anio").html("$" + contaMontoAnio);
      //aca va la grafica
      var ctx_monto = document.getElementById("monto").getContext("2d");
      var monto = new Chart(ctx_monto, {
        type: "pie",
        data: {
          labels: ["Mensual", "Anual"],

          datasets: [
            {
              data: [personasMes, personasAnio],

              backgroundColor: [
                "rgba(200, 196, 72, 0.8)",
                "rgba(69, 57, 41, 0.8)",
              ],
              borderColor: ["#fff", "#fff"],
              borderWidth: 2,
            },
          ],
        },
      });
    })
    .catch(function (error) {
      console.log("Error: " + error);
    });
}

function ObtenerCostosPagos(cadena) {
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

function ObtenerSegundos() {
  let fechaHoy = "";
  let fechaAyer = "";
  let fechaAntier = "";
  let ayer,
    antier = 0;
  let fechas = [];

  let date = new Date();
  let mes = date.getMonth() + 1;
  let anio = date.getFullYear();
  let dia = date.getDate();

  ayer = dia - 1;
  antier = dia - 2;

  if (mes < 10) {
    mes = "0" + mes;
  }
  if (dia < 10) {
    dia = "0" + dia;
  }
  if (ayer < 10) {
    ayer = "0" + ayer;
  }
  if (antier < 10) {
    antier = "0" + antier;
  }

  fechaHoy = anio + "-" + mes + "-" + dia;
  let fechaSegundos = new Date(fechaHoy).getTime();
  fechas.push(fechaSegundos);

  fechaAyer = anio + "-" + mes + "-" + ayer;
  let fechaSegundosAyer = new Date(fechaAyer).getTime();
  fechas.push(fechaSegundosAyer);

  fechaAntier = anio + "-" + mes + "-" + antier;
  let fechaSegundosAntier = new Date(fechaAntier).getTime();
  fechas.push(fechaSegundosAntier);

  return fechas;
}

function SegundosBd(segundosBD) {
  let fecha = "";
  let date = new Date(segundosBD * 1000);
  let mes = date.getMonth() + 1;
  let anio = date.getFullYear();
  let dia = date.getDate();

  if (mes < 10) {
    mes = "0" + mes;
  }
  if (dia < 10) {
    dia = "0" + dia;
  }

  fecha = anio + "-" + mes + "-" + dia;
  let fechaSegundos = new Date(fecha).getTime();
  return fechaSegundos;
}
