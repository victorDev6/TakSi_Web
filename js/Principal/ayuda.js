//Cambia el titulo de la pestaña
window.document.title = "Ayuda";

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

var buscador = $("#table").DataTable();
var valorBoton = 0;
var valorElseKeyUp = 0;

$("#btn_ayuda_conductor").click(function (e) {
  e.preventDefault();
  valorBoton = 1;
  let textoUser = "conductor";
  ConsultaPreguntas(textoUser);
  //Agregar y quitar lo seleccionado al boton
  $("#btn_ayuda_conductor").addClass("disabled");
  $("#btn_ayuda_pasajero").removeClass("disabled");
});

$("#btn_ayuda_pasajero").click(function (e) {
  e.preventDefault();
  valorBoton = 1;
  let textoUser = "pasajero";
  ConsultaPreguntas(textoUser);
  $("#btn_ayuda_pasajero").addClass("disabled");
  $("#btn_ayuda_conductor").removeClass("disabled");
});

function ValidarNumero(tamano) {
  let entero1;
  let entero2;
  let resultado = [];
  let resul = tamano / 2;
  if (resul - Math.floor(resul) == 0) {
    //numero entero
    entero1 = resul;
    entero2 = resul;
    resultado = [entero1, entero2];
  } else {
    //numero decimal
    entero1 = resul + 0.5;
    entero2 = resul + 0.5;
    entero2 = entero2 - 1;
    resultado = [entero1, entero2];
  }
  return resultado;
}

function ConsultaPreguntas(tipo_usuario) {
  $("#table").DataTable().clear().draw();
  let table = $("#table").DataTable();
  table.destroy();
  //Mostrar Cargando
  $("#cargando").removeClass("d-none");
  let tamanio, resultado;
  let contador = 0;
  let acordion1 = document.getElementById("accordion1");
  let acordion2 = document.getElementById("accordion2");
  let listaBusTabla = document.getElementById("mostrarResulLista");
  db.collection("preguntas_ayuda")
    .where("tipo_usuario", "==", tipo_usuario)
    .get()
    .then(function (querySnapshot) {
      tamanio = querySnapshot.size;
      acordion1.innerHTML = "";
      acordion2.innerHTML = "";
      listaBusTabla.innerHTML = "";
      resultado = ValidarNumero(tamanio);
      querySnapshot.forEach(function (doc) {
        contador += 1;
        if (contador <= resultado[0]) {
          acordion1.innerHTML += `
                    <div class="card my-2">
                        <div class="card-header" role="tab" 
                        id="heading${doc.id}">
                            <p class="mb-0 h6">
                                <button data-toggle="collapse" 
                                 aria-expanded="true"
                                    aria-controls="${doc.id}" 
                                    onclick="Capturar('${doc.id}')" 
                                    class="btn btn-link">
                                    ${doc.data().pregunta}
                                </button>
                            </p>
                        </div>

                        <div id="${doc.id}" class="collapse" role="tabpanel" 
                        aria-labelledby="heading${doc.id}">
                            <div class="card-body">
                                ${doc.data().respuesta}
                            </div>
                        </div>
                    </div>
        `;
        } else {
          acordion2.innerHTML += `
                    <div class="card my-2">
                        <div class="card-header" role="tab" 
                        id="heading${doc.id}">
                            <p class="mb-0 h6">
                                <button data-toggle="collapse" 
                                 aria-expanded="true"
                                    aria-controls="${doc.id}"
                                     onclick="Capturar('${doc.id}')" 
                                     class="btn btn-link">
                                    ${doc.data().pregunta}
                                </button>
                            </p>
                        </div>

                        <div id="${doc.id}" class="collapse" role="tabpanel" 
                        aria-labelledby="heading${doc.id}">
                            <div class="card-body">
                                ${doc.data().respuesta}
                            </div>
                        </div>
                    </div>
        `;
        }
        //Llenar la tabla de la lista de preguntas
        listaBusTabla.innerHTML += `
                        <tr>
                          <td>
                            <button id="${doc.id}" 
                            class="btn_bus" onclick="ResultadoBusqueda(
                              '${doc.id}')">${doc.data().pregunta}</button>
                          </td>
                        </tr>`;
      });
      $("#cargando").addClass("d-none");
    })
    .catch(function (error) {
      console.log("Error: " + error);
    });
}

//Evento que recibe la caja de texto
$("#buscador_txt").keyup(function () {
  if (valorBoton === 1) {
    let table = $("#table").DataTable();
    table.search($(this).val()).draw();

    if ($("#buscador_txt").val() == "") {
      $(".content-search").fadeOut(300);
    } else {
      $(".content-search").fadeIn(300);
    }
  } else {
    valorElseKeyUp += 1;
    if (valorElseKeyUp === 1) {
      alert("Seleccione una opción");
    }
  }
});

//Funcion para mostrar los resultados de acuerdo
//a lo seleccionado
function ResultadoBusqueda(idP) {
  let idPregunta = "#" + idP;
  $(idPregunta).addClass("show");
  $(".content-search").fadeOut(300);
}

//Evento cuando pierde el foco se elimina
//el resultado de busqueda
$("#buscador_txt").blur(function (e) {
  e.preventDefault();
  $(".content-search").fadeOut(300);
});

function Capturar(idCaja) {
  let checkClass = $("#" + idCaja).hasClass("show");
  if (checkClass) {
    $("#" + idCaja).removeClass("show");
  } else {
    $("#" + idCaja).addClass("show");
  }
}
